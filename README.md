# n0thn Digital Agency Website

A modern, multilingual static website built with Jekyll, featuring a comprehensive tech stack optimized for performance, SEO, and user experience.

## 🚀 Overview

This is the official website for n0thn Digital Agency, a full-service digital agency specializing in:
- **Digital Transformation & Blockchain**: Web3, smart contracts, NFT marketplaces, DeFi solutions
- **Innovation Acceleration**: Rapid prototyping, MVP development, proof of concept
- **AI Solutions**: Custom AI models, LLM integration, automation, computer vision, predictive analytics

The site is fully multilingual (English, Russian, Ukrainian) and built with modern web technologies prioritizing performance and maintainability.

## 🛠️ Technology Stack

### Core Framework
- **Jekyll 4.3.4**: Static site generator using Liquid templating
- **Ruby**: Runtime environment (managed via Bundler)
- **Git**: Version control and deployment

### Frontend Technologies
- **HTML5**: Semantic markup
- **SCSS/SASS**: Modular CSS architecture with BEM methodology
- **Vanilla JavaScript**: No frameworks - pure JS for optimal performance
- **CSS Grid & Flexbox**: Modern layout systems
- **CSS Custom Properties**: Theme variables for maintainability

### Jekyll Plugins
- `jekyll-sitemap`: Automatic XML sitemap generation
- `jekyll-seo-tag`: SEO meta tags and Open Graph support

### Design System
- **Typography**: Inter (primary), Bebas Neue (headings), system fallbacks
- **Color Scheme**: Dark theme with accent colors
- **Icons**: SVG icons and flag images
- **Effects**: Glassmorphism (backdrop-filter blur), smooth transitions

## 📁 Project Structure

```
.
├── _config.yml              # Jekyll configuration
├── _data/                   # Site data (translations)
│   └── translations/
│       ├── en.yml          # English translations
│       ├── ru.yml          # Russian translations
│       └── ua.yml          # Ukrainian translations
├── _includes/              # Reusable components
│   ├── components/         # UI components
│   │   ├── cookie-consent.html
│   │   ├── footer.html
│   │   ├── language-switcher.html
│   │   ├── navigation.html
│   │   └── post-feedback.html
│   ├── sections/           # Page sections
│   │   ├── contact.html
│   │   ├── hero.html
│   │   ├── how-we-work.html
│   │   ├── portfolio.html
│   │   ├── services.html
│   │   └── video-section.html
│   ├── meta-tags.html      # SEO meta tags
│   └── head.html           # Head section includes
├── _layouts/               # Page templates
│   ├── default.html        # Base layout
│   ├── home.html           # Homepage layout
│   ├── post.html           # Blog post layout
│   └── project.html        # Project detail layout
├── _sass/                  # SCSS source files
│   ├── abstracts/          # Variables, mixins, functions
│   ├── base/               # Reset, typography, utilities
│   ├── components/         # Component styles
│   ├── sections/           # Section-specific styles
│   └── main.scss           # Main stylesheet entry
├── assets/                 # Static assets
│   ├── css/
│   │   └── main.scss       # SCSS entry point
│   ├── js/
│   │   ├── main.js         # Main JavaScript
│   │   └── cloud-effect.js # Hero cloud animation
│   └── images/
│       ├── flags/          # Language flag SVGs
│       ├── icons/          # Service icons
│       ├── posts/          # Blog post images
│       └── projects/      # Project images
├── collections/            # Content collections
│   ├── _posts_en/         # English blog posts
│   ├── _posts_ru/         # Russian blog posts
│   ├── _posts_ua/         # Ukrainian blog posts
│   ├── _projects_en/      # English project pages
│   ├── _projects_ru/      # Russian project pages
│   └── _projects_ua/      # Ukrainian project pages
├── en/                    # English pages
│   ├── index.html         # Homepage
│   ├── blog/              # Blog index
│   └── ai-solutions.html  # AI solutions landing page
├── ru/                    # Russian pages
├── ua/                    # Ukrainian pages
├── Gemfile                # Ruby dependencies
└── startdev.sh            # Development server script
```

## 🌍 Multilingual Architecture

### Language Support
- **English (en)**: Default language
- **Russian (ru)**: Full translation
- **Ukrainian (ua)**: Full translation

### Implementation Details

#### URL Structure
- English: `/en/`, `/en/blog/`, `/en/projects/`, `/en/ai-solutions/`
- Russian: `/ru/`, `/ru/blog/`, `/ru/projects/`, `/ru/ai-solutions/`
- Ukrainian: `/ua/`, `/ua/blog/`, `/ua/projects/`, `/ua/ai-solutions/`

#### Content Collections
Each content type has language-specific collections:
- Blog posts: `_posts_en`, `_posts_ru`, `_posts_ua`
- Projects: `_projects_en`, `_projects_ru`, `_projects_ua`

#### Translation System
- YAML-based translations in `_data/translations/`
- Page-level translations via front matter
- Automatic language detection via browser settings
- Language switcher component with intelligent URL routing

#### Language Switcher Logic
The language switcher (`_includes/components/language-switcher.html`) intelligently routes to:
- Blog posts: Maintains date and slug structure
- Blog index: Routes to language-specific blog index
- Projects: Maintains project slug
- AI Solutions: Routes to language-specific landing page
- Homepage: Routes to language-specific homepage

## 📝 Content Management

### Blog Posts
- **Location**: `collections/_posts_{lang}/`
- **Naming**: `YYYY-MM-DD-slug.md`
- **Front Matter**:
  ```yaml
  layout: post
  title: "Post Title"
  description: "Meta description"
  date: YYYY-MM-DD
  author: Jeff Smith
  image: "/assets/images/posts/..."
  categories: [category1, category2]
  lang: en
  ```

