'use strict';

(function () {
  const menuButton = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  function closeMenu() {
    if (!menuButton || !mobileNav) return;
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', function () {
      const willOpen = mobileNav.hidden;
      mobileNav.hidden = !willOpen;
      menuButton.setAttribute('aria-expanded', String(willOpen));
    });

    mobileNav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 767) closeMenu();
    });
  }

  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const copyButton = document.getElementById('copy-request');
  if (!form || !feedback || !copyButton) return;

  const config = Object.assign({
    formProvider: 'auto',
    whatsappNumber: '',
    contactEmail: ''
  }, window.SITE_CONFIG || {});

  const hostname = window.location.hostname.toLowerCase();
  const provider = config.formProvider === 'auto'
    ? (hostname.endsWith('.netlify.app') ? 'netlify' : 'fallback')
    : config.formProvider;

  let lastMessage = '';

  function showFeedback(message, isError) {
    feedback.textContent = message;
    feedback.hidden = false;
    feedback.classList.toggle('form-feedback--error', Boolean(isError));
  }

  function buildMessage() {
    const data = new FormData(form);
    return [
      'Halo KATYUSTORE, saya ingin konsultasi / memesan layanan setup Discord.',
      '',
      'Nama: ' + String(data.get('nama') || '').trim(),
      'WhatsApp: ' + String(data.get('whatsapp') || '').trim(),
      'Layanan: ' + String(data.get('layanan') || '').trim(),
      'Kebutuhan:',
      String(data.get('pesan') || '').trim()
    ].join('\n');
  }

  form.addEventListener('submit', function (event) {
    // Pada Netlify, biarkan POST HTML standar bekerja.
    // Netlify Forms akan memprosesnya tanpa server tambahan.
    if (provider === 'netlify') return;

    event.preventDefault();
    copyButton.hidden = true;
    feedback.hidden = true;

    if (!form.reportValidity()) return;
    lastMessage = buildMessage();

    const number = String(config.whatsappNumber || '').replace(/\D/g, '');
    const email = String(config.contactEmail || '').trim();

    if ((provider === 'whatsapp' || provider === 'fallback') && number) {
      const url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(lastMessage);
      // Navigasi tab yang sama agar tidak diblokir pop-up browser.
      showFeedback('Pesan disiapkan di WhatsApp. Tekan Kirim di WhatsApp untuk menyampaikan permintaan.');
      window.location.assign(url);
      return;
    }

    if ((provider === 'email' || provider === 'fallback') && email) {
      const subject = encodeURIComponent('Permintaan layanan setup Discord — KATYUSTORE');
      const body = encodeURIComponent(lastMessage);
      showFeedback('Aplikasi email akan dibuka. Tekan Kirim di aplikasi email untuk menyampaikan permintaan.');
      window.location.href = 'mailto:' + encodeURIComponent(email).replace(/%40/g, '@') + '?subject=' + subject + '&body=' + body;
      return;
    }

    // Laman statis yang belum dikonfigurasi tidak memiliki server penerima.
    // Jangan menampilkan pesan sukses palsu.
    showFeedback('Alamat penerima belum diatur. Permintaan belum terkirim. Kamu dapat menyalin isi pesan, lalu mengirimkannya secara manual. Pengelola harus mengatur assets/js/config.js sebelum website dipublikasikan.', true);
    copyButton.hidden = false;
  });

  copyButton.addEventListener('click', async function () {
    if (!lastMessage) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(lastMessage);
      } else {
        const input = document.createElement('textarea');
        input.value = lastMessage;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand('copy');
        input.remove();
        if (!copied) throw new Error('Copy unavailable');
      }
      showFeedback('Pesan berhasil disalin. Kirim melalui kontak admin yang tersedia.', false);
    } catch (err) {
      showFeedback('Salin otomatis tidak didukung oleh browser ini. Gunakan formulir di atas untuk menyalin informasinya secara manual.', true);
    }
  });
})();
