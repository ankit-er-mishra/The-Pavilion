const CSV_URL = "https://raw.githubusercontent.com/ritesh-ojha/IPL-DATASET/main/csv/Match_Info.csv";

// ✅ FETCH DATA
async function fetchData() {
    const res = await fetch(CSV_URL);
    return await res.text();
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
    "SR Watson": "https://s.ndtvimg.com/images/entities/300/shane-watson-467.png",
    "KL Rahul": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTACuzKi8N4GKMBZHpT1hT_T6VWw86tY4QWfQ&s",
    "KA Pollard": "https://i0.wp.com/globalkashmir.net/wp-content/uploads/2022/08/IMG_20220809_115114.jpg",
    "JC Buttler": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzrhcbCRfw1t6soS3_X5X3TOUgahvIftqZ4g&s",
    "AM Rahane": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmI0fKTMWkqDrrjaAk9HSYepWEvl7Idox30Q&s",
    "Shubman Gill": "https://goyahills.com/wp-content/uploads/2025/03/Shubman-Gill.jpg",
    "S Dhawan": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0kSOBTIJ8O0Ft-NjbGfcNGhh_ykxH64Gz0g&s",
    "Rashid Khan": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQenK5DRX9f1T7tzV0yFDYjniMGPFoddgAslg&s",
    "MEK Hussey": "https://s.ndtvimg.com/images/entities/300/michael-hussey-617.png",
    "A Mishra": "https://c.ndtvimg.com/2025-09/788hjau4_amit-mishra_625x300_04_September_25.jpg?im=FitAndFill,algorithm=dnn,width=1200,height=738",
    "V Sehwag": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr6l0hWp7Jxo5zFgjQ8Piquz4YKd1tx1fcRg&s",
    "RD Gaikwad": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThmN_E5r-XJFL0HTW3IkCu8Z-923jnL7jcFQ&s",
    "SV Samson": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQVmMVCYfiNj2M7K-a1DaUYIJ9aQpvJ29Cxg&s",
    "DR Smith": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKj0pNWSZzHr5Dlpc1iKq1UYqB9cj2QNDfvg&s",
    "UT Yadav": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmpxNQylda81se3djNJl4MrtBiDK6RWLwqA&s",
    "AT Rayudu": "https://news24online.com/wp-content/uploads/2025/03/Ambati-Rayudu.jpg",
    "F du Plessis": "https://images.mykhel.com//webp/images/cricket/players/3/4063.jpg?v=6",
    "SA Yadav": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADJsRpP_iFcguVU2ygBhDsTUzPljbtleOsw&s",
    "JJ Bumrah": "https://upload.wikimedia.org/wikipedia/commons/0/02/Jasprit_Bumrah_in_PMO_New_Delhi.jpg",
    "JH Kallis": "https://media.crictracker.com/media/featureimage/2017/04/Jacques-Kallis.jpg",
    "GJ Maxwell": "https://e0.365dm.com/23/11/1600x900/skysports-glenn-maxwell-australia_6352082.jpg?20250602082518",
    "MP Stoinis": "https://media.telanganatoday.com/wp-content/uploads/2025/02/Marcus-Stoinis.jpg",
    "SE Marsh": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXY0V6hHqSBK--1HCVMhxfGPgqXolV6Iwoeg&s",
    "SS Iyer": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiWM_ERrrdztGna3pt_BPI7_hwEizskq3m1g&s",
    "KH Pandya": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkMOtzwiZN5JssCIHh16Ge-GCT0ZVbfyjt6Q&s",
    "AR Patel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl1Fx0iW4zgSwMP52sZYrBR4G-3X2hD9N5kQ&s",
    "RR Pant": "https://c.ndtvimg.com/2024-10/jqkms2p_rishabh-pant_625x300_31_October_24.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738",
    "SR Tendulkar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2GNad6-MCEKDFG1q7zmlF_oaiUcdI_4WyFg&s",
    "Harbhajan Singh": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb8-f9K-m8TZnwZ81WJQx7BBQwRk6gQt66XQ&s",
    "HH Pandya": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Hardik_Pandya_in_PMO_New_Delhi.jpg",
    "TA Boult": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6pNd-ExSP_W_XpfYRznQQXC9ex12lYpXmVw&s",
    "KD Karthik": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ceUgIXl3WESY5qsjA52jzMUwpI_BitRMTQ&s",
    "Kuldeep Yadav": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZ0jpuqwFyGM8G_SVzfMjKNUOi3UnrRGdzg&s",
    "AC Gilchrist": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMVHUeB67m1nm36pZv4r_FkgP9z7L2Ad9mZQ&s",
    "Q de Kock": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzbl4loH04ETWjuLAheLHr8Wx1jSDKlTuIAw&s",
    "YS Chahal": "https://resize.indiatvnews.com/en/resize/newbucket/1080_-/2023/08/untitled-design-2023-08-04t230609-1691170581.jpg",
    "RV Uthappa": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Robin_Uthappa_1.jpg",
    "Sandeep Sharma": "https://media.assettype.com/sentinelassam-english%2F2025-04-26%2Fh355chbp%2FSandeep-Sharma-last-over.webp?w=480&dpr=2&auto=format%2Ccompress&fit=max&q=85",
    "Mohammed Siraj": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT97PP30WTh-diyRONlR4UZWw_GYdCAXp8cEQ&s",
    "B Kumar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Sf2Qm-HRH1sK94o_eo7ExEBUOqm3-MnYYw&s",
    "N Rana": "https://images.bhaskarassets.com/thumb/1200x900/web2images/5483/2021/04/01/nitish1111617263647_1617267594.jpg",
    "KS Williamson": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzFTRp6GefTvDN5Z7AXFJFebkuqGqh7yLcMQ&s",
    "CV Varun": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk2FbB16W_einpaueD9xMyjeAV0VrCrFc2Cg&s",
    "Abhishek Sharma": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS_Nv1RPcAAVVFbAiGUbwMHGxLzyEWHuI9zA&s",
    "M Vijay": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMcUQuul6UJqurbb8reOuifPn9AafjG4mwrA&s",
    "A Nehra": "https://s.ndtvimg.com/images/entities/300/ashish-nehra-324.png",
    "BJ Hodge": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN0Z15b-fP_23Jr5GTWnsUAF_FzkozrxBnrA&s",
    "Ishan Kishan": "https://brightcove.iplt20.com/output/input/6389344563112-1771243834.jpg",

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



// ✅ PARSE CSV
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

// ✅ GET PLAYER STATS
function getPlayerStats(matches) {
    const players = {};

    matches.forEach(m => {
        const p = m.player_of_match;
        if (!p || p === 'N') return;

        if (!players[p]) {
            players[p] = { awards: 0, teams: new Set() };
        }

        players[p].awards++;

        if (m.team1_players?.includes(p)) {
            players[p].teams.add(normalizeTeam(m.team1));
        }

        if (m.team2_players?.includes(p)) {
            players[p].teams.add(normalizeTeam(m.team2));
        }
    });

    return Object.entries(players).map(([name, data]) => ({
        name,
        awards: data.awards,
        teams: Array.from(data.teams)
    }));
}

// ✅ GET FAVORITES
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// ✅ TOAST
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// ✅ RENDER FAVORITES
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

// ✅ REMOVE FAVORITE
function setupRemove(allPlayers) {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const name = e.target.dataset.name;

            let favorites = getFavorites();
            favorites = favorites.filter(p => p !== name);

            localStorage.setItem('favorites', JSON.stringify(favorites));

            showToast(`${name} removed from favorites`);
            renderFavorites(allPlayers);
        }
    });
}

