// Genera un video animado y narrado a partir de un deck (decks/<id>.js). Basado en el generador de Protocolos.
// Uso: node make.js <id> [preview|tts|render|video|pdf ...]   (sin pasos = tts render video pdf)
//   preview: estado final de cada diapositiva en out/<id>/preview (rápido, sin audio). ONLY=3,4 limita; STEPS=1 guarda cada paso.
//
// Narración: cada paso es [texto, código]. En el texto, "[A]" y "[P]" cambian de voz (alumno / profe; por defecto profe).
// Cada oración se sintetiza aparte, con variaciones de velocidad y tono según el tipo de oración y pausas entre oraciones,
// para que no suene monótono. Mientras habla el alumno, su pregunta aparece en pantalla.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { execFileSync, spawn } = require('child_process');

const VIDEOS = path.resolve(__dirname, '..');
const FFDIR = path.join(process.env.LOCALAPPDATA, 'Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin');
const FFMPEG = path.join(FFDIR, 'ffmpeg.exe');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const KATEX_CSS = path.resolve(__dirname, '../../Hojas propias/vendor/katex/dist/katex.min.css');
const VOICES = { P: process.env.VOZ_P || 'es-AR-ElenaNeural', A: process.env.VOZ_A || 'es-UY-MateoNeural' };
const SR = 24000, FPS = 30;
const LEAD = 0.3, TAIL = 0.4, SLIDE_LEAD = 0.6, SLIDE_TAIL = 0.7;

// ---------------------------------------------------------------- deck -> HTML
function loadDeck(id) {
  const deck = require(path.join(__dirname, 'decks', id + '.js'));
  deck.id = id;
  deck.slides.forEach((s, k) => {
    s.k = k; s.steps = (s.steps || []).map(st => typeof st === 'string' ? [st, ''] : st);
    if (!s.steps.length) throw new Error(`diapositiva ${k + 1} "${s.title}" sin pasos`);
  });
  return deck;
}
function deckHtml(deck) {
  const N = deck.slides.length;
  const css = deck.slides.map(s => s.css || '').join('\n') + (deck.css || '');
  const body = deck.slides.map((s, k) => {
    const kind = s.kind || 'normal';
    const head = kind === 'normal' ? `<header><div class="kicker">${s.sec || ''}</div><h1>${require('./lib').md(s.title)}</h1></header>` : '';
    return `<section class="slide ${kind} ${s.cls || ''}" id="s${k + 1}">${head}<main class="${s.top ? 'top' : ''}">${s.html || ''}</main>` +
      `<footer><span>${s.footer || deck.footer || ''}</span><span>${k + 1} / ${N}</span></footer><div class="prog" style="width:${((k + 1) / N * 100).toFixed(2)}%"></div></section>`;
  }).join('\n');
  // precarga de las fuentes de KaTeX (si no, el primer cuadro de cada fórmula sale con otra fuente)
  const pre = require('./lib').md('$\\frac{a}{b}\\sqrt{x}\\int_0^1 \\sum \\left(\\frac{\\sen\\beta}{\\beta}\\right)^2 \\mathrm{m}\\,\\text{s}\\,\\lambda\\omega\\varphi\\Delta\\pi$ $$\\left[\\frac12\\right]$$');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${deck.title}</title>
<link rel="stylesheet" href="file:///${KATEX_CSS.replace(/\\/g, '/')}">
<style>${fs.readFileSync(path.join(__dirname, 'theme.css'), 'utf8')}\n${css}</style></head><body>${body}
<div id="spk" class="pr"><span class="who">Profe</span><span class="q"></span></div>
<div style="position:absolute;left:0;top:0;opacity:0;pointer-events:none">${pre}</div>
<script>${fs.readFileSync(path.join(__dirname, 'runtime.js'), 'utf8')}\n${deck.js || ''}</script></body></html>`;
}

// ---------------------------------------------------------------- texto hablado
function spoken(t) {
  return t.replace(/\*\*|==|`/g, '').replace(/\{(?:c\d|muted)\|([^}]+)\}/g, '$1').replace(/\s+/g, ' ').trim();
}
// "texto [P] ... [A] ..." -> [{who, text}] por oración
function sentences(t) {
  const out = [];
  const parts = (' ' + t).split(/\s*\[([AP])\]\s*/);
  let who = 'P';
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) { who = parts[i]; continue; }
    const txt = spoken(parts[i]); if (!txt) continue;
    const ss = txt.match(/[^.!?…]+(?:[.!?…]+["»”)]?|$)/g) || [txt];
    const merged = [];
    for (const s of ss.map(x => x.trim()).filter(Boolean)) {
      // no cortar oraciones muy cortas: se pegan a la anterior
      if (merged.length && merged[merged.length - 1].length < 18) merged[merged.length - 1] += ' ' + s; else merged.push(s);
    }
    merged.forEach(s => out.push({ who, text: s }));
  }
  return out;
}
// variación de voz por oración (determinística, para que el caché sirva)
function prosody(seg) {
  const h = crypto.createHash('md5').update(seg.text).digest();
  const q = /\?\s*$/.test(seg.text), ex = /!\s*$/.test(seg.text) || /^(ojo|atención|cuidado|importante)/i.test(seg.text);
  const nums = (seg.text.match(/\d/g) || []).length >= 4;
  if (seg.who === 'A') return q ? { rate: '+2%', pitch: '+9%' } : { rate: '+4%', pitch: ['+2%', '+4%', '+0%'][h[0] % 3] };
  if (q) return { rate: '-2%', pitch: ['+6%', '+8%'][h[0] % 2] };
  if (ex) return { rate: '-7%', pitch: '+3%', volume: '+8%' };
  if (nums) return { rate: '-6%', pitch: ['-1%', '+1%'][h[0] % 2] };
  return { rate: ['-3%', '+0%', '+3%', '+6%'][h[0] % 4], pitch: ['-3%', '+0%', '+2%', '+4%'][h[1] % 4] };
}
// pausa después de cada oración
function gapAfter(seg, next) {
  const h = crypto.createHash('md5').update(seg.text).digest()[2] / 255;
  let g = 0.26 + 0.12 * h;
  if (/\?\s*$/.test(seg.text)) g += 0.2;
  if (/[:;]\s*$/.test(seg.text)) g += 0.1;
  if (next && next.who !== seg.who) g += 0.25;
  return next ? g : 0;
}
function narration(deck) {
  let t = '', words = 0;
  deck.slides.forEach((s, k) => {
    t += `\n[${k + 1}] ${s.sec ? s.sec + ' · ' : ''}${s.title}\n`;
    s.steps.forEach((st, j) => { const ss = sentences(st[0]); words += ss.reduce((a, x) => a + x.text.split(' ').length, 0); t += `  (${j}) ${ss.map(x => (x.who === 'A' ? '[A] ' : '') + x.text).join(' ')}\n`; });
  });
  const dir = path.join(__dirname, 'out', deck.id); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'narracion.txt'), t);
  console.log(`  narración: ${words} palabras (~${Math.round(words / 140)} min)`);
}

