function reportSuspect(name) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    modalTitle.innerText = "🚨 SİNYAL TAKİP EDİLİYOR... 🚨";
    
    if(name === 'Direksiyon') {
        modalDesc.innerHTML = `<strong>${name}</strong> kod adlı şahsın konumu yatak odası olarak tespit edildi.<br><br>Özel Harekât ve Sağlık Ekipleri yola çıktı. Şahsa yaklaşırken dikkatli olun! Kesinlikle göz teması kurmayın.`;
    } else if(name === 'Vites') {
        modalDesc.innerHTML = `<strong>${name}</strong> kod adlı şahsın hastane acilinde 'hastayım' bahanesiyle yattığı tespit edildi.<br><br>Karantina ekipleri olay yerine intikal ediyor. Lütfen maskenizi takın ve hastalık bulaşmaması için ona yaklaşmayın!`;
    } else if(name === 'Beyin') {
        modalTitle.innerText = "⚠️ SİSTEME ERİŞİM ENGELLENDİ ⚠️";
        modalTitle.style.color = "#ffd700";
        modalDesc.innerHTML = `<strong style="font-size: 1.5rem; color: #ffd700;">Sen kimsin beni ihbar ediceksin lolipop? 🍭</strong><br><br>Sistemin sahibi benim. Haddini bil, o fareyi yavaşça yere bırak ve hemen bu sayfayı kapat.`;
        document.querySelector('.modal-content').style.borderColor = "#ffd700";
        document.querySelector('.modal-content').style.boxShadow = "0 0 50px rgba(255, 215, 0, 0.6)";
    }

    modal.classList.remove('hidden');

    // Panik yaratan siren veya komik ses efekti
    if (name === 'Beyin') {
        // Beyin için özel bir şey çalınmayacak çünkü ona tıklanınca Thug Life çalıyor
    } else {
        const boom = document.getElementById('boom-audio');
        if (boom) {
            boom.currentTime = 0;
            boom.play().catch(e => playBeep()); // Ses yüklenemezse eski bip sesini çal
        } else {
            playBeep();
        }
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
}

// Basit ve rahatsız edici bir uyarı sesi (tarayıcı izniyle çalışır)
function playBeep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1);
        
        osc.start();
        osc.stop(ctx.currentTime + 1);
    } catch(e) {
        console.log("Ses oynatılamadı, tarayıcı etkileşim bekliyor olabilir.");
    }
}

// Canlı IQ Sayacı (Su gibi akar)
let iqLost = 999990;
let iqGained = 999999999000;
setInterval(() => {
    // Vites & Direksiyon IQ'yu çılgın gibi düşürüyor (kayıp artıyor)
    iqLost += Math.floor(Math.random() * 80) + 20;
    document.getElementById('iq-lost-value').innerText = iqLost.toLocaleString('tr-TR');
    
    // Beyin (Sen) IQ'yu tanrısal bir hızda uçuruyor
    iqGained += Math.floor(Math.random() * 50000) + 10000;
    document.getElementById('iq-gained-value').innerText = iqGained.toLocaleString('tr-TR');
}, 50); // Saniyede 20 kere güncellenir (çok çok hızlı)

// Thug Life Animasyonu (Telefonda resme dokununca çalışır)
function triggerThugLife() {
    const glasses = document.getElementById('thug-glasses');
    const cigar = document.getElementById('thug-cigar');
    const thugAudio = document.getElementById('thug-audio');
    
    glasses.classList.add('drop');
    cigar.classList.add('appear');
    
    // Thug Life Müziğini Çal
    if (thugAudio) {
        thugAudio.currentTime = 0; // Başa sar
        thugAudio.play().catch(e => console.log("Müzik çalınamadı:", e));
    }
    
    // Basit bir titreşim (Telefon destekliyorsa sallanır)
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
}
