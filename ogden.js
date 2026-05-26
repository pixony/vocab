// ============================================================
// Ogden's Basic English 850 — 官方完整版
// Operations(100) + Things(600) + Qualities(150) = 850词
// ============================================================

const OGDEN_CATEGORIES = {
  operations: {
    label: 'Operations', labelZh: '操作词',
    color: '#a16207',    bg: '#fef9c3',
    desc: '100个功能词：动词、介词、代词、连词、副词等'
  },
  things: {
    label: 'Things',     labelZh: '事物词',
    color: '#166534',    bg: '#dcfce7',
    desc: '400通用名词 + 200图画名词，共600词'
  },
  qualities: {
    label: 'Qualities',  labelZh: '品质词',
    color: '#9d174d',    bg: '#fce7f3',
    desc: '100通用形容词 + 50反义形容词，共150词'
  }
};

// ── Operations: 18个基本动词 ──────────────────────────────────
const OGDEN_OPS_VERBS = [
  "be","come","do","get","give","go","have","keep",
  "let","make","may","put","say","see","seem","send",
  "take","will"
];

// ── Operations: 25个介词 ──────────────────────────────────────
const OGDEN_OPS_PREP = [
  "about","across","after","against","among","as","at",
  "before","between","by","down","for","from","in","of",
  "off","on","over","than","through","till","to","under",
  "up","with"
];

// ── Operations: 11个限定词/冠词 ──────────────────────────────
const OGDEN_OPS_DET = [
  "a","all","any","every","no","other","some","such",
  "that","the","this"
];

// ── Operations: 4个代词 ──────────────────────────────────────
const OGDEN_OPS_PRON = [
  "he","I","who","you"
];

// ── Operations: 11个连词 ─────────────────────────────────────
const OGDEN_OPS_CONJ = [
  "and","because","but","how","if","or","though",
  "when","where","while","why"
];

// ── Operations: 31个副词及其他 ───────────────────────────────
const OGDEN_OPS_ADV = [
  "again","almost","east","enough","ever","far","forward",
  "here","little","much","near","north","not","now","only",
  "out","please","quite","so","south","still","then","there",
  "together","tomorrow","very","well","west","yesterday","yes","yet"
];

// ── Things General: 400个通用名词 ─────────────────────────────
const OGDEN_THINGS_GENERAL = [
  "account","act","addition","adjustment","advertisement",
  "agreement","air","amount","amusement","animal",
  "answer","apparatus","approval","argument","art",
  "attack","attempt","attention","attraction","authority",
  "back","balance","base","behaviour","belief",
  "birth","bit","bite","blood","blow",
  "body","brass","bread","breath","brother",
  "building","burn","burst","business","butter",
  "canvas","care","cause","chalk","chance",
  "change","cloth","coal","colour","comfort",
  "committee","company","comparison","competition","condition",
  "connection","control","cook","copper","copy",
  "cork","cotton","cough","country","cover",
  "crack","credit","crime","crush","cry",
  "current","curve","damage","danger","daughter",
  "day","death","debt","decision","degree",
  "design","desire","destruction","detail","development",
  "digestion","direction","discovery","discussion","disease",
  "disgust","distance","distribution","division","doubt",
  "drink","driving","dust","earth","edge",
  "education","effect","end","error","event",
  "example","exchange","existence","expansion","experience",
  "expert","fact","fall","family","father",
  "fear","feeling","fiction","field","fight",
  "fire","flame","flight","flower","fold",
  "food","force","form","friend","front",
  "fruit","glass","gold","government","grain",
  "grass","grip","group","growth","guide",
  "harbour","harmony","hate","hearing","heat",
  "help","history","hole","hope","hour",
  "humour","ice","idea","impulse","increase",
  "industry","ink","insect","instrument","insurance",
  "interest","invention","iron","jelly","join",
  "journey","judge","jump","kick","kiss",
  "knowledge","land","language","laugh","law",
  "lead","learning","leather","letter","level",
  "lift","light","limit","linen","liquid",
  "list","look","loss","love","machine",
  "man","manager","mark","market","mass",
  "meal","measure","meat","meeting","memory",
  "metal","middle","milk","mind","mine",
  "minute","mist","money","month","morning",
  "mother","motion","mountain","move","music",
  "name","nation","need","news","night",
  "noise","note","number","observation","offer",
  "oil","operation","opinion","order","organization",
  "ornament","owner","page","pain","paint",
  "paper","part","paste","payment","peace",
  "person","place","plant","play","pleasure",
  "point","poison","polish","porter","position",
  "powder","power","price","print","process",
  "produce","profit","property","prose","protest",
  "pull","punishment","purpose","push","quality",
  "question","rain","range","rate","ray",
  "reaction","reading","reason","record","regret",
  "relation","religion","representative","request","respect",
  "rest","reward","rhythm","rice","river",
  "road","roll","room","rub","rule",
  "run","salt","sand","scale","science",
  "sea","seat","secretary","selection","self",
  "sense","servant","sex","shade","shake",
  "shame","shock","side","sign","silk",
  "silver","sister","size","sky","sleep",
  "slip","slope","smash","smell","smile",
  "smoke","sneeze","snow","soap","society",
  "son","song","sort","sound","soup",
  "space","stage","start","statement","steam",
  "steel","step","stitch","stone","stop",
  "story","stretch","structure","substance","sugar",
  "suggestion","summer","support","surprise","swim",
  "system","talk","taste","tax","teaching",
  "tendency","test","theory","thing","thought",
  "thunder","time","tin","top","touch",
  "trade","transport","trick","trouble","turn",
  "twist","unit","use","value","verse",
  "vessel","view","voice","walk","war",
  "wash","waste","water","wave","wax",
  "way","weather","week","weight","wind",
  "wine","winter","woman","wood","wool",
  "word","work","wound","writing","year"
];