// ---------------------------------------------------------------- TTS
const escXml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
async function ttsOne(voice, text, pros, file) {
  const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
  for (let attempt = 1; ; attempt++) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
      const { audioStream } = await tts.toStream(escXml(text), pros);
      const buf = await new Promise((res, rej) => {
        const parts = []; const to = setTimeout(() => rej(new Error('timeout')), 120000);
        audioStream.on('data', d => parts.push(d));
        audioStream.on('error', e => { clearTimeout(to); rej(e); });
        audioStream.on('close', () => { clearTimeout(to); res(Buffer.concat(parts)); });
      });
      try { tts.close(); } catch (e) { }
      if (buf.length < 1500) throw new Error('audio vacío (' + buf.length + ' bytes)');
      fs.writeFileSync(file, buf); return;
    } catch (e) {
      if (attempt >= 12) throw new Error('TTS falló: ' + e.message + ' :: ' + text.slice(0, 80));
      await new Promise(r => setTimeout(r, (/429/.test(e.message) ? 20000 : 2000) * attempt));
    }
  }
}
function decode(mp3) { return execFileSync(FFMPEG, ['-v', 'error', '-i', mp3, '-f', 's16le', '-ar', String(SR), '-ac', '1', 'pipe:1'], { maxBuffer: 1 << 28 }); }
async function tts(deck) {
  const cache = path.join(__dirname, 'cache'); fs.mkdirSync(cache, { recursive: true });
  const jobs = [];
  deck.slides.forEach(s => s.steps.forEach(st => {
    st.segs = sentences(st[0]);
    st.segs.forEach((g, i) => {
      g.voice = VOICES[g.who]; g.pros = prosody(g); g.gap = gapAfter(g, st.segs[i + 1]);
      g.file = path.join(cache, crypto.createHash('sha1').update(JSON.stringify([g.voice, g.pros, g.text])).digest('hex') + '.mp3');
      if (!fs.existsSync(g.file) && !jobs.some(j => j.file === g.file)) jobs.push(g);
    });
  }));
  console.log(`  TTS: ${jobs.length} oraciones nuevas`);
  let done = 0, next = 0;
  await Promise.all(Array.from({ length: +(process.env.TTSPAR || 3) }, async () => {
    while (next < jobs.length) { const j = jobs[next++]; await ttsOne(j.voice, j.text, j.pros, j.file); if (++done % 25 === 0) console.log(`    ${done}/${jobs.length}`); }
  }));
  const dfile = path.join(cache, 'durations.json');
  const durs = fs.existsSync(dfile) ? JSON.parse(fs.readFileSync(dfile, 'utf8')) : {};
  deck.slides.forEach(s => s.steps.forEach(st => {
    let t = 0;
    st.segs.forEach(g => { const key = path.basename(g.file); if (!(key in durs)) durs[key] = decode(g.file).length / 2 / SR; g.dur = durs[key]; g.start = t; t += g.dur + g.gap; });
    st.adur = t;
  }));
  fs.writeFileSync(dfile, JSON.stringify(durs));
}

