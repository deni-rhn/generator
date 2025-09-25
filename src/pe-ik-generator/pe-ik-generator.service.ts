// src/payloads/payloads.service.ts
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class PeIkGeneratorService {
  private readonly channels = ['ssp', 'ckg', 'siha', 'sitb', 'sismal'];
  private readonly kodeKelurahans = [
    '3174051003', '3174051002', '3174051001',
    '3174051004', '3174051005', '3174051006',
  ];
  private readonly firstNames = ['Alan', 'Sinta', 'Budi', 'Ayu', 'Rizky', 'Putri', 'Bagus', 'Prasetya', 'Maulana', 'Dewi', 'Eka', 'Surya', 'Nanda', 'Citra', 'Galih', 'Amru', 'Fajri', 'Denis', 'Aziz', , 'Budi', 'Lamto', 'Surono', 'Marina', 'Dewi', 'Joko', 'Sari'];
  private readonly lastNames  = ['Prasetya', 'Maharani', 'Santoso', 'Putri', 'Maulana', 'Kurniawan', 'Wibowo', 'Wijaya', 'Rahmawati', 'Saputra', 'Siregar', 'Ananda', 'Hidayat', 'Pratama', 'Lestari', 'Mandiri', 'Indo', 'Raharjo', 'Saputra'];
  private readonly faskesAsal = [
    { code: '1000164301', name: 'Klinik Utama Kusuma Tembaga' },
    { code: '1000165549', name: 'KLINIK PRATAMA KEMENTERIAN DESA PEMBANGUNAN DAERAH TERTINGGAL DAN TRANSMIGRASI' },
    { code: '1000165757', name: 'Klinik Pratama Pertamina IHC' },
    { code: '1000641426', name: 'Klinik Utama Simas Sehat Sejahtera' },
    { code: '1000641074', name: 'Klinik Utama Pandawa' },
    { code: '1004674768', name: 'Klinik Pratama Duraskin Centre' },
    { code: '1004751762', name: 'KLINIK PRATAMA LUNIX' },
    { code: '1004811213', name: 'Klinik Utama Djani Dental Studio' },
    { code: '1004960234', name: 'Klinik Pratama Happy Dental Clinic Senayan City' },
    { code: '1000245911', name: 'Klinik Pratama Mitrasana Boulevard Timur' },
    { code: '1000246264', name: 'Klinik Utama Permata Indah Medical Center' }
  ];
  private readonly clasters = [
    { code: 'TB', name: 'Tuberkulosis' },
    { code: 'HIV', name: 'HIV' },
    { code: 'MAL', name: 'Malaria' },
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
    return `${this.randomItem(this.firstNames)} ${this.randomItem(this.lastNames)} ${this.randomItem(this.firstNames)}`;
  }

  private getRandomFaskesAsal(returnValue: 'code' | 'name') {
    const randomIndex = Math.floor(Math.random() * this.faskesAsal.length);
    const { code, name } = this.faskesAsal[randomIndex];
    if (returnValue === 'code') return code;
    return name;
  }

  private getRandomClasters(returnValue: 'code' | 'name') {
    const randomIndex = Math.floor(Math.random() * this.clasters.length);
    const { code, name } = this.clasters[randomIndex];
    if (returnValue === 'code') return code;
    return name;
  }

  generate(count: number, unique = false, isHaveWalis = false) {
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
    const yyyy = td.getFullYear();
    const mm = String(td.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(td.getDate()).padStart(2, '0');
    const fullDate = `${yyyy}-${mm}-${dd}`;
    const monthYear = `${yyyy}-${mm}-${dd}`;

    return Array.from({ length: count }, () => {
      const idReg = 'REG' + today.replace(/-/g, '') + this.numStr(3);

      return {
        program: 'PE-IK',
        channel: this.randomItem(this.channels),
        trace_id: randomUUID(),
        data: {
          faskes_asal_satusehat_code: this.getRandomFaskesAsal('code'),
          faskes_asal_satusehat_name: this.getRandomFaskesAsal('name'),
          faskes_satusehat_code: '1001518262',
          faskes_satusehat_name: 'KEL.  KEBAYORAN LAMA UTARA',
          id_registrasi: idReg,
          klaster_code: this.getRandomClasters('code'),
          klaster_name: this.getRandomClasters('name'),
          no_tiket: this.ticket('TCT', 7),
          tgl_kunjungan: fullDate,
          bulan_kunjungan: monthYear,
          tahun_kunjungan: yyyy.toString(),
          tgl_pendaftaran: fullDate,
          bulan_pendaftaran: monthYear,
          tahun_pendaftaran: yyyy.toString(),
          tipe_pendaftaran: isHaveWalis ? 'individu_lain' : 'diri_sendiri',
          disabilitas: false,
          domisili_pasien: {
            alamat: 'Jl. Gandaria I No.10',
            kode_kecamatan: '317405',
            kode_kelurahan: this.randomItem(this.kodeKelurahans),
            kode_kota: '3174',
            kode_pos: '12140',
            kode_provinsi: '31',
            nama_kecamatan: 'Kebayoran Baru',
            nama_kelurahan: 'Gandaria Utara',
            nama_kota: 'Jakarta Selatan',
            nama_provinsi: 'DKI Jakarta',
            negara: 'Indonesia',
            rt: '003',
            rw: '005',
          },
          pasien: {
            bahasa: 'Indonesian',
            jenis_kelamin: this.randomItem(['1', '2']),
            kode_bahasa: 'id-ID',
            kode_pekerjaan: 'pensiunan',
            name: this.randomFullName(),
            nik: nextNik(),
            no_handphone: nextPhone(),
            pekerjaan: 'Pensiunan',
            status_perkawinan: 'Menikah',
            status_perkawinan_code: 'M',
            tgl_lahir: this.randomDate(),
            umur: getAgeFromRandomDate(this.randomDate()),
            nisn: `NISN${Date.now()}`,
            no_bpjs: `BPJS${Date.now()}`,
            status_bpjs: 'aktif',
            no_bpjsk: `BPJSK${Date.now()}`,
            status_bpjsk: 'aktif',
          },
        },
      };
    });
  }
}