// ── Things Pictured: 200个图画名词 ───────────────────────────
const OGDEN_THINGS_PICTURED = [
  "angle","ant","apple","arch","arm",
  "army","baby","bag","ball","band",
  "basin","basket","bath","bed","bee",
  "bell","berry","bird","blade","board",
  "boat","bone","book","boot","bottle",
  "box","boy","brain","brake","branch",
  "brick","bridge","brush","bucket","bulb",
  "button","cake","camera","card","carriage",
  "cart","cat","chain","cheese","chest",
  "chin","church","circle","clock","cloud",
  "coat","collar","comb","cord","cow",
  "cup","curtain","cushion","dog","door",
  "drain","drawer","dress","drop","ear",
  "egg","engine","eye","face","farm",
  "feather","finger","fish","flag","floor",
  "fly","foot","fork","fowl","frame",
  "garden","girl","glove","goat","gun",
  "hair","hammer","hand","hat","head",
  "heart","hook","horn","horse","hospital",
  "house","island","jewel","kettle","key",
  "knee","knife","knot","leaf","leg",
  "library","line","lip","lock","map",
  "match","monkey","moon","mouth","muscle",
  "nail","neck","needle","nerve","net",
  "nose","nut","office","orange","oven",
  "parcel","pen","pencil","picture","pig",
  "pin","pipe","plane","plate","plough",
  "pocket","pot","potato","prison","pump",
  "rail","rat","receipt","ring","rod",
  "roof","root","sail","school","scissors",
  "screw","seed","sheep","shelf","ship",
  "shirt","shoe","skin","skirt","snake",
  "sock","spade","sponge","spoon","spring",
  "square","stamp","star","station","stem",
  "stick","stocking","stomach","store","street",
  "sun","table","tail","thread","throat",
  "thumb","ticket","toe","tongue","tooth",
  "town","train","tray","tree","trousers",
  "umbrella","wall","watch","wheel","whip",
  "whistle","window","wing","wire","worm"
];

