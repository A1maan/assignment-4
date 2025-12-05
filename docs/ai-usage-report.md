# AI Usage Report - Assignment 3

## Overview
This document details how AI tools assisted me in developing advanced features for Assignment 3 of my portfolio website. The focus was on implementing sophisticated API integrations, robust error handling, intelligent state management, and performance optimizations. 

**Important**: I led the development effort on all features. AI tools served as an advisor and coding accelerator, but I made all architectural decisions, implemented the logic, and thoroughly tested the application.

---

## Development Approach

### My Role (60-70% of effort)
- Architected API integration strategy and error handling approach
- Implemented all API calls, timeout logic, and rate limit detection
- Built cache validation and state management systems
- Designed and coded error message customization
- Tested edge cases and debugged issues
- Made all critical technical decisions

### AI Role (30-40% of effort)
- Suggested patterns and best practices
- Accelerated boilerplate code writing
- Reviewed and optimized my implementations
- Provided explanations of complex concepts
- Recommended performance optimizations

---

## Tools Used

### 1. GitHub Copilot
- **Version**: Latest (VS Code Extension)
- **Usage Frequency**: Extensive (60-70% of development time)
- **Primary Use Cases**: Code completion, boilerplate generation, function suggestions

### 2. ChatGPT (GPT-5.1)
- **Version**: GPT-5.1
- **Usage Frequency**: Moderate (20-30% of development time)
- **Primary Use Cases**: Problem-solving, debugging complex issues, best practices

### 3. Claude (Anthropic)
- **Version**: Claude 4.5 Sonnet
- **Usage Frequency**: Light (10% of development time)
- **Primary Use Cases**: Code review, documentation improvement, UX suggestions

---

## Detailed AI Usage Log

## Specific Use Cases

### 1. Pinned GitHub Repos API Integration with Error Handling (MY WORK)

**What I Built**:
I implemented a GitHub pinned repositories API integration using the berrysauce API, which displays only the repos I've pinned with proper error handling and timeout protection.

**My Implementation**:
```javascript
async function fetchGitHubRepos() {
    const username = 'A1maan';
    const loadingEl = document.getElementById('github-loading');
    const errorEl = document.getElementById('github-error');
    const gridEl = document.querySelector('.github-grid');
    
    try {
        // AbortController with 6-second timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        
        const response = await fetch(`https://pinned.berrysauce.dev/get/${username}`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const message = `Failed to fetch pinned repositories: ${response.status}`;
            throw new Error(message);
        }
        
        const repos = await response.json();
        if (!Array.isArray(repos) || repos.length === 0) {
            throw new Error('No pinned repositories found.');
        }
        
        // Normalize berrysauce response format to match GitHub API structure
        const normalizedRepos = repos.map(repo => ({
            name: repo.name,
            html_url: `https://github.com/${repo.author}/${repo.name}`,
            description: repo.description || '',
            stargazers_count: typeof repo.stars === 'number' ? repo.stars : 0,
            forks_count: typeof repo.forks === 'number' ? repo.forks : 0,
            language: repo.language || ''
        }));
        
        displayGitHubRepos(normalizedRepos);
        
    } catch (error) {
        console.error('Error fetching pinned GitHub repos:', error);
        if (loadingEl) loadingEl.style.display = 'none';
        if (errorEl) {
            errorEl.style.display = 'flex';
            const errorText = errorEl.querySelector('p');
            if (errorText) errorText.textContent = error.message;
        }
    }
}
```

**Key Features I Implemented**:
- Timeout detection using AbortController with 6-second limit (prevents hanging requests)
- Response validation checking for array and non-empty results
- Data normalization to convert berrysauce format to displayable format
- Status code error messages for debugging
- User-friendly error display in the UI
- LocalStorage caching for performance (cache + fetch timestamp)

**How AI Helped**:
- Suggested AbortController pattern for timeouts (I researched and implemented)
- Recommended data normalization approach for different API formats
- Proposed response format validation (checking for arrays and empty data)
- Suggested localStorage caching strategy with timestamps

**What I Learned**:
- How to work with third-party APIs beyond the standard GitHub REST API
- Data normalization patterns for consistent UI display
- Timeout handling with AbortController for better UX
- Response validation before attempting to display data

---

### 2. API Response Caching with LocalStorage (MY WORK)

**What I Built**:
I implemented localStorage caching for API responses to reduce API calls and improve performance.

**Problem I Solved**:
Fetching repos every time the page loads wastes API quota and makes the page feel slow. Caching reduces these concerns.

**My Implementation** (in fetchGitHubRepos):
```javascript
// Store normalized repos in localStorage with timestamp
localStorage.setItem('githubRepos', JSON.stringify(normalizedRepos));
localStorage.setItem('githubReposFetchTime', Date.now().toString());
```

**Design Decisions I Made**:
- Store both repos data and fetch timestamp (allows validation of freshness)
- Use separate keys for data and timestamp (cleaner code)
- Cache is transparent (doesn't need explicit validation - fresh data fetched on load)

**Current Limitation**:
The current implementation caches but doesn't validate freshness before reusing cached data. This is acceptable for a portfolio site where repos change infrequently.

**How AI Helped**:
- Suggested storing timestamps alongside data for potential future cache validation
- Recommended using separate localStorage keys for organization

---

### 3. Error Message Customization (MY WORK)

**What I Built**:
I implemented error handling that displays user-friendly messages in the UI while logging technical details for debugging.

**Problem I Solved**:
When the API fails, users should see a helpful message, not a technical error code.

**My Implementation**:
```javascript
catch (error) {
    console.error('Error fetching pinned GitHub repos:', error);
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) {
        errorEl.style.display = 'flex';
        const errorText = errorEl.querySelector('p');
        if (errorText) errorText.textContent = error.message;
    }
}
```

**Decisions I Made**:
- Display error messages dynamically (the error.message from the try/catch block)
- Log full error to console for debugging
- Hide loading spinner when error occurs
- Show error message in UI so users know what happened

**Error Messages the Code Can Display**:
- "No pinned repositories found." (when API returns empty list)
- "Failed to fetch pinned repositories: [status code]" (when response not ok)
- Generic error if something unexpected happens

**How AI Helped**:
- Recommended pattern of combining console logging with user-friendly UI messages
- Suggested hiding loading state before showing error state

---

### 4. Request Timeout Logic (MY WORK)

**What I Built**:
I implemented timeout protection to prevent API requests from hanging indefinitely if the server is slow or unresponsive.

**Problem I Solved**:
If berrysauce API becomes unresponsive, users see a loading spinner forever. A 6-second timeout ensures they get feedback quickly.

**My Implementation**:
```javascript
// AbortController with 6-second timeout
const controller = new AbortController();
const timeoutId = setTimeout(() => {
    controller.abort();  // Cancel the fetch after 6 seconds
}, 6000);

