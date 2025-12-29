const associations = [
  {
    id: 1,
    name: "Green Club Palma",
    location: "Palma",
    area: "palma",
    members: 250,
    founded: 2018,
    description: "Una de las asociaciones más establecidas de Mallorca con enfoque en comunidad y educación.",
    image: "",
    contact: "info@greenclubpalma.es",
    hours: "Lun-Dom: 10:00 - 22:00",
    address: "Calle Constitución, 45, Palma 07001"
  },
  {
    id: 2,
    name: "Cannabis Social Club Sóller",
    location: "Sóller",
    area: "soller",
    members: 180,
    founded: 2019,
    description: "Club íntimo en el hermoso pueblo de montaña con una atmósfera acogedora.",
    image: "",
    contact: "soller@cannabisclub.es",
    hours: "Mar-Dom: 15:00 - 23:00",
    address: "Carrer de Sa Lluna, 12, Sóller 07100"
  },
  {
    id: 3,
    name: "Alcúdia Green Society",
    location: "Alcúdia",
    area: "alcudia",
    members: 150,
    founded: 2020,
    description: "Asociación moderna en el norte de la isla con excelentes instalaciones.",
    image: "",
    contact: "hello@alcudigreen.com",
    hours: "Diariamente: 11:00 - 21:00",
    address: "Paseo Marítimo, 88, Alcúdia 07400"
  },
  {
    id: 4,
    name: "Andratx Cannabis Club",
    location: "Andratx",
    area: "andratx",
    members: 120,
    founded: 2021,
    description: "Club acogedor en la costa suroeste con vistas al mar espectaculares.",
    image: "",
    contact: "contact@andratxclub.es",
    hours: "Mié-Dom: 16:00 - 23:00",
    address: "Av. Almirante Laulhé, 25, Andratx 07157"
  },
  {
    id: 5,
    name: "Palma Central Cannabis",
    location: "Palma",
    area: "palma",
    members: 320,
    founded: 2017,
    description: "La asociación más grande de Palma con servicios premium y eventos.",
    image: "",
    contact: "premium@palmacentral.es",
    hours: "Diariamente: 09:00 - 23:00",
    address: "Paseo Mallorca, 50, Palma 07001"
  },
  {
    id: 6,
    name: "Beach Club Sóller",
    location: "Sóller",
    area: "soller",
    members: 200,
    founded: 2020,
    description: "Ubicación perfecta cerca de la playa de Sóller con vibes mediterráneas relajadas.",
    image: "",
    contact: "beach@soller.club",
    hours: "Diariamente: 12:00 - 22:00",
    address: "Paseo Es Través, 8, Sóller 07100"
  }
];

let currentFilter = 'all';
let filteredAssociations = associations;

// ==================== MOSTRAR ASOCIACIONES ====================
function displayAssociations(list) {
  const grid = document.getElementById('associationsGrid');
  const empty = document.getElementById('emptyState');

  if (list.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  grid.innerHTML = list.map(assoc => `
    <div class="association-card">
      <div class="card-image-wrapper">
        <img class="card-image" src="images/club.jpg" alt="${assoc.name}">
      </div>
      <div class="card-header">
        <h3>${assoc.name}</h3>
        <div class="card-location">📍 ${assoc.location}</div>
      </div>
      <div class="card-body">
        <div class="card-info">
          <div class="info-item">
            <div class="info-label">Miembros</div>
            <div class="info-value">${assoc.members}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Desde</div>
            <div class="info-value">${assoc.founded}</div>
          </div>
        </div>
        <div class="description">${assoc.description}</div>
      </div>
      <div class="card-footer">
        <button class="btn btn-info" onclick="showInfo(${assoc.id})">Más Info</button>
        <button class="btn btn-join" onclick="showJoinForm(${assoc.id})">Solicitar Ingreso</button>
      </div>
    </div>
  `).join('');
}

// ==================== BÚSQUEDA Y FILTROS ====================
function searchAssociations() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  filteredAssociations = associations.filter(a =>
    a.name.toLowerCase().includes(query) ||
    a.location.toLowerCase().includes(query)
  );
  if (currentFilter !== 'all') {
    filteredAssociations = filteredAssociations.filter(a => a.area === currentFilter);
  }
  displayAssociations(filteredAssociations);
}

