// src/payloads/payloads.service.ts
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class PeIkGeneratorService {
  private readonly channels = ['ssp', 'ckg', 'siha', 'sitb', 'sismal'];
  private readonly klasterCodes = ['TB-001', 'TB-002', 'TB-003', 'TB-004', 'TB-005'];
  // private readonly kelurahans = [
  //   { code: '3174051003', name: 'Cipulir' },
  //   { code: '3174051002', name: 'Pondok Pinang' },
  //   { code: '3174051001', name: 'Kebayoran Lama Utara' },
  //   { code: '3174051004', name: 'Grogol Utara' },
  //   { code: '3174051005', name: 'Grogol Selatan' },
  //   { code: '3174051006', name: 'Kebayoran Lama Selatan' },
  // ];
  private readonly firstNames = [
    "Bagas", "Citra", "Tiara", "Hanif", "Yudha", "Larasati", "Mega", "Ajeng", "Sekar", "Fajar",
    "Cahya", "Raditya", "Ratri", "Larasati", "Citra", "Galuh", "Damar", "Rizky", "Bayu", "Ajeng",
    "Dyah", "Tiara", "Arga", "Mega", "Wulan", "Ningrum", "Pandu", "Anindya", "Agung", "Lukman",
    "Galuh", "Surya", "Teguh", "Endah", "Yudha", "Tiara", "Wulan", "Damar", "Sinta", "Fajar",
    "Hanif", "Ratri", "Mega", "Raditya", "Wisnu", "Bayu", "Retno", "Sinta", "Bagas", "Jatmiko",
    "Citra", "Larasati", "Raka", "Sekar", "Agung", "Teguh", "Dyah", "Ajeng", "Cahya", "Retno",
    "Bimo", "Surya", "Lukman", "Satrio", "Sri", "Ningrum", "Pandu", "Anindya", "Wisnu", "Intan",
    "Yudha", "Mega", "Tiara", "Damar", "Citra", "Endah", "Fajar", "Bayu", "Agung", "Hanif"
  ];
  private readonly lastNames  = [
    "Wijaya", "Putra", "Saputra", "Ningrum", "Melati", "Utami", "Wijaya", "Adiwarna", "Yulianto", "Kusuma",
    "Santosa", "Wijaya", "Rochmat", "Asmoro", "Saputra", "Puspita", "Nugroho", "Lestari", "Melati", "Pertiwi",
    "Suryaningsih", "Subroto", "Saputra", "Iskandar", "Rahmawati", "Nugroho", "Pangestu", "Wijaya", "Hardjono", "Puspita",
    "Putra", "Wijaya", "Yulianto", "Harjanti", "Rochmat", "Wulandari", "Asmoro", "Dewantoro", "Lestari", "Permadi",
    "Adiwarna", "Susanto", "Saputra", "Wijaya", "Wulandari", "Utami", "Handayani", "Putra", "Prasetya", "Pranata",
    "Wulandari", "Ningrum", "Yulianto", "Puspita", "Wijanarko", "Iskandar", "Melati", "Cahyaningtyas", "Suryaningsih", "Wijaya",
    "Handayani", "Nugroho", "Putra", "Wijaya", "Saputra", "Susanto", "Rahmawati", "Asmoro", "Widodo", "Dewantoro",
    "Permadi", "Rochmat", "Kusuma", "Saputra", "Wijaya", "Lestari", "Utami", "Asmoro", "Wijaya", "Adiwarna"
  ];
  private readonly kelurahans = [
      {
          name: "Bugelan",
          code: "3312162003",
          parent_code: "331216"
      },
      {
          name: "Gambiranom",
          code: "3312162009",
          parent_code: "331216"
      },
      {
          name: "Gedawung",
          code: "3312162010",
          parent_code: "331216"
      },
      {
          name: "Gesing",
          code: "3312161008",
          parent_code: "331216"
      },
      {
          name: "Kismantoro",
          code: "3312161005",
          parent_code: "331216"
      },
      {
          name: "Lemahbang",
          code: "3312162007",
          parent_code: "331216"
      },
      {
          name: "Miri",
          code: "3312162006",
          parent_code: "331216"
      },
      {
          name: "Ngroto",
          code: "3312162004",
          parent_code: "331216"
      },
      {
          name: "Plosorejo",
          code: "3312162002",
          parent_code: "331216"
      },
      {
          name: "Pucung",
          code: "3312162001",
          parent_code: "331216"
      }
  ];
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

  // private readonly kelurahans = [
  //     {
  //         name: "Abeuk Tingkeum",
  //         code: "1111042060",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Abeuk Usong",
  //         code: "1111042058",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Alue Limeng",
  //         code: "1111042077",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Batee Timoh",
  //         code: "1111042035",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Beurawang",
  //         code: "1111042039",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Blang Bladeh",
  //         code: "1111042049",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Blang Cot Baroh",
  //         code: "1111042044",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Blang Cot Tunong",
  //         code: "1111042045",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Blang Dalam",
  //         code: "1111042051",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Blang Gandai",
  //         code: "1111042063",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Blang Mee",
  //         code: "1111042061",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Blang Rheum",
  //         code: "1111042071",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Blang Seunong",
  //         code: "1111042033",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Blang Seupeung",
  //         code: "1111042062",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Cot Bada",
  //         code: "1111042054",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Cot Gadong",
  //         code: "1111042053",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Cot Geureundong",
  //         code: "1111042037",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Cot Iboeh Timu",
  //         code: "1111042079",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Cot Iboih",
  //         code: "1111042065",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Cot Keutapang",
  //         code: "1111042047",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Cot Leusong",
  //         code: "1111042034",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Cot Meugoe",
  //         code: "1111042078",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Cot Tarom Baroh",
  //         code: "1111042043",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Cot Tarom Tunong",
  //         code: "1111042048",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Cot Ulim",
  //         code: "1111042064",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Geudong Tampu",
  //         code: "1111042042",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Gleumpang  Payong",
  //         code: "1111042032",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Kuala Jeumpa",
  //         code: "1111042052",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Kuta Meuligoe",
  //         code: "1111042080",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Laksamana",
  //         code: "1111042081",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Lipah Cut",
  //         code: "1111042038",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Lipah Rayeuk",
  //         code: "1111042036",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Mon Jambee",
  //         code: "1111042050",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Mon Mane",
  //         code: "1111042076",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Paloh Panyang",
  //         code: "1111042072",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Paloh Seulimeng",
  //         code: "1111042059",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Pulo Lawang",
  //         code: "1111042057",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Salah Sirong Jaya",
  //         code: "1111042075",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Seuleumbah",
  //         code: "1111042046",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Seuneubok  Lhong",
  //         code: "1111042073",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Teupok Baroh",
  //         code: "1111042055",
  //         parent_code: "111104"
  //     },
  //     {
  //         name: "Teupok Tunong",
  //         code: "1111042056",
  //         parent_code: "111104"
  //     }
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

  private getRandomKelurahan(returnValue: 'code' | 'name') {
    const randomIndex = Math.floor(Math.random() * this.kelurahans.length);
    const { code, name } = this.kelurahans[randomIndex];
    if (returnValue === 'code') return code;
    return name;
  }

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

  private ticket(prefix: string, digits: number): string {
    return prefix + this.numStr(digits);
  }

  private randomDate(startYear = 1960, endYear = 2005): string {
    const start = new Date(Date.UTC(startYear, 0, 1));
    const end   = new Date(Date.UTC(endYear, 11, 31));
    const t = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(t).toISOString().slice(0, 10);
  }

  private randomFullName(): string {
    return `${this.randomItem(this.firstNames)} ${this.randomItem(this.lastNames)} ${this.randomItem(this.firstNames)} ${this.randomItem(this.firstNames)} ${this.randomItem(this.firstNames)} ${this.randomItem(this.firstNames)}`;
  }

  generate(count: number, unique = false) {
    const today = this.todayJakarta();

    // For uniqueness if requested
    const usedNik = new Set<string>();
    const usedPhone = new Set<string>();

    const nextNik = () => {
      let v = this.numStr(16);
      if (!unique) return v;
      while (usedNik.has(v)) v = this.numStr(16);
      usedNik.add(v);
      return v;
    };

    const nextPhone = () => {
      let v = '08' + this.numStr(9);
      if (!unique) return v;
      while (usedPhone.has(v)) v = '08' + this.numStr(9);
      usedPhone.add(v);
      return v;
    };

    return Array.from({ length: count }, () => {
      const idReg = 'REG' + today.replace(/-/g, '') + this.numStr(3);

      return {
        program: 'PE-IK',
        channel: this.randomItem(this.channels),
        trace_id: randomUUID(),
        data: {
          domisili_pasien: {
            alamat: 'Kismantoro No. 10',
            kode_kecamatan: '331216',
            kode_kelurahan: this.getRandomKelurahan('code'),
            kode_kota: '3312',
            kode_pos: '57696',
            kode_provinsi: '31',
            nama_kecamatan: 'Kismantoro',
            nama_kelurahan: this.getRandomKelurahan('name'),
            nama_kota: 'Kab. Wonogiri',
            nama_provinsi: 'Jawa Tengah',
            negara: 'Indonesia',
            rt: '003',
            rw: '005',
          },
          faskes_asal_satusehat_code: '1000156689',
          faskes_satusehat_code: '1001518262',
          id_registrasi: idReg,
          klaster_code: this.randomItem(this.klasterCodes),
          no_tiket: this.ticket('TCT', 7),
          pasien: {
            bahasa: 'Indonesian',
            jenis_kelamin: this.randomItem(['1', '2']),
            kode_bahasa: 'id-ID',
            kode_pekerjaan: 'pensiunan',
            name: this.randomFullName(),
            nik: nextNik(),
            no_handphone: nextPhone(),
            pekerjaan: 'Pensiunan',
            status_perkawinan: 'Unmarried',
            status_perkawinan_code: 'U',
            tgl_lahir: this.randomDate(),
          },
          tgl_kunjungan: today,
          tgl_pendaftaran: today,
          tipe_pendaftaran: 'diri_sendiri',
        },
      };
    });
  }
}

