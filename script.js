/* ================= data ================= */
// ใส่รูปตึกของคุณเอง: สร้างโฟลเดอร์ images/buildings/ แล้ววางไฟล์ชื่อ "<id>.jpg" ตรงกับเลข id ของแต่ละอาคารด้านล่าง
// เช่น อาคาร id 1 (หอสมุดฯ) -> images/buildings/1.jpg
// ถ้ายังไม่มีรูปสำหรับอาคารไหน ระบบจะโชว์ไอคอนวาดแทนให้อัตโนมัติ ไม่ต้องแก้โค้ดเพิ่ม
const CENTER = [9.0280, 99.3190]; // มหาวิทยาลัยราชภัฏสุราษฎร์ธานี ต.ขุนทะเล (ค่าประมาณ)

// [id, name, type, roof, lat, lng]
const RAW = [
  [1,  "หอสมุดและศูนย์สารสนเทศ",                                  "office",  "flat",  9.0283, 99.3175],
  [2,  "สนามกีฬากลาง",                                            "sport",   "arch",  9.0305, 99.3210],
  [3,  "หอประชุมวชิราลงกรณ",                                      "hall",    "dome",  9.0300, 99.3180],
  [4,  "อาคารเฉลิมพระเกียรติ 84 พรรษา (คณะมนุษยศาสตร์และสังคมศาสตร์)", "faculty", "gable", 9.0265, 99.3185],
  [5,  "คณะวิทยาศาสตร์และเทคโนโลยี อาคาร 1",                        "faculty", "stepped",9.0295, 99.3195],
  [6,  "คณะครุศาสตร์",                                            "faculty", "gable", 9.0287, 99.3182],
  [7,  "คณะวิทยาการจัดการ อาคาร 1",                                "faculty", "flat",  9.0273, 99.3198],
  [8,  "คณะวิทยาการจัดการ อาคาร 2",                                "faculty", "flat",  9.0271, 99.3202],
  [9,  "อาคารทีปังกรรัศมีโชติ",                                    "faculty", "stepped",9.0268, 99.3180],
  [10, "อาคาร 5 กาญจนาภิเษกอนุสรณ์",                               "faculty", "gable", 9.0270, 99.3176],
  [11, "อาคารสำนักงานอธิการบดี",                                   "office",  "flat",  9.0280, 99.3190],
  [12, "วิทยาลัยนานาชาติและการท่องเที่ยว",                          "faculty", "stepped",9.0293, 99.3208],
  [13, "คณะพยาบาลศาสตร์ (บัณฑิตวิทยาลัย)",                          "faculty", "gable", 9.0260, 99.3200],
  [14, "คณะนิติศาสตร์",                                           "faculty", "flat",  9.0290, 99.3205],
  [15, "อาคาร 80 พรรษา",                                          "faculty", "gable", 9.0272, 99.3172],
  [16, "อาคารสำนักงานอธิการบดี (หลังใหม่)",                        "office",  "flat",  9.0278, 99.3193],
  [17, "โรงยิมเนเซียม",                                           "sport",   "arch",  9.0253, 99.3178],
  [18, "สำนักทรัพย์สินและสิทธิประโยชน์",                            "office",  "flat",  9.0276, 99.3188],
  [19, "สระว่ายน้ำกรดเกล้า",                                       "sport",   "arch",  9.0250, 99.3182],
  [20, "สนามฟุตซอล",                                              "sport",   "arch",  9.0248, 99.3175],
  [21, "โรงอาหารและร้านค้า",                                       "other",   "flat",  9.0278, 99.3183],
  [22, "คณะวิทยาการจัดการ (อาคารใหม่)",                            "faculty", "stepped",9.0269, 99.3205],
  [23, "อาคารวิทยาศาสตร์สุขภาพ",                                   "faculty", "gable", 9.0300, 99.3193],
  [24, "อาคารสโมสรนักศึกษา",                                       "hall",    "dome",  9.0277, 99.3168],
  [25, "อาคารบูรณาการ",                                           "faculty", "flat",  9.0263, 99.3190],
  [26, "อาคารสุนทรียศาสตร์",                                       "faculty", "gable", 9.0264, 99.3196],
  [27, "ศูนย์วิทยาศาสตร์",                                         "faculty", "stepped",9.0298, 99.3198],
  [28, "อาคารกิจกรรมนักศึกษา",                                     "hall",    "dome",  9.0275, 99.3170],
  [29, "สนามวอลเลย์บอลชายหาด/เปตอง",                                "sport",   "arch",  9.0251, 99.3170],
  [30, "อาคารวิทยาศาสตร์และเทคโนโลยีการอาหาร",                      "faculty", "gable", 9.0303, 99.3190],
  [31, "อาคารปฏิบัติการเพาะเลี้ยงสัตว์น้ำ",                          "faculty", "flat",  9.0306, 99.3187],
  [32, "อาคารเกษตร",                                              "faculty", "gable", 9.0308, 99.3183],
  [33, "อาคารหอพระพุทธทาสธรรมโฆษณ์",                                "other",   "spire", 9.0287, 99.3165],
  [34, "อาคารปฏิบัติการสัตวศาสตร์",                                 "faculty", "flat",  9.0305, 99.3180],
  [35, "อาคารคณะครุศาสตร์ (ใหม่)",                                  "faculty", "stepped",9.0289, 99.3178],
  [36, "กลุ่มอาคารบูรณาการ",                                       "faculty", "flat",  9.0261, 99.3193],
  [37, "กลุ่มอาคารหอพักชาย",                                       "dorm",    "twin",  9.0243, 99.3165],
  [38, "กลุ่มอาคารหอพักหญิง",                                      "dorm",    "twin",  9.0240, 99.3170],
  [39, "ศาลาหลวงพ่อโสธร",                                          "other",   "spire", 9.0285, 99.3162],
  [40, "อาคารฟิตเนส 🏋️",                                          "sport",   "arch",  9.0255, 99.3174],
  [41, "อาคารพัสดุ (เก่า)",                                        "office",  "flat",  9.0274, 99.3185],
  [42, "อาคาร ช.6",                                               "office",  "flat",  9.0282, 99.3186],
];

