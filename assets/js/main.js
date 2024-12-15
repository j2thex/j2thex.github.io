document.addEventListener('DOMContentLoaded', function() {
  // Navigation toggle
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }
  
  // Close menu when clicking links
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });

  // Language switcher functionality
  const langSwitcher = document.querySelector('.lang-switcher');
  if (langSwitcher) {
    const toggleButton = langSwitcher.querySelector('.lang-switcher__current');
    const dropdown = langSwitcher.querySelector('.lang-switcher__dropdown');

    toggleButton.addEventListener('click', () => {
      dropdown.classList.toggle('active');
      toggleButton.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!langSwitcher.contains(e.target)) {
        dropdown.classList.remove('active');
        toggleButton.classList.remove('active');
      }
    });
  }

  // Portfolio filtering
  const filterButtons = document.querySelectorAll('.portfolio__filter');
  const portfolioItems = document.querySelectorAll('.portfolio__item');
  const portfolioGrid = document.querySelector('.portfolio__grid');

  let currentFilter = 'all';
  let isFiltering = false;

  // Function to position items in a grid layout
  function positionItems() {
    const gap = 32; // This should match your CSS gap
    const gridWidth = portfolioGrid.offsetWidth;
    let columns;

    // Determine number of columns based on viewport width
    if (window.innerWidth >= 1200) { // lg breakpoint
      columns = 3;
    } else if (window.innerWidth >= 768) { // md breakpoint
      columns = 2;
    } else {
      columns = 1;
    }

    const itemWidth = (gridWidth - (gap * (columns - 1))) / columns;
    let maxHeight = 0;

    // Get only visible items
    const visibleItems = Array.from(portfolioItems).filter(item => !item.classList.contains('hidden'));
    
    // Calculate row heights first
    const rowHeights = [];
    for (let i = 0; i < visibleItems.length; i += columns) {
      const rowItems = visibleItems.slice(i, i + columns);
      const rowHeight = Math.max(...rowItems.map(item => item.offsetHeight));
      rowHeights.push(rowHeight);
    }
    
    visibleItems.forEach((item, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      
      // Calculate position using row heights
      const x = column * (itemWidth + gap);
      const y = rowHeights.slice(0, row).reduce((sum, height) => sum + height + gap, 0);
      
      // Apply transform
      item.style.transform = `translate(${x}px, ${y}px)`;
      
      // Update max height
      maxHeight = Math.max(maxHeight, y + rowHeights[row]);
    });

    // Update grid height
    portfolioGrid.style.minHeight = maxHeight + gap + 'px';
  }

  // Initial positioning
  window.addEventListener('load', () => {
    // Set initial width based on viewport
    portfolioItems.forEach(item => {
      if (window.innerWidth >= 1200) { // lg breakpoint
        item.style.width = '33.333%';
      } else if (window.innerWidth >= 768) { // md breakpoint
        item.style.width = '50%';
      } else {
        item.style.width = '100%';
      }
    });
    positionItems();
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Update widths on resize
      portfolioItems.forEach(item => {
        if (window.innerWidth >= 1200) { // lg breakpoint
          item.style.width = '33.333%';
        } else if (window.innerWidth >= 768) { // md breakpoint
          item.style.width = '50%';
        } else {
          item.style.width = '100%';
        }
      });
      positionItems();
    }, 100);
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const newFilter = button.getAttribute('data-filter');
      
      if (currentFilter === newFilter || isFiltering) return;
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      isFiltering = true;
      currentFilter = newFilter;

      // First fade out items that will be hidden
      portfolioItems.forEach(item => {
        const categories = JSON.parse(item.getAttribute('data-categories'));
        
        if (newFilter === 'all' || categories.includes(newFilter)) {
          if (item.classList.contains('hidden')) {
            item.classList.remove('hidden');
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
          }
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
        }
      });

      // Wait for fade out
      setTimeout(() => {
        // Update visibility
        portfolioItems.forEach(item => {
          const categories = JSON.parse(item.getAttribute('data-categories'));
          
          if (newFilter === 'all' || categories.includes(newFilter)) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });

        // Reposition and fade in visible items
        requestAnimationFrame(() => {
          positionItems();
          
          // Fade in visible items
          portfolioItems.forEach(item => {
            if (!item.classList.contains('hidden')) {
              item.style.opacity = '1';
            }
          });
        });

        setTimeout(() => {
          isFiltering = false;
        }, 500);
      }, 300);
    });
  });
}); 