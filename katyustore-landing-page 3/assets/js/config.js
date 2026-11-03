/**
 * KONFIGURASI SEBELUM DEPLOY
 *
 * formProvider:
 *   'auto'     = Netlify Forms jika domain *.netlify.app; di hosting lain
 *                gunakan WhatsApp/email bila telah diisi, atau tampilkan
 *                tombol salin pesan (tidak mengirim ke admin).
 *   'netlify'  = wajib gunakan Netlify Forms (untuk domain custom di Netlify).
 *   'whatsapp'= buka chat admin memakai nomor di bawah.
 *   'email'   = buka aplikasi email ke alamat di bawah.
 *
 * Nomor WA: awali dengan kode negara tanpa tanda +. Misal 6281234567890.
 * Jangan memasukkan data rahasia atau API key di sini (file ini publik).
 */
window.SITE_CONFIG = Object.freeze({
  formProvider: 'auto',
  whatsappNumber: '',
  contactEmail: ''
});
