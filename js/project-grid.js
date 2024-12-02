document.addEventListener('DOMContentLoaded', function() {
  const grid = document.querySelector('.grid');
  if (!grid || window.innerWidth > 768) return;

  let startX;
  let currentX;
  let isDown = false;
  let startTime;
  let movedDistance = 0;

  function handleStart(x) {
    isDown = true;
    startX = x;
    currentX = x;
    startTime = Date.now();
    movedDistance = 0;
    grid.style.cursor = 'grabbing';
  }

  function handleMove(x) {
    if (!isDown) return;
    const dx = x - currentX;
    currentX = x;
    movedDistance += Math.abs(dx);
    grid.scrollLeft -= dx;
  }

  function handleEnd(e) {
    isDown = false;
    grid.style.cursor = 'grab';
    
    // If moved less than 10px and took less than 200ms, treat as click
    const isClick = movedDistance < 10 && (Date.now() - startTime) < 200;
    
    if (isClick && e.target.closest('.project-card')) {
      const card = e.target.closest('.project-card');
      const modalId = card.getAttribute('data-modal');
      if (modalId) {
        $(`#${modalId}`).modal('show');
      }
    }
  }

  // Touch Events
  grid.addEventListener('touchstart', (e) => {
    handleStart(e.touches[0].pageX);
  }, { passive: true });

  grid.addEventListener('touchmove', (e) => {
    handleMove(e.touches[0].pageX);
  }, { passive: true });

  grid.addEventListener('touchend', (e) => {
    handleEnd(e);
  });

  // Mouse Events
  grid.addEventListener('mousedown', (e) => {
    handleStart(e.pageX);
  });

  grid.addEventListener('mousemove', (e) => {
    handleMove(e.pageX);
  });

  grid.addEventListener('mouseup', handleEnd);
  grid.addEventListener('mouseleave', handleEnd);

  // Add click handler for modals
  grid.addEventListener('click', (e) => {
    if (!movedDistance) {
      const card = e.target.closest('.project-card');
      if (card) {
        const modalLink = card.querySelector('[data-toggle="modal"]');
        if (modalLink) {
          const modalId = modalLink.getAttribute('href');
          $(modalId).modal('show');
        }
      }
    }
  });

  // Log initial state
  console.log('Grid setup:', {
    offsetWidth: grid.offsetWidth,
    scrollWidth: grid.scrollWidth,
    scrollable: grid.scrollWidth > grid.offsetWidth,
    children: Array.from(grid.children).map(child => ({
      width: child.offsetWidth,
      margin: window.getComputedStyle(child).marginRight
    }))
  });
}); 