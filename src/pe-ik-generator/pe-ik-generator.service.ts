// src/payloads/payloads.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class PeIkGeneratorService {
  private readonly kelurahans = [
    { code: '3174051003', name: 'Cipulir' },
    { code: '3174051002', name: 'Pondok Pinang' },
    { code: '3174051001', name: 'Kebayoran Lama Utara' },
    { code: '3174051004', name: 'Grogol Utara' },
    { code: '3174051005', name: 'Grogol Selatan' },
    { code: '3174051006', name: 'Kebayoran Lama Selatan' },
  ];
  private readonly firstNames = [
    "Rani", "Bagus", "Ayu", "Reza", "Putri", "Dwi", "Adi", "Fitri", "Rizal", "Sari",
    "Eka", "Gilang", "Lestari", "Tika", "Andika", "Maya", "Naufal", "Rizka", "Hana", "Tomi",
    "Indra", "Cindy", "Rendra", "Fauzan", "Rika", "Rafi", "Yuli", "Farhan", "Nadia", "Rio",
    "Intan", "Nia", "Vina", "Rama", "Dea", "Adit", "Taufik", "Lina", "Arif", "Salsa",
    "Iqbal", "Niken", "Dimas", "Lani", "Kevin", "Alika", "Rafa", "Wahyu", "Santi", "Dewi",
    "Galang", "Fina", "Kirana", "Yoga", "Mira", "Ilham", "Rona", "Angga", "Vira", "Putra",
    "Tito", "Nanda", "Aldi", "Selvi", "Lukita", "Bayuaji", "Reno", "Aulia", "Dian", "Rehan",
    "Dina", "Febri", "Hendra", "Evelyn", "Yona", "Riyan", "Amel", "Zahra", "Tari", "Baginda"
  ];

  private readonly lastNames = [
    "Mahendra", "Wibowo", "Kurniawan", "Hartono", "Sari", "Ramadhani", "Hidayat", "Putranto", "Gunawan", "Saputro",
    "Setiawan", "Wijanarko", "Kusnadi", "Purnomo", "Santika", "Nirmala", "Prasetyo", "Utama", "Handoko", "Wicaksono",
    "Ariyanto", "Rahardjo", "Susilowati", "Herlambang", "Anggraini", "Budiman", "Kartika", "Permana", "Sumardi", "Sukma",
    "Prabowo", "Adisaputra", "Widjaja", "Warsito", "Darmadi", "Rahayu", "Susilowati", "Basuki", "Wijanarko", "Handayani",
    "Santono", "Kuswanto", "Saputri", "Wibisono", "Harjono", "Anggoro", "Nurdin", "Lesmana", "Yuliarti", "Purwanto",
    "Wijayanti", "Setiono", "Mulyadi", "Astuti", "Harsono", "Suryawan", "Sutrisno", "Panjaitan", "Sukoco", "Mahardika",
    "Rachman", "Pangestu", "Wardani", "Nuraini", "Indrawan", "Kartono", "Sudrajat", "Hardiansyah", "Supriyadi", "Anwar",
    "Lestiani", "Suharto", "Hartanti", "Adinata", "Gunadi", "Kusnandar", "Wijayanto", "Tjahjono", "Muljono", "Santyani"
  ];
  // JAKARTA
  private readonly faskesAsal = [
    {
      code: "1000200832",
      name: "Klinik Utama Primaguna Bakti Mandiri"
    },
    {
      code: "1005018624",
      name: "Klinik Pratama Diri Clinic Arteri Pondok Indah"
    },
    {
      code: "1004762307",
      name: "Klinik Utama Abga Dermatology Clinic"
    }
  ];
  // kismantoro
  // private readonly faskesAsal = [
  //   { 
  //     code: "1001483314",
  //     name: "PUSTU KEPATIHAN SELOGIRI"
  //   },
  //   {
  //     code: "1001307663",
  //     name: "PUSTU PIDEKSO GIRIWOYO I"
  //   },
  //   {
  //     code: "1001332644",
  //     name: "PUSTU SEMBUKAN SIDOHARJO"
  //   },
  //   {
  //     code: "1001243805",
  //     name: "PUSTU KULUREJO NGUNTORONADI I"
  //   },
  //   {
  //     code: "1001374070",
  //     name: "PUSTU TEMBORO KARANGTENGAH"
  //   },
  //   {
  //     code: "1001456177",
  //     name: "PUSTU GEDONGREJO GIRIWOYO I"
  //   },
  //   {
  //     code: "1001459739",
  //     name: "PUSTU GUNAN SLOGOHIMO"
  //   },
  //   {
  //     code: "1001483792",
  //     name: "PUSTU KERJO LOR NGADIROJO"
  //   },
  //   {
  //     code: "1001341970",
  //     name: "PUSTU SINDUKARTO EROMOKO I"
  //   },
  //   {
  //     code: "1001458096",
  //     name: "PUSTU GIRIYOSO JATIPURNO"
  //   }
  // ];
  // banten
  // private readonly faskesAsal = [
  //   { 
  //     code: "1001433175",
  //     name: "PUSTU BOJONG LELES MANDALA"
  //   },
  //   {
  //     code: "1004662947",
  //     name: "Pustu Bojongcae"
  //   },
  //   {
  //     code: "1001362807",
  //     name: "PUSTU TAMBAKBAYA MANDALA"
  //   }
  // ];
  // genuk semarang 
  // private readonly faskesAsal = [
  //   { 
  //     code: "1001310684",
  //     name: "PUSTU PONGANGAN GUNUNGPATI"
  //   },
  //   {
  //     code: "1001309130",
  //     name: "PUSTU PLAMONGANSARI TELOGOSARI WETAN"
  //   },
  //   {
  //     code: "1001255846",
  //     name: "PUSTU CUMI-CUMI"
  //   },
  //   {
  //     code: "1001303423",
  //     name: "PUSTU JATIBARANG MIJEN"
  //   },
  //   {
  //     code: "1001328306",
  //     name: "PUSTU KUNINGAN BANDARHARJO"
  //   },
  //   {
  //     code: "1001465594",
  //     name: "PUSTU JABUNGAN PADANGSARI"
  //   },
  //   {
  //     code: "1001400788",
  //     name: "PUSTU TEGALSARI KAGOK"
  //   },
  //   {
  //     code: "1001243491",
  //     name: "PUSTU KUDU BANGET AYU"
  //   },
  //   {
  //     code: "1001322821",
  //     name: "PUSTU SADENG GUNUNGPATI"
  //   },
  //   {
  //     code: "1001347663",
  //     name: "PUSTU PANJANGAN MANYARAN"
  //   }
  // ];
  // aceh 
  // private readonly faskesAsal = [
  //   { 
  //     code: "1001459806",
  //     name: "PUSTU GUNONG CUT TANGAN-TANGAN"
  //   },
  //   {
  //     code: "1001446794",
  //     name: "PUSTU COT SEUMANTOK BABAHROT"
  //   },
  //   {
  //     code: "1001385342",
  //     name: "PUSTU UJUNG PADANG SUSOH"
  //   },
  //   {
  //     code: "1001484928",
  //     name: "PUSTU KEUDE BARO ALUE PISANG"
  //   },
  //   {
  //     code: "1001464708",
  //     name: "PUSTU IKUE LHUNG ALUE SUNGAI PINANG"
  //   },
  //   {
  //     code: "1001330062",
  //     name: "PUSTU SEJAHTERA MANGGENG"
  //   },
  //   {
  //     code: "1001243001",
  //     name: "PUSTU KUALA TERUBUE KUALA BATEE"
  //   },
  //   {
  //     code: "1001385421",
  //     name: "PUSTU UJUNG TANAH LHANG"
  //   },
  //   {
  //     code: "1001412614",
  //     name: "PUSTU ALUE JEUREJAK BABAHROT"
  //   },
  //   {
  //     code: "1001412755",
  //     name: "PUSTU ALUE PADEE KUALA BATEE"
  //   }
  // ];
  // duluduo
  // private readonly faskesAsal = [
  //   { 
  //     code: "1001256577",
  //     name: "PUSTU LOLAN TADOY"
  //   },
  //   {
  //     code: "1001261027",
  //     name: "PUSTU MAELANG MAELANG"
  //   },
  //   {
  //     code: "1001275389",
  //     name: "PUSTU MOPUGAD UTARA MOPUYA"
  //   },
  //   {
  //     code: "1001280102",
  //     name: "PUSTU NANASI POIGAR"
  //   },
  //   {
  //     code: "1001267291",
  //     name: "PUSTU MARIRI BARU POIGAR"
  //   },
  //   {
  //     code: "1001309831",
  //     name: "PUSTU POIGAR III POIGAR"
  //   },
  //   {
  //     code: "1001300859",
  //     name: "PUSTU IBOLIAN WERDHI AGUNG"
  //   },
  //   {
  //     code: "1001474064",
  //     name: "PUSTU KANAAN PUSIAN"
  //   },
  //   {
  //     code: "1001482334",
  //     name: "PUSTU KEMBANG MERTHA IMANDI"
  //   },
  //   {
  //     code: "1001439155",
  //     name: "PUSTU BUMBUNG BUNTALO"
  //   }
  // ];
  private readonly clasters = [
    { code: 'TB', name: 'Tuberkulosis' },
    { code: 'HIV', name: 'HIV' },
    { code: 'MAL', name: 'Malaria' },
  ];
  // private readonly kelurahans = [
  //     {
  //         name: "Bugelan",
  //         code: "3312162003",
  //         parent_code: "331216"
  //     },
  //     {
  //         name: "Gambiranom",
  //         code: "3312162009",
  //         parent_code: "331216"
  //     },
  //     {
  //         name: "Gedawung",
  //         code: "3312162010",
  //         parent_code: "331216"
  //     },
  //     {
  //         name: "Gesing",
  //         code: "3312161008",
  //         parent_code: "331216"
  //     },
  //     {
  //         name: "Kismantoro",
  //         code: "3312161005",
  //         parent_code: "331216"
  //     },
  //     {
  //         name: "Lemahbang",
  //         code: "3312162007",
  //         parent_code: "331216"
  //     },
  //     {
  //         name: "Miri",
  //         code: "3312162006",
  //         parent_code: "331216"
  //     },
  //     {
  //         name: "Ngroto",
  //         code: "3312162004",
  //         parent_code: "331216"
  //     },
  //     {
  //         name: "Plosorejo",
  //         code: "3312162002",
  //         parent_code: "331216"
  //     },
  //     {
  //         name: "Pucung",
  //         code: "3312162001",
  //         parent_code: "331216"
  //     }
  // ];
  // private readonly kelurahans = [
  //       {
  //           name: "Doloduo",
  //           code: "7101092004",
  //           parent_code: "710109"
  //       },
  //       {
  //           name: "Doloduo Dua",
  //           code: "7101092019",
  //           parent_code: "710109"
  //       },
  //       {
  //           name: "Doloduo Satu",
  //           code: "7101092018",
  //           parent_code: "710109"
  //       },
  //       {
  //           name: "Ikhwan",
  //           code: "7101092003",
  //           parent_code: "710109"
  //       },
  //       {
  //           name: "Matayangan",
  //           code: "7101092001",
  //           parent_code: "710109"
  //       },
  //       {
  //           name: "Mekaruo",
  //           code: "7101092011",
  //           parent_code: "710109"
  //       },
  //       {
  //           name: "Toraut ",
  //           code: "7101092010",
  //           parent_code: "710109"
  //       },
  //       {
  //           name: "Toraut Utara",
  //           code: "7101092017",
  //           parent_code: "710109"
  //       },
  //       {
  //           name: "Uuan",
  //           code: "7101092002",
  //           parent_code: "710109"
  //       },
  //       {
  //           name: "Wangga Baru",
  //           code: "7101092005",
  //           parent_code: "710109"
  //       }
  //   ];
  //banten
  // private readonly kelurahans = [
  //   {
  //       name: "Asem",
  //       code: "3602182005",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Asem Margaluyu",
  //       code: "3602182014",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Bojong Leles",
  //       code: "3602182011",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Bojongcae",
  //       code: "3602182008",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Cibadak",
  //       code: "3602182004",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Cimenteng Jaya",
  //       code: "3602182012",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Cisangu",
  //       code: "3602182006",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Kaduagung Barat",
  //       code: "3602182007",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Kaduagung Tengah",
  //       code: "3602182015",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Kaduagung Timur",
  //       code: "3602182002",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Malabar",
  //       code: "3602182009",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Mekar Agung",
  //       code: "3602182013",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Panancangan",
  //       code: "3602182003",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Pasar Keong",
  //       code: "3602182010",
  //       parent_code: "360218"
  //   },
  //   {
  //       name: "Tambakbaya",
  //       code: "3602182001",
  //       parent_code: "360218"
  //   }
  // ];

  // aceh jeumpa barat data 
  // private readonly kelurahans = [
  //       {
  //           name: "Alue Rambot",
  //           code: "1112082002",
  //           parent_code: "111208"
  //       },
  //       {
  //           name: "Alue Seulaseh",
  //           code: "1112082012",
  //           parent_code: "111208"
  //       },
  //       {
  //           name: "Alue Sungai Pinang",
  //           code: "1112082004",
  //           parent_code: "111208"
  //       },
  //       {
  //           name: "Asoe Nanggroe",
  //           code: "1112082007",
  //           parent_code: "111208"
  //       },
  //       {
  //           name: "Baru",
  //           code: "1112082001",
  //           parent_code: "111208"
  //       },
  //       {
  //           name: "Cot Mane",
  //           code: "1112082005",
  //           parent_code: "111208"
  //       },
  //       {
  //           name: "Ikue Lhung",
  //           code: "1112082009",
  //           parent_code: "111208"
  //       },
  //       {
  //           name: "Jeumpa Barat",
  //           code: "1112082011",
  //           parent_code: "111208"
  //       },
  //       {
  //           name: "Kuta Jeumpa",
  //           code: "1112082003",
  //           parent_code: "111208"
  //       },
  //       {
  //           name: "Kuta Makmur",
  //           code: "1112082010",
  //           parent_code: "111208"
  //       },
  //       {
  //           name: "Ladang Neubok",
  //           code: "1112082006",
  //           parent_code: "111208"
  //       },
  //       {
  //           name: "Padang Geulumpang",
  //           code: "1112082008",
  //           parent_code: "111208"
  //       }
  //   ];

  // genuk semarang 
  // private readonly kelurahans = [
  //       {
  //           name: "Bangetayu Kulon",
  //           code: "3374051010",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Bangetayu Wetan",
  //           code: "3374051011",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Banjardowo",
  //           code: "3374051005",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Gebangsari",
  //           code: "3374051006",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Genuksari",
  //           code: "3374051004",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Karangroto",
  //           code: "3374051003",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Kudu",
  //           code: "3374051002",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Muktiharjo Lor",
  //           code: "3374051009",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Penggaron Lor",
  //           code: "3374051008",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Sembungharjo",
  //           code: "3374051001",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Terboyo Kulon",
  //           code: "3374051012",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Terboyo Wetan",
  //           code: "3374051013",
  //           parent_code: "337405"
  //       },
  //       {
  //           name: "Trimulyo",
  //           code: "3374051007",
  //           parent_code: "337405"
  //       }
  //   ];
  private readonly streets = [
    "Jl. Merpati No. 23",
    "Jl. Anggrek Raya No. 12",
    "Jl. Melati Indah No. 5",
    "Jl. Mawar No. 56",
    "Jl. Kenanga No. 3",
    "Jl. Flamboyan No. 24",
    "Jl. Dahlia No. 18",
    "Jl. Cendana No. 41",
    "Jl. Nusa Indah No. 9",
    "Jl. Pandan Wangi No. 27",
    "Jl. Seroja No. 19",
    "Jl. Cemara No. 11",
    "Jl. Kamboja No. 8",
    "Jl. Teratai No. 22",
    "Jl. Beringin No. 44",
    "Jl. Bougenville No. 7A",
    "Jl. Wijaya Kusuma No. 16",
    "Jl. Taman Sari No. 33",
    "Jl. Jati No. 29",
    "Jl. Pahlawan No. 42",
    "Jl. Cempaka No. 14",
    "Jl. Lestari No. 31",
    "Jl. Merdeka No. 99",
    "Jl. Gatot Subroto No. 7",
    "Jl. Diponegoro No. 34",
    "Jl. Sudirman No. 88",
    "Jl. Ahmad Yani No. 102",
    "Jl. Teuku Umar No. 25",
    "Jl. Rajawali No. 77",
    "Jl. Sisingamangaraja No. 55",
    "Jl. Imam Bonjol No. 17",
    "Jl. Cut Nyak Dien No. 39",
    "Jl. Hasanudin No. 13",
    "Jl. Patimura No. 21",
    "Jl. HOS Cokroaminoto No. 72",
    "Jl. Kartini No. 28",
    "Jl. MH Thamrin No. 6",
    "Jl. Veteran No. 15",
    "Jl. Panglima Sudirman No. 19",
    "Jl. Ahmad Dahlan No. 16"
  ];
  private readonly occupations = [
    "belum-tidak-bekerja",
    "pelajar",
    "mahasiswa",
    "ibu-rumah-tangga",
    "tni",
    "polri",
    "asn-kantor-pemerintah",
    "pegawai-swasta",
    "wirausaha-pekerja-mandiri",
    "pensiunan",
    "pejabat-negara-pejabat-daerah",
    "pengusaha",
    "dokter",
    "bidan",
    "perawat",
    "apoteker",
    "psikolog",
    "tenaga-kesehatan-lainnya",
    "dosen",
    "guru",
    "peneliti",
    "pengacara",
    "notaris",
    "hakim-jaksa-tenaga-peradilan-lainnya",
    "akuntan",
    "insinyur",
    "arsitek",
    "konsultan",
    "wartawan",
    "pedagang",
    "petani-pekebun",
    "nelayan-perikanan",
    "peternak",
    "tokoh-agama",
    "juru-masak",
    "pelaut",
    "sopir",
    "pilot",
    "masinis",
    "atlet",
    "pekerja-seni",
    "penjahit-perancang-busana",
    "karyawan-kantor-pegawai-administratif",
    "teknisi-mekanik",
    "pekerja-pabrik-buruh",
    "pekerja-konstruksi",
    "pekerja-pertukangan",
    "pekerja-migran",
    "lainnya"
  ];


  // YYYY-MM-DD in Asia/Jakarta without extra deps
  private todayJakarta(): string {
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
  }

  private randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private numStr(len: number): string {
    return Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join('');
  }

  private randomDate(startYear = 1960, endYear = 2005): string {
    const start = new Date(Date.UTC(startYear, 0, 1));
    const end   = new Date(Date.UTC(endYear, 11, 31));
    const t = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(t).toISOString().slice(0, 10);
  }

  private randomFullName(): string {
    return `${this.randomItem(this.firstNames)} ${this.randomItem(this.lastNames)} ${this.randomItem(this.firstNames)}`;
  }

  private getRandomFaskesAsal(returnValue: 'code' | 'name') {
    const randomIndex = Math.floor(Math.random() * this.faskesAsal.length);
    const { code, name } = this.faskesAsal[randomIndex];
    if (returnValue === 'code') return code;
    return name;
  }

  private getRandomKelurahan(returnValue: 'code' | 'name') {
    const randomIndex = Math.floor(Math.random() * this.kelurahans.length);
    const { code, name } = this.kelurahans[randomIndex];
    if (returnValue === 'code') return code;
    return name;
  }

  generate(count: number, unique = false, isHaveWalis = false) {
    const today = this.todayJakarta();

    // For uniqueness if requested
    const usedNik = new Set<string>();
    const usedPhone = new Set<string>();

    const nextNik = () => {
      let v = this.numStr(13);
      if (!unique) return v;
      while (usedNik.has(v)) v = this.numStr(16);
      usedNik.add(v);
      return '123' + v;
    };

    const nextPhone = () => {
      let v = '08' + this.numStr(9);
      if (!unique) return v;
      while (usedPhone.has(v)) v = '08' + this.numStr(9);
      usedPhone.add(v);
      return v;
    };

    const getAgeFromRandomDate = (dobStr: string): number => {
      const dob = new Date(dobStr);
      const today = new Date();

      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      // Adjust if birthday hasn’t happened yet this year
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
      return age;
    };

    const td = new Date();
    // const yyyy = td.getFullYear();
    // const mm = String(td.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    // const dd = String(td.getDate()).padStart(2, '0');
    // const fullDate = `${yyyy}-${mm}-${dd}`;

    return Array.from({ length: count }, () => {

      return {
        "program": "SURVEILANS",
        "data": {
          "faskes_asal_satusehat_code": this.getRandomFaskesAsal('code'),
          "faskes_satusehat_code": this.getRandomFaskesAsal('code'),
          "tgl_kunjungan": td.toISOString(),
          "tipe_pendaftaran": isHaveWalis ? "individu_lain" : "diri_sendiri",
          "disabilitas": false,
          // "panyakit": "HIV",
          "pasien": {
            "jenis_kelamin": this.randomItem(['1', '2']),
            "kode_pekerjaan": this.randomItem(this.occupations),
            "name": this.randomFullName(),
            "nik": nextNik(),
            "umur": getAgeFromRandomDate(this.randomDate()),
            "nisn": `NISN${Date.now()}`,
            "no_bpjs": `BPJS${Date.now()}`,
            "status_bpjs": 'aktif',
            "no_handphone": nextPhone(),
            "status_perkawinan_code": this.randomItem(['A', 'D', 'I', 'L', 'M', 'P', 'S', 'T', 'U', 'W']),
            "tgl_lahir": this.randomDate(),
            "no_bpjsk": `BPJSK${Date.now()}`,
            "status_bpjsk": 'aktif',
          },
          "domisili_pasien": {
            "alamat": this.randomItem(this.streets),
            "kode_kecamatan": "317405",
            "kode_kelurahan": this.getRandomKelurahan('code'),
            "kode_kota": "3174",
            "kode_pos": "12230",
            "kode_provinsi": "31",
            "negara": "Indonesia",
            "rt": "003",
            "rw": "005",
          },
        },
      };
    });
  }
}

