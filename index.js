const CSV_URL = "https://raw.githubusercontent.com/ritesh-ojha/IPL-DATASET/main/csv/Match_Info.csv";

async function fetchData() {
    const response = await fetch(CSV_URL);
    const text = await response.text();
    return text;
}


fetchData().then(data => console.log(data));


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

////
// fetchData().then(text => {
//     const matches = parseCSV(text);
//     console.log(matches[1110]);
//     console.log('Total matches:', matches.length);
// });
////


function getStats(matches) {
    
    const totalMatches = matches.length;
    const seasons = new Set(matches.map(m => m.match_date.split('-')[0]));
    const teams = new Set();
    matches.forEach(m => {
        if (m.team1) teams.add(m.team1);
        if (m.team2) teams.add(m.team2);
    });

    return {
        totalMatches,
        totalSeasons: seasons.size,
        totalTeams: teams.size
    };
}

function getTopPlayers(matches, limit = 5) {
    const playerCount = {};

    matches.forEach(m => {
        const player = m.player_of_match;
        if (player && player !== 'N') {
            playerCount[player] = (playerCount[player] || 0) + 1;
        }
    });

    return Object.entries(playerCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, count]) => ({ name, awards: count }));
}

////
// fetchData().then(text => {
//     const matches = parseCSV(text);
//     const stats = getStats(matches);
//     const topPlayers = getTopPlayers(matches);

//     console.log('Stats:', stats);
//     console.log('Top Players:', topPlayers);
// })
////

function normalizeTeam(name) {
    const teamMap = {
        
        "Royal Challengers Bangalore": "Royal Challengers Bengaluru",
        "Royal Challengers Bengaluru": "Royal Challengers Bengaluru",

        
        "Kings XI Punjab": "Punjab Kings",
        "Punjab Kings": "Punjab Kings",

        
        "Delhi Daredevils": "Delhi Capitals",
        "Delhi Capitals": "Delhi Capitals",

        
        "Deccan Chargers": "Sunrisers Hyderabad",
        "Sunrisers Hyderabad": "Sunrisers Hyderabad",

        
        "Rising Pune Supergiant": "Rising Pune Supergiants",
        "Rising Pune Supergiants": "Rising Pune Supergiants",

        
        "Gujarat Lions": "Gujarat Titans",
        "Gujarat Titans": "Gujarat Titans",

    
        "Mumbai Indians": "Mumbai Indians",
        "Chennai Super Kings": "Chennai Super Kings",
        "Kolkata Knight Riders": "Kolkata Knight Riders",
        "Rajasthan Royals": "Rajasthan Royals",
        "Lucknow Super Giants": "Lucknow Super Giants",
        "Pune Warriors": "Pune Warriors"
    };

    return teamMap[name] || name;
}

const menuBtn = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

function getTopTeams(matches, limit = 5) {
    const teamWins = {};



    matches.forEach(m => {
        const winner = normalizeTeam(m.winner);
        if (winner && winner !== 'NA' && winner !== 'N') {
            teamWins[winner] = (teamWins[winner] || 0) + 1;
        }
    });

    return Object.entries(teamWins)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, wins]) => ({ name, wins }));
}

function getTrophies(matches) {
    
    const seasonFinals = {};

    matches.forEach(m => {
        const year = m.match_date.split('-')[0];
        if (!seasonFinals[year] || m.match_date > seasonFinals[year].match_date) {
            seasonFinals[year] = m;
        }
    });

    const trophies = {};
    Object.values(seasonFinals).forEach(finalMatch => {
        const winner = normalizeTeam(finalMatch.winner);
        if (winner && winner !== 'NA') {
            trophies[winner] = (trophies[winner] || 0) + 1;
        }
    });

    return trophies;
}


fetchData().then(text => {
    const matches = parseCSV(text);
    
    console.log('Stats:', getStats(matches));
    console.log('Top Players:', getTopPlayers(matches));
    console.log('Top Teams:', getTopTeams(matches));
    console.log('Trophies:', getTrophies(matches));
});

/////////////
///////////
/////////
///////
/////
///
//


async function init() {
    const text = await fetchData();
    const matches = parseCSV(text);

    const stats = getStats(matches);
    const topPlayers = getTopPlayers(matches);
    const topTeams = getTopTeams(matches);
    const trophies = getTrophies(matches);

    renderStats(stats);
    renderTopPlayers(topPlayers);
    renderTopTeams(topTeams, trophies);
}

function renderStats(stats) {
    document.getElementById('stats-container').innerHTML = `
        <div class="stat-card">
            <h3>${stats.totalMatches}</h3>
            <p>Total Matches</p>
        </div>
        <div class="stat-card">
            <h3>${stats.totalSeasons}</h3>
            <p>Seasons</p>
        </div>
        <div class="stat-card">
            <h3>${stats.totalTeams}</h3>
            <p>Teams</p>
        </div>
    `;
}

function renderTopPlayers(players) {
    document.getElementById('players-container').innerHTML = players.map((player, index) => `
        <div class="player-card">
            <span class="rank">${index + 1}</span>
            <span class="name">${player.name}</span>
            <span class="awards">${player.awards} awards</span>
        </div>
    `).join('');
}

function renderTopTeams(teams, trophies) {
    document.getElementById('teams-container').innerHTML = teams.map((team, index) => `
        <div class="team-card">
            <span class="rank">${index + 1}</span>
            <span class="name">${team.name}</span>
            <span class="wins">${team.wins} wins</span>
            <span class="trophies">🏆 ${trophies[team.name] || 0}</span>
        </div>
    `).join('');
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


init();