document.addEventListener('DOMContentLoaded', function() {
  const grid = document.querySelector('.grid');
  console.log('Grid initialization:', {
    found: !!grid,
    windowWidth: window.innerWidth,
    gridWidth: grid?.offsetWidth,
    children: grid?.children.length
  });

  if (!grid || window.innerWidth > 768) return;

  let startX;
  let scrollLeft;
  let isDragging = false;

  function handleTouchStart(e) {
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
  }

  function handleTouchMove(e) {
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
  }

  function handleTouchEnd() {
    isDragging = false;
    console.log('Touch End:', {
      finalScrollLeft: grid.scrollLeft,
      isDragging
    });
  }

  // Log grid metrics on scroll
  grid.addEventListener('scroll', () => {
    console.log('Scroll:', {
      scrollLeft: grid.scrollLeft,
      scrollWidth: grid.scrollWidth,
      clientWidth: grid.clientWidth,
      progress: `${Math.round((grid.scrollLeft / (grid.scrollWidth - grid.clientWidth)) * 100)}%`
    });
  });

  grid.addEventListener('touchstart', handleTouchStart);
  grid.addEventListener('touchmove', handleTouchMove);
  grid.addEventListener('touchend', handleTouchEnd);

  // Log initial grid metrics
  console.log('Grid Metrics:', {
    scrollWidth: grid.scrollWidth,
    clientWidth: grid.clientWidth,
    offsetWidth: grid.offsetWidth,
    childCount: grid.children.length,
    firstChildWidth: grid.children[0]?.offsetWidth,
    totalScrollable: grid.scrollWidth - grid.clientWidth
  });
}); 