# n0thn Digital Agency Website

A multilingual static website built with Jekyll, featuring a modern tech stack and optimized performance.

## Core Technologies

### 1. Static Site Generator
- Jekyll 4.3.4
- Liquid templating engine
- Jekyll plugins:
  - jekyll-sitemap
  - jekyll-seo-tag

### 2. Languages & Frameworks
- HTML5
- SCSS/SASS for styling
- Vanilla JavaScript for interactions
- BEM methodology for CSS architecture

### 3. CSS Architecture
- SASS modules with @use
- Responsive design with mixins
- CSS Grid and Flexbox layouts
- CSS Variables (Custom Properties)
- Mobile-first approach
- Dark theme support
- Glassmorphism effects

### 4. Design Features
- Responsive design (mobile, tablet, desktop)
- Dark/Light theme switching
- Glassmorphism effects (backdrop-filter: blur)
- Smooth transitions and animations
- Custom scrolling behavior
- SVG icons and flags
- Custom font stack:
  - Inter
  - Bebas Neue
  - System fallbacks

## Multilingual Support

### Languages
- English (default)
- Ukrainian
- Russian

### Implementation
- Language-specific collections for posts and projects
- YAML-based translations
- Language detection and switching
- URL structure: /{lang}/{section}/
- SEO-friendly URLs
- Automatic browser language detection

## Project Structure
   ├── _data/           # Translation files
   ├── _includes/       # Reusable components
   ├── _layouts/        # Page templates
   ├── _sass/          # SCSS modules
   │   ├── base/       # Variables, mixins, reset
   │   ├── components/ # Reusable component styles
   │   └── sections/   # Page section styles
   ├── assets/         # Static files
   │   ├── css/       # Compiled CSS
   │   ├── js/        # JavaScript
   │   └── images/    # Images and icons
   └── collections/    # Content collections
       ├── _posts_en/  # English posts
       ├── _posts_ru/  # Russian posts
       ├── _posts_uk/  # Ukrainian posts
       └── similar for projects
projects
Performance Optimizations:
Static site generation
CSS modularization
Lazy loading for images
SVG for icons and flags
Minified CSS output
Development Tools:
Bundler for dependency management
Jekyll for development server
SASS compilation
Git for version control
UX Features:
Responsive navigation
Language detection and switching
Category filtering for portfolio
Smooth transitions between pages
Hover effects and animations
Fixed header with blur effect
Accessibility:
Semantic HTML
ARIA labels
Proper heading hierarchy
Color contrast compliance
Focus states for interactive elements
This is a modern, multilingual static site that prioritizes performance, maintainability, and user experience while keeping the technology stack simple and effective.