const CSV_URL = "https://raw.githubusercontent.com/ritesh-ojha/IPL-DATASET/main/csv/Match_Info.csv";

async function fetchData() {
    const response = await fetch(CSV_URL);
    const text = await response.text();
    return text;
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
            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
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

function getTeamStats(matches) {
    const teams = {};

    matches.forEach(m => {
        
        if (m.team1) {
            if (!teams[m.team1]) teams[m.team1] = { played: 0, wins: 0, trophies: 0 };
            teams[m.team1].played++;
        }

        
        if (m.team2) {
            if (!teams[m.team2]) teams[m.team2] = { played: 0, wins: 0, trophies: 0 };
            teams[m.team2].played++;
        }

       
        const winner = m.winner;
        if (winner && winner !== 'NA' && winner !== 'N') {
            if (!teams[winner]) teams[winner] = { played: 0, wins: 0, trophies: 0 };
            teams[winner].wins++;
        }
    });

    return teams;
}

function getTrophies(matches, teams) {
    const seasonFinals = {};

    matches.forEach(m => {
        const year = m.match_date.split('-')[0];
        if (!seasonFinals[year] || m.match_date > seasonFinals[year].match_date) {
            seasonFinals[year] = m;
        }
    });

    Object.values(seasonFinals).forEach(finalMatch => {
        const winner = finalMatch.winner;
        if (winner && winner !== 'NA' && teams[winner]) {
            teams[winner].trophies++;
        }
    });

    return teams;
}

const TEAM_LOGOS = {
    "Mumbai Indians": "https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg",
    "Chennai Super Kings": "https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg",
    "Royal Challengers Bangalore": "https://upload.wikimedia.org/wikipedia/en/2/2a/Royal_Challengers_Bangalore_2020.svg",
"Royal Challengers Bengaluru": "https://upload.wikimedia.org/wikipedia/en/2/2a/Royal_Challengers_Bangalore_2020.svg",
    "Kolkata Knight Riders": "https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.svg",
    "Rajasthan Royals": "https://upload.wikimedia.org/wikipedia/en/6/60/Rajasthan_Royals_Logo.svg",
    "Delhi Daredevils": "https://upload.wikimedia.org/wikipedia/en/a/a5/Delhi_Capitals_Logo.svg",
    "Delhi Capitals": "https://upload.wikimedia.org/wikipedia/en/a/a5/Delhi_Capitals_Logo.svg",
    "Sunrisers Hyderabad": "https://upload.wikimedia.org/wikipedia/en/3/3e/Sunrisers_Hyderabad.svg",
    "Kings XI Punjab": "https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg",
    "Punjab Kings": "https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg",
    "Deccan Chargers": "https://upload.wikimedia.org/wikipedia/en/3/3e/Sunrisers_Hyderabad.svg",
    "Kochi Tuskers Kerala": "https://upload.wikimedia.org/wikipedia/en/0/0e/Kochi_Tuskers_Kerala_Logo.svg",
    "Pune Warriors": "https://upload.wikimedia.org/wikipedia/en/5/5e/Pune_Warriors_India_Logo.svg",
    "Gujarat Lions": "https://upload.wikimedia.org/wikipedia/en/9/99/Gujarat_Lions_Logo.svg",
    "Rising Pune Supergiants": "https://upload.wikimedia.org/wikipedia/en/e/e1/Rising_Pune_Supergiant_Logo.svg",
    "Rising Pune Supergiant": "https://upload.wikimedia.org/wikipedia/en/e/e1/Rising_Pune_Supergiant_Logo.svg",
    "Gujarat Titans": "https://upload.wikimedia.org/wikipedia/en/0/09/Gujarat_Titans_Logo.svg",
    "Lucknow Super Giants": "https://upload.wikimedia.org/wikipedia/en/l/lb/Lucknow_Super_Giants_Logo.svg",
};

function renderTeams(teams) {
    const container = document.getElementById('teams-grid');

    const sortedTeams = Object.entries(teams)
        .sort((a, b) => b[1].wins - a[1].wins);

    container.innerHTML = sortedTeams.map(([name, stats]) => `
        <div class="team-card">
            <div class="team-logo">
                <img src="${TEAM_LOGOS[name] || ''}" 
                     alt="${name}" 
                     onerror="this.style.display='none'">
            </div>
            <div class="team-info">
                <h3>${name}</h3>
                <div class="team-stats">
                    <span>🏏 ${stats.played} matches</span>
                    <span>✅ ${stats.wins} wins</span>
                    <span>🏆 ${stats.trophies} trophies</span>
                </div>
            </div>
        </div>
    `).join('');
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

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('#thm-toggle i').classList.replace('fa-moon', 'fa-sun');
}

async function init() {
    const text = await fetchData();
    const matches = parseCSV(text);
    let teams = getTeamStats(matches);
    teams = getTrophies(matches, teams);
    renderTeams(teams);
}

init(); 