// duluduo
// domisili_pasien: {
//             alamat: this.randomItem(this.streets),
//             kode_kecamatan: '710109',
//             kode_kelurahan: this.getRandomKelurahan('code'),
//             kode_kota: '7101',
//             kode_pos: '12140',
//             kode_provinsi: '71',
//             negara: 'Indonesia',
//             rt: '003',
//             rw: '005',
//           },

// kismantoro
// "domisili_pasien": {
//             "alamat": this.randomItem(this.streets),
//             "kode_kecamatan": "331216",
//             "kode_kelurahan": this.getRandomKelurahan('code'),
//             "kode_kota": "3312",
//             "kode_pos": "57696",
//             "kode_provinsi": "33",
//             "negara": "Indonesia",
//             "rt": "003",
//             "rw": "005",
//           },
// banten 
// "domisili_pasien": {
//             "alamat": this.randomItem(this.streets),
//             "kode_kecamatan": "360218",
//             "kode_kelurahan": this.getRandomKelurahan('code'),
//             "kode_kota": "3602",
//             "kode_pos": "12140",
//             "kode_provinsi": "36",
//             "negara": "Indonesia",
//             "rt": "003",
//             "rw": "005",
//           },

// aceh barat daya
// domisili_pasien: {
//             alamat: this.randomItem(this.streets),
//             kode_kecamatan: '111208',
//             kode_kelurahan: this.getRandomKelurahan('code'),
//             kode_kota: '1112',
//             kode_pos: '12140',
//             kode_provinsi: '11',
//             negara: 'Indonesia',
//             rt: '003',
//             rw: '005',
//           },

// genuk semarang 
// "domisili_pasien": {
//             "alamat": this.randomItem(this.streets),
//             "kode_kecamatan": "337405",
//             "kode_kelurahan": this.getRandomKelurahan('code'),
//             "kode_kota": "3374",
//             "kode_pos": "12140",
//             "kode_provinsi": "33",
//             "negara": "Indonesia",
//             "rt": "003",
//             "rw": "005",
//           },
// jakrta
// "domisili_pasien": {
//             "alamat": this.randomItem(this.streets),
//             "kode_kecamatan": "317405",
//             "kode_kelurahan": this.getRandomKelurahan('code'),
//             "kode_kota": "3174",
//             "kode_pos": "12230",
//             "kode_provinsi": "31",
//             "negara": "Indonesia",
//             "rt": "003",
//             "rw": "005",
//           },

// panyakit: "HIV", -> "HIV", "TB", "MAL"