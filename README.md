# Product Requirements Document (PRD)
## I-Cell Defence Hackathon Website

**Version:** 1.0  
**Last Updated:** February 10, 2026  
**Project Owner:** I-Cell Club  
**Designer/Developer:** TBD

---

## 1. Executive Summary

### 1.1 Project Overview
A visually stunning, interactive single-page website for I-Cell's defence-themed hackathon. The site will feature a military-inspired design with camouflage color palette, immersive animations, and unique interactive elements that set it apart from typical hackathon websites.

### 1.2 Goals
- Create an award-winning, memorable first impression
- Effectively communicate hackathon details (hardware & software tracks)
- Drive registrations through engaging UX
- Establish I-Cell's brand as innovative and professional
- Achieve 90%+ mobile responsiveness score
- Load time under 3 seconds on standard connections

## 2. Design System

### 2.1 Color Palette
**Primary (Camouflage Base):**
- `#B39C4D` - Desert Sand (primary background)
- `#768948` - Olive Drab (secondary sections)
- `#607744` - Military Green (cards/containers)
- `#34623F` - Forest Green (accents)
- `#1E2F23` - Dark Tactical (footer/deep sections)

**Accent Colors:**
- **Option A (Danger):** `#D42D1F` - Military Red (CTAs, highlights)
- **Option B (Alert):** `#FFB800` - Signal Yellow (alternative accents)
- **Choice:** Use Red as primary accent, Yellow for warnings/special alerts

**Utility:**
- White: `#F5F5F5` - Text on dark backgrounds
- Gray: `#A0A0A0` - Secondary text
- Black: `#0A0A0A` - Deepest backgrounds

### 2.2 Typography
**Primary Font:** 'Rajdhani' or 'Orbitron' (military-tech feel)
- Headings: 700 weight, uppercase, letter-spacing: 2px
- Body: 'Inter' or 'Space Grotesk', 400 weight
- Monospace: 'JetBrains Mono' (for code/technical details)

**Size Scale:**
- H1: 4rem (64px) - Hero titles
- H2: 3rem (48px) - Section headers
- H3: 2rem (32px) - Subsections
- Body: 1.125rem (18px)
- Small: 0.875rem (14px)

### 2.3 Visual Style
- **Theme:** Dark mode with camouflage patterns
- **Effects:** Grain texture overlay, subtle noise
- **Borders:** Angular/geometric (military aesthetic)
- **Shadows:** Soft glows with accent colors
- **Icons:** Line-based, military-inspired
- **Images:** Desaturated with green/red tints

---

## 3. Core Features & Sections

### 3.1 Custom Cursor (Crosshair)
**Description:** Replace default cursor with animated military crosshair

**Specifications:**
- SVG-based crosshair (scalable, crisp)
- Two states:
  - **Default:** Standard crosshair with subtle pulse
  - **Hover:** Expands with red accent, "lock-on" animation
- Smooth 60fps tracking
- Hide on mobile/touch devices
- Custom cursor for clickable elements (button hover = target acquired effect)

**Technical Implementation:**
```javascript
// Custom cursor with GSAP
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.15
  });
});
```

**Awards Website Inspiration:** Awwwards.com cursor interactions, smooth trailing effects

---

### 3.2 Navigation Bar

**Layout:** Fixed, transparent background with backdrop blur

**Elements:**
- **Logo:** I-Cell emblem (left) with subtle glow effect
- **Nav Links:** Home, About, Hackathon, Problems, Timeline, Prizes, FAQ, Sponsors
- **CTA Button:** "Register Now" (red accent, tactical border)
- **Hamburger Menu:** Animated to crosshair/target icon on mobile

**Interactions:**
- Scroll-triggered background fade-in (glassmorphism)
- Active section highlight with red underline animation
- Smooth scroll to sections with easing
- Mobile: Full-screen overlay with staggered menu item animations

