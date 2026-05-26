// ============================================================
// Ogden's Basic English 850 词库
// 分三类：Operations（操作词）/ Things（事物词）/ Qualities（品质词）
// ============================================================
const OGDEN_CATEGORIES = {
  operations: {
    label: 'Operations',
    labelZh: '操作词',
    color: '#a16207',
    bg: '#fef9c3',
    desc: '18 个基本动词，构成所有表达的骨架'
  },
  things: {
    label: 'Things',
    labelZh: '事物词',
    color: '#166534',
    bg: '#dcfce7',
    desc: '400 通用名词 + 200 图画名词'
  },
  qualities: {
    label: 'Qualities',
    labelZh: '品质词',
    color: '#9d174d',
    bg: '#fce7f3',
    desc: '100 形容词，描述性质与状态'
  }
};

// 18 个操作词（基本动词）
const OGDEN_OPERATIONS = [
  "come","get","give","go","keep","let","make","put",
  "seem","take","be","do","have","say","see","send","may","will"
];

// 400 通用名词
const OGDEN_THINGS_GENERAL = [
  "account","act","addition","adjustment","advertisement","agreement",
  "air","amount","amusement","animal","answer","apparatus","approval",
  "argument","art","attack","attempt","attention","attraction",
  "authority","back","balance","base","behavior","belief","birth",
  "bit","bite","blood","blow","body","brass","bread","breath","brother",
  "building","burn","burst","business","butter","canvas","care","cause",
  "chalk","chance","change","cloth","coal","color","comfort","committee",
  "company","comparison","competition","condition","connection","control",
  "cook","copper","copy","cotton","cough","country","cover","crack","credit",
  "crime","crush","cry","current","damage","danger","daughter","day",
  "death","debt","decision","degree","design","desire","destruction",
  "detail","development","direction","discovery","disgust","distance",
  "distribution","division","doubt","drink","driving","dust","education",
  "effect","end","error","event","example","exchange","existence",
  "expansion","experience","expert","fact","fall","fear","feeling",
  "fiction","field","fight","fire","flame","flight","flower","fold",
  "food","force","form","friend","front","fruit","glass","government",
  "grain","grass","grip","group","growth","guide","harbor","harmony",
  "hate","hearing","heat","help","history","hope","house","humor",
  "idea","impulse","increase","industry","ink","insect","interest",
  "invention","iron","joy","judge","jump","kick","knowledge","language",
  "laugh","law","lead","learning","leather","letter","lift","light",
  "limit","list","loss","love","manager","mark","market","meeting",
  "memory","milk","mind","mine","minute","mist","money","month",
  "morning","motion","mountain","move","music","name","nation","need",
  "news","night","noise","note","number","observation","offer","oil",
  "operation","opinion","order","organization","owner","page","pain",
  "paint","paper","part","paste","payment","peace","person","picture",
  "place","plant","play","pleasure","point","poison","polish","position",
  "powder","power","price","print","process","produce","profit","property",
  "protest","pull","punishment","push","quality","question","reaction",
  "reading","reason","record","regret","relation","religion","representative",
  "request","respect","rest","reward","rhythm","roll","room","rule",
  "run","salt","scale","science","sea","seat","shame","shock","side",
  "sign","silk","size","skill","sleep","slip","smoke","society","son",
  "song","sort","sound","space","speed","spirit","sport","stage",
  "start","statement","steam","steel","step","stitch","stone","stop",
  "story","stretch","structure","substance","sugar","support","surprise",
  "swim","system","talk","teaching","tendency","test","thought","time",
  "tin","touch","trade","transport","trick","trouble","turn","twist",
  "use","value","verse","view","voice","walk","war","wash","waste",
  "water","wave","wax","way","weight","wind","woman","word","work",
  "wound","writing","year"
];

// 200 图画名词（具体物体）
const OGDEN_THINGS_PICTURED = [
  "angle","ant","apple","arch","arm","army","baby","bag","ball","band",
  "basin","basket","bath","bed","bee","bell","berry","bird","blade",
  "board","boat","bone","book","boot","bottle","box","boy","brain",
  "brake","branch","brick","bridge","brush","bucket","bulb","button",
  "cake","camera","card","cart","cat","chain","cheese","chest","chin",
  "church","circle","clock","cloud","coat","collar","comb","cord",
  "cow","cup","curtain","cushion","dog","door","drain","drawer",
  "dress","drop","ear","egg","engine","eye","face","farm","feather",
  "finger","fish","flag","floor","fly","foot","fork","fowl","frame",
  "garden","girl","glove","goat","gun","hair","hammer","hand","hat",
  "head","heart","hook","horn","horse","hospital","house","island",
  "jewel","kettle","key","knee","knife","knot","leaf","leg","library",
  "line","lip","lock","map","match","monkey","moon","mouth","muscle",
  "nail","neck","needle","net","nose","nut","office","orange","oven",
  "parcel","pen","pencil","pig","pin","pipe","plane","plate","plough",
  "pocket","pot","potato","prison","pump","rail","rat","receipt","ring",
  "rod","roof","root","rose","ruler","sack","sail","school","scissors",
  "screw","seed","sheep","shelf","ship","shirt","shoe","skin","skirt",
  "sleeve","slope","snail","snake","sock","spade","sponge","spoon",
  "spring","square","star","stem","stick","stocking","stomach","store",
  "street","sun","table","tail","thread","throat","thumb","ticket",
  "toe","tongue","tooth","town","train","tray","tree","trousers",
  "umbrella","wall","watch","wheel","whip","whistle","window","wing",
  "wire","worm"
];

// 100 品质词（形容词）
const OGDEN_QUALITIES = [
  "able","acid","angry","automatic","beautiful","black","boiling",
  "bright","broken","brown","cheap","chemical","chief","clean","clear",
  "common","complex","conscious","cut","deep","dependent","early",
  "elastic","electric","equal","fat","fertile","first","fixed","flat",
  "free","frequent","full","general","good","great","grey","hanging",
  "happy","hard","healthy","high","hollow","important","kind","last",
  "late","left","like","living","long","male","married","material",
  "medical","military","natural","necessary","new","normal","open",
  "opposite","parallel","physical","political","poor","possible",
  "present","private","probable","quick","quiet","ready","red","regular",
  "responsible","right","round","same","second","separate","serious",
  "sharp","simple","slow","small","smooth","soft","solid","special",
  "sticky","stiff","straight","strong","sudden","sweet","tall","thick",
  "tight","tired","true","violent","waiting","warm","wet","wide",
  "wise","yellow","young"
];

// 整合为统一数据结构
const OGDEN_WORD_LIST = [
  ...OGDEN_OPERATIONS.map(w => ({ word: w, category: 'operations' })),
  ...OGDEN_THINGS_GENERAL.map(w => ({ word: w, category: 'things', sub: 'general' })),
  ...OGDEN_THINGS_PICTURED.map(w => ({ word: w, category: 'things', sub: 'pictured' })),
  ...OGDEN_QUALITIES.map(w => ({ word: w, category: 'qualities' }))
];

// 查找某个单词属于哪个 Ogden 类别
function getOgdenCategory(word) {
  const w = word.toLowerCase();
  const found = OGDEN_WORD_LIST.find(e => e.word === w);
  return found ? found.category : null;
}