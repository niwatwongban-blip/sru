
const CENTER = [9.0280, 99.3190];

const RAW = [
  [1,  "หอสมุดและศูนย์สารสนเทศ",                                  "office",  "flat",  9.083845, 99.360601],
  [2,  "สนามกีฬากลาง",                                            "sport",   "arch",  9.080911, 99.364100],
  [3,  "หอประชุมวชิราลงกรณ",                                      "hall",    "dome",  9.085984, 99.364143],
  [4,  "อาคารเฉลิมพระเกียรติ 84 พรรษา (คณะมนุษยศาสตร์และสังคมศาสตร์)", "faculty", "gable", 9.082066115107883, 99.36514638160467],
  [5,  "คณะวิทยาศาสตร์และเทคโนโลยี อาคาร 1",                        "faculty", "stepped", 9.084544, 99.366772],
  [6,  "คณะครุศาสตร์",                                            "faculty", "gable", 9.082384, 99.366925],
  [7,  "คณะวิทยาการจัดการ",                                "faculty", "flat", 9.086120836412496, 99.36230354205274],
  [9,  "อาคารทีปังกรรัศมีโชติ",                                    "faculty", "stepped",9.083018, 99.365572],
  [10, "โรงเรียนสาธิตแห่งมหาวิทยาลัยราชภัฏสุราษฎร์ธานี (Satit SRU)",     "faculty", "gable", 9.083050, 99.362720],
  [11, "อาคารสำนักงานอธิการบดี",                                   "office",  "flat",  9.078017, 99.362681],
  [12, "วิทยาลัยนานาชาติและการท่องเที่ยว",                          "faculty", "stepped",9.082355, 99.363679],
  [13, "คณะพยาบาลศาสตร์ ",                          "faculty", "gable", 9.080435, 99.363422],
  [14, "คณะนิติศาสตร์",                                           "faculty", "flat",  9.079536, 99.362697],
  [15, "อาคาร 80 พรรษา",                                          "faculty", "gable", 9.078316, 99.363618],
  [16, "อาคารสำนักงานอธิการบดี ",                        "office",  "flat",  9.077933, 99.362784],
  [19, "สระว่ายน้ำกรดเกล้า",                                       "sport",   "arch",  9.079944, 99.362294],
  [20, "สนามฟุตซอล",                                              "sport",   "arch",  9.084360, 99.367383],
  [21, "ศูนย์อาหาร SRU",                                       "other",   "flat",  9.085584, 99.361819],
  [23, "อาคารวิทยาศาสตร์สุขภาพ",                                   "faculty", "gable", 9.085287290055746, 99.3633149594534],
  //แก้ถึงนี้
  [26, "อาคารสุนทรียศาสตร์",                                       "faculty", "gable", 9.087893, 99.363433],
  [27, "ศูนย์วิทยาศาสตร์",                                         "faculty", "stepped",9.085891, 99.365241],
  [28, "อาคารกิจกรรมนักศึกษา",                                     "hall",    "dome", 9.084119, 99.363595],
  [29, "สนามวอลเลย์บอลชายหาด/เปตอง",                                "sport",   "arch", 9.086951, 99.362692],
  [31, "อาคารปฏิบัติการเพาะเลี้ยงสัตว์น้ำ",                          "faculty", "flat",  9.082499, 99.366928],
  [37, "กลุ่มอาคารหอพักชาย",                                       "dorm",    "twin",  9.085051, 99.362247],
  [38, "กลุ่มอาคารหอพักหญิง",                                      "dorm",    "twin",  9.083922, 99.361769],
  [39, "ศาลาหลวงพ่อโสธร",                                          "other",   "spire", 9.08179871327948, 99.363934180648],
  [40, "อาคารฟิตเนส 🏋️",                                          "sport",   "arch",  9.078976998722469, 99.36388457338337],
  [41, "อาคารพัสดุ (เก่า)",                                        "office",  "flat", 9.084024, 99.362183],
];

const CAPACITY_BASE = { faculty:70, office:36, hall:110, sport:55, dorm:48, other:26 };

