const CSV_URL = "https://raw.githubusercontent.com/ritesh-ojha/IPL-DATASET/main/csv/Match_Info.csv";

async function fetchData() {
    const response = await fetch(CSV_URL);
    const text = await response.text();
    return text;
}

const playerImages = {
    "V Kohli": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYG7VwJqfCh_tZEemVqHT0fnpdcdibvSs1-Q&s",
    "MS Dhoni": "https://bolt-gcdn.sc-cdn.net/3/ryzruF5nhmQwchultsrfl?bo=EhgaABoAMgF9OgEEQgYIv-72mQZIAlASYAE%3D&uc=18",
    "RG Sharma": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGwL4eSvApJmGdH5QqO7K9q8p5tWVkG8HMPA&s",
    "AB de Villiers": "https://s.ndtvimg.com/images/entities/300/ab-de-villiers-699.png",
    "CH Gayle": "https://s.ndtvimg.com/images/entities/300/chris-gayle-199.png",
    "SK Raina": "https://s.ndtvimg.com/images/entities/300/suresh-raina-722.png",
    "Yuvraj Singh": "https://www.royalchallengers.com/PRRCB01/public/styles/1061x767_landscape/public/2020-04/yuvi.jpg?h=bc554815&itok=QeebDjyd",
    "G Gambhir": "https://s.ndtvimg.com/images/entities/300/gautam-gambhir-563.png",
    "DA Warner": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU6GEUxTaor6RRqkt9SalgQifSsDAlV_Bvjw&s",
    "SP Narine": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC50oyKL91xqjQ_Iv-XsZYIMYbDnog0NPJzQ&s",
    "AD Russell": "https://lh7-us.googleusercontent.com/lMX4q0iiU2gxYpvlloylAAgeXaGMOdRk5x72MDNxO-55X9TP12po41OBtDl6S7YslAxYZ54Kr1U3oPfsp6sm6ILeZyTFsJ1sZwkqPicEuYMdQ3P2A3Kdln6mojx7ieSPml2qYVtOUvo6bPIPwzc_wyQ",
    "RA Jadeja": "https://upload.wikimedia.org/wikipedia/commons/2/2c/PM_Shri_Narendra_Modi_with_Ravindra_Jadeja_%28Cropped%29.jpg",
    "YK Pathan": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR42Bv6FrUifcufA4LzKrA4PCgxkfuNZcihgQ&s",
};

const teamMap = {
    "Royal Challengers Bangalore": "Royal Challengers Bengaluru",
    "Royal Challengers Bengaluru": "Royal Challengers Bengaluru",
    "Mumbai Indians": "Mumbai Indians",
    "Chennai Super Kings": "Chennai Super Kings",
    "Kolkata Knight Riders": "Kolkata Knight Riders",
    "Delhi Daredevils": "Delhi Daredevils",
    "Delhi Capitals": "Delhi Capitals",
    "Kings XI Punjab": "Punjab Kings",
    "Punjab Kings": "Punjab Kings",
    "Sunrisers Hyderabad": "Sunrisers Hyderabad",
    "Deccan Chargers": "Deccan Chargers",
    "Rajasthan Royals": "Rajasthan Royals",
    "Gujarat Lions": "Gujarat Lions",
    "Gujarat Titans": "Gujarat Titans",
    "Lucknow Super Giants": "Lucknow Super Giants",
    "Rising Pune Supergiant": "Rising Pune Supergiant",
    "Rising Pune Supergiants": "Rising Pune Supergiants"
};

function normalizeTeam(team) {
    return teamMap[team] || team;
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

        const match = {};
        headers.forEach((header, index) => {
            match[header.trim()] = values[index] || '';
        });

        matches.push(match);
    }

    return matches;
}


