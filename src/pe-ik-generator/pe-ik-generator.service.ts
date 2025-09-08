// src/payloads/payloads.service.ts
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class PeIkGeneratorService {
  private readonly channels = ['ssp', 'ckg', 'siha', 'sitb', 'sismal'];
  private readonly klasterCodes = ['TB-001', 'TB-002', 'TB-003', 'TB-004', 'TB-005'];
  private readonly kodeKelurahans = [
    '3174051003', '3174051002', '3174051001',
    '3174051004', '3174051005', '3174051006',
  ];
  private readonly firstNames = ['Alan', 'Sinta', 'Budi', 'Ayu', 'Rizky', 'Putri', 'Bagus', 'Prasetya', 'Maulana', 'Dewi', 'Eka', 'Surya', 'Nanda', 'Citra', 'Galih', 'Amru', 'Fajri', 'Denis', 'Aziz'];
  private readonly lastNames  = ['Prasetya', 'Maharani', 'Santoso', 'Putri', 'Maulana', 'Kurniawan', 'Wibowo', 'Wijaya', 'Rahmawati', 'Saputra', 'Siregar', 'Ananda', 'Hidayat', 'Pratama', 'Lestari'];

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
