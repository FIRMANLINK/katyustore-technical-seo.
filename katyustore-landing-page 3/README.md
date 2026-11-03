# KATYUSTORE — Landing Page (Task 4)

Website statis HTML, CSS, dan JavaScript berdasarkan wireframe Figma **Task 3**: versi Desktop (1440 px) dan Mobile (390 px). Gaya profesional, flat, minimalis, tanpa gradient.

**Figma referensi:** https://www.figma.com/design/fothKgnokzjk87R6OU0YOX

## Isi folder

```text
katyustore-landing-page/
├── index.html                  # Halaman landing page
├── terima-kasih.html           # Halaman selesai kirim formulir (Netlify)
├── netlify.toml                # Konfigurasi Netlify
├── README.md                   # Panduan ini
└── assets/
    ├── css/style.css          # Semua tampilan desktop, tablet, mobile
    ├── js/config.js           # Konfigurasi formulir & kontak admin
    ├── js/main.js             # Menu mobile, validasi/submit, salin pesan
    └── images/favicon.svg     # Ikon tab browser
```

## Fitur yang sudah dibuat

1. Header/navigation: tautan Keunggulan, Layanan, Testimoni, FAQ, Hubungi Kami.
2. Hero: judul, manfaat utama, dua CTA, dan mini preview layout server Discord.
3. Value Proposition: tiga alasan memilih layanan.
4. Feature List: enam fitur layanan.
5. Social Proof: tiga kartu placeholder portofolio/testimoni. **Ganti dengan proyek/testimoni asli sebelum website dipakai bisnis.**
6. FAQ: pertanyaan yang dapat dibuka/ditutup.
7. Call-to-Action: membawa pengunjung ke formulir.
8. Formulir kontak/pemesanan: nama, nomor WhatsApp, layanan, detail kebutuhan, dan persetujuan.
9. Layout responsif: desktop, tablet, mobile. Menu mobile membuka dan menutup.
10. Input HTML divalidasi browser sebelum pengiriman.

## Cara menjalankan di laptop

1. Extract ZIP ke folder biasa.
2. Buka folder di Visual Studio Code.
3. Jalankan **Live Server** pada `index.html`. Alternatif: dari terminal di folder ini jalankan `python -m http.server 5500`, lalu buka `http://localhost:5500`.
4. Uji semua link, menu mobile (perkecil ukuran browser), FAQ, dan isi formulir.

Tidak perlu `npm install`, database, atau framework.

## Cara deploy paling mudah: Netlify (direkomendasikan)

**Mengapa Netlify?** Hosting statis gratis memiliki fitur **Netlify Forms** untuk mengumpulkan kiriman formulir tanpa backend sendiri (perhatikan batas penggunaan/kuota paket Netlify).

1. Masuk ke https://app.netlify.com/ dan login.
2. Pilih **Add new project** > **Deploy manually**, atau buka https://app.netlify.com/drop . (Tampilan menu dapat berubah.)
3. Tarik **folder hasil extract** yang berisi `index.html` ke area upload/deploy Netlify. Jangan mengunggah hanya file `index.html`.
4. Setelah deploy, Netlify memberikan URL publik `https://nama-situs.netlify.app`.
5. Buka URL tersebut dan kirim **satu formulir tes** dengan data tes.
6. Di dashboard Netlify, buka **Forms** / **Form submissions**, pastikan formulir `kontak-katyustore` terdeteksi dan hasil tes tersimpan. Jika fitur Forms perlu diaktifkan untuk situs, aktifkan lebih dahulu kemudian deploy ulang.
7. Atur notifikasi email di dashboard Netlify agar admin tahu jika ada isian baru.
8. Salin URL live untuk dikumpulkan ke Google Classroom.

`assets/js/config.js` menggunakan `formProvider: 'auto'`. Untuk URL default `*.netlify.app`, formulir akan dikirim melalui **Netlify Forms**. **Jika memakai custom domain di Netlify**, ganti `formProvider` menjadi `'netlify'` agar pengiriman tetap menggunakan Netlify.

> **Catatan:** Tampilan halaman terima kasih tidak dengan sendirinya membuktikan data masuk. Selalu cek kiriman tes di dashboard Netlify.

## Opsi deploy Vercel / GitHub Pages (tanpa backend formulir)

