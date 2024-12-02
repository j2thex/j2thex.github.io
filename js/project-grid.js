document.addEventListener('DOMContentLoaded', function() {
  const grid = document.querySelector('.grid');
  if (!grid || window.innerWidth > 768) return;

  let startX;
  let currentX;
  let isDown = false;

  function handleStart(x) {
    isDown = true;
    startX = x;
    currentX = x;
    grid.style.cursor = 'grabbing';
  }

  function handleMove(x) {
    if (!isDown) return;
    const dx = x - currentX;
    currentX = x;
    grid.scrollLeft -= dx;
  }

  function handleEnd() {
    isDown = false;
    grid.style.cursor = 'grab';
  }

  // Touch Events
  grid.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleStart(e.touches[0].pageX);
  }, { passive: false });

  grid.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleMove(e.touches[0].pageX);
  }, { passive: false });

  grid.addEventListener('touchend', () => {
    handleEnd();
  });

  // Mouse Events (for testing)
  grid.addEventListener('mousedown', (e) => {
    handleStart(e.pageX);
  });

  grid.addEventListener('mousemove', (e) => {
    handleMove(e.pageX);
  });

  grid.addEventListener('mouseup', handleEnd);
  grid.addEventListener('mouseleave', handleEnd);

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