function filterByType(element, type) {
  document.querySelectorAll('.filter-tag').forEach(tag => tag.classList.remove('active'));
  element.classList.add('active');
  currentFilter = type;

  if (type === 'all') {
    filteredAssociations = associations;
  } else {
    filteredAssociations = associations.filter(a => a.area === type);
  }
  searchAssociations(); // Respeta la búsqueda actual
}

// ==================== MODAL INFO ====================
function showInfo(id) {
  const assoc = associations.find(a => a.id === id);
  document.getElementById('infoTitle').textContent = assoc.name;
  document.getElementById('infoBody').innerHTML = `
    <div class="association-info">
      <div class="info-label">Descripción</div>
      <div class="info-value">${assoc.description}</div>
    </div>
    <div class="association-info" style="margin-top: 20px;">
      <div class="info-label">Dirección</div>
      <div class="info-value">${assoc.address}</div>
    </div>
    <div class="association-info" style="margin-top: 20px;">
      <div class="info-label">Contacto</div>
      <div class="info-value"><a href="mailto:${assoc.contact}" style="color: #4ade80; text-decoration: none; font-weight: 600;">${assoc.contact}</a></div>
    </div>
    <div class="association-info" style="margin-top: 20px;">
      <div class="info-label">Horario</div>
      <div class="info-value">${assoc.hours}</div>
    </div>
    <div class="association-info" style="margin-top: 20px;">
      <div class="info-label">Miembros</div>
      <div class="info-value">${assoc.members}</div>
    </div>
  `;
  document.getElementById('infoModal').classList.add('active');
}

function closeInfoModal() {
  document.getElementById('infoModal').classList.remove('active');
}

// ==================== MODAL SOLICITUD DE INGRESO ====================
function showJoinForm(id) {
  const assoc = associations.find(a => a.id === id);
  if (!assoc) return;

  // Actualizar título del modal
  const titleElement = document.getElementById('joinModalTitle');
const baseText = translations[currentLang]?.joinRequest || 'Join Request to';
titleElement.textContent = baseText + ' ' + assoc.name;

  // Rellenar el campo oculto para EmailJS
  document.getElementById('associationNameHidden').value = assoc.name;

  // Guardar el ID en el formulario (por si lo necesitas más adelante)
  document.getElementById('joinForm').dataset.associationId = id;

  // Limpiar campos visibles
  document.getElementById('joinForm').reset();

  // Mostrar el modal
  document.getElementById('joinModal').classList.add('active');
}

function closeJoinModal() {
  document.getElementById('joinModal').classList.remove('active');
}

// ==================== ENVÍO CON EMAILJS ====================

function submitContactForm(e) {
  e.preventDefault();

  const serviceID = 'service_qkkypnn';
  const templateID = 'template_pqsewd4';

  emailjs.sendForm(serviceID, templateID, '#contactForm')
    .then(() => {
      alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
      document.getElementById('contactForm').reset();
    })
    .catch((error) => {
      alert('Error al enviar el mensaje. Inténtalo más tarde.');
      console.error('EmailJS error:', error);
    });
}

function submitJoinForm(e) {
  e.preventDefault();

  const serviceID = 'service_qkkypnn';
  const templateID = 'template_pqsewd4';

  emailjs.sendForm(serviceID, templateID, '#joinForm')
    .then(() => {
      const assocName = document.getElementById('associationNameHidden').value;
      alert('¡Gracias! Tu solicitud ha sido enviada a ' + assocName + '. Te contactarán pronto.');
      closeJoinModal();
    })
    .catch((error) => {
      alert('Error al enviar la solicitud. Inténtalo más tarde.');
      console.error('EmailJS error:', error);
    });
}

// ==================== NAVEGACIÓN ====================
function navigateTo(section) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(section).classList.add('active');

  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  document.querySelector(`[data-section="${section}"]`).classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToInfo() {
  const infoSection = document.querySelector('.about-grid');
  infoSection.scrollIntoView({ behavior: 'smooth' });
}

// ==================== CIERRE MODALES AL CLIC FUERA ====================
window.onclick = function(event) {
  const infoModal = document.getElementById('infoModal');
  const joinModal = document.getElementById('joinModal');
  if (event.target === infoModal) closeInfoModal();
  if (event.target === joinModal) closeJoinModal();
}

// ==================== EVENTOS NAVEGACIÓN ====================
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const section = link.dataset.section;
    navigateTo(section);
  });
});

// ==================== INICIALIZACIÓN ====================
displayAssociations(associations);