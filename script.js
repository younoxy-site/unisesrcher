// Données de breaches mock
const BREACHES = [
    "BreachCompilation", "Collection #1", "HaveIBeenPwned",
    "Stealer Log 2023", "LinkedIn Scrape", "Facebook Leak 2021",
    "Twitter Data Leak 2023", "RockYou2024"
];

const SOURCES = [
    "Dark Web Forum", "Telegram Channel", "Discord Server",
    "Pastebin", "RaidForums", "BreachForums"
];

const DATA_TYPES = [
    "Email, Password (plaintext)", "Email, Password Hash",
    "Email, Full Name, Phone", "Email, IP Address, User Agent"
];

function generateResults(query) {
    const seed = Math.abs(query.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 1000;
    Math.seedrandom = function(seed) {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };
    
    const results = [];
    const count = Math.floor(Math.seedrandom(seed) * 5) + 1;
    
    for (let i = 0; i < count; i++) {
        const year = 2016 + Math.floor(Math.seedrandom(seed + i) * 10);
        const month = Math.floor(Math.seedrandom(seed + i + 1) * 12) + 1;
        const day = Math.floor(Math.seedrandom(seed + i + 2) * 28) + 1;
        
        results.push({
            breach: BREACHES[Math.floor(Math.seedrandom(seed + i + 3) * BREACHES.length)],
            date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
            source: SOURCES[Math.floor(Math.seedrandom(seed + i + 4) * SOURCES.length)],
            data: DATA_TYPES[Math.floor(Math.seedrandom(seed + i + 5) * DATA_TYPES.length)],
            confidence: Math.floor(Math.seedrandom(seed + i + 6) * 35) + 65 + '%',
            entries: ['1', '2', '5', '12', '47', '153', '1,204', '12,893', '87,432', '1.2M'][Math.floor(Math.seedrandom(seed + i + 7) * 10)] + ' entries'
        });
    }
    
    return results;
}

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const queryValue = document.getElementById('queryValue').value;
    const results = generateResults(queryValue);
    
    let html = '';
    results.forEach(result => {
        html += `
            <div class="card">
                <div class="card-title">${result.breach} - ${result.date}</div>
                <div class="data-grid">
                    <div class="data-item">
                        <div class="data-label">Source</div>
                        <div class="data-value">${result.source}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">Données</div>
                        <div class="data-value">${result.data}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">Confiance</div>
                        <div class="data-value">${result.confidence}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">Entrées</div>
                        <div class="data-value">${result.entries}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    document.getElementById('results').innerHTML = html;
});