**Inspiration from References:**
- Lando Norris site: Clean, minimal nav with smooth transitions
- Janissne: Bold typography, clear hierarchy

---

### 3.3 Hero Section

**Concept:** "Mission Briefing" - Immersive 3D/WebGL experience

**Layout:**
- Full viewport height (100vh)
- Centered content with layered depth
- Background: Animated topographic map lines or radar sweep

**Key Elements:**

1. **Animated Title:**
   - "OPERATION: [HACKATHON NAME]" 
   - Glitch effect on load
   - Text scramble/decode animation
   - Parallax movement on mouse move

2. **3D Interactive Element (Choose One):**
   
   **Option A - Rotating Tactical Map:**
   - Three.js rendered 3D terrain/grid
   - User can rotate via mouse drag
   - Pins marking "mission objectives" (hackathon tracks)
   
   **Option B - Holographic Display:**
   - Futuristic HUD interface
   - Real-time "system diagnostics" (fake terminal readout)
   - Scanning effect revealing hackathon date/theme
   
   **Option C - Particle System:**
   - WebGL particle field forming I-Cell logo
   - Interactive: particles react to mouse, creating formation shifts

3. **CTA Section:**
   - Primary: "ENLIST NOW" button (pulsing red glow)
   - Secondary: "VIEW MISSION BRIEF" (scroll indicator)
   - Countdown timer to hackathon (digital military-style)

4. **Background Effects:**
   - Subtle camo pattern overlay (10% opacity)
   - Animated spotlight/searchlight sweep
   - Depth of field blur on background elements

**Technical Stack:**
- Three.js for 3D elements
- GSAP for animations
- Shaders for custom effects (optional: glitch, chromatic aberration)

**Awards Inspiration:**
- Awwwards SOTD sites: Immersive WebGL experiences
- Active Theory projects: Interactive 3D storytelling
- Resn.co.nz: Smooth scroll interactions

**Performance Considerations:**
- Fallback 2D version for low-end devices
- Lazy load heavy assets
- Reduce particles on mobile

---

### 3.4 About I-Cell Section

**Concept:** "Intelligence Brief" - Who are we

**Layout:** 
- Two-column grid (60/40 split)
- Left: Text content
- Right: Image/graphic (team photo with camo overlay or I-Cell logo 3D render)

**Content:**
- Club mission statement
- Past achievements (stats with counter animations)
- Why we're organizing this hackathon

**Animations:**
- Fade-in on scroll with stagger
- Number counters (participants, events, years)
- Parallax on image

**Design Details:**
- Classified document aesthetic (stamped "APPROVED", file tabs)
- Torn paper edges on images
- Morse code or binary in background (decorative)

---

### 3.5 About Hackathon Section

**Concept:** "Mission Parameters"

**Layout:**
- Centered content, max-width container
- Icon grid for key info

**Content Structure:**

**Headline:** "THE MISSION"

**Key Info Cards (2x2 grid):**
1. **Duration:** "48-HOUR OPERATION"
2. **Participants:** "TEAM SIZE: 2-4 UNITS"
3. **Tracks:** "HARDWARE | SOFTWARE"
4. **Theme:** "DEFENCE & TACTICAL SOLUTIONS"

**Description:**
Engaging paragraph about the hackathon's purpose, defence focus, and what participants will build.

**Animations:**
- Cards flip-in on scroll
- Icon hover: Scale + red glow
- Background: Animated circuit board pattern

**Design:**
- Cards with angled corners (clip-path)
- Icons: Custom SVGs (shield, chip, code brackets, wrench)

---

### 3.6 Problem Statements Section

**Concept:** "Tactical Objectives"

**Layout:**
- Tabbed interface: HARDWARE | SOFTWARE
- Problem cards in grid (masonry or equal heights)

**Card Design:**
- Title: Problem statement name
- Difficulty badge (EASY/MEDIUM/HARD with color coding)
- Brief description (2-3 lines)
- "VIEW DETAILS" expandable accordion or modal
- Stamped "CLASSIFIED" icon