const buildings = RAW.map(([id,name,type,roof,lat,lng])=>({
  id, name, type, roof, lat, lng,
  lot: "ลานจอดรถ " + name.replace(/\s*🏋️\s*/,'')
}));

const TYPE_META = {
  faculty:{ label:"คณะ",         color:"#2E7FC1" },
  office: { label:"สำนัก/บริหาร", color:"#0A2E52" },
  hall:   { label:"หอประชุม",     color:"#C62828" },
  sport:  { label:"กีฬา",         color:"#E0653F" },
  dorm:   { label:"หอพัก",        color:"#5C7A99" },
  other:  { label:"อื่นๆ",        color:"#8A7B68" },
};

document.getElementById('statTotal').textContent = buildings.length;

/* ================= svg illustration ================= */
function buildingSVG(b){
  const c = TYPE_META[b.type].color;
  let roofShape = "";
  switch(b.roof){
    case "gable":
      roofShape = `<polygon points="18,44 48,20 78,44" fill="${c}"/>`;
      break;
    case "dome":
      roofShape = `<circle cx="48" cy="30" r="17" fill="${c}"/>`;
      break;
    case "stepped":
      roofShape = `<rect x="30" y="18" width="36" height="10" fill="${c}"/><rect x="24" y="28" width="48" height="8" fill="${c}"/>`;
      break;
    case "arch":
      roofShape = `<path d="M20 40 Q48 12 76 40 Z" fill="${c}"/>`;
      break;
    case "twin":
      roofShape = `<rect x="20" y="16" width="16" height="24" fill="${c}"/><rect x="60" y="16" width="16" height="24" fill="${c}"/>`;
      break;
    case "spire":
      roofShape = `<polygon points="48,10 58,36 38,36" fill="${c}"/><polygon points="48,4 52,14 44,14" fill="${c}"/>`;
      break;
    default:
      roofShape = `<rect x="20" y="26" width="56" height="10" fill="${c}"/>`;
  }
  return `
  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" fill="#F3EFE6"/>
    <rect x="0" y="70" width="96" height="26" fill="#E8E0CF"/>
    ${roofShape}
    <rect x="22" y="36" width="52" height="40" rx="2" fill="#FFFFFF" stroke="${c}" stroke-width="2"/>
    <rect x="30" y="44" width="8" height="10" fill="${c}" opacity=".55"/>
    <rect x="44" y="44" width="8" height="10" fill="${c}" opacity=".55"/>
    <rect x="58" y="44" width="8" height="10" fill="${c}" opacity=".55"/>
    <rect x="30" y="60" width="8" height="10" fill="${c}" opacity=".55"/>
    <rect x="58" y="60" width="8" height="16" fill="${c}" opacity=".85"/>
    <rect x="0" y="78" width="96" height="18" fill="#1C222B" opacity=".85"/>
    <rect x="6" y="85" width="10" height="3" fill="#F3EFE6"/>
    <rect x="22" y="85" width="10" height="3" fill="#F3EFE6"/>
    <rect x="38" y="85" width="10" height="3" fill="#F3EFE6"/>
    <g transform="translate(52,80)">
      <rect x="0" y="4" width="16" height="7" rx="2" fill="${c}"/>
      <rect x="2" y="0" width="12" height="5" rx="1.5" fill="${c}"/>
      <circle cx="3.5" cy="11" r="1.6" fill="#1C222B"/>
      <circle cx="12.5" cy="11" r="1.6" fill="#1C222B"/>
    </g>
    <g transform="translate(72,80)">
      <rect x="0" y="4" width="16" height="7" rx="2" fill="#FFFFFF" stroke="${c}" stroke-width="1.4"/>
      <rect x="2" y="0" width="12" height="5" rx="1.5" fill="#FFFFFF" stroke="${c}" stroke-width="1.4"/>
      <circle cx="3.5" cy="11" r="1.6" fill="${c}"/>
      <circle cx="12.5" cy="11" r="1.6" fill="${c}"/>
    </g>
  </svg>`;
}