function getPlayerStats(matches) {
    const players = {};

    matches.forEach(m => {
        const player = m.player_of_match;
        if (!player || player === 'N') return;

        if (!players[player]) {
            players[player] = { awards: 0, teams: new Set() };
        }

        players[player].awards++;

        if (m.team1_players && m.team1_players.includes(player)) {
            players[player].teams.add(normalizeTeam(m.team1));
        } else if (m.team2_players && m.team2_players.includes(player)) {
            players[player].teams.add(normalizeTeam(m.team2));
        }
    });

    return Object.entries(players)
        .map(([name, stats]) => ({
            name,
            awards: stats.awards,
            teams: Array.from(stats.teams)
        }))
        .sort((a, b) => b.awards - a.awards);
}


function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}


function setupFavorites() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('fav-toggle')) {

            const name = e.target.dataset.name;
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            if (favorites.includes(name)) {
                favorites = favorites.filter(p => p !== name);
                showToast(`${name} removed from favorites`);
            } else {
                favorites.push(name);
                showToast(`${name} added to favorites`);
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoriteUI();
        }
    });
}


function updateFavoriteUI() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    document.querySelectorAll('.fav-toggle').forEach(btn => {
        if (favorites.includes(btn.dataset.name)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}


function renderPlayers(players) {
    const container = document.getElementById('players-grid');

    if (!container) return;

    if (players.length === 0) {
        container.innerHTML = '<p class="no-results">No players found.</p>';
        return;
    }

    container.innerHTML = players.map((player, index) => {
    const img = playerImages[player.name];

    return `
    <div class="player-card"
        data-name="${player.name}"
        data-awards="${player.awards}"
        data-teams="${player.teams.join(', ')}"
    >

        <div class="player-rank">${index + 1}</div>

        <div class="player-avatar">
            ${
                img
                ? `<img src="${img}" alt="${player.name}">`
                : `<div class="avatar-fallback">
                        ${player.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                   </div>`
            }
        </div>

        <div class="player-info">
            <h3>${player.name}</h3>
            <p class="player-teams">${player.teams.join(', ') || 'N/A'}</p>
        </div>

        <div class="player-awards">
            <span class="award-count">${player.awards}</span>
            <span class="award-label">awards</span>
        </div>

        <button class="fav-toggle" data-name="${player.name}">⭐</button>
    </div>
    `;
}).join('');

    updateFavoriteUI();
}


function setupSearch(allPlayers) {
    const input = document.getElementById('player-search');

    if (!input) return;

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();

        const filtered = allPlayers.filter(player =>
            player.name.toLowerCase().includes(query)
        );

        renderPlayers(filtered);
    });
}


function setupPlayerClick() {
    const modal = document.getElementById('player-modal');

    document.addEventListener('click', (e) => {

        
        if (e.target.classList.contains('fav-toggle')) return;

        const card = e.target.closest('.player-card');
        if (!card) return;

        const name = card.dataset.name;
        const awards = card.dataset.awards;
        const teams = card.dataset.teams;

       
        document.getElementById('modal-name').textContent = name;
        document.getElementById('modal-teams').textContent = "Teams: " + teams;
        document.getElementById('modal-awards').textContent = "Awards: " + awards;

        
        const img = playerImages[name];
        const avatarContainer = document.getElementById('modal-avatar');

        if (img) {
            avatarContainer.innerHTML = `<img src="${img}" alt="${name}">`;
        } else {
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
            avatarContainer.innerHTML = `<div class="avatar-fallback">${initials}</div>`;
        }

        
        modal.classList.remove('hidden');
    });

    
    document.getElementById('close-modal').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

   
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}


if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('#thm-toggle i').classList.replace('fa-moon', 'fa-sun');
}

document.getElementById('thm-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
   
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    const icon = document.querySelector('#thm-toggle i');
    icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
});



async function init() {
    try {
        const text = await fetchData();
        const matches = parseCSV(text);
        const players = getPlayerStats(matches);

        setupFavorites();
        renderPlayers(players);
        setupSearch(players);
        setupPlayerClick();

    } catch (err) {
        console.error("Error:", err);
        document.getElementById('players-grid').innerHTML = "Failed to load data";
    }
}

init();