// duluduo
// domisili_pasien: {
//             alamat: 'Kampung Tengah No. 5',
//             kode_kecamatan: '710109',
//             kode_kelurahan: this.getRandomKelurahan('code'),
//             kode_kota: '7101',
//             kode_pos: '12140',
//             kode_provinsi: '71',
//             nama_kecamatan: 'Dumoga Barat',
//             nama_kelurahan: this.getRandomKelurahan('name'),
//             nama_kota: 'Kab. Bolaang Mongondow',
//             nama_provinsi: 'Sulawesi Utara',
//             negara: 'Indonesia',
//             rt: '003',
//             rw: '005',
//           }

// kismantoro
// domisili_pasien: {
//             alamat: 'Kismantoro No. 10',
//             kode_kecamatan: '331216',
//             kode_kelurahan: this.getRandomKelurahan('code'),
//             kode_kota: '3312',
//             kode_pos: '57696',
//             kode_provinsi: '31',
//             nama_kecamatan: 'Kismantoro',
//             nama_kelurahan: this.getRandomKelurahan('name'),
//             nama_kota: 'Kab. Wonogiri',
//             nama_provinsi: 'Jawa Tengah',
//             negara: 'Indonesia',
//             rt: '003',
//             rw: '005',
//           }

// kebayoran lama 
// domisili_pasien: {
//             alamat: 'Jl. Gandaria I No.10',
//             kode_kecamatan: '317405',
//             kode_kelurahan: this.getRandomKelurahan('code'),
//             kode_kota: '3174',
//             kode_pos: '12140',
//             kode_provinsi: '31',
//             nama_kecamatan: 'Kebayoran Lama',
//             nama_kelurahan: this.getRandomKelurahan('name'),
//             nama_kota: 'Kota Adm. Jakarta Selatan',
//             nama_provinsi: 'DKI Jakarta',
//             negara: 'Indonesia',
//             rt: '003',
//             rw: '005',
//           }

