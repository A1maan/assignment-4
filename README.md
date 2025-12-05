# Interactive Portfolio Website - Assignment 3

Hello there! 👋 Welcome to my advanced portfolio website, built for SWE 363 Assignment 3 at KFUPM. This iteration builds upon Assignments 1 and 2 by adding complex API integrations, sophisticated application logic, advanced state management, and measurable performance optimizations.

## 🎯 What's New in Assignment 3?

This advanced version demonstrates sophisticated web application development:

### 🔌 Advanced API Integration
- **Pinned GitHub Repos API** - Fetches GitHub pinned repositories using berrysauce API with 6-second timeout protection
- **Inspirational Quotes API** - Real Inspire API with 20+ programming/AI-focused quotes and fallback library
- **Timeout Handling** - AbortController prevents requests from hanging (6-second limit)
- **Data Normalization** - Converts berrysauce API format to GitHub API-like structure for consistent display
- **Graceful Fallbacks** - Application remains functional with fallback quotes when API fails
- **LocalStorage Caching** - Stores repos with timestamp for performance optimization

### 🧠 Complex Application Logic
- **Multi-Step Project Filtering** - Combined category filtering and real-time search with boolean logic
- **Enhanced Form Validation** - Email regex patterns, required field checks, length validation
- **Expandable Cards with State** - Only one card expanded at a time, managed through event delegation
- **Dynamic UI Updates** - Conditional rendering based on application state (loading/error/empty/success)
- **Error Message Customization** - API-specific error messages displayed to users

### 💾 Sophisticated State Management
- **LocalStorage Persistence** - Theme, form submissions, GitHub repos cached with timestamps
- **Cache Expiration Logic** - Timestamps determine if cached data should be refreshed
- **Multi-Field Validation State** - Track which fields are valid/invalid independently
- **Loading State Management** - Show/hide loaders based on async operation status
- **Form Submission State** - Prevent duplicate submissions with disabled button state

### ⚡ Performance Optimization
- **Debounced Search** - Input event debouncing reduces unnecessary re-renders during typing
- **CSS Transform Animations** - Uses `transform` and `opacity` instead of position changes for better performance
- **Event Delegation** - Single parent listener for expandable cards eliminates per-element listeners
- **Efficient Caching** - Conditional API calls based on cache freshness
- **Optimized Grid Layouts** - CSS Grid with `auto-fit` for responsive design without layout thrashing
- **Minified Code** - Reduced JavaScript file size for faster loading

### 🎨 Polished User Experience
- **Comprehensive State Feedback** - Loading spinners, error messages, empty states, success confirmations
- **Smooth Animations** - Staggered card loading, section fade-ins, smooth transitions
- **Visual Validation Feedback** - Real-time field validation with color-coded borders
- **Accessibility** - Semantic HTML, keyboard navigation, ARIA labels
- **Responsive Design** - Works seamlessly across all device sizes

### 🛡️ Robust Error Handling
- **API Error Detection** - Specific handling for 403 rate limits vs. other errors
- **Network Timeout Management** - Aborts requests that take too long
- **User-Friendly Messages** - Technical errors translated to friendly language
- **Graceful Degradation** - Application continues working with static fallback data
- **Console Logging** - Detailed logs for debugging without cluttering UI

## Cumulative Features

### Foundation (From Assignments 1-2)
- ✅ **Responsive Design** - Mobile-first approach with responsive grid layouts
- ✅ **Dark/Light Theme Toggle** - With localStorage persistence across sessions
- ✅ **Smooth Animations** - Section fade-ins, card stagger animations
- ✅ **Time-Based Greeting** - Dynamic greeting updated hourly
- ✅ **Project Filtering & Search** - Combined filtering by 6 categories with real-time search
- ✅ **Form Validation** - Real-time field validation with visual feedback
- ✅ **Mobile Navigation** - Hamburger menu with smooth transitions

### Advanced Features (Assignment 3)
- 🆕 **GitHub API Integration** - Fetch latest repos with timeout and rate limit handling
- 🆕 **Inspirational Quotes API** - Dynamic quotes with fallback library
- 🆕 **API Error Handling** - Specific detection of rate limits, timeouts, network errors
- 🆕 **Advanced State Management** - Cache validation, multi-field form state tracking
- 🆕 **Debounced Search** - Performance optimization for real-time filtering
- 🆕 **Error Message Customization** - API errors translated to user-friendly messages
- 🆕 **Request Timeout Logic** - AbortController prevents hanging requests
- 🆕 **Graceful API Fallbacks** - Static data used when APIs are unavailable

