// =========================================
// PUBLIC WEBSITE – Dynamic Data Loader
// =========================================
import { db, COLLECTIONS } from './firebase-config.js';
import {
  collection, getDocs, doc, getDoc, query, orderBy, where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// ── Load Site Settings ──
async function loadSettings() {
  try {
    const snap = await getDoc(doc(db, COLLECTIONS.SETTINGS, 'main'));
    if (snap.exists()) {
      const d = snap.data();
      if (d.phone)   { document.getElementById('sitePhone').textContent = d.phone; document.getElementById('footerPhone').textContent = d.phone; }
      if (d.phone2)  { document.getElementById('sitePhone2').textContent = d.phone2; }
      if (d.email)   { document.getElementById('siteEmail').textContent = d.email; document.getElementById('footerEmail').textContent = d.email; }
      if (d.address) { document.getElementById('siteAddress').textContent = d.address; document.getElementById('footerAddress').textContent = d.address; }
      if (d.heroImageUrl) {
        const heroEl = document.getElementById('heroBgImg');
        if (heroEl) heroEl.style.backgroundImage = `url('${d.heroImageUrl}')`;
      }
      if (d.checkin || d.checkout) {
        const timEl = document.getElementById('timings');
        if (timEl) timEl.textContent = `Check-in: ${d.checkin||'12:00 PM'} · Check-out: ${d.checkout||'11:00 AM'}`;
      }
      if (d.totalGuests) { document.getElementById('statGuests').textContent = d.totalGuests + '+'; }
    }
  } catch (e) { console.log('Settings not configured yet'); }
}

// ── Load Rooms ──
async function loadRooms() {
  const grid = document.getElementById('roomsGrid');
  try {
    const q = query(collection(db, COLLECTIONS.ROOMS), orderBy('order'));
    const snap = await getDocs(q);
    grid.innerHTML = '';

    if (snap.empty) {
      // Show default rooms if none in DB
      renderDefaultRooms(grid);
      return;
    }

    snap.forEach(docSnap => {
      const r = docSnap.data();
      grid.innerHTML += renderRoomCard(r);
    });
  } catch (e) {
    console.log('Loading default rooms:', e);
    renderDefaultRooms(grid);
  }
}

function renderRoomCard(r) {
  const imgHtml = r.imageUrl
    ? `<img src="${r.imageUrl}" alt="${r.name}" class="room-img" loading="lazy" />`
    : `<div class="room-img-placeholder">${r.emoji || '🛏️'}</div>`;

  const features = (r.features || []).map(f => `<span class="room-feature">${f}</span>`).join('');

  return `
    <div class="room-card">
      ${imgHtml}
      <div class="room-body">
        <span class="room-type">${r.type || 'Standard'}</span>
        <h3 class="room-name">${r.name}</h3>
        <p class="room-desc">${r.description || ''}</p>
        <div class="room-features">${features}</div>
        <div class="room-footer">
          <div class="room-price">₹${r.price || 'Call'}<span>/night</span></div>
          <div class="room-toilet">
            <strong>Toilet Options</strong>
            ${r.toiletOptions || 'Western & Indian'}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDefaultRooms(grid) {
  const defaultRooms = [
    {
      name: 'Single Cot Room', type: 'Single Occupancy', emoji: '🛏️',
      description: 'Cozy, well-maintained room perfect for solo travellers — business or leisure.',
      features: ['Single Bed', 'Hot Water', 'Fan/AC', 'WiFi', 'Attached Bath'],
      price: '350', toiletOptions: 'Western / Indian',
      imageUrl: ''
    },
    {
      name: 'Double Cot Room', type: 'Double Occupancy', emoji: '🛌',
      description: 'Spacious room with a double bed — ideal for couples or friends travelling together.',
      features: ['Double Bed', 'Hot Water', 'Fan/AC', 'WiFi', 'Attached Bath', 'TV'],
      price: '550', toiletOptions: 'Western / Indian',
      imageUrl: ''
    },
    {
      name: 'Deluxe Double Room', type: 'Deluxe', emoji: '🏨',
      description: 'Our premium offering with extra space, better furnishings, and enhanced amenities.',
      features: ['Double Bed', 'Hot Water', 'AC', 'WiFi', 'Smart TV', 'Mini-Fridge', 'Work Desk'],
      price: '750', toiletOptions: 'Western (Attached)',
      imageUrl: ''
    }
  ];
  defaultRooms.forEach(r => { grid.innerHTML += renderRoomCard(r); });
}

// ── Load Gallery ──
async function loadGallery() {
  const grid = document.getElementById('galleryGrid');
  try {
    const q = query(collection(db, COLLECTIONS.GALLERY), orderBy('order'));
    const snap = await getDocs(q);
    grid.innerHTML = '';

    if (snap.empty) {
      renderDefaultGallery(grid);
      return;
    }

    snap.forEach(docSnap => {
      const g = docSnap.data();
      grid.innerHTML += `
        <div class="gallery-item" onclick="openLightbox('${g.imageUrl}','${g.caption || ''}')">
          <img src="${g.imageUrl}" alt="${g.caption || 'Parichay Lodge'}" loading="lazy" />
        </div>
      `;
    });
  } catch (e) {
    renderDefaultGallery(grid);
  }
}

function renderDefaultGallery(grid) {
  const placeholders = [
    { emoji: '🏨', label: 'Lodge Exterior' },
    { emoji: '🛏️', label: 'Single Room' },
    { emoji: '🛌', label: 'Double Room' },
    { emoji: '🚿', label: 'Bathroom' },
    { emoji: '🛋️', label: 'Reception Area' },
    { emoji: '🌿', label: 'Common Area' }
  ];
  placeholders.forEach((p, i) => {
    grid.innerHTML += `
      <div class="gallery-item" style="background:var(--brown-light);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;">
        <span style="font-size:3rem">${p.emoji}</span>
        <span style="color:rgba(255,255,255,.6);font-size:.8rem;letter-spacing:.05em">${p.label}</span>
        <span style="color:rgba(255,255,255,.3);font-size:.7rem">Add photos via Admin Panel</span>
      </div>
    `;
  });
}

// ── Lightbox ──
window.openLightbox = function(url, caption) {
  document.getElementById('lightboxImg').src = url;
  document.getElementById('lightboxImg').alt = caption;
  document.getElementById('lightbox').classList.add('active');
};

// ── Init ──
loadSettings();
loadRooms();
loadGallery();
