/**
 * ============================================================================
 * Main JavaScript - n0thn Website
 * ============================================================================
 * This file contains all interactive functionality for the website:
 * - Navigation menu toggle (mobile)
 * - Language switcher dropdown
 * - Portfolio filtering with animations
 * - Scroll progress indicator
 * - Cookie consent management
 * - Video lazy loading
 * - Post feedback system with Google Analytics
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', function() {
  // ==========================================================================
  // Navigation Toggle (Mobile Menu)
  // ==========================================================================
  // Handles the hamburger menu toggle for mobile devices
  // Toggles active classes on menu, toggle button, and body
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
  
  // ==========================================================================
  // Language Switcher
  // ==========================================================================
  // Handles the language dropdown toggle and click-outside-to-close functionality
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

  // ==========================================================================
  // Portfolio Filtering
  // ==========================================================================
  // Implements category-based filtering for portfolio items with fade animations
  // Prevents rapid clicking during animation transitions
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

  // ==========================================================================
  // Scroll Progress Bar
  // ==========================================================================
  // Visual indicator showing reading progress on long pages
  // Updates CSS custom property --scroll-width based on scroll position
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

  // ==========================================================================
  // Cookie Consent
  // ==========================================================================
  // Shows cookie consent banner if user hasn't accepted yet
  // Uses localStorage to persist consent across sessions
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookieConsent').style.display = 'flex';
  }

  // ==========================================================================
  // Video Section (Lazy Loading)
  // ==========================================================================
  // Replaces video preview thumbnail with YouTube iframe on click
  // Improves page load performance by deferring video embed
  const videoPreview = document.querySelector('.video-preview');
  if (videoPreview) {
    videoPreview.addEventListener('click', function() {
      const videoId = this.dataset.videoId;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
      this.innerHTML = '';
      this.appendChild(iframe);
    });
  }

  // ==========================================================================
  // Post Feedback System
  // ==========================================================================
  // Collects user feedback (helpful/not helpful) on blog posts
  // - Stores feedback in localStorage to prevent duplicate submissions
  // - Sends events to Google Analytics for engagement tracking
  // - Shows thank you message after feedback is submitted
  const feedbackContainer = document.querySelector('.post-feedback');
  if (!feedbackContainer) return;

  const postId = feedbackContainer.dataset.postId;
  const storageKey = `post_feedback_${postId}`;
  
  // Debug logging (remove in production if desired)
  console.log('Feedback initialized for post:', postId);
  console.log('Previous feedback:', localStorage.getItem(storageKey));
  
  // Check if feedback was already given (prevents multiple submissions)
  if (localStorage.getItem(storageKey)) {
    console.log('Previous feedback found, showing thanks');
    showThanks();
    return;
  }

  const buttons = feedbackContainer.querySelectorAll('.post-feedback__button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const value = this.dataset.value;
      
      // Store the feedback
      localStorage.setItem(storageKey, value);
      
      // Send event to Google Analytics
      if (typeof gtag !== 'undefined') {
        console.log('Sending GA event:', {
          event_name: 'article_feedback',
          event_category: 'Engagement',
          event_label: postId,
          value: value === 'yes' ? 1 : 0
        });
        
        gtag('event', 'article_feedback', {
          'event_category': 'Engagement',
          'event_label': postId,
          'value': value === 'yes' ? 1 : 0
        });
      } else {
        console.error('Google Analytics not initialized (gtag not found)');
      }
      
      // Mark button as selected
      buttons.forEach(btn => btn.classList.remove('selected'));
      this.classList.add('selected');
      
      // Show thanks message
      setTimeout(showThanks, 500);
    });
  });

  function showThanks() {
    const questionEl = feedbackContainer.querySelector('.post-feedback__question');
    const thanksEl = feedbackContainer.querySelector('.post-feedback__thanks');
    
    questionEl.style.display = 'none';
    thanksEl.style.display = 'block';
  }
});

/**
 * Cookie Consent Handler
 * Called when user clicks "Accept" on cookie consent banner
 * Stores consent in localStorage and hides the banner
 */
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  document.getElementById('cookieConsent').style.display = 'none';
} 