Website tampil normal di Vercel maupun GitHub Pages, tetapi **Netlify Forms tidak bekerja di hosting tersebut**. Untuk menerima data, hubungkan formulir ke WhatsApp admin:

Buka `assets/js/config.js` dan ubah:

```js
window.SITE_CONFIG = Object.freeze({
  formProvider: 'whatsapp',
  whatsappNumber: '6281234567890', // GANTI dengan WA admin, kode negara 62
  contactEmail: ''
});
```

Nomor di atas adalah **contoh**, bukan nomor admin sungguhan. Setelah pengguna mengisi formulir dan klik **Kirim Permintaan**, browser membuka chat WhatsApp yang sudah berisi ringkasan data. Pengguna **harus menekan Kirim di WhatsApp** agar pesannya sampai. Web tidak menyimpan pesan otomatis.

Atau gunakan aplikasi email:

```js
window.SITE_CONFIG = Object.freeze({
  formProvider: 'email',
  whatsappNumber: '',
  contactEmail: 'admin@domainmu.com' // GANTI dengan email asli
});
```

Opsi email membuka aplikasi email pengunjung; pengguna juga perlu menekan Kirim. Email bisa tidak terbuka jika pengunjung belum menyetel aplikasi email.

**GitHub Pages**: upload isi folder ke repository GitHub, lalu buka **Settings > Pages > Deploy from a branch > main / (root)**. URL umumnya `https://username.github.io/nama-repo/`.

**Vercel**: import repository yang berisi folder ini ke Vercel, pilih deployment statis (tanpa build command). Jika memakai URL custom atau subfolder, gunakan konfigurasi WhatsApp/email di atas.

### Mode demo/lokal jika belum ada penerima

Pada laptop atau situs selain Netlify tanpa nomor WA/email, tombol submit **tidak mengaku sudah mengirim**. Sebagai gantinya, halaman menampilkan pesan bahwa penerima belum disetel dan tombol **Salin pesan permintaan**. Ini sengaja dilakukan agar tidak ada data pengguna yang hilang secara diam-diam.

## Mengganti konten

- **Nama brand & teks**: edit `index.html`, cari `KATYUSTORE`.
- **Warna**: edit variabel `:root` pada `assets/css/style.css` (`--blue`, `--paper`, `--cta-bg`, dll).
- **Portfolio/testimoni**: ganti placeholder `.portfolio-placeholder` di `index.html` dengan screenshot proyek sungguhan yang mendapat izin dipublikasikan.
- **Kontak/formulir**: edit `assets/js/config.js`.
- **Formulir Netlify**: jangan hilangkan `data-netlify="true"`, `name="kontak-katyustore"`, hidden `form-name`, atau file `terima-kasih.html` jika ingin memakai Netlify Forms.

## Checklist sebelum dikumpulkan

- [ ] Landing page dapat dibuka melalui URL publik.
- [ ] Desktop dan mobile tampil rapi.
- [ ] CTA **Konsultasi Sekarang** dan **Hubungi Kami** mengarah ke kontak.
- [ ] CTA **Lihat Layanan** mengarah ke daftar fitur.
- [ ] Menu mobile dan FAQ bekerja.
- [ ] Kiriman formulir tes berhasil diterima lewat Netlify Forms atau WhatsApp/email yang telah dikonfigurasi.
- [ ] Ganti placeholder portofolio/testimoni jika sudah memiliki data nyata.
- [ ] Salin **URL live** dari Netlify, Vercel, atau GitHub Pages untuk dikumpulkan.

## Kesesuaian dengan instruksi Task 4

- Implementasi menggunakan **HTML, CSS, dan JavaScript**.
- Wireframe Task 3 diterjemahkan ke landing page responsif.
- Form kontak/pembelian dan CTA tersedia serta dapat berfungsi melalui pengaturan penyedia penerima.
- Folder sudah siap dideploy ke layanan statis; **URL live harus dibuat sendiri** saat deploy ke akun hosting karena ZIP lokal bukan situs publik.


## Technical SEO (Task 5)

Program sekarang memiliki `robots.txt`, `sitemap.xml`, dan `generate-seo.cjs`. Baca `PANDUAN_SEO_FIRMAN.txt` untuk mengisi URL publik, deployment, serta verifikasi Google Search Console.