/* ================= map setup ================= */
const map = L.map('map', { scrollWheelZoom:false }).setView(CENTER, 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom:19, attribution:'&copy; OpenStreetMap contributors'
}).addTo(map);

function pinIcon(color){
  return L.divIcon({
    className:'',
    html:`<svg width="28" height="36" viewBox="0 0 30 38" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 23 15 23s15-12.5 15-23C30 6.7 23.3 0 15 0z" fill="${color}"/>
      <circle cx="15" cy="15" r="7" fill="#FFFFFF"/>
      <text x="15" y="19.5" font-size="10" font-family="Kanit,sans-serif" font-weight="700" text-anchor="middle" fill="${color}">P</text>
    </svg>`,
    iconSize:[28,36], iconAnchor:[14,36], popupAnchor:[0,-32]
  });
}

const markers = {};
buildings.forEach(b=>{
  const marker = L.marker([b.lat,b.lng], { icon: pinIcon(TYPE_META[b.type].color) }).addTo(map);
  const gmaps = `https://www.google.com/maps?q=${b.lat},${b.lng}`;
  marker.bindPopup(`
    <div class="popup-title">${b.lot}</div>
    <div class="popup-sub">${b.name} &middot; พิกัดค่าประมาณ</div>
    <a class="popup-link" href="${gmaps}" target="_blank" rel="noopener">เปิดใน Google Maps →</a>
  `);
  markers[b.id] = marker;
});

/* ================= cards ================= */
const cardList = document.getElementById('cardList');
const countLabel = document.getElementById('countLabel');
let activeFilter = 'all';
let selectedId = null;
let currentQuery = '';

function tagHTML(type){
  const m = TYPE_META[type];
  return `<span class="tag" style="background:${m.color}22; color:${m.color}">${m.label}</span>`;
}

function matchesQuery(b, q){
  if(!q) return true;
  return b.name.toLowerCase().includes(q) || b.lot.toLowerCase().includes(q);
}

function render(){
  const q = currentQuery.trim().toLowerCase();
  let list = buildings.filter(b=>{
    const matchType = activeFilter==='all' || b.type===activeFilter;
    return matchType && matchesQuery(b, q);
  });

  countLabel.textContent = list.length + ' แห่ง';

  if(list.length===0){
    cardList.innerHTML = `<div class="empty">ไม่พบอาคารที่ตรงกับคำค้นหา ลองพิมพ์ชื่อคณะหรือหน่วยงานอื่น</div>`;
    return;
  }

  cardList.innerHTML = list.map((b,i)=>{
    const gmaps = `https://www.google.com/maps?q=${b.lat},${b.lng}`;
    return `
    <div class="card ${b.id===selectedId?'selected':''}" data-id="${b.id}" style="animation-delay:${Math.min(i*25,300)}ms">
      <div class="thumb">
        <img src="images/buildings/${b.id}.jpg" alt="${b.name}" loading="lazy" onerror="this.closest('.thumb').classList.add('no-photo')">
        <div class="thumb-fallback">${buildingSVG(b)}</div>
      </div>
      <div class="card-body">
        <div class="card-top">
          <h3>${b.name}</h3>
          ${tagHTML(b.type)}
        </div>
        <div class="lot-name">${b.lot}</div>
        <div class="card-actions">
          <button class="btn-ghost" data-fly="${b.id}">ดูบนแผนที่</button>
          <a class="btn-map" href="${gmaps}" target="_blank" rel="noopener">เปิด Google Maps</a>
        </div>
      </div>
    </div>`;
  }).join('');
}

function selectBuilding(id, {closeDropdowns=true} = {}){
  selectedId = id;
  const b = buildings.find(x=>x.id===id);
  if(!b) return;
  map.flyTo([b.lat,b.lng], 18, { duration:0.8 });
  markers[id].openPopup();
  render();
  if(closeDropdowns){ closeAC(acTopEl); closeAC(acHeroEl); }
  if(window.matchMedia('(max-width:880px)').matches){
    document.getElementById('map').scrollIntoView({behavior:'smooth', block:'center'});
  }
}

