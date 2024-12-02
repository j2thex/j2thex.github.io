document.addEventListener('DOMContentLoaded', function() {
  try {
    const grid = document.querySelector('.grid');
    if (!grid || window.innerWidth > 768) return;

    // Add mouse events for testing
    let isDown = false;
    let startX;
    let scrollLeft;

    grid.addEventListener('mousedown', (e) => {
      isDown = true;
      grid.style.cursor = 'grabbing';
      startX = e.pageX - grid.offsetLeft;
      scrollLeft = grid.scrollLeft;
      console.log('Mouse down:', { startX, scrollLeft });
    });

    grid.addEventListener('mouseleave', () => {
      isDown = false;
      grid.style.cursor = 'grab';
    });

    grid.addEventListener('mouseup', () => {
      isDown = false;
      grid.style.cursor = 'grab';
    });

    grid.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - grid.offsetLeft;
      const walk = (x - startX);
      grid.scrollLeft = scrollLeft - walk;
      console.log('Mouse move:', { 
        scrollLeft: grid.scrollLeft,
        walk,
        x
      });
    });

    // Touch events
    function handleTouchStart(e) {
      isDown = true;
      startX = e.touches[0].pageX - grid.offsetLeft;
      scrollLeft = grid.scrollLeft;
      console.log('Touch start:', { startX, scrollLeft });
    }

    function handleTouchMove(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - grid.offsetLeft;
      const walk = (x - startX);
      grid.scrollLeft = scrollLeft - walk;
      console.log('Touch move:', {
        scrollLeft: grid.scrollLeft,
        walk,
        x
      });
    }

    function handleTouchEnd() {
      isDown = false;
      console.log('Touch end');
    }

    grid.addEventListener('touchstart', handleTouchStart, { passive: false });
    grid.addEventListener('touchmove', handleTouchMove, { passive: false });
    grid.addEventListener('touchend', handleTouchEnd);

    // Log initial metrics
    console.log('Grid metrics:', {
      width: grid.offsetWidth,
      scrollWidth: grid.scrollWidth,
      clientWidth: grid.clientWidth,
      children: grid.children.length,
      firstChildWidth: grid.children[0]?.offsetWidth
    });

  } catch (error) {
    console.error('Grid initialization error:', error);
  }
}); 