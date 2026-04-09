const CSV_URL = "https://raw.githubusercontent.com/ritesh-ojha/IPL-DATASET/main/csv/Match_Info.csv";

async function fetchData() {
    const res = await fetch(CSV_URL);
    return await res.text();
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    const matches = [];

    for (let i = 1; i < lines.length; i++) {
        const values = [];
        let current = '';
        let insideQuotes = false;

        for (let char of lines[i]) {
            if (char === '"') insideQuotes = !insideQuotes;
            else if (char === ',' && !insideQuotes) {
                values.push(current.trim());
                current = '';
            } else current += char;
        }
        values.push(current.trim());

        const obj = {};
        headers.forEach((h, j) => obj[h.trim()] = values[j] || '');
        matches.push(obj);
    }

    return matches;
}

function getPlayerStats(matches) {
    const players = {};

    matches.forEach(m => {
        const p = m.player_of_match;
        if (!p || p === 'N') return;

        if (!players[p]) {
            players[p] = { awards: 0, teams: new Set() };
        }

        players[p].awards++;

        if (m.team1_players?.includes(p)) players[p].teams.add(m.team1);
        if (m.team2_players?.includes(p)) players[p].teams.add(m.team2);
    });

    return Object.entries(players).map(([name, data]) => ({
        name,
        awards: data.awards,
        teams: Array.from(data.teams)
    }));
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function renderFavorites(allPlayers) {
    const container = document.getElementById('favorites-grid');
    const favorites = getFavorites();

    const favPlayers = allPlayers.filter(p => favorites.includes(p.name));

    if (favPlayers.length === 0) {
        container.innerHTML = "<p class='no-results'>No favorite players yet.</p>";
        return;
    }

    container.innerHTML = favPlayers.map((player, index) => `
        <div class="player-card">
            <div class="player-rank">${index + 1}</div>

            <div class="player-info">
                <h3>${player.name}</h3>
                <p class="player-teams">${player.teams.join(', ')}</p>
            </div>

            <div class="player-awards">
                <span class="award-count">${player.awards}</span>
                <span class="award-label">awards</span>
            </div>

            <button class="remove-btn" data-name="${player.name}">❌</button>
        </div>
    `).join('');
}

function setupRemove(allPlayers) {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const name = e.target.dataset.name;

            let favorites = getFavorites();
            favorites = favorites.filter(p => p !== name);

            localStorage.setItem('favorites', JSON.stringify(favorites));

            renderFavorites(allPlayers);
        }
    });
}

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

async function init() {
    const text = await fetchData();
    const matches = parseCSV(text);
    const players = getPlayerStats(matches);

    renderFavorites(players);
    setupRemove(players);
}

init();