**Interactions:**
- Tab switch: Slide transition with fade
- Card hover: Lift effect (transform: translateY)
- Click: Expand with smooth height animation
- Background: Radar sweep animation

**Content Example:**
```
HARDWARE TRACK
├── Problem 1: Autonomous Surveillance Drone
│   └── Difficulty: HARD
├── Problem 2: Secure Communication Device
│   └── Difficulty: MEDIUM
└── Problem 3: Field Sensor Network
    └── Difficulty: EASY

SOFTWARE TRACK
├── Problem 1: Threat Detection AI
│   └── Difficulty: HARD
├── Problem 2: Encrypted Messaging App
│   └── Difficulty: MEDIUM
└── Problem 3: Resource Allocation Optimizer
    └── Difficulty: EASY
```

**Design Details:**
- Hex pattern background
- Glowing borders on hover
- Icons representing each problem category

---

### 3.7 Timeline Section ⭐ (SIGNATURE FEATURE)

**Concept:** "Battle Plan" - Pixel Art Tank Journey

**Layout:**
- Horizontal scrolling timeline (desktop)
- Vertical scrolling (mobile)
- Full-width section with custom background

**The Tank Animation:**

**Design:**
- Custom pixel-art tank sprite (32x32 or 64x64 pixels)
- Animated tracks (loop)
- Turret slightly rotates
- Smoke particles from exhaust

**Movement:**
- Tank travels along the timeline path
- Scroll-triggered: Tank advances as user scrolls
- Reaches each checkpoint (event) and pauses briefly
- Optional: Tank "fires" when reaching major milestones

**Timeline Events (Example):**
```
START
│
├── DAY 1: 0800 HRS
│   ├── Registration Opens
│   ├── Opening Ceremony
│   └── Team Formation
│
├── DAY 1: 1000 HRS
│   └── Hacking Begins
│
├── DAY 1: 1300 HRS
│   └── Lunch Break
│
├── DAY 1: 1800 HRS
│   └── Mentor Checkpoint 1
│
├── DAY 2: 0900 HRS
│   └── Mid-Event Review
│
├── DAY 2: 1400 HRS
│   └── Submission Deadline
│
└── DAY 2: 1600 HRS
    └── Presentations & Awards
```

**Event Nodes:**
- Circular checkpoints with red ring
- Event title + time
- Icon for event type (fork for meals, microphone for ceremonies)
- "CURRENT" node highlights in yellow if event is ongoing

**Technical Implementation:**
- Canvas or SVG for tank
- ScrollMagic or Locomotive Scroll for scroll-based animation
- GSAP for smooth tank movement
- Particle system for tank effects

**Interactions:**
- Click event node: Expand details (modal or inline)
- Hover tank: Wiggle animation
- Background: Parallax terrain layers (hills, trees in pixel art)

**Mobile Adaptation:**
- Vertical timeline with tank moving down
- Tap nodes to expand details

**Awards Inspiration:**
- Firewatch game website: Parallax landscape
- Monument Valley: Minimalist, artistic journey metaphor

---

### 3.8 Prizes Section

**Concept:** "Mission Rewards"

**Layout:**
- Podium display (1st, 2nd, 3rd place)
- 3D-rendered medal/trophy graphics
- Prize breakdowns

**Prize Tiers:**

**1st Place: "GOLD OPERATION"**
- Amount: ₹XX,XXX
- Trophy/Medal visual
- Additional perks (swag, certificates, internship opportunities)

**2nd Place: "SILVER MISSION"**
- Amount: ₹XX,XXX
- Visual asset

**3rd Place: "BRONZE DEPLOYMENT"**
- Amount: ₹XX,XXX
- Visual asset

**Special Categories:**
- Best Hardware Hack
- Best Software Solution
- Most Innovative Idea
- Best Beginner Team