const buildings = RAW.map(([id,name,type,roof,lat,lng])=>({
  id, name, type, roof, lat, lng,
  lot: "ลานจอดรถ " + name.replace(/\s*🏋️\s*/,''),

  accessType: type==='office' ? 'staff' : 'general',
  accessibleSlots: 2 + (id % 3), 
}));

const TYPE_META = {
  faculty:{ label:"คณะ",         color:"#2E7FC1" },
  office: { label:"สำนัก/บริหาร", color:"#0A2E52" },
  hall:   { label:"หอประชุม",     color:"#C62828" },
  sport:  { label:"กีฬา",         color:"#E0653F" },
  dorm:   { label:"หอพัก",        color:"#5C7A99" },
  other:  { label:"อื่นๆ",        color:"#8A7B68" },
};

const STATUS_META = {
  ok:     { label:"ว่างมาก",     color:"#2E9E5B" },
  warn:   { label:"ใกล้เต็ม",    color:"#D98F26" },
  full:   { label:"เต็ม",        color:"#C62828" },
  closed: { label:"ปิดปรับปรุง", color:"#8A93A0" },
};

document.getElementById('statTotal').textContent = buildings.length;

/* ================= mock live occupancy =================
   ไม่มีเซ็นเซอร์จริง ระบบจึงจำลองความหนาแน่นของแต่ละลานจอดแบบ deterministic
   (สุ่มแบบมี seed) เพื่อสาธิต UI เท่านั้น — เมื่อมีข้อมูลจริงจาก API ให้แทนที่
   ฟังก์ชัน computeOccupancy() ด้วยการเรียก API แทน */
let simEpoch = 0; // เพิ่มค่านี้ทุกครั้งที่กด "อัปเดตข้อมูล" เพื่อสุ่มค่าตำแหน่งใหม่