cardList.addEventListener('click', (e)=>{
  const card = e.target.closest('.card');
  if(!card) return;
  selectBuilding(Number(card.dataset.id));
});

document.getElementById('chipbar').addEventListener('click', (e)=>{
  const chip = e.target.closest('.chip');
  if(!chip) return;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  chip.classList.add('active');
  activeFilter = chip.dataset.filter;
  render();
});

/* ================= autocomplete ================= */
const acTopEl = document.getElementById('acTop');
const acHeroEl = document.getElementById('acHero');

function highlight(name, q){
  if(!q) return name;
  const idx = name.toLowerCase().indexOf(q);
  if(idx===-1) return name;
  return name.slice(0,idx) + '<mark>' + name.slice(idx,idx+q.length) + '</mark>' + name.slice(idx+q.length);
}

function buildSuggestions(q){
  const query = q.trim().toLowerCase();
  if(!query) return [];
  return buildings.filter(b=> b.name.toLowerCase().includes(query) || b.lot.toLowerCase().includes(query)).slice(0,8);
}

function openAC(listEl){ listEl.classList.add('show'); }
function closeAC(listEl){ listEl.classList.remove('show'); listEl.innerHTML=''; }

function renderAC(inputEl, listEl, q){
  const items = buildSuggestions(q);
  if(items.length===0){
    listEl.innerHTML = `<div class="ac-empty">ไม่พบอาคารที่ตรงกับ "${q}"</div>`;
    openAC(listEl);
    return;
  }
  const query = q.trim().toLowerCase();
  listEl.innerHTML = items.map((b,i)=>`
    <div class="ac-item" data-id="${b.id}" data-index="${i}">
      <span class="ac-dot" style="background:${TYPE_META[b.type].color}"></span>
      <span class="ac-name">${highlight(b.name, query)}</span>
      <span class="ac-sub">${TYPE_META[b.type].label}</span>
    </div>
  `).join('');
  openAC(listEl);
}

function wireAutocomplete(inputEl, listEl, wrapEl){
  let activeIndex = -1;

  function setActive(idx){
    const items = listEl.querySelectorAll('.ac-item');
    items.forEach(el=>el.classList.remove('active'));
    if(items[idx]){
      items[idx].classList.add('active');
      items[idx].scrollIntoView({block:'nearest'});
    }
    activeIndex = idx;
  }

  inputEl.addEventListener('input', ()=>{
    currentQuery = inputEl.value;
    activeIndex = -1;
    renderAC(inputEl, listEl, inputEl.value);
    render();
  });

  inputEl.addEventListener('focus', ()=>{
    if(inputEl.value.trim()) renderAC(inputEl, listEl, inputEl.value);
  });

  inputEl.addEventListener('keydown', (e)=>{
    const items = listEl.querySelectorAll('.ac-item');
    if(e.key==='ArrowDown'){
      e.preventDefault();
      if(items.length) setActive((activeIndex+1) % items.length);
    } else if(e.key==='ArrowUp'){
      e.preventDefault();
      if(items.length) setActive((activeIndex-1+items.length) % items.length);
    } else if(e.key==='Enter'){
      e.preventDefault();
      if(activeIndex>=0 && items[activeIndex]){
        const id = Number(items[activeIndex].dataset.id);
        inputEl.value = buildings.find(b=>b.id===id).name;
        currentQuery = inputEl.value;
        selectBuilding(id);
      } else {
        currentQuery = inputEl.value;
        render();
        closeAC(listEl);
      }
    } else if(e.key==='Escape'){
      closeAC(listEl);
    }
  });

  listEl.addEventListener('click', (e)=>{
    const item = e.target.closest('.ac-item');
    if(!item) return;
    const id = Number(item.dataset.id);
    if(!id) return;
    inputEl.value = buildings.find(b=>b.id===id).name;
    currentQuery = inputEl.value;
    selectBuilding(id);
  });

  document.addEventListener('click', (e)=>{
    if(!wrapEl.contains(e.target)) closeAC(listEl);
  });
}

wireAutocomplete(document.getElementById('searchTop'), acTopEl, document.getElementById('topWrap'));
wireAutocomplete(document.getElementById('searchHero'), acHeroEl, document.getElementById('heroWrap'));

document.getElementById('heroBtn').addEventListener('click', ()=>{
  currentQuery = document.getElementById('searchHero').value;
  document.getElementById('searchTop').value = currentQuery;
  render();
  closeAC(acHeroEl);
});

render();