**Animations:**
- Medals spin on hover (3D CSS or Three.js)
- Shine/glint effect
- Prize amounts count up on scroll-in

**Design:**
- Podium with spotlight effects
- Confetti particles (subtle)
- Gold/silver/bronze gradient overlays

---

### 3.9 Sponsors Section

**Concept:** "Allied Forces"

**Layout:**
- Logo grid (responsive columns)
- Tiered sections: Platinum, Gold, Silver, Bronze

**Design:**
- Logos in grayscale, color on hover
- Smooth scale transform on hover
- Sponsor tier labels with military ranks (General, Colonel, Captain)

**Animations:**
- Logos fade in with stagger
- Hover: Logo glows with accent color

**Additional:**
- "Become a Sponsor" CTA with link to sponsorship deck

---

### 3.10 FAQ Section

**Concept:** "Intel Briefing"

**Layout:**
- Accordion-style Q&A
- Two-column grid (3 FAQs per column)

**FAQ Categories:**
- Eligibility
- Registration
- Team Formation
- Submission Guidelines
- Judging Criteria
- Logistics (food, accommodation)

**Design:**
- Question: Bold, with chevron icon
- Answer: Hidden by default, expands on click
- Smooth height animation

**Interactions:**
- Click to expand/collapse
- Only one answer open at a time (accordion behavior)
- Highlight active question in red

**Animations:**
- Chevron rotates 180° when expanded
- Answer fades in with slide-down

---

### 3.11 Footer

**Concept:** "Mission Control"

