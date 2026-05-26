// ============================================================
// utils.js  ─  共享工具：SM-2算法 / LocalStorage / 语音 / UI
// ============================================================

/* ── 当前激活词库 ── */
let ACTIVE_CORPUS = localStorage.getItem('active_corpus') || 'lc3000';

function setCorpus(name) {
  ACTIVE_CORPUS = name;
  localStorage.setItem('active_corpus', name);
}

function getWordList() {
  if (ACTIVE_CORPUS === 'ogden') {
    // Ogden 850：尝试从 WORD_LIST(LC3000) 中获取释义，若无则生成基础条目
    return OGDEN_WORD_LIST.map(og => {
      const found = (typeof WORD_LIST !== 'undefined')
        ? WORD_LIST.find(e => e.word.toLowerCase() === og.word.toLowerCase())
        : null;
      if (found) return { ...found, ogdenCategory: og.category };
      return {
        id: og.word,
        word: og.word,
        phonetic: og.word,
        pos: og.category === 'qualities' ? 'adj' : og.category === 'operations' ? 'v' : 'n',
        frequency: 'S1 W1',
        meanings: [{ definition: `【Ogden Basic English】${og.word}`, example: `This is ${og.word}.` }],
        synonyms: [],
        ogdenCategory: og.category
      };
    });
  }
  return typeof WORD_LIST !== 'undefined' ? WORD_LIST : [];
}

/* ── LocalStorage 键名 ── */
const KEYS = {
  PROGRESS: k => `progress_${k}`,   // k = corpus name
  HISTORY:  k => `history_${k}`,
  STREAK:   k => `streak_${k}`,
};
const CK = () => ACTIVE_CORPUS;

/* ── SM-2 间隔重复算法 ── */
const SM2 = {
  create: id => ({
    wordId: String(id), repetitions: 0, interval: 0,
    easeFactor: 2.5, nextReview: Date.now(),
    lastReview: null, totalReviews: 0, correctReviews: 0
  }),
  review(card, quality) {
    const q = [0, 2, 4, 5][quality];
    let { repetitions, easeFactor, interval } = card;
    if (q < 3) { repetitions = 0; interval = 1; }
    else {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 4;
      else interval = Math.round(interval * easeFactor);
      repetitions++;
      easeFactor = Math.max(1.3, easeFactor + .1 - (5-q)*(.08+(5-q)*.02));
    }
    return {
      ...card, repetitions, easeFactor,
      interval: Math.min(interval, 365),
      nextReview: Date.now() + Math.min(interval, 365) * 86400000,
      lastReview: Date.now(),
      totalReviews: card.totalReviews + 1,
      correctReviews: card.correctReviews + (q >= 3 ? 1 : 0)
    };
  },
  masteryLevel(card) {
    if (!card || card.totalReviews === 0) return 0;
    if (card.repetitions === 0)  return 1;
    if (card.interval < 7)       return 2;
    if (card.interval < 21)      return 3;
    return 4;
  },
  masteryLabel: l => ['未学习','学习中','初步掌握','较熟悉','已掌握'][l],
  masteryColor: l => ['#94a3b8','#f59e0b','#60a5fa','#a78bfa','#34d399'][l],
  isDue: card => !card || Date.now() >= card.nextReview
};

/* ── Progress 管理 ── */
const Progress = {
  all() { return JSON.parse(localStorage.getItem(KEYS.PROGRESS(CK())) || '{}'); },
  get(id) { return this.all()[String(id)] || null; },
  save(card) {
    const all = this.all();
    all[String(card.wordId)] = card;
    localStorage.setItem(KEYS.PROGRESS(CK()), JSON.stringify(all));
  },
  stats(wordList) {
    const all = this.all();
    const counts = [0,0,0,0,0];
    let due = 0;
    wordList.forEach(w => {
      const card = all[String(w.id || w.word)];
      counts[SM2.masteryLevel(card)]++;
      if (SM2.isDue(card)) due++;
    });
    return { total: wordList.length, new: counts[0], learning: counts[1],
             young: counts[2], mature: counts[3], master: counts[4],
             studied: wordList.length - counts[0], due };
  }
};