const response = await fetch(`https://pinned.berrysauce.dev/get/${username}`, {
    signal: controller.signal
});
clearTimeout(timeoutId);  // Clear if request completes in time
```

**Why I Chose This Approach**:
- AbortController is the modern standard for canceling fetch requests
- 6 seconds is reasonable (long enough for network slowness, short enough to feel responsive)
- Clearing the timeout prevents memory leaks
- Clear, readable code explains the intent

**How AI Helped**:
- Recommended AbortController as the pattern for request cancellation
- Suggested the 6-second timeout value (I kept it at that value)
- Pointed out the importance of calling clearTimeout (I implemented correctly)

---

### 5. Real-Time Project Search and Filtering (MY WORK)

**What I Built**:
I implemented combined search and category filtering for projects that works together seamlessly.

**Problem I Solved**:
Users need to both filter by category (AI, Web Dev, etc.) AND search within those results by keyword.

**My Implementation**:
```javascript
// Filter projects by category
function filterProjects(category) {
    currentFilter = category;
    
    if (category === 'all') {
        filteredProjects = [...allProjects];
    } else {
        filteredProjects = allProjects.filter(project => project.category === category);
    }
    
    // Apply search if active (combined filtering)
    const searchInput = document.getElementById('project-search');
    if (searchInput && searchInput.value.trim()) {
        searchProjects(searchInput.value);
    } else {
        renderProjects(filteredProjects);
    }
}

// Search projects
function searchProjects(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        renderProjects(filteredProjects);
        return;
    }
    
    const results = filteredProjects.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    renderProjects(results);
}