**Layout:**
- Three-column grid
- Dark background (#1E2F23) with noise texture

**Columns:**

**1. Contact Info:**
- Email: hackathon@icell.edu
- Phone: +91-XXXX-XXXXXX
- Social media icons (LinkedIn, Instagram, Twitter, Discord)

**2. Quick Links:**
- Register
- View Problems
- Code of Conduct
- Privacy Policy
- Past Events

**3. Newsletter Signup:**
- "Stay Briefed" headline
- Email input + Submit button
- "Get updates on hackathon announcements"

**Bottom Bar:**
- Copyright © 2026 I-Cell. All rights reserved.
- "Built with ❤️ by I-Cell Team"
- Scroll-to-top button (rocket/missile icon)

**Design:**
- Subtle gradient overlay
- Social icons: Outlined, glow on hover
- Input field: Military-style (monospace, green cursor)

---

## 4. Advanced Interactions & Animations

### 4.1 Scroll-Based Animations
**Library:** GSAP ScrollTrigger or Locomotive Scroll

**Effects:**
- **Parallax:** Background elements move slower than foreground
- **Reveal:** Sections fade/slide in as they enter viewport
- **Pin:** Hero section pins while content scrolls over (optional)
- **Horizontal Scroll:** Timeline section scrolls horizontally on vertical scroll

### 4.2 Micro-Interactions

**Button Hover:**
- Scale: 1.05
- Glow effect (box-shadow with red)
- Ripple animation on click

**Card Hover:**
- Lift: translateY(-10px)
- Border glow
- Shadow intensifies

**Form Inputs:**
- Focus: Border animates (stroke-dasharray)
- Valid: Green checkmark appears
- Invalid: Red shake animation

### 4.3 Loading Experience

**Preloader:**
- "LOADING MISSION DATA..."
- Progress bar (0-100%)
- I-Cell logo with pulse animation
- Background: Radar sweep or sonar ping

**Transition:**
- Preloader fades out
- Hero section fades in with slight scale
- Total duration: 2-3 seconds

### 4.4 Page Transitions
- Smooth scroll (easing function: easeInOutCubic)
- Section transitions: Crossfade
- No jarring cuts or hard scrolls

---

## 5. Technical Specifications

### 5.1 Tech Stack

**Frontend:**
- **Framework:** React.js (with Next.js for SSG/SEO) 
- **Styling:** Tailwind CSS + Custom CSS (for complex animations)
- **Animations:** GSAP, Three.js
- **Scroll:** Locomotive Scroll or ScrollMagic
- **Icons:** Lucide React or custom SVGs

**Build Tools:**
- Next.js
- PostCSS for CSS processing, Tailwind
- Image optimization: Sharp, next/image

**Hosting:**
- Vercel, Netlify, or GitHub Pages
- CDN for assets
- SSL certificate

### 5.2 Performance Targets
- **Lighthouse Score:** 90+ (Performance, Accessibility, SEO)
- **First Contentful Paint (FCP):** < 1.5s
- **Time to Interactive (TTI):** < 3.5s
- **Bundle Size:** < 500KB (gzipped)

**Optimization Strategies:**
- Code splitting
- Lazy loading for images and 3D assets
- Minification
- Tree shaking
- WebP images with fallbacks
- Preload critical fonts

### 5.3 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile: iOS Safari 14+, Chrome Android 90+

**Fallbacks:**
- Simplified animations for older browsers
- 2D alternatives for WebGL
- No custom cursor on touch devices

### 5.4 Responsiveness Breakpoints
```css
/* Mobile First */
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

**Mobile Considerations:**
- Hamburger menu
- Stacked layouts
- Touch-friendly targets (min 44px)
- Vertical timeline
- Reduced animations (performance)

---

## 6. Content Requirements

### 6.1 Copywriting Tone
- **Voice:** Authoritative, energetic, military-inspired
- **Style:** Short, punchy sentences. Active voice.
- **Terminology:** Use military lingo sparingly (don't overdo it)
  - "Mission" instead of "Event"
  - "Deploy" instead of "Submit"
  - "Enlist" instead of "Register"
  - "Team" = "Squad" or "Unit"

### 6.2 Required Content (Client to Provide)
- I-Cell club description (150-200 words)
- Hackathon overview (250-300 words)
- Problem statements (6-8 total, 100 words each)
- Timeline events (exact dates/times)
- Prize amounts and sponsor logos
- FAQs (at least 10 questions)
- Team photos or graphics
- Code of Conduct document link

### 6.3 Media Assets Needed
- I-Cell logo (SVG, high-res PNG)
- Sponsor logos (vector preferred)
- Stock military/tech imagery (properly licensed)
- Optional: Past event photos
- Trophy/medal 3D models or illustrations

---

## 7. SEO & Accessibility

### 7.1 SEO Optimization
- **Meta Tags:** Title, description, OG tags for social sharing
- **Structured Data:** Event schema markup (JSON-LD)
- **Sitemap:** Generate XML sitemap
- **Robots.txt:** Allow crawling
- **Canonical URLs:** Set canonical tags
- **Alt Text:** All images have descriptive alt attributes

**Example Meta:**
```html
<title>I-Cell Defence Hackathon 2026 | Hardware & Software Challenges</title>
<meta name="description" content="Join I-Cell's 48-hour defence-themed hackathon. Solve real-world hardware and software problems. Win prizes up to ₹XX,XXX.">
<meta property="og:image" content="[URL to social share image]">
```

### 7.2 Accessibility (WCAG 2.1 AA)
- **Keyboard Navigation:** All interactive elements accessible via Tab
- **Screen Reader Support:** Semantic HTML, ARIA labels
- **Color Contrast:** Minimum 4.5:1 for text
- **Focus Indicators:** Visible focus states
- **Alt Text:** Descriptive for all images
- **Skip Links:** "Skip to main content" link
- **No Autoplay:** Videos/audio user-initiated

**Testing:**
- Use axe DevTools or WAVE
- Manual keyboard testing
- Screen reader testing (NVDA, JAWS)
---
## 8. Additional Features (Nice-to-Have)

### 8.1 Easter Eggs
- **Konami Code:** Triggers confetti or secret message
- **Hidden Tank Game:** Mini pixel-art game in console or hidden page
- **Morse Code:** Hidden message in footer that reveals bonus prize

### 8.2 Live Elements
- **Registration Counter:** "X teams enlisted" (updates in real-time)
- **Discord Live Chat Widget:** Embedded chat for questions
- **Twitter Feed:** Show #IcellHackathon tweets

### 8.3 Gamification
- **Leaderboard (Pre-Event):** Teams that register early get spotlight
- **Achievement Badges:** For completing milestones (register, join Discord, share)

### 8.4 Virtual Swag
- **Downloadable Kit:** Wallpapers, profile banners, stickers (digital)
- **AR Filter:** Instagram/Snapchat filter with I-Cell branding

---

## 9. Project Timeline

### Phase 1: Design (Week 1-2)
- [ ] Wireframes (all sections)
- [ ] Visual design mockups (desktop + mobile)
- [ ] Asset creation (tank pixel art, icons, graphics)
- [ ] Design system documentation

### Phase 2: Development (Week 3-5)
- [✅] Setup project (repo, environment)
- [ ] Develop core structure (HTML/React components)
- [ ] Implement navigation and routing
- [ ] Build Hero section with 3D/WebGL
- [ ] Develop all content sections
- [ ] **MILESTONE:** Tank timeline animation complete
- [ ] Implement scroll animations
- [ ] Custom cursor integration
- [ ] Form validation and submission

### Phase 3: Testing & Optimization (Week 6)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Performance optimization (Lighthouse audit)
- [ ] Accessibility audit
- [ ] SEO implementation
- [ ] Bug fixes

### Phase 4: Deployment (Week 7)
- [ ] Final content review
- [ ] Deploy to staging
- [ ] Client review and feedback
- [ ] Deploy to production
- [ ] Monitor analytics and fix issues

---

## 10. Success Metrics

### 10.1 Quantitative KPIs
- **Traffic:** 5,000+ unique visitors in first week
- **Registrations:** 100+ teams (400+ participants)
- **Engagement:** Average session duration > 2 minutes
- **Bounce Rate:** < 40%
- **Conversion Rate:** 15% of visitors register

### 10.2 Qualitative Goals
- Positive user feedback on design
- Social media shares (target: 50+ organic shares)
- Media coverage or blog features
- Award site consideration (Awwwards, CSS Design Awards)

### 10.3 Analytics Setup
- **Google Analytics 4:** Track pageviews, events, conversions
- **Hotjar/Microsoft Clarity:** Heatmaps and session recordings
- **Event Tracking:**
  - Button clicks (Register, View Problems)
  - Section visibility (scroll depth)
  - Form submissions

---

## 11. Risk Mitigation

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| Complex animations cause performance issues | High | Implement fallbacks, lazy loading, test on low-end devices |
| 3D assets fail to load on some browsers | Medium | Provide 2D alternative, feature detection |
| Content not ready on time | Medium | Use placeholder content, phased content updates |
| Accessibility issues post-launch | Low | Conduct accessibility audit before launch, quick-fix protocol |
| Hosting costs exceed budget | Low | Use free tier of Vercel/Netlify, optimize assets |

---

## 12. Post-Launch Maintenance

### 12.1 Immediate Post-Launch (Week 1)
- Monitor error logs and fix critical bugs
- Update FAQs based on user questions
- Add new sponsors as they confirm
- Respond to feedback on social media

### 12.2 Ongoing Updates (Pre-Event)
- Weekly: Update registration counter
- Bi-weekly: Add new problem statements if any
- As needed: Update timeline if changes occur

### 12.3 Post-Event
- Archive event with "MISSION COMPLETE" banner
- Add photo gallery from hackathon
- Announce winners with spotlight section
- Convert to template for next year's event

---

## 13. Inspiration & Reference Library

### 13.1 Award-Winning Sites (Study These)
1. **Awwwards.com** - SOTD winners, especially:
   - Interactive WebGL experiences
   - Scroll-based storytelling
   - Micro-interactions

2. **Lando Norris** (landonorris.com)
   - Clean navigation
   - Smooth transitions
   - Minimalist hero design

3. **Janissne** (janissne.com)
   - Bold typography
   - Dark theme execution
   - Layout creativity

4. **Active Theory** (activetheory.net)
   - 3D integration
   - Performance optimization
   - Storytelling through interaction

5. **Resn** (resn.co.nz)
   - Creative scroll effects
   - Particle systems
   - Unique loading experiences

### 13.2 Technical References
- **Three.js Examples:** threejs.org/examples
- **GSAP Showcase:** greensock.com/showcase
- **Locomotive Scroll Demos:** locomotivemtl.github.io/locomotive-scroll
- **Codepen:** Search "military UI", "tactical HUD", "pixel art animation"

### 13.3 Military/Defence Design Inspiration
- **Call of Duty** UI/menus
- **Rainbow Six Siege** operator cards
- **ARMA 3** HUD elements
- **Metal Gear Solid** codec screens
- **Firewatch** minimalist military aesthetic

---

## 14. Open Questions & Decisions Needed

### 14.1 From Client (I-Cell)
- [ ] Confirm hackathon dates and exact timeline
- [ ] Provide problem statements content
- [ ] Finalize prize amounts
- [ ] Approve sponsor tier structure
- [ ] Decide on registration platform integration (Devfolio, custom form)
- [ ] Confirm domain name
- [ ] Provide brand assets (logo, colors if specific shades needed)

### 14.2 Design Decisions
- [ ] Hero section: Which of the 3 interactive concepts (map, hologram, particles)?
- [ ] Accent color: Red or yellow primary? (Recommend red)
- [ ] Tank animation: Left-to-right or right-to-left movement?
- [ ] Include background music toggle (subtle military theme)?

### 14.3 Technical Decisions
- [ ] Framework: React/Next.js or Vanilla JS?
- [ ] Form backend: Google Forms embed, custom backend, or Devfolio?
- [ ] Analytics: GA4, Vercel Analytics, or both?

---

## 15. Budget Estimation (Optional)

| Item | Estimated Cost |
|------|----------------|
| Domain name (.com) | $10-15/year |
| Hosting (Vercel/Netlify) | $0 (free tier) |
| Stock images/assets (if needed) | $30-50 |
| Email service (newsletter) | $0 (free tier Mailchimp) |
| **Total** | **$40-65** |

**Note:** Assumes in-house development. If outsourcing design/dev, costs would be significantly higher ($1,000-5,000 depending on complexity).

---

## 16. Appendix

### 16.1 Color Hex Reference
```
PRIMARY PALETTE:
#B39C4D - Desert Sand
#768948 - Olive Drab  
#607744 - Military Green
#34623F - Forest Green
#1E2F23 - Dark Tactical

ACCENTS:
#D42D1F - Military Red
#FFB800 - Signal Yellow

UTILITY:
#F5F5F5 - Off White
#A0A0A0 - Gray
#0A0A0A - True Black
```

### 16.2 Font Stack
```css
/* Headers */
font-family: 'Rajdhani', 'Orbitron', 'Teko', sans-serif;

/* Body */
font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;

/* Monospace */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### 16.3 Example Code Snippets

**Custom Cursor Implementation:**
```javascript
// cursor.js
const cursor = document.querySelector('.cursor');
const cursorInner = document.querySelector('.cursor-inner');

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
  });
});
```

**Tank Animation (ScrollTrigger):**
```javascript
// timeline-tank.js
gsap.to('.tank', {
  x: '100%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.timeline-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1
  }
});
```

---

## Document Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Feb 10, 2026 | Initial PRD creation | Claude |

---

**END OF DOCUMENT**

This PRD is a living document and should be updated as the project evolves. For questions or clarifications, contact the project stakeholders.