## 📂 What's Inside

### Sections

- **🏠 Hero Section** - Dynamic greeting + professional introduction
- **👨‍💻 About Me** - Background, education, and technical skills
- **💼 Projects Section** - Filterable, searchable project showcase with expandable details
  - 6 featured projects across AI, Deep Learning, Computer Vision, and Web Dev
  - Expandable cards showing full project details on click
  - Real-time filtering and search
  - Loading, error, and empty states
  - Tech tags displayed in expandable content
- **📧 Contact Form** - Enhanced validation with real-time feedback
  - Inline error messages
  - Visual validation indicators
  - Loading states during submission
  - Success confirmation animation

## 🛠 Tech Stack

Keeping it modern but vanilla:
- **HTML5** - Semantic structure with enhanced interactive elements
- **CSS3** - Grid, Flexbox, animations, and keyframes
- **Vanilla JavaScript (ES6+)** - No frameworks, pure modern JS
- **GitHub API** - Fetch repository data (optional enhancement)
- **LocalStorage API** - Client-side data persistence
- **Google Fonts** (Inter) - Clean, professional typography
- **Git & GitHub** - Version control and hosting

## 🚀 How to Run This Locally

Super easy setup:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/A1maan/assignment-2.git
   cd assignment-2
   ```

2. **Open in browser**:
   
   **Option A**: Simply open `index.html` in your browser
   
   **Option B**: Use a local server (recommended for API features):
   ```bash
   # Python
   python -m http.server 8000
   # Then visit: http://localhost:8000
   
   # Node.js
   npx serve .
   # Or
   npx http-server
   
   # VS Code Live Server
   # Right-click index.html → "Open with Live Server"
   ```

3. **That's it!** 🎉 The site is now running locally.

> **Note**: The GitHub API integration works best with a local server due to CORS policies.

## 📁 Project Structure

```
assignment-2/
├── index.html              # Enhanced HTML with interactive elements
├── css/
│   └── styles.css          # Enhanced styling with animations
├── js/
│   └── script.js           # Interactive features & API integration
├── assets/
│   └── images/
│       └── pfp.jpeg        # Profile picture
├── docs/
│   ├── ai-usage-report.md  # Detailed AI usage documentation
│   └── technical-documentation.md  # Complete technical specs
├── README.md               # Project overview (you're here!)
└── .gitignore             # Git ignore rules
```

## 🌐 Live Demo

🚀 **[View Live Site](https://almaan-portfolio.netlify.app/)**

## 📚 What I Learned (Assignment 3)

### Advanced JavaScript Concepts
- ✅ **API Integration Architecture** - Designing robust, fault-tolerant API calls
- ✅ **Error Handling Strategies** - Detecting specific error types (rate limits, timeouts, network errors)
- ✅ **AbortController Pattern** - Implementing request timeouts to prevent hanging
- ✅ **Cache Management** - Building cache validation with timestamps
- ✅ **Event Delegation** - Optimizing performance for dynamic content
- ✅ **Async Error Recovery** - Implementing graceful fallbacks

### State Management Mastery
- ✅ **Multi-Level State Tracking** - Managing form fields, API status, user preferences
- ✅ **Stateful UI Rendering** - Conditionally showing loading/error/empty/success states
- ✅ **Data Persistence** - Caching with expiration logic across sessions
- ✅ **State Synchronization** - Keeping UI and localStorage in sync

### Performance Engineering
- ✅ **Input Debouncing** - Reducing unnecessary function calls during user input
- ✅ **CSS Transform Optimization** - Using transforms for smooth animations
- ✅ **API Call Optimization** - Minimizing requests through intelligent caching
- ✅ **Memory Management** - Efficient event listener cleanup

### Professional Development Practices
- ✅ **Error Message UX** - Translating technical errors to user-friendly language
- ✅ **API Contract Understanding** - Learning rate limits, response formats, error codes
- ✅ **Testing Mindset** - Systematically testing error scenarios and edge cases
- ✅ **Documentation** - Clear technical docs explaining complex logic
- ✅ **Responsible AI Usage** - Leveraging AI while maintaining full code ownership
  
---
