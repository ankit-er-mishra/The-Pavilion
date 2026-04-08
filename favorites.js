function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function renderFavorites() {
    const container = document.getElementById('favorites-grid');
    const favorites = getFavorites();

    if (favorites.length === 0) {
        container.innerHTML = "<p class='no-results'>No favorite players yet.</p>";
        return;
    }

    container.innerHTML = favorites.map((name, index) => `
        <div class="player-card">
            <div class="player-rank">${index + 1}</div>

            <div class="player-info">
                <h3>${name}</h3>
                <p class="player-teams">Saved Player</p>
            </div>

            <button class="remove-btn" data-name="${name}">❌</button>
        </div>
    `).join('');
}

// document.getElementById('thm-toggle').addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
// });


document.getElementById('thm-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    const icon = document.querySelector('#thm-toggle i');
    icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('#thm-toggle i').classList.replace('fa-moon', 'fa-sun');
}

function setupRemove() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const name = e.target.dataset.name;

            let favorites = getFavorites();
            favorites = favorites.filter(p => p !== name);

            localStorage.setItem('favorites', JSON.stringify(favorites));

            renderFavorites();
        }
    });
}

function init() {
    renderFavorites();
    setupRemove();
}

init();