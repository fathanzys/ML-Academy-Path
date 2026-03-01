const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, 'src', 'data', 'curriculum.json');
const data = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

const advancedTopics = {
    "MOD-01": [
        {
            "judul": "Taksonomi Kapabilitas AI: Dari Sempit Hingga Super",
            "waktu": "10 menit",
            "deskripsi": "Pemahaman klasifikasi AI berdasarkan kemampuannya meniru kecerdasan manusia.",
            "penjelasan_awam": "Bayangkan AI sebagai pekerja. **Narrow AI (ANI)** adalah spesialis yang jago satu hal saja, seperti kasir atau penterjemah buta huruf. **General AI (AGI)** adalah manusia normal yang bisa belajar pekerjaan apa saja asal dilatih. Sedangkan **Superintelligence (ASI)** adalah sosok dewa yang otaknya sejuta kali lebih cepat dari Einstein gabungan seluruh umat manusia.",
            "detail_teknis": "Klasifikasi utama:\n- **Artificial Narrow Intelligence (ANI):** Sistem yang dilatih untuk satu task spesifik. Tidak memiliki kemampuan transfer learning ke domain lain secara otomatis.\n- **Artificial General Intelligence (AGI):** Sistem teoretis dengan kemapanan kognitif setara manusia di berbagai bidang (cross-domain capability).\n- **Artificial Super Intelligence (ASI):** Entitas pasca-AGI dengan kemampuan memecahkan masalah jauh melampaui kecerdasan kolektif umat manusia.",
            "analogi": "\"Narrow AI adalah kalkulator canggih. AGI adalah mahasiswa tingkat akhir serba bisa. ASI adalah entitas fiksi ilmiah.\"",
            "contoh_nyata": "Saat ini kita masih berada di era Narrow AI. ChatGPT tampak pintar, tapi ia tetap Narrow AI spesialis teks/bahasa. Belum ada AGI yang sebenarnya di dunia nyata."
        }
    ],
    "MOD-02": [
        {
            "judul": "Trio Varian Gradient Descent: Batch, Mini-Batch, dan Stochastic",
            "waktu": "12 menit",
            "deskripsi": "Mengapa kita tidak memproses seluruh data sekaligus saat AI sedang belajar.",
            "penjelasan_awam": "Bayangkan Anda sedang belajar dari 1000 soal Ujian. Ada 3 cara:\n1. Kerjakan semua 1000 soal sekaligus, baru koreksi semua. (Akurat tapi lambat).\n2. Kerjakan 1 soal, langsung koreksi. (Sangat cepat tapi pemahaman naik turun liar).\n3. Kerjakan 50 soal, koreksi. Lanjut 50 lagi. (Ini yang paling seimbang dan dipakai AI sekarang!).",
            "detail_teknis": "- **Batch Gradient Descent:** Menghitung gradien dari *seluruh* dataset sebelum update bobot sekali. Konvergen mulus, tapi Out Fix Memory (OOM) jika data jutaan.\n- **Stochastic GD (SGD):** Update bobot per 1 sampel data. Sangat cepat, namun arah loss curve sangat bergetar (noisy).\n- **Mini-Batch GD:** Mengambil subset data (misal batch_size = 32, 64). Memanfaatkan efisiensi matriks GPU (SIMD) sekaligus menurunkan variasi update. Ini adalah standar de-facto di industri Deep Learning saat ini.",
            "analogi": "\"Menghitung Loss dari Mini-batch layaknya mencicipi satu sendok panci kuah alih-alih meminum seluruh panci untuk tahu apakah rasanya kurang asin.\""
        },
        {
            "judul": "Seni Meracik Fitur (Feature Engineering)",
            "waktu": "10 menit",
            "deskripsi": "Mengubah data mentah menjadi bentuk emas yang mudah dikunyah algoritma.",
            "penjelasan_awam": "Bayangkan Anda ingin mesin memprediksi harga rumah. Anda punya data panjang dan lebar tanah. Daripada hanya memberikan kedua angka itu mentah-mentah, Anda bisa mengalikan keduanya menjadi fitur baru bernama 'Luas Tanah'. Mesin akan langsung jauh lebih cerdas kalau disuapi fitur turunan semacam ini.",
            "detail_teknis": "Feature Engineering melibatkan intervensi human expert untuk mentransformasi raw feature menjadi representasi yang lebih kaya sinyal. Contohnya: binning (usia 25 jadi kategori 'Dewasa'), polinomial feature (x^2), aggregasi (rata-rata selang 3 hari), dan Log Transform untuk mengubah kurva power-law (Gaji) menjadi kurva normal distribusi.",
            "analogi": "\"Bahan baku beras dan daging memang enak, tapi di tangan katering (feature engineer) menjadi nasi goreng sapi sehingga lebih mudah dicerna oleh raja (algo).\""
        }
    ],
    "MOD-03": [
        {
            "judul": "ROC Curve & AUC: Mengukur Kehebatan Pemisah",
            "waktu": "10 menit",
            "deskripsi": "Grafik khusus yang membandingkan False Positive Rate vs True Positive Rate di seluruh rentang probabilitas.",
            "penjelasan_awam": "Jika threshold membedakan spam dan tidak spam digeser (dari super ketat ke super longgar), seberapa jeli model kita mendeteksi saringan tersebut? Semakin besar area bayangan di bawah grafiknya (AUC mendekati angka 1), makin mutlak dominasi kehebatan AI bot Anda.",
            "detail_teknis": "**Receiver Operating Characteristic (ROC)** adalah kurva probabilitas. Di sumbu X adalah False Positive Rate, sumbu Y adalah True Positive Rate. **AUC (Area Under the ROC Curve)** mengukur separability model secara agregat. AUC 0.5 berarti model cuma tebak koin acak, 1.0 berarti sempurna memisah data.",
            "contoh_nyata": "Di dunia medis diagnosa Tumor, dokter biasanya menyeting skor Recall tinggi (toleransi alarm palsu/FP tinggi asal jangan sampai kelewatan pasien sakit/FN rendah). ROC curve membantu memilih titik potong kompromi tersebut."
        }
    ],
    "MOD-04": [
        {
            "judul": "XGBoost & Gradient Boosting: Raja Panggung Kompetisi",
            "waktu": "15 menit",
            "deskripsi": "Evolusi penggabungan (ensemble) deretan pohon keputusan yang di-upgrade berkelanjutan.",
            "penjelasan_awam": "Berbeda dengan Random Forest (pohon paralel yang saling bebas), Gradient Boosting itu membuat sebuah kelompok pengerjaan PR anak jenius secara bergantian baris. Pohon 1 mengerjakan PR, tapi ada yang keliru/Loss. Pohon ke-2 hanya berfokus membenarkan error sisa Pohon 1! Begitu seterusnya hingga pohon ke-100 membuat error PR menjadi rata dengan tanah (nyaris nol).",
            "detail_teknis": "**Gradient Boosting** adalah metode aproksimasi ensemble optimisasi turunan berantai residual error. XGBoost (Extreme Gradient Boosting) adalah hardware-optimized library dari algoritma ini yang menggunakan paralelisasi internal, regularisasi bawaan (L1/L2), dan cache missing value awareness, menjadikannya favorit mutlak memenangi Kaggle Hackathon Tabular.",
            "analogi": "\"Random Forest adalah rapat komite 100 pakar untuk memilih satu menteri. Boosting adalah 1 menteri merevisi draft dokumen, lalu diterjemahkan menteri kedua, dan direvisi lagi sampai drafnya sempurna.\""
        },
        {
            "judul": "K-Fold Cross-Validation: Ujian Try Out Silang",
            "waktu": "8 menit",
            "deskripsi": "Teknik mutakhir mensimulasi tes agar skor akurasi bukan kebetulan hoki.",
            "penjelasan_awam": "Daripada membagi data jadi 1 bagian Belajar dan 1 Ujian (yang mungkin hoki materi soalnya gampang), mesin akan membelah bank soal jadi 5 bagian kecil. Mesin belajar 4/5, tes di 1/5. Lalu diulang tapi tesnya ditukar di bagian lain. Dirata-rata, maka skornya murni tanpa bias hoki!",
            "detail_teknis": "Dataset dipecah k lipat mutually exclusive. Model ditrain pada k-1 fold dan divalidasi pada hold-out 1 fold. Metrik performa akhir dicari nilai Average (Mean) & Variance-nya untuk membuktikan apakah model terjangkit Overfitting yang terisolasi pada split spesifik saja."
        }
    ],
    "MOD-05": [
        {
            "judul": "Hierarchical Clustering: Cabang Silsilah Pohon Cluster",
            "waktu": "10 menit",
            "deskripsi": "Membuat dendrogram silsilah klaster yang tidak perlu menentukan kumpulannya mau jadi 3 atau 10 grup dari awal.",
            "penjelasan_awam": "Awalnya AI menganggap semiliar spesies hewan adalah 1 buah titik mandiri. Lalu ia mulai menggabungkan 2 hewan yang paling mirip, misal macan dan singa. Terus menggabung hingga semuanya berakar pada 1 leluhur besar di layar. Anda tinggal pilih mau memotong akar setinggi apa untuk jumlah kelompok kerajaannya.",
            "detail_teknis": "Algoritma agglomerative bottom-up clustering. Membentuk struktur pohon hierarkis (Dendrogram). Kita memotong garis vertikal dendrogram memakai threshold jarak Euclidean untuk mendapatkan jumlah kluster $K$, terhindar dari trial & error inisialisasi awal ala K-Means centroid."
        },
        {
            "judul": "t-SNE & UMAP: Memeras Dimensi Ribuan ke Layar Datar 2D",
            "waktu": "12 menit",
            "deskripsi": "Teknik reduksi dimensi level atas yang super keren untuk melihat penyebaran data kompleks layaknya konstelasi galaksi.",
            "penjelasan_awam": "Bayangkan Anda punya data pasien DNA genetik dengan 5.000 kolom jenis sel (yang cuma bisa dilihat dewa mata ribuan dimensi). Ingin mencetaknya di kertas datar (2 Dimensi/2 kolom) tanpa merusak geng pasien-pasien yang berkerabat darah agar tetap dekat? Ini adalah sulap matematika t-SNE pemerasan dimensi tingkat atas!",
            "detail_teknis": "**t-SNE (t-Distributed Stochastic Neighbor Embedding)** memetakan jarak berdimensi tinggi menggunakan probabilitas sebaran Gaussian, dan mencocokannya di ranah Low-Dim menggunakan Student-t distribution untuk mengatasi Crowding Problem. UMAP adalah varian matematis topologi geometri yang lebih gesit dan merawat jarak struktur global."
        }
    ],
    "MOD-07": [
        {
            "judul": "Weight Initialization: Strategi Membuka Mata (Xavier / He)",
            "waktu": "12 menit",
            "deskripsi": "Mengapa otak bot jaringan sarat (neural network) tidak dilarang di-setting isi awalan nol (0) murni?",
            "penjelasan_awam": "Kalau Anda memulai pelatihan anjing dengan angka bobot yang eksak 0 (nol mutlak) pada semua sensor otaknya, anjing itu akan menderita kelumpuhan simetris (Symmetry Paralysis). Kiri dan Kanan pikirannya sama-sama tidak belajar. Otak di setting pabrik harus berupa angka kacau balau sangat kecil tapi berbeda-beda!",
            "detail_teknis": "Inisialisasi nol berakibat seluruh node layer tersembunyi merambatkan Error / Gradien kalkulus turunan yang terjerat nilai magnitudo simetris 100% kongruen. Untuk mengatasi ini, varians aktivasi dijaga oleh algoritma **Xavier Initialization** (untuk Sigmoid/Tanh) dan probabilitas **He Initialization** (untuk fungsi potong non zero spt ReLU).",
            "analogi": "\"Seperti menyetel frekuensi stasiun TV acak, ada noise statik murni (He Init) agar layar tabung memiliki modal sinyal kecil yang perlahan-lahan distem dengan jelas, bukannya mati lampu cabut stop kontak dari sumbu.\""
        }
    ],
    "MOD-08": [
        {
            "judul": "Augmentasi Citra Profesional di Computer Vision",
            "waktu": "10 menit",
            "deskripsi": "Cara melipatgandakan variasi data gambar tanpa harus jalan-jalan motret baru.",
            "penjelasan_awam": "AI Mata itu lugu, ia bisa langsung gagal hafal botol jika botolnya diputar menyamping (kalau belajar cuma botol berdiri). Jadi solusinya? Paksa fotonya diputar paksa, diregang (zoom crop), diberi noise efek silau warna! Model mata kita pusing sesaat, tapi setelah bisa menebaknya, level jenius objeknya roket meningkat tajam tahan banting 360 derajat.",
            "detail_teknis": "Data Augmentation bertindak sebagai teknik Regularization yang paling powerful untuk image matrix multidimensi. Metode modern meliputi Affine Transformations (Rotation, Translation, Shearing), Color Jitter (Brightness, Contrast, Saturation manipulation), dan metode generik sintetik CutOut/MixUp cut-paste interpolasi grid pixel tensor."
        }
    ],
    "MOD-10": [
        {
            "judul": "Self-Attention vs Cross-Attention",
            "waktu": "10 menit",
            "deskripsi": "Membedah alur ganda pencarian kesamaan pada Decoder.",
            "penjelasan_awam": "Ketika AI menerjemahkan kalimat, mula-mula ia menimbang frasa per-katanya sendirian (Self-Attention). Tapi kemudian, output tejemahan Inggris yang sedang dicicil dibangun harus bisa 'melirik' langsung ke kamus aslinya yang berbahasa Indonesia. Ini dinamakan 'Cross-Attention' (Dua belah pihak saling intip lintas kubu bahasa).",
            "detail_teknis": "Secara arsitektur Query (Q), Key (K), dan Value (V): Dalam **Self-Attention** matrix Q,K,V semuanya bersumber dari sequence data yang sama $X$. Dalam **Cross-Attention**, matrix Queries $Q$ datang dari Decoder sequence yang sedang diproduksi auto-regressive, sedangkan $K,V$ berasal menumpang dari representasi Encoder input source."
        }
    ],
    "MOD-11": [
        {
            "judul": "Pre-Norm vs Post-Norm : Perdebatan Penempatan Lapisan Normalisasi",
            "waktu": "8 menit",
            "deskripsi": "Detail mutakhir para peneliti di mana letak pintu penyaringan listrik layer harus ditancap.",
            "penjelasan_awam": "Buku paper orginal Google merakit filter tegangan listik otak (Layer Norm) sesudah pemrosesan kabel pikiran selesai (Post-Norm). Hasilnya? Pemanasan AI-Model sulit sekali, sering gagal lulus. Ilmuwan sekarang sadar: Taruh saringan voltasenya sebelum masuk layer (Pre-Norm), barulah model raksasa skala super jumbo bisa gampang berlatih mulus!",
            "detail_teknis": "Paper asli \"Attention is All You Need\" meletakan arsitektur LayerNorm di luar blok Residual connection $x + Sublayer(x)$, hal ini menciptakan krisis stabilitas *warm-up rate gradient* di lapisan atas. Solusi industri praktis LLM modern belakangan ini mengubah tata letaknya menjadi Pre-Norm: $x + Sublayer(LayerNorm(x))$ agar lebih konvergen."
        }
    ],
    "MOD-14": [
        {
            "judul": "Temperature Sampling & Top-p: Kenapa Chatbot Kadang Halu & Kreatif?",
            "waktu": "15 menit",
            "deskripsi": "Dial pengatur suhu untuk me-restart 'kewarasan matematis' AI model bahasa.",
            "penjelasan_awam": "Ketika ChatGPT diminta melanjutkan kata 'Selamat ...', AI punya probabilitas tebakan tabel list 'Pagi' (90%), 'Datang' (9%), 'Makan' (0.5%), dan 'Nuklir' (0.01%). Jika memutar slider Temperatur ke Titik 0 Beku, AI seperti pelayan hotel super kaku, pastiii pilih yang 90%. Jika temperatur 'Hot/Mendidih 2.0', AI mendadak super mabuk dan seniman, maka bisa jadi menyusun frasa estetik puitis bahkan ngawur: 'Selamat Nuklir!'",
            "detail_teknis": "Dalam arsitektur *decoding auto-regressive*, distribusi akhir dipetakan via logits di Layer Output Softmax. Pengaturan $T$ (Temperature): $p_i = \text{exp}(logit_i/T) / \sum \text{exp}(logit_j/T)$. $T < 1$ membuat tebakan tajam serakah (Greedy). $T > 1$ melempengkan pemerataan distribusi entropi uniform sampling. Digabungkan dengan teknik **Nucleus Top-p Sampling** (kumulatif probabilitas ekor panjang dipangkas/truncate), memblokir token gibberish parah.",
            "contoh_nyata": "Mengubah Temperature=0.0 untuk perintah Coding Programming (butuh ketepatan absolut syntax), dan menaikkan Temperature=0.9 untuk Prompt 'Tolong buatkan lirik lagu sedih malam rindu' (butuh loncatan probabilitas sastra non-linear)."
        },
        {
            "judul": "RLHF: Reinforcement Learning from Human Feedback (Bonus Industri)",
            "waktu": "12 menit",
            "deskripsi": "Sentuhan emas rahasia mengapa model Llama Vanilla dan ChatGPT bisa nurut diatur layaknya asisten sopan.",
            "penjelasan_awam": "Bayangkan AI yang asal selesai baca internet adalah anak yang sangat pintar menjawab tapi super kasar rasis ngelantur (Base LLM). Bagaimana cara mengajar sopan-santun? OpenAI mempekerjakan puluhan ribu guru manusia. Guru ini mencubit AI kalau jawabnya ngawur bahaya, dan mengelus kepala AI (+1 Poin Koin Hadiah) kalau jawabannya sopan dan edukatif. Pelatihan asisten ala pelatih anjing anjing militer ini dinamakan RLHF!",
            "detail_teknis": "Pipeline ChatGPT: 1) SFT (Supervised Fine Tuning) prompt-response labeler expert. 2) Melatih **Reward Model** sebagai wasit (guru evaluator). 3) Optimalisasi model utama base policy dengan Algoritma **PPO (Proximal Policy Optimization)** untuk me-maximize angka bobot penghargaan reward model raksasa tersebut."
        }
    ],
    "MOD-16": [
        {
            "judul": "Deepfakes & Propaganda Generatif Sintetis",
            "waktu": "10 menit",
            "deskripsi": "Realitas bengkok: ancaman misinformasi tingkat visual tingkat atas di era Pemilu Digital.",
            "penjelasan_awam": "Memakai alat Generative Adversarial Networks (GANs pelukis & polisi penipu) digabung Diffusion Voice Clone, Hacker bisa memasang siluman video wajah presiden berbicara perang nuklir dengan bahasa dan emosi bibir kedip sungguhan sempurna rapih. Bahaya terbesarnya? Kiamat verifikasi bukti.",
            "contoh_nyata": "Kasus penipuan eksekutif akunting mentransfer miliaran rupiah duit korporat karena meeting di Zoom dengan Bosnya (Padahal bos itu adalah muka Deepfakes hacker dan suara AI audio kloningan yang direkayasa real-time)."
        }
    ],
    "MOD-17": [
        {
            "judul": "Snippet Ekstraksi Pola Regex: Python Cepat",
            "waktu": "12 menit",
            "deskripsi": "Mari melihat wujud kode program Regular Expression ekstraktor dalam Python.",
            "penjelasan_awam": "Daripada pusing membaca teori state-machine (Mesin state panah string), ini adalah praktek mantap. Regex ibaratnya Anda memasang filter pancing magnet di danau pasir, magnet yang ditarik hanya merespon besi logam Email, dan pasir non text lainnya luluh berjatuhan.",
            "detail_teknis": "Dalam Python module `import re`. Jika pattern `r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$'` dieksekusi dengan fungsi `re.findall(pattern, document_teks)`, ia segera mencaplok ratusan domain email (seperti budi_oke99@gmail.com) tanpa me-looping *if* satu per-satu logika huruf abjad ASCII dengan berat komputasi lambat."
        },
        {
            "judul": "Perang Algoritma Sub-word: WordPiece vs SentencePiece",
            "waktu": "8 menit",
            "deskripsi": "Google memecahkan kata berimbuhan dalam berbagai bahasa tanpa batas spasial spasi asing.",
            "penjelasan_awam": "Tahu bahwa bahasa Jepang/Mandarin tidak punya karakter spasi tengah kalimat antara kumpulan frasa? Bagaimana cara AI memisah kata dasarnya? Solusinya adalah SentencePiece! Dia memperlakukan karakter 'Spasi' sebagai karakter '_', dan mencacahnya tanpa bingung grammar negara asing!",
            "detail_teknis": "Tokenizer modern (Google BERT murni memakai WordPiece yang merata-ratakan log-likelihood bahasa inggris token terpotong dengan ##). Sementara LLM mutakhir multiformat modern (Llama) mengadopsi SentencePiece yang lossless dan tak tergantung Pre-tokenization aturan linguistik English/Spasi Barat."
        }
    ],
    "MOD-18": [
        {
            "judul": "Kneser-Ney Smoothing: Korektor Logika Probabilitas yang Ajaib",
            "waktu": "10 menit",
            "deskripsi": "Penemuan teknik melicinkan probabilitas kata buta (Nol) menjadi akurat luar biasa.",
            "penjelasan_awam": "Bayangkan AI menebak akhir kata di frasa 'Saya memakai kacamata [?]'. Ada kata gaul spesifik misal 'Hongkong' yang sangat jarang muncul di koran tapi sangat sering nempel di belakang frasa 'Francisco' jadi 'San Francisco'. Algoritma masa lalu (Laplace/Add-1) akan memberikan probabilitas buta bahwa saya pakai kaca mata Hongkong/Francisco dengan rata pukul tinggi. **Kneser-Ney** adalah teknik pintar yang memahami: 'Oh, Francisco emang tinggi frekuensinya tapi nempel absolut cuma di kata San. Buat kata lain dia ampas/Nol!'.",
            "detail_teknis": "Absolute discounting technique dari Interpolated Smoothing N-Gram, berdasar pengelompokan frekuensi sambungan rantai Markov historis 'continuation probability' ketimbang unigram mentahan *count*. Teknik pamungkas ini mendominasi kejuaraan riset NLP sebelum invasi Neural Net / Transformers (Era pra-2015) merajai akurasi Language model."
        }
    ],
    "MOD-19": [
        {
            "judul": "Kembar Siam Arsitektur Word2Vec: Skip-Gram vs CBoW",
            "waktu": "12 menit",
            "deskripsi": "Dua cara neural model Word2Vec membolak-balikan belajar frasa konteks.",
            "penjelasan_awam": "Ada dua kubu game tebak kata otak mesin Vektor W2V ini:\n1. Mesin tebakan Buta **(CBOW - Bag of Words)**: Mesin membaca luar batas kalang misal 'Kucing ___ ke atap rumah'. Mesin harus menebak kalimat bolong pusat kembar Siam 'Melompat'.\n2. Mesin Dukun Meramal **(Skip-Gram)**: Beri ia satu kata aneh pusat (misal: Melompat), ia harus mampu menebak keliling 5 kata depan dan kemiringannya (Oh, bisa jadi sekelilingnya ada obyek hewan/lompatan katak/olimpiade tiang!).",
            "detail_teknis": "CBoW (Continuous Bag-of-Words) optimal pada dataset sempit memperpendek waktu training dan rata-rata smoothing distribusi. Sedang Word2Vec bentuk model **Skip-Gram** (dipercepat dengan skema Negative Sampling / H-Softmax) sangat unggul memetakan data trilyunan langka (rare-words context) ke pemetaan vector 300 Dimensi yang mendalam dengan sempurna."
        },
        {
            "judul": "Revolusi ElMo & BERT: Embedding Kontekstual Modern",
            "waktu": "10 menit",
            "deskripsi": "Tamat riwayatnya vektor statis kamus konstan layaknya kamus Oxford.",
            "penjelasan_awam": "Word2Vec 2013 punya masalah fatal. Ia memetakan koordinat vektor fix absolut kata 'Bisa' sebagai (Ular Bisa / Racun). Kalau masuk struktur sintak konversasi 'Saya pastinya Bisa berlari', AI jadul ini kebingungan keracunan racun. Solusinya? **Contextual Embedding (ELMo dan BERT)** datang. Ia membuat koordinat ruang kata 'Bisa' itu cair, bergerak mengikuti arus gelombang sisa seluruh paragraf!",
            "detail_teknis": "Menggunakan deep Bidirectional LSTM (ELMo) dan bi-directional Transformers masked encoder attention network (BERT), embedding vector dihitung dinamis di tiap query input time layer per-hidden *state*. Visi AI bukan pemetaan indeks statis hash matrix map statis layer dangkal lagi, tapi dynamic embedding $v = f(w_{i}, \text{kalimat\_seluruh})$. "
        }
    ],
    "MOD-20": [
        {
            "judul": "Seni Chunking Strategy di Sistem Retrieval RAG",
            "waktu": "10 menit",
            "deskripsi": "Bagaimana mesin AI harus memenggal paragraf panjang e-Book menjadi serpihan informasi yang dicari dengan cepat?",
            "penjelasan_awam": "Bayangkan robot memotong UU Hukum Negara 1.000 halaman. Kalau motong teks (Chunking) terlalu panjang 5 lembar borongan, akurasi vektor pudar bingung inti sarinya. Kalau dipotong tipis ekstrem (per 10 kata), malah maknanya tercerai berai miskin konteks ('Pada hari...'). Solusinya memakai teknik **Semantic Window Overlap Chunking**: motong pas sesuai judul Bab, saling ditumpuk irisan batas amannya.",
            "detail_teknis": "Variasi memotong korpus teks di NLP Pipeline framework semisal LangChain dan LlamaIndex:\n- **Fixed-size chunking + Overlap:** Memotong seragam (misal 512 tokens) dan tumpuk tumpang tindih margin overlap 50 token untuk menampal robekan info silang transisional.\n- **Semantic/Recursive Chunking:** Heuristik berbasis delimiter pemisah struktural (`\\n\\n`, `# Header`) memelihara hirarki dokumenter *parent/child retrieval nodes* sebelum dipetakan menjadi dense vektor FAISS database."
        },
        {
            "judul": "Hybrid Search RAG (Gabungan Dense + Sparse)",
            "waktu": "12 menit",
            "deskripsi": "Jalan keluar memadukan vektor makna semantik rasa AI dan kecerdasan pencocokan keyword mentah lama (BM25 ElasticSearch).",
            "penjelasan_awam": "Database vektor AI itu pintar, kalau kita search 'Benda melayang angkasa', dia ngerti itu cocok beririsan padan dengan dokumen kata kias 'Pesawat Terbang Udara' walau tak ada teks sama sekalipun. TAPIII.. Database Vektor AI ini bego kalau disuruh cari kode tag spesifik 'ERROR AX-2501' (susah ketemu). Maka di RAG level produksi Modern industri AI... harus dilakban lem gabungkan dua-duanya kekuatan ini! Keyword spesifik lawas ditambah Makna modern!",
            "detail_teknis": "Pipeline *Hybrid Search retrieval* men-skor fusi paralel indeks pencocokan eksak frekuensi terdistribusi TF-IDF BM25 Sparse Vector Index (Lucene API) bersamaan operasi perkalian Cosine/Euclidean Dot-Product Dense Embedding Neural (Cohere/OpenAI Vectors via Pinecone/Weaviate). Digabung memakai rumus *Reciprocal Rank Fusion (RRF)* formula $\\frac{1}{k + \\text{Rank}_{\\text{dense}}} + \\frac{1}{k + \\text{Rank}_{\\text{sparse}}}$."
        }
    ],
    "MOD-21": [
        {
            "judul": "Jantung Task-Oriented Chatbot: Dialogue State Tracking (DST)",
            "waktu": "10 menit",
            "deskripsi": "Mengajarkan Chatbot perhotelan mencatat ingatan tabel pemesanan reservasi layaknya kasir resepsionis asli.",
            "penjelasan_awam": "Chatbot pintar tidak cuma menjawab, ia harus punya formulir ghoib yang dicentang. 'Pesan tiket kereta!' (DST Catatan: [Tujuan = NULL, Tanggal = NULL]). Bot respon: 'Kemana bos?'. 'Ke Bandung besok malam.' (DST terupdate rekap database memory state: [Tujuan = BANDUNG, Tanggal = BESOK_MALAM, Kelas = NULL]). Proses mendeteksi *intent* dan entitas isian slot status percakapan multi-langkah bertahap dinamis inilah rahasia inti bot Traveloka/Tokopedia.",
            "detail_teknis": "Di bawah payung framework NLU (Natural Language Understanding) arsitektur seperti RASA framework open-source, algoritma NLP klasik (CRF / LSTM slot tagging / BERT joint classifier intent+entity) bekerja mensimulasi POMDP (Partially Observable Markov Decision Process) mencatat state probabilitas semantik (Belief Tracker/DST) lalu memicu Action execution modul Policy."
        }
    ]
};

let count = 0;
// Modify the curriculum object
Object.keys(advancedTopics).forEach(modId => {
    const mod = data.modul.find(m => m.id === modId);
    if (mod) {
        const topicsToAdd = advancedTopics[modId];
        topicsToAdd.forEach(topic => {
            mod.materi_detail.push(topic);
            count++;
        });
    }
});

fs.writeFileSync(curriculumPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully merged ${count} advanced topics into curriculum.json!`);
