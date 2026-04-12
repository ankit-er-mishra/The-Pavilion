const CSV_URL = "https://raw.githubusercontent.com/ritesh-ojha/IPL-DATASET/main/csv/Match_Info.csv";

async function fetchData() {
    const response = await fetch(CSV_URL);
    const text = await response.text();
    return text;
}

const teamMap = {
    "Royal Challengers Bangalore": "Royal Challengers Bengaluru",
    "Royal Challengers Bengaluru": "Royal Challengers Bengaluru",
    "Mumbai Indians": "Mumbai Indians",
    "Chennai Super Kings": "Chennai Super Kings",
    "Kolkata Knight Riders": "Kolkata Knight Riders",
    "Delhi Daredevils": "Delhi Capitals",
    "Delhi Capitals": "Delhi Capitals",
    "Kings XI Punjab": "Punjab Kings",
    "Punjab Kings": "Punjab Kings",
    "Sunrisers Hyderabad": "Sunrisers Hyderabad",
    "Deccan Chargers": "Sunrisers Hyderabad",
    "Rajasthan Royals": "Rajasthan Royals",
    "Gujarat Lions": "Gujarat Lions",
    "Gujarat Titans": "Gujarat Titans",
    "Lucknow Super Giants": "Lucknow Super Giants",
    "Rising Pune Supergiant": "Rising Pune Supergiants",
    "Rising Pune Supergiants": "Rising Pune Supergiants"
};

function normalizeTeam(team) {
    return teamMap[team] || team;
}

const menuBtn = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

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
        const team1 = normalizeTeam(m.team1);
        const team2 = normalizeTeam(m.team2);
        const winner = normalizeTeam(m.winner);

        if (team1) {
            if (!teams[team1]) teams[team1] = { played: 0, wins: 0, trophies: 0 };
            teams[team1].played++;
        }

        if (team2) {
            if (!teams[team2]) teams[team2] = { played: 0, wins: 0, trophies: 0 };
            teams[team2].played++;
        }

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
        const winner = normalizeTeam(finalMatch.winner);

        if (winner && winner !== 'NA' && teams[winner]) {
            teams[winner].trophies++;
        }
    });

    return teams;
}

const TEAM_LOGOS = {
    "Mumbai Indians": "https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg",
    "Chennai Super Kings": "https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg",
    "Royal Challengers Bangalore": "https://upload.wikimedia.org/wikipedia/commons/1/1e/%E0%A4%B0%E0%A5%89%E0%A4%AF%E0%A4%B2_%E0%A4%9A%E0%A5%88%E0%A4%B2%E0%A5%87%E0%A4%82%E0%A4%9C%E0%A4%B0%E0%A5%8D%E0%A4%B8_%E0%A4%AC%E0%A5%87%E0%A4%82%E0%A4%97%E0%A4%B2%E0%A5%81%E0%A4%B0%E0%A5%81_%E0%A4%B2%E0%A5%8B%E0%A4%97%E0%A5%8B.png?_=20240328115202",
"Royal Challengers Bengaluru": "https://upload.wikimedia.org/wikipedia/commons/1/1e/%E0%A4%B0%E0%A5%89%E0%A4%AF%E0%A4%B2_%E0%A4%9A%E0%A5%88%E0%A4%B2%E0%A5%87%E0%A4%82%E0%A4%9C%E0%A4%B0%E0%A5%8D%E0%A4%B8_%E0%A4%AC%E0%A5%87%E0%A4%82%E0%A4%97%E0%A4%B2%E0%A5%81%E0%A4%B0%E0%A5%81_%E0%A4%B2%E0%A5%8B%E0%A4%97%E0%A5%8B.png?_=20240328115202",
    "Kolkata Knight Riders": "https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.svg",
    "Rajasthan Royals": "https://upload.wikimedia.org/wikipedia/commons/6/69/Rajasthan_Royals_Logo.png",
    "Delhi Daredevils": "https://upload.wikimedia.org/wikipedia/en/a/a5/Delhi_Capitals_Logo.svg",
    "Delhi Capitals": "https://upload.wikimedia.org/wikipedia/ta/thumb/f/f5/Delhi_Capitals_Logo.svg/3840px-Delhi_Capitals_Logo.svg.png",
    "Sunrisers Hyderabad": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sunrisers_Hyderabad.jpg/1280px-Sunrisers_Hyderabad.jpg?_=20220914123423",
    "Kings XI Punjab": "https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg",
    "Punjab Kings": "https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg",
    "Deccan Chargers": "https://upload.wikimedia.org/wikipedia/en/3/3e/Sunrisers_Hyderabad.svg",
    "Kochi Tuskers Kerala": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBOW73hwZXHxOhsz8ocrdS0h-9GEs7ixyIJQ&s",
    "Pune Warriors": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBCUSJDKEIPn94z4av5G-pZmz76GzTekUdEA&s",
    "Gujarat Lions": "https://upload.wikimedia.org/wikipedia/hi/b/bf/%E0%A4%97%E0%A5%81%E0%A4%9C%E0%A4%B0%E0%A4%BE%E0%A4%A4_%E0%A4%B2%E0%A5%89%E0%A4%AF%E0%A4%A8%E0%A5%8D%E0%A4%B8_%E0%A4%B2%E0%A5%8B%E0%A4%97%E0%A5%8B.png",
    "Rising Pune Supergiants": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXNa2fi6KhtnKBIlb2dZw_varZK8ClQF3DeA&s",
    "Rising Pune Supergiant": "https://upload.wikimedia.org/wikipedia/en/e/e1/Rising_Pune_Supergiant_Logo.svg",
    "Gujarat Titans": "https://upload.wikimedia.org/wikipedia/en/0/09/Gujarat_Titans_Logo.svg",
    "Lucknow Super Giants": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Lucknow_logo.png?_=20220216115534",
};

function renderTeams(teams) {
    const container = document.getElementById('teams-grid');

    const sortedTeams = Object.entries(teams)
        .sort((a, b) => b[1].wins - a[1].wins);

    container.innerHTML = sortedTeams.map(([name, stats]) => `
        <div class="team-card">
            <div class="team-logo">
                <img src="${TEAM_LOGOS[normalizeTeam(name)] || ''}"
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