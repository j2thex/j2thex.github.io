document.addEventListener('DOMContentLoaded', function() {
  // Navigation toggle
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }
  
  // Close menu when clicking links
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });
  
  // Language switcher
  const langSwitcher = document.querySelector('.lang-switcher__current');
  const langDropdown = document.querySelector('.lang-switcher__dropdown');
  
  if (langSwitcher && langDropdown) {
    langSwitcher.addEventListener('click', function(e) {
      e.stopPropagation();
      langSwitcher.classList.toggle('active');
      langDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.lang-switcher')) {
        langSwitcher.classList.remove('active');
        langDropdown.classList.remove('active');
      }
    });
  }

  // Portfolio filtering
  const filterButtons = document.querySelectorAll('.portfolio__filter');
  const portfolioItems = document.querySelectorAll('.portfolio__item');

  if (filterButtons && portfolioItems.length > 0) {
    let currentFilter = 'all';
    let isFiltering = false;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const newFilter = button.getAttribute('data-filter');
        
        if (currentFilter === newFilter || isFiltering) return;
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        isFiltering = true;
        currentFilter = newFilter;

        // Add fade-out class to items that will be hidden
        portfolioItems.forEach(item => {
          const categories = JSON.parse(item.getAttribute('data-categories'));
          
          if (newFilter === 'all' || categories.includes(newFilter)) {
            item.classList.remove('fade-out');
          } else {
            item.classList.add('fade-out');
          }
        });

        // Wait for fade out animation
        setTimeout(() => {
          // Update visibility
          portfolioItems.forEach(item => {
            const categories = JSON.parse(item.getAttribute('data-categories'));
            
            if (newFilter === 'all' || categories.includes(newFilter)) {
              item.classList.remove('hidden');
              // Remove fade-out class if it was added
              item.classList.remove('fade-out');
            } else {
              item.classList.add('hidden');
            }
          });

          isFiltering = false;
        }, 300); // This should match the transition duration in CSS
      });
    });
  }

  // Scroll Progress Bar
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      scrollProgress.classList.add('active');
      scrollProgress.style.setProperty('--scroll-width', `${scrolled}%`);
    });
  }

  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookieConsent').style.display = 'flex';
  }
});

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  document.getElementById('cookieConsent').style.display = 'none';
} 