function mulberry32(seed){
  return function(){
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function computeOccupancy(b){
  const total = Math.round(CAPACITY_BASE[b.type] * (0.75 + mulberry32(b.id * 7 + 1)() * 0.6));
  const rand = mulberry32(b.id * 97 + simEpoch * 733 + 11);
  const isClosed = mulberry32(b.id * 31 + 13)() < (simEpoch % 2 === 0 ? 0.035 : 0.02);
  if(isClosed){
    return { total, occupied: total, pct: 100, status:'closed' };
  }
  const pct = Math.round(rand() * 100);
  let status = 'ok';
  if(pct >= 90) status = 'full';
  else if(pct >= 65) status = 'warn';
  const occupied = Math.min(total, Math.round(total * pct/100));
  return { total, occupied, pct, status };
}

function refreshOccupancy(){
  buildings.forEach(b=>{ b.occ = computeOccupancy(b); });
}
refreshOccupancy();

function haversine(lat1,lng1,lat2,lng2){
  const R = 6371000, toRad = d=>d*Math.PI/180;
  const dLat = toRad(lat2-lat1), dLng = toRad(lng2-lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(a));
}


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

function popupHTML(b){
  const gmaps = `https://www.google.com/maps?q=${b.lat},${b.lng}`;
  return `
    <div class="popup-title">${b.lot}</div>
    <div class="popup-sub">${b.name} &middot; พิกัดค่าประมาณ</div>
    <a class="popup-link" href="${gmaps}" target="_blank" rel="noopener">เปิดใน Google Maps →</a>
  `;
}

const markers = {};
buildings.forEach(b=>{
  const marker = L.marker([b.lat,b.lng], { icon: pinIcon(TYPE_META[b.type].color) }).addTo(map);
  marker.bindPopup(popupHTML(b));
  marker.on('click', ()=> selectBuilding(b.id, { closeDropdowns:false, fly:false }));
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

function badgesHTML(b){
  const accessBadge = b.accessType==='staff'
    ? `<span class="badge staff">อื่นๆ</span>`
    : `<span class="badge">👤 นักศึกษา/ผู้มาติดต่อ</span>`;
  const accessible = `<span class="badge access">♿ ${b.accessibleSlots} ช่อง</span>`;
  return `<div class="badges">${accessBadge}${accessible}</div>`;
}

// หาลานจอดสำรองที่ใกล้ที่สุดซึ่งยังว่าง เมื่อลานที่เลือก "เต็ม" หรือ "ปิดปรับปรุง"
function findAlternative(b){
  return buildings
    .filter(x=> x.id!==b.id && (x.occ.status==='ok' || x.occ.status==='warn'))
    .map(x=> ({ b:x, dist: haversine(b.lat,b.lng,x.lat,x.lng) }))
    .sort((a,c)=> a.dist-c.dist)[0];
}

function suggestBoxHTML(b){
  if(b.occ.status!=='full' && b.occ.status!=='closed') return '';
  const alt = findAlternative(b);
  if(!alt) return '';
  const distText = alt.dist >= 1000 ? (alt.dist/1000).toFixed(1)+' กม.' : Math.round(alt.dist)+' ม.';
  const verb = b.occ.status==='closed' ? 'ปิดปรับปรุงอยู่' : 'เต็มแล้ว';
  return `
    <div class="suggest-box">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
      <span>${b.lot} ${verb} ขอแนะนำ <b>${alt.b.lot}</b> (ห่างออกไปประมาณ ${distText})</span>
      <button data-fly="${alt.b.id}">ไปลานจอดนี้</button>
    </div>`;
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
    const selected = b.id===selectedId;
    return `
    <div class="card ${selected?'selected':''}" data-id="${b.id}" style="animation-delay:${Math.min(i*25,300)}ms">
      <div class="thumb">
        <img src="gaygustgym/560000008228601${b.id}.jpg" alt="${b.name}" loading="lazy" onerror="this.closest('.thumb').classList.add('no-photo')">
        <div class="thumb-fallback">${buildingSVG(b)}</div>
      </div>
      <div class="card-body">
        <div class="card-top">
          <h3>${b.name}</h3>
          ${tagHTML(b.type)}
        </div>
        <div class="lot-name">${b.lot}</div>
        ${badgesHTML(b)}
        <div class="card-actions">
          <button class="btn-ghost" data-fly="${b.id}">ดูบนแผนที่</button>
          <button class="btn-locate" data-locate="${b.id}">📍 นำทางจากตำแหน่งฉัน</button>
          <a class="btn-map" href="${gmaps}" target="_blank" rel="noopener">เปิด Google Maps</a>
        </div>
      </div>
    </div>
    ${selected ? suggestBoxHTML(b) : ''}`;
  }).join('');
}

function selectBuilding(id, {closeDropdowns=true, fly=true} = {}){
  selectedId = id;
  const b = buildings.find(x=>x.id===id);
  if(!b) return;
  if(fly) map.flyTo([b.lat,b.lng], 18, { duration:0.8 });
  markers[id].openPopup();
  render();
  if(closeDropdowns){ closeAC(acTopEl); closeAC(acHeroEl); }
  if(window.matchMedia('(max-width:880px)').matches){
    document.getElementById('map').scrollIntoView({behavior:'smooth', block:'center'});
  }
}

function openLiveRoute(b, btn){
  const destination = `${b.lat},${b.lng}`;
  const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
  if(!navigator.geolocation){
    window.open(fallbackUrl, '_blank', 'noopener');
    return;
  }
  if(btn) btn.classList.add('loading');
  navigator.geolocation.getCurrentPosition(
    (pos)=>{
      const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
      window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`, '_blank', 'noopener');
      if(btn) btn.classList.remove('loading');
    },
    ()=>{
    
      window.open(fallbackUrl, '_blank', 'noopener');
      if(btn) btn.classList.remove('loading');
    },
    { timeout:8000 }
  );
}

cardList.addEventListener('click', (e)=>{
  const locateBtn = e.target.closest('[data-locate]');
  if(locateBtn){
    const b = buildings.find(x=>x.id===Number(locateBtn.dataset.locate));
    if(b) openLiveRoute(b, locateBtn);
    return;
  }
  const flyBtn = e.target.closest('[data-fly]');
  if(flyBtn){
    selectBuilding(Number(flyBtn.dataset.fly));
    return;
  }
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
