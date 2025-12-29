export interface GuideStep {
  number: number;
  title: string;
  description: string;
  tips?: string;
}

export interface FeatureGuide {
  id: string;
  title: string;
  iconType: "zap" | "camera" | "play" | "message";
  description: string;
  steps?: GuideStep[];
  variations?: {
    platform: string;
    steps: GuideStep[];
  }[];
}

export const GuidesData: FeatureGuide[] = [
  {
    id: "cek-emisi",
    title: "Cek Emisi Kendaraan",
    iconType: "zap",
    description:
      "Fitur untuk mengecek emisi dan dampak lingkungan dari kendaraan Anda",
    steps: [
      {
        number: 1,
        title: "Buka Halaman Cek Emisi",
        description:
          'Navigasikan ke menu "Cek Emisi" di halaman utama atau melalui navigasi utama',
        tips: "Halaman ini tersedia di desktop dan mobile dengan tampilan yang responsif",
      },
      {
        number: 2,
        title: "Pilih Jenis Kendaraan",
        description:
          "Pilih jenis kendaraan yang Anda gunakan: mobil, motor, atau transportasi lainnya",
        tips: "Pastikan memilih jenis yang sesuai dengan kendaraan Anda untuk hasil yang akurat",
      },
      {
        number: 3,
        title: "Masukkan Data Kendaraan",
        description:
          "Input informasi seperti jarak tempuh per minggu, tipe bahan bakar, dan tahun pembelian kendaraan",
        tips: "Data yang akurat menghasilkan perhitungan emisi yang lebih presisi",
      },
      {
        number: 4,
        title: "Lihat Hasil Analisis",
        description:
          "Sistem akan menampilkan total emisi karbon, dampak lingkungan, dan rekomendasi untuk mengurangi emisi",
        tips: "Anda bisa membandingkan emisi Anda dengan standar industri",
      },
      {
        number: 5,
        title: "Dapatkan Rekomendasi",
        description:
          "Terima saran praktis untuk mengurangi jejak karbon dari aktivitas berkendara Anda",
        tips: "Terapkan saran-saran ini dalam kehidupan sehari-hari untuk dampak maksimal",
      },
    ],
  },
  {
    id: "scan",
    title: "Fitur Scan Sampah",
    iconType: "camera",
    description:
      "Gunakan AI untuk mengidentifikasi jenis sampah dan mendapat informasi pengolahannya",
    steps: [
      {
        number: 1,
        title: "Akses Menu Scan",
        description: 'Buka halaman "Scan" dari menu utama aplikasi',
        tips: "Pastikan perangkat Anda memiliki izin akses kamera",
      },
      {
        number: 2,
        title: "Pilih Sumber Foto",
        description:
          "Anda bisa mengambil foto langsung dengan kamera atau memilih dari galeri",
        tips: "Ambil foto dengan pencahayaan yang baik untuk hasil deteksi yang optimal",
      },
      {
        number: 3,
        title: "Arahkan Kamera ke Sampah",
        description:
          "Posisikan sampah di tengah frame dan pastikan terlihat jelas",
        tips: "Usahakan background sederhana agar AI lebih fokus pada sampah",
      },
      {
        number: 4,
        title: "Tunggu Proses Deteksi",
        description:
          "Sistem AI akan menganalisis dan mengidentifikasi jenis sampah",
        tips: "Proses biasanya memakan waktu 2-5 detik tergantung koneksi internet",
      },
      {
        number: 5,
        title: "Lihat Hasil Identifikasi",
        description:
          "Hasil menampilkan jenis sampah, tingkat kepercayaan, dan cara pengolahannya",
        tips: "Anda bisa melihat tips daur ulang spesifik untuk sampah tersebut",
      },
      {
        number: 6,
        title: "Scan Sampah Lain",
        description:
          "Anda bisa melakukan scan berulang kali untuk sampah yang berbeda",
        tips: "Coba scan berbagai jenis sampah untuk mempelajari pengolahannya",
      },
    ],
  },
  {
    id: "permainan",
    title: "Permainan Edukatif",
    iconType: "play",
    description:
      "Bermain sambil belajar tentang lingkungan melalui game interaktif",
    variations: [
      {
        platform: "Desktop",
        steps: [
          {
            number: 1,
            title: "Buka Halaman Permainan",
            description:
              'Klik menu "Permainan" di navigasi utama untuk masuk ke halaman game',
            tips: "Untuk pengalaman terbaik, gunakan layar penuh (tekan F11)",
          },
          {
            number: 2,
            title: "Pilih Game yang Ingin Dimainkan",
            description:
              "Lihat daftar game edukatif yang tersedia dengan deskripsi masing-masing",
            tips: "Baca deskripsi singkat untuk memahami tujuan game",
          },
          {
            number: 3,
            title: "Pelajari Kontrol Desktop",
            description:
              "Gunakan keyboard (arrow keys atau WASD) dan mouse untuk mengontrol permainan",
            tips: "Setiap game memiliki kontrol yang berbeda, baca instruksi di awal game",
          },
          {
            number: 4,
            title: "Mainkan Game",
            description:
              "Ikuti objektif game: kumpulkan item, hindari rintangan, atau selesaikan misi lingkungan",
            tips: "Fokus pada tujuan dan jangan terburu-buru untuk mendapat skor maksimal",
          },
          {
            number: 5,
            title: "Lihat Skor dan Leaderboard",
            description:
              "Setelah selesai, lihat skor Anda dan bandingkan dengan pemain lain di leaderboard",
            tips: "Mainkan berkali-kali untuk meningkatkan skor Anda di papan peringkat",
          },
        ],
      },
      {
        platform: "Mobile",
        steps: [
          {
            number: 1,
            title: "Buka Aplikasi di Mobile",
            description:
              "Akses aplikasi Nazzava melalui browser mobile atau aplikasi native",
            tips: "Pastikan koneksi internet stabil untuk pengalaman bermain yang lancar",
          },
          {
            number: 2,
            title: "Navigasi ke Menu Permainan",
            description:
              'Tap menu "Permainan" di navigasi bawah atau menu hamburger',
            tips: "Interface mobile telah dioptimalkan untuk layar yang lebih kecil",
          },
          {
            number: 3,
            title: "Pilih Game",
            description:
              "Scroll dan tap game pilihan Anda dari daftar yang tersedia",
            tips: "Layar akan berorientasi landscape otomatis saat membuka game",
          },
          {
            number: 4,
            title: "Gunakan Kontrol Sentuh",
            description:
              "Gunakan gestur sentuh untuk mengontrol karakter atau objek dalam game",
            tips: "Gerakkan jari untuk arah, tap untuk aksi khusus sesuai game",
          },
          {
            number: 5,
            title: "Mode Landscape untuk Gameplay Optimal",
            description:
              "Putar perangkat ke mode landscape untuk area bermain yang lebih besar",
            tips: "Mode landscape memberikan kontrol yang lebih presisi pada game",
          },
          {
            number: 6,
            title: "Catat Skor Anda",
            description:
              "Skor otomatis tersimpan, Anda bisa melihat progress di profil atau leaderboard",
            tips: "Mainkan setiap hari untuk mendapatkan bonus dan achievement",
          },
        ],
      },
    ],
  },
  {
    id: "chatbot",
    title: "Chatbot Konsultasi Lingkungan",
    iconType: "message",
    description:
      "Tanyakan pertanyaan tentang lingkungan ke AI chatbot yang cerdas",
    steps: [
      {
        number: 1,
        title: "Buka Menu Chatbot",
        description:
          'Navigasikan ke halaman "Chatbot" atau klik ikon chat di interface',
        tips: "Chatbot tersedia 24/7 siap menjawab pertanyaan Anda",
      },
      {
        number: 2,
        title: "Mulai Percakapan",
        description:
          "Ketik pertanyaan Anda tentang isu lingkungan, sampah, emisi, atau topik terkait",
        tips: "Gunakan bahasa yang jelas dan spesifik untuk hasil yang lebih baik",
      },
      {
        number: 3,
        title: "Kirim Pertanyaan",
        description:
          "Tekan Enter atau klik tombol kirim untuk mengirim pertanyaan ke chatbot",
        tips: "Tunggu beberapa detik untuk chatbot memproses dan merespons",
      },
      {
        number: 4,
        title: "Baca Respons Chatbot",
        description:
          "Chatbot akan memberikan jawaban informatif berdasarkan pertanyaan Anda",
        tips: "Respons mencakup penjelasan, tips praktis, dan solusi yang dapat diterapkan",
      },
      {
        number: 5,
        title: "Ajukan Pertanyaan Lanjutan",
        description:
          "Anda bisa terus bertanya untuk memperdalam pemahaman tentang topik tertentu",
        tips: "Chatbot memahami konteks percakapan sebelumnya",
      },
      {
        number: 6,
        title: "Simpan atau Bagikan Jawaban",
        description:
          "Beberapa respons bisa disimpan atau dibagikan ke teman melalui media sosial",
        tips: "Bagikan informasi berguna untuk menyebarkan kesadaran lingkungan",
      },
    ],
  },
];
