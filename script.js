/* script.js */

document.addEventListener("DOMContentLoaded", function () {
  const titleMain = document.querySelector('.title-main');
  if (titleMain) {
    titleMain.classList.add('fall-animation');
    titleMain.setAttribute('data-content', titleMain.textContent);
  }

  const sections = {
    'calendar-section': document.getElementById('calendar-section'),
    'wellness-section': document.getElementById('wellness-section'),
    'contact-volunteer': document.getElementById('contact-volunteer')
  };

  const mainMenu = document.getElementById('main-menu');
  const messageBox = document.getElementById('message');
  const emojiPicker = document.getElementById('emoji-picker');
  let currentDay = null;

  function showSection(sectionId) {
    Object.values(sections).forEach(sec => sec.classList.add('hidden'));
    mainMenu.classList.add('hidden');
    sections[sectionId].classList.remove('hidden');
    if (sectionId === 'calendar-section') generateCalendar();
  }

  function backToMenu() {
    Object.values(sections).forEach(sec => sec.classList.add('hidden'));
    mainMenu.classList.remove('hidden');
  }

  document.querySelectorAll('.back-to-menu').forEach(btn => {
    btn.addEventListener('click', backToMenu);
  });

  // CALENDARIO EMOCIONAL
  const calendar = document.getElementById('calendar');
  const monthSelect = document.getElementById('month-select');
  const yearSelect = document.getElementById('year-select');
  const now = new Date();
  const currentYear = now.getFullYear();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  for (let m = 0; m < 12; m++) {
    const option = document.createElement('option');
    option.value = m;
    option.textContent = monthNames[m];
    if (m === now.getMonth()) option.selected = true;
    monthSelect.appendChild(option);
  }
  for (let y = currentYear - 2; y <= currentYear + 2; y++) {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    if (y === currentYear) option.selected = true;
    yearSelect.appendChild(option);
  }

  monthSelect.addEventListener('change', generateCalendar);
  yearSelect.addEventListener('change', generateCalendar);

  function generateCalendar() {
    calendar.innerHTML = '';
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startOffset = (firstDayIndex === 0) ? 6 : firstDayIndex - 1;

    for (let i = 0; i < startOffset; i++) {
      const empty = document.createElement('div');
      calendar.appendChild(empty);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = document.createElement('div');
      day.textContent = i;
      day.classList.add('calendar-day');
      day.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day').forEach(d => {
          d.classList.remove('active');
          d.style.background = '';
          d.style.transform = 'scale(1)';
        });
        day.classList.add('active');
        currentDay = day;
        emojiPicker.classList.remove('hidden');
      });
      calendar.appendChild(day);
    }
  }

  emojiPicker.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      if (currentDay) {
        const emoji = button.dataset.emoji;
        const msg = button.dataset.msg;
        currentDay.textContent = emoji;
        emojiPicker.classList.add('hidden');
        showMessage(msg);
      }
    });
  });

  function showMessage(text) {
    messageBox.textContent = text;
    messageBox.classList.remove('hidden');
    messageBox.classList.add('message-card');
    messageBox.style.animation = 'fade-in 0.5s ease';
  }

  // VIDEOS
  document.querySelectorAll('.video-button').forEach(button => {
    button.addEventListener('click', () => {
      window.open(button.dataset.url, '_blank');
    });
  });

  // CHAT CON VOLUNTARIA
  const chatButton = document.getElementById('chat-button');
  const userNameInput = document.getElementById('user-name');
  chatButton.addEventListener('click', () => {
    const userName = userNameInput.value.trim();
    if (userName) {
      const whatsappNumber = '51937316877';
      const message = `Hola, soy ${userName}. Me gustaría hablar con una voluntaria de Aurora 💜`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
    } else {
      alert('Por favor, escribe tu nombre antes de iniciar el chat.');
    }
  });

  if (!sections['calendar-section'].classList.contains('hidden')) {
    generateCalendar();
  }

  // BLOQUES INTERACTIVOS
  const blockNav = document.querySelector('.blocks');
  if (blockNav) {
    blockNav.querySelectorAll('[data-target]').forEach(block => {
      block.addEventListener('click', (e) => {
        const target = e.currentTarget.dataset.target;
        if (target) {
          showSection(target);
        }
      });

      const bg = block.style.getPropertyValue('--bg');
      const title = block.querySelector('.block__item').getAttribute('title');
      if (title) {
        const label = document.createElement('div');
        label.className = 'block-subtitle';
        label.textContent = title;
        block.querySelector('.block__item').appendChild(label);
      }
    });
  }
});