function setupPlayerClick() {
    const modal = document.getElementById('player-modal');

    document.addEventListener('click', (e) => {

        // ❌ don't trigger on remove button
        if (e.target.classList.contains('remove-btn')) return;

        const card = e.target.closest('.player-card');
        if (!card) return;

        const name = card.querySelector('h3').textContent;
        const teams = card.querySelector('.player-teams').textContent;
        const awards = card.querySelector('.award-count').textContent;

        document.getElementById('modal-name').textContent = name;
        document.getElementById('modal-teams').textContent = "Teams: " + teams;
        document.getElementById('modal-awards').textContent = "Awards: " + awards;

        const img = playerImages[name];
        const avatar = document.getElementById('modal-avatar');

        if (img) {
            avatar.innerHTML = `<img src="${img}" alt="${name}">`;
        } else {
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
            avatar.innerHTML = `<div class="avatar-fallback">${initials}</div>`;
        }

        modal.classList.remove('hidden');
    });

    // close button
    document.getElementById('close-modal').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

// ✅ INIT
async function init() {
    try {
        const text = await fetchData();
        const matches = parseCSV(text);
        const players = getPlayerStats(matches);

        renderFavorites(players);
        setupRemove(players);
        setupPlayerClick();

    } catch (err) {
        console.error(err);
        document.getElementById('favorites-grid').innerHTML = "Error loading data";
    }
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