### Projects
- **Location**: `collections/_projects_{lang}/`
- **Front Matter**: Similar to posts with project-specific fields
- **Layout**: Uses `project.html` layout

### Services
- **Configuration**: Defined in `_data/translations/{lang}.yml`
- **Features**: Each service has icon, title, description, features list
- **Links**: Services can have custom links (e.g., AI Solutions → `/en/ai-solutions/`)

## 🎨 Styling Architecture

### SCSS Structure
- **Abstracts**: Variables, mixins, functions
- **Base**: Reset, typography, utilities
- **Components**: Reusable UI components (buttons, navigation, etc.)
- **Sections**: Page-specific section styles

### BEM Methodology
All CSS follows Block Element Modifier (BEM) naming:
- `.block`
- `.block__element`
- `.block--modifier`

### Responsive Design
- **Mobile-first**: Base styles for mobile, enhanced for larger screens
- **Breakpoints**: Defined in `_sass/abstracts/_variables.scss`
- **Media Queries**: Standard `@media` queries (no mixin dependencies)

### Theme System
- Dark theme with customizable accent colors
- CSS custom properties for easy theme switching
- Consistent color palette across all components

## ⚙️ JavaScript Functionality

### Main Features (`assets/js/main.js`)
1. **Navigation Toggle**: Mobile menu toggle functionality
2. **Language Switcher**: Dropdown toggle and click-outside handling
3. **Portfolio Filtering**: Category-based project filtering with animations
4. **Scroll Progress Bar**: Visual scroll indicator
5. **Cookie Consent**: LocalStorage-based consent management
6. **Video Section**: YouTube embed on click (lazy loading)
7. **Post Feedback**: User feedback system with Google Analytics integration

### Cloud Effect (`assets/js/cloud-effect.js`)
- Animated cloud background for hero section
- Canvas-based animation
- Performance optimized

## 🔍 SEO & Performance

### SEO Features
- Automatic sitemap generation
- Meta tags via `jekyll-seo-tag`
- Open Graph tags for social sharing
- Language-specific meta descriptions
- Structured data ready

### Performance Optimizations
- Static site generation (no server-side processing)
- Minified CSS output
- SVG icons (scalable, lightweight)
- Lazy loading for images
- Deferred JavaScript loading
- Optimized font loading with preconnect

### Analytics
- Google Analytics 4 (GA4) integration
- Event tracking for:
  - Article feedback
  - User interactions
  - Navigation patterns

## 🚀 Development

### Prerequisites
- Ruby 3.3.0+
- Bundler
- Git

### Setup
```bash
# Install dependencies
bundle install

# Start development server
./startdev.sh
# or
bundle exec jekyll serve
```

### Development Server
- URL: `http://localhost:4000`
- Auto-reload on file changes
- Incremental builds enabled

### Build for Production
```bash
bundle exec jekyll build
```

Output will be in `_site/` directory.

## 📦 Deployment

### GitHub Pages
The site is configured for GitHub Pages deployment:
- Repository: `j2thex.github.io`
- Custom domain: `n0thn.com` (via CNAME file)
- Automatic builds on push to main branch

### Build Process
1. Jekyll compiles static files
2. SCSS is compiled to CSS
3. Liquid templates are processed
4. Collections are generated
5. Output written to `_site/`

## 🎯 Key Features

### User Experience
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scrolling and transitions
- ✅ Interactive portfolio filtering
- ✅ Language switching without page reload
- ✅ Cookie consent management
- ✅ Post feedback system
- ✅ Scroll progress indicator

### Content Management
- ✅ Markdown-based content
- ✅ Category and tag system
- ✅ Multi-language support
- ✅ SEO-friendly URLs
- ✅ Image optimization

### Developer Experience
- ✅ Modular SCSS architecture
- ✅ Component-based includes
- ✅ Clear file structure
- ✅ Comprehensive documentation
- ✅ Version control ready

## 📚 Content Guidelines

### Adding a Blog Post
1. Create file in `collections/_posts_{lang}/`
2. Use format: `YYYY-MM-DD-slug.md`
3. Include required front matter
4. Write content in Markdown
5. Add images to `assets/images/posts/`

### Adding a Project
1. Create file in `collections/_projects_{lang}/`
2. Use project slug as filename
3. Include project-specific front matter
4. Add project images to `assets/images/projects/`

### Updating Translations
1. Edit `_data/translations/{lang}.yml`
2. Maintain consistent structure across languages
3. Test language switcher functionality

## 🔧 Configuration

### Jekyll Config (`_config.yml`)
- Site title and description
- Base URL and production URL
- Language configuration
- Collection definitions
- Default front matter values
- Plugin configuration

### Customization Points
- **Colors**: `_sass/abstracts/_variables.scss`
- **Typography**: `_sass/base/_typography.scss`
- **Translations**: `_data/translations/`
- **Services**: `_data/translations/{lang}.yml` → `services` section

## 🐛 Troubleshooting

### Common Issues
1. **Build errors**: Check Ruby version and bundle install
2. **Missing translations**: Verify YAML syntax in translation files
3. **Language switcher not working**: Check URL patterns in language-switcher.html
4. **Styles not updating**: Clear Jekyll cache (`.sass-cache/`)

## 📄 License

Copyright © n0thn Digital Agency. All rights reserved.

## 👥 Contributors

- **Jeff Smith**: Primary developer and content creator

## 🔗 Links

- **Live Site**: https://n0thn.com
- **GitHub**: https://github.com/j2thex/j2thex.github.io
- **Calendly**: https://calendly.com/n0thn

---

**Last Updated**: February 2025
**Jekyll Version**: 4.3.4
**Ruby Version**: 3.3.0+