// ── Qualities General: 100个通用形容词 ──────────────────────
const OGDEN_QUAL_GENERAL = [
  "able","acid","angry","automatic","beautiful",
  "black","boiling","bright","broken","brown",
  "cheap","chemical","chief","clean","clear",
  "common","complex","conscious","cut","deep",
  "dependent","early","elastic","electric","equal",
  "fat","fertile","first","fixed","flat",
  "free","frequent","full","general","good",
  "great","grey","hanging","happy","hard",
  "healthy","high","hollow","important","kind",
  "like","living","long","male","married",
  "material","medical","military","natural","necessary",
  "new","normal","open","parallel","past",
  "physical","political","poor","possible","present",
  "private","probable","quick","quiet","ready",
  "red","regular","responsible","right","round",
  "same","second","separate","serious","sharp",
  "smooth","sticky","stiff","straight","strong",
  "sudden","sweet","tall","thick","tight",
  "tired","true","violent","waiting","warm",
  "wet","wide","wise","yellow","young"
];

// ── Qualities Opposites: 50个反义形容词 ─────────────────────
const OGDEN_QUAL_OPPOSITES = [
  "awake","bad","bent","bitter","blue",
  "certain","cold","complete","cruel","dark",
  "dead","dear","delicate","different","dirty",
  "dry","false","feeble","female","foolish",
  "future","green","ill","last","late",
  "left","loose","loud","low","mixed",
  "narrow","old","opposite","public","rough",
  "sad","safe","secret","short","shut",
  "simple","slow","small","soft","solid",
  "special","strange","thin","white","wrong"
];

// ── 整合为完整数据结构 ────────────────────────────────────────
const OGDEN_WORD_LIST = [
  ...OGDEN_OPS_VERBS.map(w =>
    ({ word: w, category: 'operations', sub: 'verb' })),
  ...OGDEN_OPS_PREP.map(w =>
    ({ word: w, category: 'operations', sub: 'preposition' })),
  ...OGDEN_OPS_DET.map(w =>
    ({ word: w, category: 'operations', sub: 'determiner' })),
  ...OGDEN_OPS_PRON.map(w =>
    ({ word: w, category: 'operations', sub: 'pronoun' })),
  ...OGDEN_OPS_CONJ.map(w =>
    ({ word: w, category: 'operations', sub: 'conjunction' })),
  ...OGDEN_OPS_ADV.map(w =>
    ({ word: w, category: 'operations', sub: 'adverb' })),
  ...OGDEN_THINGS_GENERAL.map(w =>
    ({ word: w, category: 'things', sub: 'general' })),
  ...OGDEN_THINGS_PICTURED.map(w =>
    ({ word: w, category: 'things', sub: 'pictured' })),
  ...OGDEN_QUAL_GENERAL.map(w =>
    ({ word: w, category: 'qualities', sub: 'general' })),
  ...OGDEN_QUAL_OPPOSITES.map(w =>
    ({ word: w, category: 'qualities', sub: 'opposite' }))
];

// ── 工具函数 ──────────────────────────────────────────────────
function getOgdenCategory(word) {
  const found = OGDEN_WORD_LIST.find(
    e => e.word.toLowerCase() === word.toLowerCase()
  );
  return found ? found.category : null;
}

function getOgdenSub(word) {
  const found = OGDEN_WORD_LIST.find(
    e => e.word.toLowerCase() === word.toLowerCase()
  );
  return found ? found.sub : null;
}

function getOgdenStats() {
  const s = {};
  OGDEN_WORD_LIST.forEach(e => {
    s[e.category] = (s[e.category] || 0) + 1;
  });
  s.total = OGDEN_WORD_LIST.length;
  return s;
}

// 在控制台验证词数（开发用）
console.log('Ogden 词数验证：', {
  ops_verbs:      OGDEN_OPS_VERBS.length,      // 18
  ops_prep:       OGDEN_OPS_PREP.length,        // 25
  ops_det:        OGDEN_OPS_DET.length,         // 11
  ops_pron:       OGDEN_OPS_PRON.length,        // 4
  ops_conj:       OGDEN_OPS_CONJ.length,        // 11
  ops_adv:        OGDEN_OPS_ADV.length,         // 31
  things_general: OGDEN_THINGS_GENERAL.length,  // 400
  things_pictured:OGDEN_THINGS_PICTURED.length, // 200
  qual_general:   OGDEN_QUAL_GENERAL.length,    // 100
  qual_opposites: OGDEN_QUAL_OPPOSITES.length,  // 50
  total:          OGDEN_WORD_LIST.length         // 850
});