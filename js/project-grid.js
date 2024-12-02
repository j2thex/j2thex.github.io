document.addEventListener('DOMContentLoaded', function() {
  try {
    const grid = document.querySelector('.grid');
    console.clear(); // Clear previous logs
    console.log('%c Grid Debug Info ', 'background: #222; color: #bada55');

    console.log('Grid initialization:', {
      found: !!grid,
      windowWidth: window.innerWidth,
      gridWidth: grid?.offsetWidth,
      children: grid?.children.length
    });

    if (!grid) {
      console.error('Grid element not found');
      return;
    }

    if (window.innerWidth > 768) {
      console.log('Desktop mode - touch scroll disabled');
      return;
    }

    let startX;
    let scrollLeft;
    let isDragging = false;

    function handleTouchStart(e) {
      try {
        isDragging = true;
        startX = e.touches[0].pageX - grid.offsetLeft;
        scrollLeft = grid.scrollLeft;
        console.log('Touch Start:', {
          startX,
          scrollLeft,
          offsetLeft: grid.offsetLeft,
          touch: {
            pageX: e.touches[0].pageX,
            pageY: e.touches[0].pageY
          }
        });
      } catch (error) {
        console.error('Touch Start Error:', error);
      }
    }

    function handleTouchMove(e) {
      try {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - grid.offsetLeft;
        const walk = startX - x;
        grid.scrollLeft = scrollLeft + walk;
        console.log('Touch Move:', {
          currentX: x,
          walk,
          newScrollLeft: grid.scrollLeft,
          touch: {
            pageX: e.touches[0].pageX,
            pageY: e.touches[0].pageY
          },
          gridState: {
            scrollWidth: grid.scrollWidth,
            clientWidth: grid.clientWidth,
            maxScroll: grid.scrollWidth - grid.clientWidth
          }
        });
      } catch (error) {
        console.error('Touch Move Error:', error);
      }
    }

    function handleTouchEnd() {
      try {
        isDragging = false;
        console.log('Touch End:', {
          finalScrollLeft: grid.scrollLeft,
          isDragging
        });
      } catch (error) {
        console.error('Touch End Error:', error);
      }
    }

    // Log grid metrics on scroll
    grid.addEventListener('scroll', () => {
      try {
        console.log('Scroll:', {
          scrollLeft: grid.scrollLeft,
          scrollWidth: grid.scrollWidth,
          clientWidth: grid.clientWidth,
          progress: `${Math.round((grid.scrollLeft / (grid.scrollWidth - grid.clientWidth)) * 100)}%`
        });
      } catch (error) {
        console.error('Scroll Error:', error);
      }
    });

    grid.addEventListener('touchstart', handleTouchStart, { passive: false });
    grid.addEventListener('touchmove', handleTouchMove, { passive: false });
    grid.addEventListener('touchend', handleTouchEnd);

    // Log initial grid metrics
    console.log('Grid Metrics:', {
      scrollWidth: grid.scrollWidth,
      clientWidth: grid.clientWidth,
      offsetWidth: grid.offsetWidth,
      childCount: grid.children.length,
      firstChildWidth: grid.children[0]?.offsetWidth,
      totalScrollable: grid.scrollWidth - grid.clientWidth,
      styles: window.getComputedStyle(grid)
    });

  } catch (error) {
    console.error('Grid Initialization Error:', error);
  }
}); 