/* ── History 管理 ── */
const History = {
  all() { return JSON.parse(localStorage.getItem(KEYS.HISTORY(CK())) || '[]'); },
  today() { return new Date().toISOString().split('T')[0]; },
  fmt(d) { return d instanceof Date ? d.toISOString().split('T')[0] : d; },
  add({ wordsStudied, correctCount }) {
    const arr = this.all(); const td = this.today();
    const idx = arr.findIndex(h => h.date === td);
    if (idx >= 0) { arr[idx].wordsStudied += wordsStudied; arr[idx].correctCount += correctCount; }
    else arr.push({ date: td, wordsStudied, correctCount });
    localStorage.setItem(KEYS.HISTORY(CK()), JSON.stringify(arr.slice(-365)));
  },
  last(n) {
    const arr = this.all(); const res = []; const base = new Date();
    for (let i = n-1; i >= 0; i--) {
      const d = new Date(base); d.setDate(d.getDate()-i);
      const ds = this.fmt(d); const e = arr.find(h => h.date === ds);
      res.push({ date: ds, wordsStudied: e?.wordsStudied||0, correctCount: e?.correctCount||0 });
    }
    return res;
  },
  todayCount() { const e = this.all().find(h => h.date === this.today()); return e?.wordsStudied||0; }
};

/* ── Streak 管理 ── */
const Streak = {
  get() { return JSON.parse(localStorage.getItem(KEYS.STREAK(CK())) || '{"count":0,"lastDate":null}'); },
  update() {
    const d = this.get(); const today = History.today();
    const yest = History.fmt(new Date(Date.now()-86400000));
    if (d.lastDate === today) return d.count;
    d.count = d.lastDate === yest ? d.count + 1 : 1;
    d.lastDate = today;
    localStorage.setItem(KEYS.STREAK(CK()), JSON.stringify(d));
    return d.count;
  }
};

/* ── 语音引擎 ── */
const Speech = {
  synth: window.speechSynthesis,
  _voices: [],
  _ready: false,

  init() {
    const load = () => {
      this._voices = this.synth.getVoices();
      this._ready = this._voices.length > 0;
    };
    load();
    this.synth.addEventListener('voiceschanged', load);
  },

  _pickVoice(lang = 'en') {
    const pref = ['en-US','en-GB','en-AU','en'];
    for (const code of pref) {
      const v = this._voices.find(v => v.lang.startsWith(code));
      if (v) return v;
    }
    return this._voices[0] || null;
  },

  speak(text, { rate = 0.9, pitch = 1, onEnd } = {}) {
    if (!text || !this.synth) return;
    this.synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.voice = this._pickVoice('en');
    utt.lang  = 'en-US';
    utt.rate  = rate;
    utt.pitch = pitch;
    if (onEnd) utt.onend = onEnd;
    this.synth.speak(utt);
    return utt;
  },

  stop() { this.synth?.cancel(); },

  isSupported() { return 'speechSynthesis' in window; }
};
Speech.init();

/* ── 语音按钮辅助 ── */
function attachSpeakBtn(btn, getText) {
  if (!Speech.isSupported()) { btn.style.display = 'none'; return; }
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const text = getText();
    if (!text) return;
    btn.classList.add('speaking');
    Speech.speak(text, { onEnd: () => btn.classList.remove('speaking') });
    setTimeout(() => btn.classList.remove('speaking'), 6000);
  });
}

/* ── 频率标签 HTML ── */
function freqTagsHtml(freq) {
  if (!freq) return '';
  return freq.split(' ').map(f =>
    `<span class="freq-tag freq-${f.toLowerCase()}">${f}</span>`
  ).join(' ');
}

/* ── 词性中文映射 ── */
function posLabel(pos) {
  const map = { n:'名词', v:'动词', adj:'形容词', adv:'副词', prep:'介词',
                conj:'连词', pron:'代词', det:'限定词', modal:'情态动词', excl:'感叹词' };
  return pos.split('/').map(p => map[p.trim().toLowerCase()] || p).join('/');
}

/* ── 格式化下次复习时间 ── */
function fmtNextReview(ts) {
  const diff = Math.round((ts - Date.now()) / 86400000);
  if (diff <= 0) return '今天';
  if (diff === 1) return '明天';
  return `${diff}天后`;
}

/* ── Toast 通知 ── */
const UI = {
  toast(msg, type = 'default', ms = 2800) {
    let c = document.getElementById('toast-container');
    if (!c) { c = document.createElement('div'); c.id = 'toast-container'; c.className = 'toast-container'; document.body.appendChild(c); }
    const t = document.createElement('div');
    t.className = `toast${type !== 'default' ? ' toast-'+type : ''}`;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => {
      t.style.animation = 'slideIn .3s reverse forwards';
      setTimeout(() => t.remove(), 300);
    }, ms);
  }
};

/* ── 导航高亮 ── */
document.addEventListener('DOMContentLoaded', () => {
  const fn = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.getAttribute('href') === fn) a.classList.add('active');
  });
  // 同步词库切换按钮状态
  document.querySelectorAll('.corpus-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.corpus === ACTIVE_CORPUS);
    btn.addEventListener('click', () => {
      setCorpus(btn.dataset.corpus);
      location.reload();
    });
  });
});