// ---------------------------------------------------------------- render
async function openPage(deck) {
  const puppeteer = require('puppeteer-core');
  const dir = path.join(__dirname, 'out', deck.id); fs.mkdirSync(dir, { recursive: true });
  const htmlFile = path.join(dir, 'deck.html');
  fs.writeFileSync(htmlFile, deckHtml(deck));
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars', '--font-render-hinting=none', '--allow-file-access-from-files'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('requestfailed', r => errors.push('no cargó: ' + r.url()));
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto('file:///' + htmlFile.replace(/\\/g, '/'), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  return { browser, page, dir, errors };
}
const runStep = (page, j, code, adur) => page.evaluate((j, code, adur) => {
  ADUR = adur;
  stepStart(j);
  if (code) (new Function(code))();
  getComputedStyle(document.body).opacity;
  const as = document.getAnimations(); as.forEach(a => a.pause());
  let end = 0;
  for (const a of as) { const t = a.effect && a.effect.getComputedTiming(); if (t && isFinite(t.endTime)) end = Math.max(end, t.endTime); }
  return end;
}, j, code || '', adur || 0);
async function checkOverflow(page) {
  return page.evaluate(() => {
    const m = S.querySelector('main'); const out = [];
    if (m.scrollHeight > m.clientHeight + 2 || m.scrollWidth > m.clientWidth + 2) out.push(`main desborda (${m.scrollWidth}x${m.scrollHeight} > ${m.clientWidth}x${m.clientHeight})`);
    for (const e of S.querySelectorAll('main *')) { const r = e.getBoundingClientRect(); if (r.width && (r.right > 1905 || r.bottom > 1075 || r.left < 15)) { out.push('fuera de pantalla: ' + e.tagName + '.' + e.className); break; } }
    return out;
  });
}
const setSpk = (page, g, hide) => page.evaluate((who, text, hide) => { setSpeaker(who, text); document.getElementById('spk').classList.toggle('hide', !!hide); }, g ? g.who : 'P', g ? g.text : '', !!hide);
async function preview(deck) {
  const { browser, page, dir, errors } = await openPage(deck);
  const pdir = path.join(dir, 'preview'); fs.mkdirSync(pdir, { recursive: true });
  const only = process.env.ONLY ? process.env.ONLY.split(',').map(Number) : null;
  for (const s of deck.slides) {
    if (only && !only.includes(s.k + 1)) continue;
    await page.evaluate(k => go(k), s.k);
    for (let j = 0; j < s.steps.length; j++) {
      const segs = sentences(s.steps[j][0]); const ga = segs.find(g => g.who === 'A');
      await setSpk(page, ga || segs[0], s.kind && s.kind !== 'normal');
      try { await runStep(page, j, s.steps[j][1], 8); } catch (e) { console.log(`  ! diap ${s.k + 1} paso ${j}: ${e.message.split('\n')[0]}`); }
      if (process.env.STEPS) { await page.evaluate(() => document.getAnimations().forEach(a => a.finish())); await page.screenshot({ path: path.join(pdir, `${String(s.k + 1).padStart(3, '0')}-${j}.png`), optimizeForSpeed: true }); }
      if (j < s.steps.length - 1) await page.evaluate(() => stepEnd()); else await page.evaluate(() => document.getAnimations().forEach(a => a.finish()));
    }
    const ov = await checkOverflow(page); if (ov.length) console.log(`  ! diap ${s.k + 1} "${s.title}": ${ov.join('; ')}`);
    await page.screenshot({ path: path.join(pdir, String(s.k + 1).padStart(3, '0') + '.png'), optimizeForSpeed: true });
    await page.evaluate(() => stepEnd());
  }
  if (errors.length) console.log('  errores en página:\n   ' + [...new Set(errors)].join('\n   '));
  await browser.close();
  console.log(`  preview listo en ${pdir}`);
}
async function render(deck) {
  const { browser, page, dir, errors } = await openPage(deck);
  const fdir = path.join(dir, 'frames'); fs.rmSync(fdir, { recursive: true, force: true }); fs.mkdirSync(fdir, { recursive: true });
  const list = []; let nf = 0, t0 = Date.now();
  const timeline = [];
  const shot = async () => { const f = path.join(fdir, String(++nf).padStart(6, '0') + '.jpg'); await page.screenshot({ path: f, type: 'jpeg', quality: 92, optimizeForSpeed: true }); return f; };
  for (const s of deck.slides) {
    const hideSpk = s.kind && s.kind !== 'normal';
    await page.evaluate(k => go(k), s.k);
    for (let j = 0; j < s.steps.length; j++) {
      const st = s.steps[j];
      const lead = j === 0 ? SLIDE_LEAD : LEAD, tail = j === s.steps.length - 1 ? SLIDE_TAIL : TAIL;
      const segAt = t => { let g = null; for (const x of st.segs) if (t >= lead + x.start - 0.05) g = x; return g || st.segs[0]; };
      let cur = segAt(0); await setSpk(page, cur, hideSpk);
      const end = (await runStep(page, j, st[1], st.adur)) / 1000;
      const D = Math.max(lead + st.adur + tail, end + 0.25);
      const n = Math.ceil(end * FPS);
      for (let f = 0; f < n; f++) {
        const g = segAt(f / FPS); if (g !== cur) { cur = g; await setSpk(page, cur, hideSpk); }
        await page.evaluate(t => document.getAnimations().forEach(a => { a.currentTime = t; }), f * 1000 / FPS);
        list.push([await shot(), 1 / FPS]);
      }
      await page.evaluate(() => document.getAnimations().forEach(a => a.finish()));
      // tramo quieto: un cuadro por cada cambio de oración (para el chip y el globo del alumno)
      let t = n / FPS;
      const cuts = st.segs.map(g => lead + g.start).filter(x => x > t + 0.04 && x < D);
      for (const c of [...cuts, D]) {
        const g = segAt(t); if (g !== cur) { cur = g; await setSpk(page, cur, hideSpk); }
        const last = await shot(); list.push([last, c - t]); t = c; s.final = last;
      }
      timeline.push({ slide: s.k, step: j, dur: D, lead, segs: st.segs.map(g => ({ file: g.file, dur: g.dur, gap: g.gap, who: g.who, text: g.text })) });
      await page.evaluate(() => stepEnd());
    }
    process.stdout.write(`\r  diapositiva ${s.k + 1}/${deck.slides.length} · ${nf} cuadros · ${((Date.now() - t0) / 1000).toFixed(0)} s   `);
  }
  console.log();
  if (errors.length) console.log('  errores en página:\n   ' + [...new Set(errors)].join('\n   '));
  await browser.close();
  fs.writeFileSync(path.join(dir, 'render.json'), JSON.stringify({ list, timeline, finals: deck.slides.map(s => s.final) }));
}

// ---------------------------------------------------------------- video
const silence = sec => Buffer.alloc(Math.max(0, Math.round(sec * SR)) * 2);
const srtTime = t => { const ms = Math.round(t * 1000); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
async function video(deck) {
  const dir = path.join(__dirname, 'out', deck.id);
  const { list, timeline } = JSON.parse(fs.readFileSync(path.join(dir, 'render.json'), 'utf8'));
  const pcm = path.join(dir, 'audio.pcm'); const fd = fs.openSync(pcm, 'w');
  let t = 0, srt = '', ns = 0; const chap = [];
  for (const st of timeline) {
    const s = deck.slides[st.slide];
    const name = s.chapter || s.sec || s.title;
    if (st.step === 0 && (!chap.length || chap[chap.length - 1].sec !== name)) chap.push({ sec: name, start: t });
    const total = Math.round(st.dur * SR);
    const bufs = [silence(st.lead)]; let c = t + st.lead;
    for (const g of st.segs) {
      bufs.push(decode(g.file), silence(g.gap));
      srt += `${++ns}\n${srtTime(c)} --> ${srtTime(c + g.dur)}\n${g.who === 'A' ? 'Alumno: ' : ''}${g.text}\n\n`;
      c += g.dur + g.gap;
    }
    let buf = Buffer.concat(bufs);
    buf = buf.length >= total * 2 ? buf.subarray(0, total * 2) : Buffer.concat([buf, silence((total * 2 - buf.length) / 2 / SR)]);
    fs.writeSync(fd, buf);
    t += total / SR;
  }
  fs.closeSync(fd);
  const P = f => f.replace(/\\/g, '/');
  fs.writeFileSync(path.join(dir, 'list.txt'), list.map(([f, d]) => `file '${P(f)}'\nduration ${d.toFixed(5)}\n`).join('') + `file '${P(list[list.length - 1][0])}'\n`);
  const srtFile = path.join(VIDEOS, deck.file + '.srt');
  fs.writeFileSync(srtFile, srt);
  let meta = `;FFMETADATA1\ntitle=${deck.title}\nartist=Física II - ITBA\n`;
  chap.forEach((c, k) => { meta += `[CHAPTER]\nTIMEBASE=1/1000\nSTART=${Math.round(c.start * 1000)}\nEND=${Math.round((k + 1 < chap.length ? chap[k + 1].start : t) * 1000)}\ntitle=${c.sec.replace(/([=;#\\])/g, '\\$1')}\n`; });
  fs.writeFileSync(path.join(dir, 'meta.txt'), meta);
  const out = path.join(VIDEOS, deck.file + '.mp4');
  console.log(`  video: ${(t / 60).toFixed(1)} min, codificando...`);
  await new Promise((res, rej) => {
    const p = spawn(FFMPEG, ['-y', '-v', 'error', '-stats', '-f', 'concat', '-safe', '0', '-i', path.join(dir, 'list.txt'), '-f', 's16le', '-ar', String(SR), '-ac', '1', '-i', pcm, '-i', path.join(dir, 'meta.txt'), '-i', srtFile,
      '-map_metadata', '2', '-map_chapters', '2', '-map', '0:v', '-map', '1:a', '-map', '3:s', '-vf', `fps=${FPS},format=yuv420p`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-g', String(FPS * 4),
      '-c:a', 'aac', '-b:a', '128k', '-ar', '48000', '-c:s', 'mov_text', '-metadata:s:s:0', 'language=spa', '-t', t.toFixed(3), '-movflags', '+faststart', out], { stdio: 'inherit' });
    p.on('exit', c => c ? rej(new Error('ffmpeg salió con ' + c)) : res());
  });
  fs.unlinkSync(pcm);
  fs.writeFileSync(path.join(dir, 'capitulos.txt'), chap.map(c => `${srtTime(c.start).slice(0, 8)}  ${c.sec}`).join('\n'));
  console.log(`  listo: ${out} (${(fs.statSync(out).size / 1e6).toFixed(1)} MB)`);
}
async function pdf(deck) {
  const dir = path.join(__dirname, 'out', deck.id);
  const { finals } = JSON.parse(fs.readFileSync(path.join(dir, 'render.json'), 'utf8'));
  const puppeteer = require('puppeteer-core');
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  const html = `<html><head><style>@page{size:1920px 1080px;margin:0}body{margin:0}img{display:block;width:1920px;height:1080px;page-break-after:always}</style></head><body>${finals.filter(Boolean).map(f => `<img src="file:///${f.replace(/\\/g, '/')}">`).join('')}</body></html>`;
  const hf = path.join(dir, 'pdf.html'); fs.writeFileSync(hf, html);
  await page.goto('file:///' + hf.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.pdf({ path: path.join(VIDEOS, deck.file + ' - Diapositivas.pdf'), width: '1920px', height: '1080px', printBackground: true });
  await browser.close();
  console.log('  PDF de diapositivas listo');
}

(async () => {
  const [id, ...steps] = process.argv.slice(2);
  const want = s => steps.length ? steps.includes(s) : s !== 'preview';
  const deck = loadDeck(id);
  console.log(`${id}: ${deck.slides.length} diapositivas, ${deck.slides.reduce((a, s) => a + s.steps.length, 0)} pasos`);
  narration(deck);
  if (want('preview')) await preview(deck);
  if (want('tts') || want('render')) await tts(deck);
  if (want('render')) await render(deck);
  if (want('video')) await video(deck);
  if (want('pdf')) await pdf(deck);
})().catch(e => { console.error('ERROR', e.stack || e.message); process.exit(1); });