// banten 
// domisili_pasien: {
//             alamat: 'Kampung Tengah No. 5',
//             kode_kecamatan: '360218',
//             kode_kelurahan: this.getRandomKelurahan('code'),
//             kode_kota: '3602',
//             kode_pos: '12140',
//             kode_provinsi: '36',
//             nama_kecamatan: 'Cibadak',
//             nama_kelurahan: this.getRandomKelurahan('name'),
//             nama_kota: 'Kab. Lebak',
//             nama_provinsi: 'Banten',
//             negara: 'Indonesia',
//             rt: '003',
//             rw: '005',
//           }

// aceh Bireuen
// domisili_pasien: {
//             alamat: 'Kampung Tengah No. 5',
//             kode_kecamatan: '111104',
//             kode_kelurahan: this.getRandomKelurahan('code'),
//             kode_kota: '1111',
//             kode_pos: '12140',
//             kode_provinsi: '11',
//             nama_kecamatan: 'Jeumpa',
//             nama_kelurahan: this.getRandomKelurahan('name'),
//             nama_kota: 'Kab. Bireuen',
//             nama_provinsi: 'Aceh',
//             negara: 'Indonesia',
//             rt: '003',
//             rw: '005',
//           }

// aceh barat daya
// domisili_pasien: {
//             alamat: 'Kampung Tengah No. 5',
//             kode_kecamatan: '111208',
//             kode_kelurahan: this.getRandomKelurahan('code'),
//             kode_kota: '1112',
//             kode_pos: '12140',
//             kode_provinsi: '11',
//             nama_kecamatan: 'Jeumpa',
//             nama_kelurahan: this.getRandomKelurahan('name'),
//             nama_kota: 'Kab. Aceh Barat Daya',
//             nama_provinsi: 'Aceh',
//             negara: 'Indonesia',
//             rt: '003',
//             rw: '005',
//           }

// genuk semarang 
// domisili_pasien: {
//             alamat: 'Pedurungan',
//             kode_kecamatan: '337405',
//             kode_kelurahan: this.getRandomKelurahan('code'),
//             kode_kota: '3374',
//             kode_pos: '50117',
//             kode_provinsi: '33',
//             nama_kecamatan: 'Genuk',
//             nama_kelurahan: this.getRandomKelurahan('name'),
//             nama_kota: 'Kota Semarang',
//             nama_provinsi: 'Jawa Tengah',
//             negara: 'Indonesia',
//             rt: '003',
//             rw: '005',
//           }