// Function to fetch dog-related news from the API
async function fetchDogNews() {
    const apiKey = '7799de012fbb480b952bf80dd7fff65c'; // You'll need to get an API key from a news service
    const newsContainer = document.querySelector('.news-grid');
    
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=dogs+pets+care&language=en&sortBy=publishedAt&apiKey=${apiKey}`);
        const data = await response.json();
        
        // Clear existing news
        newsContainer.innerHTML = '';
        
        // Display only the first 3 articles
        data.articles.slice(0, 3).forEach(article => {
            const newsCard = createNewsCard(article);
            newsContainer.appendChild(newsCard);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Function to create a news card element
function createNewsCard(article) {
    const card = document.createElement('article');
    card.className = 'news-card';
    
    // Determine category based on title/content
    const category = determineCategory(article.title);
    
    card.innerHTML = `
        <div class="news-image">
            <img src="${article.urlToImage || 'images/news-default.jpg'}" alt="${article.title}">
            <span class="category">${category}</span>
        </div>
        <div class="news-content">
            <h3>${article.title}</h3>
            <div class="news-meta">
                <span class="date">
                    <i class="far fa-calendar"></i>
                    ${new Date(article.publishedAt).toLocaleDateString()}
                </span>
            </div>
            <p>${article.description}</p>
            <a href="${article.url}" class="read-more" target="_blank">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return card;
}

// Function to determine article category
function determineCategory(title) {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('groom') || lowerTitle.includes('grooming')) {
        return 'Groom';
    } else if (lowerTitle.includes('health') || lowerTitle.includes('care')) {
        return 'Health';
    } else if (lowerTitle.includes('train') || lowerTitle.includes('training')) {
        return 'Training';
    } else if (lowerTitle.includes('food') || lowerTitle.includes('nutrition')) {
        return 'Food';
    }
    return 'Tips';
}

// Fetch news when the page loads
document.addEventListener('DOMContentLoaded', fetchDogNews);

// Refresh news every hour
setInterval(fetchDogNews, 3600000); 