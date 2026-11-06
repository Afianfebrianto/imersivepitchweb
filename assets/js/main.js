/**
 * IMMERSIVE MANAGEMENT - INTERACTIVE JAVASCRIPT
 * Controls navigation, workflow tabs, WhatsApp message formulation,
 * and the Pitch Deck Presentation Viewer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header & Scroll Spy ---
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy for Active Navigation
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 2. Mobile Drawer Navigation ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // --- 3. Interactive Workflow / Stages Stepper ---
  const stepButtons = document.querySelectorAll('.timeline-stepper .step-btn');
  const stageCards = document.querySelectorAll('.stages-flow-grid .stage-card');

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const stepNumber = btn.getAttribute('data-step');

      // Update button active state
      stepButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Update card active state and smooth scroll
      stageCards.forEach((card) => {
        if (card.getAttribute('data-step') === stepNumber) {
          card.classList.add('active');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.classList.remove('active');
        }
      });
    });
  });

  stageCards.forEach((card) => {
    card.addEventListener('click', () => {
      const stepNumber = card.getAttribute('data-step');
      stageCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');

      stepButtons.forEach((b) => {
        if (b.getAttribute('data-step') === stepNumber) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    });
  });

  // --- 4. Consultation Inquiry Form -> WhatsApp Redirect ---
  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const company = document.getElementById('companyName').value.trim();
      const phone = document.getElementById('whatsappNumber').value.trim();
      const sector = document.getElementById('businessSector').value;
      const need = document.getElementById('serviceNeed').value;
      const message = document.getElementById('clientMessage').value.trim();

      const waNumber = '6282357131943';
      const textMessage = 
`*KONSULTASI PENGELOLAAN SDM - IMMERSIVE MANAGEMENT*
---------------------------------------
👤 *Nama*: ${name}
🏢 *Perusahaan*: ${company}
📱 *No. WhatsApp*: ${phone}
🏷️ *Sektor Usaha*: ${sector}
🎯 *Kebutuhan Layanan*: ${need}
📝 *Catatan / Kendala*: ${message ? message : '-'}
---------------------------------------
Halo Tim Immersive Management, saya ingin berkonsultasi mengenai kebutuhan SDM di atas. Mohon informasinya. Terima kasih!`;

      const encodedUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(textMessage)}`;
      window.open(encodedUrl, '_blank');
    });
  }

  // --- 5. Interactive Pitch Deck Presentation Modal ---
  const pitchModal = document.getElementById('pitchModal');
  const pitchBackdrop = document.getElementById('pitchBackdrop');
  const openPitchDeckBtn = document.getElementById('openPitchDeckBtn');
  const drawerPitchDeckBtn = document.getElementById('drawerPitchDeckBtn');
  const mobileBottomDeckBtn = document.getElementById('mobileBottomDeckBtn');
  const closePitchModalBtn = document.getElementById('closePitchModalBtn');
  const toggleFullscreenBtn = document.getElementById('toggleFullscreenBtn');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const slideCounter = document.getElementById('slideCounter');
  const slides = document.querySelectorAll('.deck-slide');
  const slideDots = document.querySelectorAll('.slide-dot');

  let currentSlideIndex = 1;
  const totalSlides = slides.length;

  function updateSlide(index) {
    if (index < 1) index = 1;
    if (index > totalSlides) index = totalSlides;
    currentSlideIndex = index;

    slides.forEach((slide) => {
      const slideNum = parseInt(slide.getAttribute('data-slide'), 10);
      if (slideNum === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    slideDots.forEach((dot) => {
      const dotIndex = parseInt(dot.getAttribute('data-slide-index'), 10);
      if (dotIndex === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    if (slideCounter) {
      slideCounter.textContent = `Slide ${currentSlideIndex} dari ${totalSlides}`;
    }

    if (prevSlideBtn) {
      prevSlideBtn.disabled = currentSlideIndex === 1;
      prevSlideBtn.style.opacity = currentSlideIndex === 1 ? '0.45' : '1';
    }

    if (nextSlideBtn) {
      if (currentSlideIndex === totalSlides) {
        nextSlideBtn.innerHTML = `Selesai <i class="fa-solid fa-check"></i>`;
      } else {
        nextSlideBtn.innerHTML = `Slide Berikutnya <i class="fa-solid fa-chevron-right"></i>`;
      }
    }
  }

  function openPitchDeck(startSlide = 1) {
    if (pitchModal) {
      pitchModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      updateSlide(startSlide);
    }
  }

  function closePitchDeck() {
    if (pitchModal) {
      pitchModal.classList.remove('active');
      document.body.style.overflow = '';
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  if (openPitchDeckBtn) openPitchDeckBtn.addEventListener('click', () => openPitchDeck(1));
  if (drawerPitchDeckBtn) {
    drawerPitchDeckBtn.addEventListener('click', () => {
      closeDrawer();
      openPitchDeck(1);
    });
  }
  if (mobileBottomDeckBtn) mobileBottomDeckBtn.addEventListener('click', () => openPitchDeck(1));
  if (closePitchModalBtn) closePitchModalBtn.addEventListener('click', closePitchDeck);
  if (pitchBackdrop) pitchBackdrop.addEventListener('click', closePitchDeck);

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      if (currentSlideIndex > 1) {
        updateSlide(currentSlideIndex - 1);
      }
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      if (currentSlideIndex < totalSlides) {
        updateSlide(currentSlideIndex + 1);
      } else {
        closePitchDeck();
      }
    });
  }

  slideDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-slide-index'), 10);
      updateSlide(targetIndex);
    });
  });

  // Keyboard navigation for Pitch Deck
  document.addEventListener('keydown', (e) => {
    if (!pitchModal.classList.contains('active')) return;

    if (e.key === 'ArrowRight' || e.key === 'Space') {
      e.preventDefault();
      if (currentSlideIndex < totalSlides) {
        updateSlide(currentSlideIndex + 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentSlideIndex > 1) {
        updateSlide(currentSlideIndex - 1);
      }
    } else if (e.key === 'Escape') {
      closePitchDeck();
    }
  });

  // Fullscreen toggle
  if (toggleFullscreenBtn) {
    toggleFullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        pitchModal.requestFullscreen().catch(() => {
          pitchModal.classList.toggle('fullscreen');
        });
        toggleFullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
      } else {
        document.exitFullscreen().catch(() => {});
        toggleFullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
      }
    });
  }
});