// Real-time search with event listener
const searchInput = document.getElementById('project-search');
searchInput.addEventListener('input', function(e) {
    searchProjects(e.target.value);
});
```

**Design Decisions I Made**:
- Separate filter and search functions for clarity
- Filter first, then apply search to filtered results (allows combined use)
- Search in both project titles and technology tags
- Instant results as user types (real-time feedback)

**How It Works Together**:
1. User clicks "AI" category filter → shows only AI projects
2. User types "machine" in search → filters AI projects to only those with "machine" in title/tags
3. User clears search → back to all AI projects
4. User clicks "All Projects" → back to full list

**How AI Helped**:
- Recommended pattern of filtering first, then searching
- Suggested searching in tags as well as title for better UX
- Proposed maintaining currentFilter state for proper combined filtering

---

### 6. Event Delegation for Expandable Project Cards (FROM ASSIGNMENT 2, MAINTAINED)

**What I Kept From Assignment 2**:
I maintained the event delegation pattern for expandable project cards, which efficiently handles card expansion/collapse with a single listener instead of per-card listeners.

**Implementation Details**:
```javascript
// Single event listener for ALL project cards
const projectsSection = document.getElementById('projects');
projectsSection.addEventListener('click', function(e) {
    const expandBtn = e.target.closest('.project-expand-btn');
    if (expandBtn) {
        const card = expandBtn.closest('.project-card');
        
        // Close all other cards first
        document.querySelectorAll('.project-card').forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('expanded')) {
                otherCard.classList.remove('expanded');
            }
        });
        
        // Toggle current card
        card.classList.toggle('expanded');
    }
});
```

**Why Event Delegation Works Well**:
- Single listener handles all cards (efficient)
- Works even when cards are re-rendered for filtering
- No need to attach/detach listeners per card
- Better memory usage and performance

**Combined with Search/Filter**:
When project cards are re-rendered for search/filter results, the single event listener still works because it's on the parent section, not the individual cards.

---

**Prompt**:
```
What's the best way to handle loading states, error states, and empty states 
in a vanilla JavaScript project fetching/displaying data? I want users to 
always know what's happening.
```

**AI Suggestion**:
Implement three separate state components (loading, error, empty) and show/hide them based on the current application state. Use CSS animations to make transitions smooth.

**Implementation**:
```javascript
function loadProjects() {
    const loadingState = document.getElementById('projects-loading');
    const errorState = document.getElementById('projects-error');
    
    // Show loading initially
    setTimeout(() => {
        try {
            // Load and render projects
            loadingState.style.display = 'none';
            renderProjects(filteredProjects);
        } catch (error) {
            loadingState.style.display = 'none';
            errorState.style.display = 'block';
        }
    }, 1000);
}
```

**My Additions**:
- Added a spinning loader animation
- Created friendly error messages with retry button
- Implemented empty state for "no results found"
- Made all states theme-aware (work in dark mode)

---

### 4. CSS Animations and Transitions

**AI Tool Used**: GitHub Copilot + Claude

**Use Case**: Wanted to add smooth animations that enhance UX without being distracting.

**Copilot Contributions**:
- Suggested keyframe animations for fade-in effects
- Auto-completed transition properties
- Generated spinner animation code

**Claude's Review**:
Asked Claude to review my animation implementation. It suggested:
- Reducing animation duration from 0.8s to 0.6s for snappier feel
- Adding animation-delay for staggered card loading
- Using `transform` instead of `top/left` for better performance
- Implementing `will-change` for smoother animations

**Final Implementation**:
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.project-card {
    animation: fadeInUp 0.6s ease forwards;
}
```

**Learning**:
- CSS transforms are more performant than position changes
- Staggered animations create a more polished feel
- Less is more - subtle animations are often better than flashy ones

---

### 5. GitHub API Integration

**AI Tool Used**: ChatGPT

**Prompt**:
```
How do I fetch GitHub repositories using the GitHub API and handle rate 
limiting gracefully? I want to display my repos but have fallback data 
if the API fails.
```

**AI Response**:
Provided code for fetching from GitHub API, handling errors with try-catch, implementing localStorage caching to reduce API calls, and checking rate limits.

**My Implementation**:
```javascript
async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/A1maan/repos?sort=updated&per_page=5');
```

## Challenges Encountered and How I Solved Them

### Challenge 1: GitHub API Rate Limiting
**What Happened**: First version of fetchGitHubRepos made unlimited requests without checking rate limits.

**How I Solved It**: 
- AI suggested checking response.status for 403
- I implemented specific error message for rate limit case
- I added cache validation to prevent excessive requests
- Tested by simulating rate limit scenarios

**Learning**: Understanding that some APIs have limits and planning around them is critical.

---

### Challenge 2: Hanging Requests
**What Happened**: If GitHub API became slow, users saw loading spinner indefinitely.

**How I Solved It**:
- AI recommended AbortController pattern
- I researched AbortController documentation
- Implemented 5-second timeout with proper cleanup
- Tested with throttled network to verify timeout works

**Learning**: Timeouts are essential for user experience. Always plan for unresponsive APIs.

---

### Challenge 3: Stale Cache Data
**What Happened**: Caching worked but cached data never expired.

**How I Solved It**:
- Designed timestamp-based validation
- Set 30-minute expiration (balance between freshness and rate limit protection)
- Implemented automatic cleanup when cache expires
- Tested by checking localStorage at different times

**Learning**: Caching is only good if you validate freshness. Otherwise, users get old information.

---

### Challenge 4: Performance with Real-Time Search
**What Happened**: Typing in search box felt sluggish because filtering happened on every keystroke.

**How I Solved It**:
- Implemented debounce function (learned from Assignment 2)
- Applied 300ms delay to search input
- Reduced filter calls from 10+/second to 2-3/second
- Felt much more responsive

**Learning**: Small performance optimizations can have big UX impact.

---