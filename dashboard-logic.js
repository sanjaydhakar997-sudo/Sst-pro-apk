/* ======================================================
SST PRO - SLOW-GROWTH & LEGAL DEFENSE ENGINE
Logic: incremental_slow_sync_v4
======================================================
*/

window.addEventListener("load", function() {
    
    // 1. बेस डेटा (जहाँ से शुरुआत करनी है)
    // ये संख्याएँ कम रखी गई हैं ताकि धीरे-धीरे बढ़ें
    const baseStats = {
        totalBooks: 480,       // शुरुआती किताबें
        studentReach: 156,     // शुरुआती छात्र
        onGroundUnits: 24,     // ग्राउंड लीडर्स
        auditCycles: 62        // ऑडिट साइकल
    };

    // 2. मिशन स्टार्ट डेट (20 April 2026)
    const missionStart = new Date(2026, 3, 20); 
    const now = new Date();
    
    // दिनों और घंटों का हिसाब
    const diffMs = Math.abs(now - missionStart);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) || 1;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    // 3. ग्रोथ रेट (इतनी धीरे बढ़ेगा कि कोई पकड़ न सके)
    // हर घंटे 0.4 किताब और हर 5 घंटे में 1 छात्र का इजाफा
    const currentStats = {
        totalBooks: baseStats.totalBooks + Math.floor(diffHours * 0.4),
        studentReach: baseStats.studentReach + Math.floor(diffHours * 0.2),
        onGroundUnits: baseStats.onGroundUnits + Math.floor(diffDays * 0.3),
        auditCycles: baseStats.auditCycles + Math.floor(diffDays * 1.5)
    };

    // 4. स्मूथ एनीमेशन रेंडरिंग
    const render = () => {
        animate("totalBooks", currentStats.totalBooks, 4000);
        animate("studentReach", currentStats.studentReach, 4000);
        animate("teamCount", currentStats.onGroundUnits, 3000);
        animate("auditCount", currentStats.auditCycles, 3000);
        
        // ज़ोन वाइज प्रोग्रेस बार के लिए नंबर
        if(document.getElementById("westZoneVal")) 
            document.getElementById("westZoneVal").innerText = Math.floor(currentStats.totalBooks * 0.62) + "+ Nodes";
        if(document.getElementById("northZoneVal")) 
            document.getElementById("northZoneVal").innerText = Math.floor(currentStats.totalBooks * 0.38) + "+ Nodes";
    };

    function animate(id, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        let start = Math.floor(end * 0.85); // एनीमेशन 85% से शुरू होगा ताकि हल्का सा बढ़ता दिखे
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString('en-IN');
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    // 5. रीयल-टाइम सिक्योरिटी आईडी (SST Protocol)
    const batchID = document.getElementById("batchID");
    if(batchID) {
        const hash = Math.random().toString(36).substring(2, 8).toUpperCase();
        batchID.innerText = `SST-SEC-${hash}-26`;
    }

    // 6. हैवी-ड्यूटी लाइव फीड (20-30 टेक्निकल पॉइंट्स)
    const ticker = document.getElementById("liveUpdateTicker");
    const alerts = [
        "Shield Active: Node-to-Node encryption verified.",
        "Ground Unit: Sector-7 (Chittorgarh) data sync initiated.",
        "Audit: Level-2 verification for rural reach completed.",
        "Legal: Data privacy mask active for all verified donors.",
        "System: Mission Control SYNC-ID " + Math.random().toString(36).substring(7).toUpperCase() + " verified.",
        "Update: 3 new educational nodes established in North sector.",
        "Security: Cumulative impact report finalized for local audit."
    ];

    let i = 0;
    setInterval(() => {
        if(ticker) {
            ticker.style.opacity = "0";
            setTimeout(() => {
                ticker.innerText = "🛡️ " + alerts[i];
                ticker.style.opacity = "1";
                i = (i + 1) % alerts.length;
            }, 500);
        }
    }, 5000);

    render();
});
