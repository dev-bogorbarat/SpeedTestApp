document.addEventListener('DOMContentLoaded', () => {
        // ===== LOGIKA UPGRADE PRO =====
    const proModal = document.getElementById('proModal');
    const upgradeBtn = document.querySelector('.btn-upgrade');
    const closeModalBtn = document.getElementById('closeModal');
    const confirmPaymentBtn = document.getElementById('confirmPayment');
    const uploadBox = document.querySelector('.result-box.locked');
    const statusBadge = document.querySelector('.status-badge');

    // Buka Modal saat tombol Upgrade diklik
    upgradeBtn.addEventListener('click', () => {
        proModal.classList.add('active');
    });

    // Tutup Modal
    closeModalBtn.addEventListener('click', () => {
        proModal.classList.remove('active');
    });

    // Tutup Modal jika klik di luar kotak
    proModal.addEventListener('click', (e) => {
        if (e.target === proModal) {
            proModal.classList.remove('active');
        }
    });

    // Konfirmasi Pembayaran -> Aktifkan PRO
    confirmPaymentBtn.addEventListener('click', () => {
        // Ubah tombol jadi loading
        confirmPaymentBtn.textContent = '⏳ Memverifikasi...';
        confirmPaymentBtn.disabled = true;

        // Simulasi verifikasi pembayaran (2 detik)
        setTimeout(() => {
            // Aktifkan status PRO di body
            document.body.classList.add('is-pro');

            // Update tampilan badge status
            statusBadge.textContent = 'Status: PRO ✅';

            // Update tombol upgrade
            upgradeBtn.textContent = '✅ PRO AKTIF';

            // Buka fitur Upload (unlock kotak)
            uploadBox.classList.remove('locked');
            uploadBox.innerHTML = `
                <span class="label">UPLOAD</span>
                <span class="value" id="upload">-- Mbps</span>
            `;

            // Tampilkan notifikasi sukses
            alert('🎉 Selamat! Akun Anda sekarang PRO. Semua fitur telah terbuka.');

            // Tutup modal
            proModal.classList.remove('active');

            // Reset tombol konfirmasi untuk pembelian berikutnya (jika perlu)
            confirmPaymentBtn.textContent = '✅ SAYA SUDAH BAYAR';
            confirmPaymentBtn.disabled = false;

            // Simpan status PRO di localStorage (agar tetap PRO saat refresh)
            localStorage.setItem('speedT_isPro', 'true');

        }, 2000);
    });

    // Cek status PRO saat halaman dibuka
    if (localStorage.getItem('speedT_isPro') === 'true') {
        document.body.classList.add('is-pro');
        statusBadge.textContent = 'Status: PRO ✅';
        upgradeBtn.textContent = '✅ PRO AKTIF';
        uploadBox.classList.remove('locked');
        uploadBox.innerHTML = `
            <span class="label">UPLOAD</span>
            <span class="value" id="upload">-- Mbps</span>
        `;
    }
    // ===== AKHIR LOGIKA PRO =====const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const pingEl = document.getElementById('ping');
    const downloadEl = document.getElementById('download');
    const jitterEl = document.getElementById('jitter');

    let isTesting = false;

    // Fungsi Utama Mulai Tes
    startBtn.addEventListener('click', async () => {
        if (isTesting) return;
        isTesting = true;
        
        // Ubah tampilan tombol
        startBtn.textContent = '⏳ SEDANG MENGUJI...';
        startBtn.disabled = true;
        startBtn.style.background = '#475569';

        // Reset nilai
        pingEl.textContent = '-- ms';
        downloadEl.textContent = '-- Mbps';
        jitterEl.textContent = '-- ms';

        try {
            // 1. Simulasi Tes Ping (Delay 1 detik)
            await new Promise(r => setTimeout(r, 1000));
            const pingValue = Math.floor(Math.random() * 40) + 10; // 10-50ms
            pingEl.textContent = `${pingValue} ms`;

            // 2. Simulasi Tes Jitter (Delay 1 detik)
            await new Promise(r => setTimeout(r, 1000));
            const jitterValue = Math.floor(Math.random() * 10) + 1; // 1-10ms
            jitterEl.textContent = `${jitterValue} ms`;

            // 3. Simulasi Tes Download (Delay 2 detik)
            await new Promise(r => setTimeout(r, 2000));
            const downloadValue = (Math.random() * 50 + 10).toFixed(2); // 10-60 Mbps
            downloadEl.textContent = `${downloadValue} Mbps`;

            // Selesai
            startBtn.textContent = '✅ TES SELESAI';
            
            // Kembalikan ke semula setelah 2 detik
            setTimeout(() => {
                startBtn.textContent = '🚀 MULAI TES SEKARANG';
                startBtn.disabled = false;
                startBtn.style.background = 'linear-gradient(90deg, #00d2ff, #3a7bd5)';
                isTesting = false;
            }, 2000);

        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            startBtn.textContent = '❌ GAGAL, COBA LAGI';
            startBtn.disabled = false;
            isTesting = false;
        }
    });

    // Fungsi Reset
    resetBtn.addEventListener('click', () => {
        if (isTesting) return;
        pingEl.textContent = '-- ms';
        downloadEl.textContent = '-- Mbps';
        jitterEl.textContent = '-- ms';
        startBtn.textContent = '🚀 MULAI TES SEKARANG';
    });
});
