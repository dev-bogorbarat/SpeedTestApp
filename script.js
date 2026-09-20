document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LOGIKA INTRO SPLASH SCREEN
    // ==========================================
    const introScreen = document.getElementById('introScreen');
    
    // Sembunyikan intro setelah 3 detik
    setTimeout(() => {
        if (introScreen) {
            introScreen.classList.add('hidden');
        }
    }, 3000);


    // ==========================================
    // 2. AMBIL ELEMEN HTML
    // ==========================================
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const pingEl = document.getElementById('ping');
    const downloadEl = document.getElementById('download');
    const jitterEl = document.getElementById('jitter');

    // Elemen untuk fitur PRO
    const proModal = document.getElementById('proModal');
    const upgradeBtn = document.querySelector('.btn-upgrade');
    const closeModalBtn = document.getElementById('closeModal');
    const confirmPaymentBtn = document.getElementById('confirmPayment');
    const uploadBox = document.querySelector('.result-box.locked');
    const statusBadge = document.querySelector('.status-badge');

    let isTesting = false;


    // ==========================================
    // 3. LOGIKA UPGRADE PRO (MODAL & PEMBAYARAN)
    // ==========================================
    
    // Buka Modal saat tombol Upgrade diklik
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', () => {
            proModal.classList.add('active');
        });
    }

    // Tutup Modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            proModal.classList.remove('active');
        });
    }

    // Tutup Modal jika klik di luar kotak
    if (proModal) {
        proModal.addEventListener('click', (e) => {
            if (e.target === proModal) {
                proModal.classList.remove('active');
            }
        });
    }

    // Konfirmasi Pembayaran -> Aktifkan PRO
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', () => {
            // Ubah tombol jadi loading
            confirmPaymentBtn.textContent = '⏳ Memverifikasi...';
            confirmPaymentBtn.disabled = true;

            // Simulasi verifikasi pembayaran (2 detik)
            setTimeout(() => {
                // Aktifkan status PRO di body
                document.body.classList.add('is-pro');

                // Update tampilan badge status
                if (statusBadge) statusBadge.textContent = 'Status: PRO ✅';

                // Update tombol upgrade
                if (upgradeBtn) upgradeBtn.textContent = '✅ PRO AKTIF';

                // Buka fitur Upload (unlock kotak)
                if (uploadBox) {
                    uploadBox.classList.remove('locked');
                    uploadBox.innerHTML = `
                        <span class="label">UPLOAD</span>
                        <span class="value" id="upload">-- Mbps</span>
                    `;
                }

                // Tampilkan notifikasi sukses
                alert('🎉 Selamat! Akun Anda sekarang PRO. Semua fitur telah terbuka.');

                // Tutup modal
                proModal.classList.remove('active');

                // Reset tombol konfirmasi
                confirmPaymentBtn.textContent = '✅ SAYA SUDAH BAYAR';
                confirmPaymentBtn.disabled = false;

                // Simpan status PRO di localStorage
                localStorage.setItem('speedT_isPro', 'true');

            }, 2000);
        });
    }

    // Cek status PRO saat halaman dibuka (agar tetap PRO setelah refresh)
    if (localStorage.getItem('speedT_isPro') === 'true') {
        document.body.classList.add('is-pro');
        if (statusBadge) statusBadge.textContent = 'Status: PRO ✅';
        if (upgradeBtn) upgradeBtn.textContent = '✅ PRO AKTIF';
        if (uploadBox) {
            uploadBox.classList.remove('locked');
            uploadBox.innerHTML = `
                <span class="label">UPLOAD</span>
                <span class="value" id="upload">-- Mbps</span>
            `;
        }
    }


    // ==========================================
    // 4. FUNGSI UTAMA MULAI TES
    // ==========================================
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

        // Reset nilai upload jika ada
        const uploadElReset = document.getElementById('upload');
        if (uploadElReset) uploadElReset.textContent = '-- Mbps';

        try {
            // ----- 1. Simulasi Tes Ping (Delay 1 detik) -----
            await new Promise(r => setTimeout(r, 1000));
            const pingValue = Math.floor(Math.random() * 40) + 10; // 10-50ms
            pingEl.textContent = `${pingValue} ms`;

            // ----- 2. Simulasi Tes Jitter (Delay 1 detik) -----
            await new Promise(r => setTimeout(r, 1000));
            const jitterValue = Math.floor(Math.random() * 10) + 1; // 1-10ms
            jitterEl.textContent = `${jitterValue} ms`;

            // ----- 3. Simulasi Tes Download (Delay 2 detik) -----
            await new Promise(r => setTimeout(r, 2000));
            const downloadValue = (Math.random() * 50 + 10).toFixed(2); // 10-60 Mbps
            downloadEl.textContent = `${downloadValue} Mbps`;

            // ----- 4. Simulasi Tes Upload (Khusus PRO) -----
            if (document.body.classList.contains('is-pro')) {
                const uploadEl = document.getElementById('upload');
                if (uploadEl) {
                    uploadEl.textContent = '⏳ Menguji...';
                    await new Promise(r => setTimeout(r, 1500));
                    const uploadValue = (Math.random() * 20 + 5).toFixed(2); // 5-25 Mbps
                    uploadEl.textContent = `${uploadValue} Mbps`;
                }
            }

            // ----- Selesai -----
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
            startBtn.style.background = 'linear-gradient(90deg, #00d2ff, #3a7bd5)';
            isTesting = false;
        }
    });


    // ==========================================
    // 5. FUNGSI RESET
    // ==========================================
    resetBtn.addEventListener('click', () => {
        if (isTesting) return;

        // Reset semua nilai
        pingEl.textContent = '-- ms';
        downloadEl.textContent = '-- Mbps';
        jitterEl.textContent = '-- ms';

        // Reset upload jika user PRO
        const uploadEl = document.getElementById('upload');
        if (uploadEl) {
            uploadEl.textContent = '-- Mbps';
        }

        // Reset tombol mulai
        startBtn.textContent = '🚀 MULAI TES SEKARANG';
        startBtn.disabled = false;
        startBtn.style.background = 'linear-gradient(90deg, #00d2ff, #3a7bd5)';
    });

});
