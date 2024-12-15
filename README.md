# Core Technologies:
1. Static Site Generator:
- Jekyll 4.3.4
- Liquid templating engine
2. Languages:
- HTML5
- SCSS/SASS for styling
- JavaScript (vanilla) for interactions
3. CSS Architecture:
- BEM methodology (Block Element Modifier)
- SASS modules with @use
- Responsive design with mixins
- CSS Grid and Flexbox
- CSS Variables (SASS variables)
- Mobile-first approach
4. Design Features:
- Dark theme
- Glassmorphism effects (backdrop-filter: blur)
- Smooth transitions and animations
- Custom scrolling
- SVG icons and flags
- Custom font stack (Inter, Muli, Bebas Neue, Consolas)
5. Multilingual Support:
- Three languages (English, Russian, Ukrainian)
- Language-specific collections
- YAML-based translations
- Language switcher with URL preservation
6. Content Organization:
- Collections for projects and blog posts
- Language-specific content collections
- Markdown for content
- YAML front matter for metadata
7. Layout Components:
- Fixed navigation with mobile menu
- Hero section
- Services grid
- Portfolio with filtering
- Blog with categories
- Contact section
- Footer
8. Project Structure:
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