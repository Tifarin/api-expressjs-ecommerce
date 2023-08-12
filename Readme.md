# Toko Online "Kelas.com"

Selamat datang di dokumentasi proyek Toko Online "Kelas.com". Proyek ini menggunakan teknologi Node.js, Express, dan MySQL untuk mengembangkan sebuah platform toko online sederhana. Berikut adalah panduan lengkap mengenai alur program, struktur tabel, serta algoritma yang digunakan dalam proyek ini.

## Alur Program (Program Flow):

Proyek ini mengikuti alur program berikut:

1. **Merencanakan Basis Data:** 
   - Merencanakan tabel seperti user, product, productImage, category, address, cart, order, order_item, dan transaction.
   - Menentukan kolom yang diperlukan dalam setiap tabel.

2. **Membuat Proyek Awal:**
   - Menjalankan `npm init` untuk membuat `package.json` dan mengatur informasi proyek.

3. **Instalasi Dependensi:**
   - Menginstal modul `express` dengan perintah `npm install express`.
   - Menginstal modul `mysql2` dengan perintah `npm install mysql2`.

4. **Struktur Proyek:**
   - Membuat struktur direktori seperti `repository` dan `services` untuk mengatur kode.

5. **Inisialisasi Express:**
   - Mengimpor modul `express` dan menginisialisasi aplikasi Express.

6. **Koneksi ke Basis Data:**
   - Mengimpor modul `mysql2` dan membuat koneksi ke basis data MySQL.
   
7. **Mendefinisikan Rute:**
   - Membuat rute-rute untuk melayani permintaan klien.

8. **Menulis Query:**
   - Menulis query SQL untuk mengambil atau memodifikasi data dalam basis data.

9. **Menangani Permintaan:**
   - Di setiap rute, menangani permintaan dengan menjalankan query SQL yang relevan.

10. **Penanganan Kesalahan:**
    - Menangani kesalahan seperti kesalahan koneksi basis data atau eksekusi query.

11. **Menutup Koneksi:**
    - Setelah selesai, menutup koneksi basis data.

12. **Uji dan Pengembangan Lanjutan:**
    - Menjalankan, menguji, dan mengembangkan aplikasi dengan fitur-fitur tambahan.

## Tabel dan Algoritma untuk Fitur Produk:

### Tabel `product`:

Tabel `product` menyimpan informasi mengenai produk yang dijual di toko online.

- `id`: ID unik produk (int, primary key)
- `name`: Nama produk (string)
- `description`: Deskripsi produk (string)
- `price`: Harga produk (decimal)
- `stock`: Jumlah stok produk (int)
- `category_id`: ID kategori produk (int, foreign key)
- ...

### Algoritma Menampilkan Daftar Produk:

1. Melakukan query basis data untuk mengambil semua produk dari tabel `products`.
2. Mengirim daftar produk sebagai respons ke klien.

### Algoritma Menampilkan Detail Produk:

1. Menerima parameter ID produk dari permintaan klien.
2. Melakukan query basis data untuk mengambil detail produk dengan ID yang sesuai.
3. Mengirim detail produk sebagai respons ke klien.

### Algoritma Menambahkan Produk Baru (admin):

1. Menerima data produk dari permintaan klien.
2. Melakukan query basis data untuk memasukkan data produk baru ke dalam tabel `products`.
3. Mengirim respons sukses atau gagal ke klien.

### Algoritma Menghapus Produk (admin):

1. Menerima parameter ID produk dari permintaan klien.
2. Melakukan query basis data untuk menghapus produk dari tabel `products`.
3. Mengirim respons sukses atau gagal ke klien.

## Tabel dan Algoritma untuk Fitur Keranjang Belanja:

### Tabel `cart`:

Tabel `cart` menyimpan informasi tentang keranjang belanja pengguna.

- `id`: ID unik keranjang (int, primary key)
- `user_id`: ID pengguna yang memiliki keranjang ini (int, foreign key)
- ...

### Tabel `cart_item`:

Tabel `cart_item` menyimpan informasi tentang item-item yang ada di keranjang belanja pengguna.

- `id`: ID unik item keranjang (int, primary key)
- `cart_id`: ID keranjang yang memiliki item ini (int, foreign key)
- `product_id`: ID produk yang ada dalam item ini (int, foreign key)
- `quantity`: Jumlah produk dalam item ini (int)
- ...

### Algoritma Menambah Produk ke Keranjang:

1. Memverifikasi bahwa pengguna sudah masuk atau memiliki sesi yang valid.
2. Menerima ID produk dan jumlah dari permintaan klien.
3. Memverifikasi ketersediaan produk dan stok yang cukup.
4. Melakukan query basis data untuk menemukan keranjang pengguna.
5. Jika keranjang pengguna sudah ada, menambahkan atau memperbarui jumlah produk dalam item keranjang.
6. Jika keranjang belum ada, membuat keranjang baru dan menambahkan produk dalam item keranjang.

### Algoritma Menghapus Produk dari Keranjang:

1. Memverifikasi bahwa pengguna sudah masuk atau memiliki sesi yang valid.
2. Menerima ID produk dari permintaan klien.
3. Melakukan query basis data untuk menghapus item produk dari keranjang pengguna.
4. Mengirim respons sukses atau gagal ke klien.

## Tabel dan Algoritma untuk Fitur Checkout:

### Tabel `order`:

Tabel `order` menyimpan informasi tentang pesanan yang telah dibuat.

- `id`: ID unik pesanan (int, primary key)
- `user_id`: ID pengguna yang membuat pesanan (int, foreign key)
- `order_date`: Tanggal pesanan (datetime)
- ...

### Tabel `order_item`:

Tabel `order_item` menyimpan informasi tentang item-item dalam pesanan.

- `id`: ID unik item pesanan (int, primary key)
- `order_id`: ID pesanan yang memiliki item ini (int, foreign key)
- `product_id`: ID produk dalam item ini (int, foreign key)
- `quantity`: Jumlah produk dalam item ini (int)
- ...

### Algoritma Proses Checkout:

1. Memverifikasi bahwa pengguna sudah masuk atau memiliki sesi yang valid.
2. Menerima data pengiriman dan metode pembayaran dari permintaan klien.
3. Memvalidasi data pengiriman dan metode pembayaran.
4. Melakukan query basis data untuk membuat entri pesanan baru dalam tabel `orders`.
5. Melakukan query basis data untuk membuat entri item pesanan dalam tabel `order_items`.
6. Mengurangi stok produk yang diorder dari tabel `products`.
7. Mengirim respons sukses atau gagal, serta nomor pesanan ke klien.

...


## Catatan Penting:

- Pastikan untuk menjalankan `npm install` setelah mengunduh proyek untuk menginstal semua dependensi yang diperlukan.
- Pastikan untuk mengatur konfigurasi basis data di dalam kode Anda sesuai dengan lingkungan pengembangan dan produksi.

Terima kasih telah mengikuti dokumentasi proyek Toko Online "Kelas.com". Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi kami.

