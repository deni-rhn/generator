import { AxiosResponse, isAxiosError } from 'axios';
// src/payloads/payloads.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { PeIkGeneratorService } from './pe-ik-generator.service';
import { GeneratePayloadDto } from './dto/pe-ik-generator.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

type EncryptionApiResponse<T> = { data: T };
type EncryptedPayload = Record<string, any>; // Changed from string to object

interface SentResponse {
  status: EncryptionApiResponse<EncryptedPayload>;
  payload: EncryptedPayload;
}

@Controller('pe-ik-generator')
export class PeIkGeneratorController {
  private readonly kodeKelurahans = [
    '3174051003', '3174051002', '3174051001',
    '3174051004', '3174051005', '3174051006',
  ];
  private readonly guardianData = [
    { code: "001", name: "ayah" },
    { code: "002", name: "ibu" },
    { code: "003", name: "kakek" },
    { code: "004", name: "nenek" },
    { code: "005", name: "famili lain" },
    { code: "006", name: "anak" },
    { code: "007", name: "adik" },
    { code: "008", name: "kakak" },
    { code: "009", name: "suami" },
    { code: "010", name: "istri" },
    { code: "011", name: "cucu" },
    { code: "012", name: "menantu" },
    { code: "013", name: "mertua" },
    { code: "014", name: "teman" },
    { code: "015", name: "sdm kesehatan" }
  ];

  private readonly firstNames = ['Alan', 'Sinta', 'Budi', 'Ayu', 'Rizky', 'Putri', 'Bagus', 'Prasetya', 'Budi', 'Lamto', 'Surono', 'Marina', 'Dewi', 'Joko', 'Sari'];
  private readonly lastNames  = ['Prasetya', 'Maharani', 'Santoso', 'Putri', 'Maulana', 'Hidayat', 'Pratama', 'Lestari', 'Indo', 'Raharjo', 'Saputra'];
  private randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  private randomDate(startYear = 1960, endYear = 2005): string {
    const start = new Date(Date.UTC(startYear, 0, 1));
    const end = new Date(Date.UTC(endYear, 11, 31));
    const t =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(t).toISOString().slice(0, 10);
  }

  private getAgeFromRandomDate(dobStr: string): number {
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
  }
  private randomFullName(): string {
    return `${this.randomItem(this.firstNames)} ${this.randomItem(this.lastNames)} ${this.randomItem(this.firstNames)}`;
  }
  private numStr(len: number): string {
    return Array.from({ length: len }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
  }

  private getRandomGuardian(returnValue: 'code' | 'name') {
    const randomIndex = Math.floor(Math.random() * this.guardianData.length);
    const { code, name } = this.guardianData[randomIndex];
    if (returnValue === 'code') return code;
    return name;
  }

  constructor(
    private readonly service: PeIkGeneratorService,
    private readonly http: HttpService,
  ) {}

  @Post('generate')
  async generate(
    @Body() dto: GeneratePayloadDto,
  ): Promise<{ sent: SentResponse[], count: number }> {
    const payloads = this.service.generate(
      dto.count,
      dto.unique,
      dto.isHaveWalis,
    );

    const targetUrl = 'https://asik-be-p2.sesasi.xyz/v1/api/patient/encryption';
    const postUrl = 'https://asik-be-p2.sesasi.xyz/v1/api/patient/registration';
    const encryptedPayloads: EncryptedPayload[] = [];
    const sentResponses: SentResponse[] = []; // Fixed type

    const usedNik = new Set<string>();
    const usedPhone = new Set<string>();

    const nextNik = () => {
      let v = this.numStr(16);
      while (usedNik.has(v)) v = this.numStr(16);
      usedNik.add(v);
      return v;
    };

    const nextPhone = () => {
      let v = '08' + this.numStr(9);
      while (usedPhone.has(v)) v = '08' + this.numStr(9);
      usedPhone.add(v);
      return v;
    };

    const walis = {
      jenis_kelamin: this.randomItem(['1', '2']),
      name: this.randomFullName(),
      nik: nextNik(),
      no_handphone: nextPhone(),
      relasi_code: this.getRandomGuardian('code'),
      tgl_lahir: this.randomDate(),
      relasi_name: this.getRandomGuardian('name'),
      umur: this.getAgeFromRandomDate(this.randomDate()),
      kode_pekerjaan: 'pensiunan',
      pekerjaan: 'Pensiunan',
    };

    const walis_domicile = {
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
    };

    for (const payload of payloads) {
      const traceId = payload.trace_id;
      const payloadWithWalis = {
        program: payload.program,
        channel: payload.channel,
        trace_id: payload.trace_id,
        data: {
          ...payload.data,
          wali: {
            ...walis,
          },
          domisili_wali: {
            ...walis_domicile,
          },
        },
      };
      // const paypay = dto.isHaveWalis ? { ...payload, wali: walis } : payload;
      // console.log('payload', dto.isHaveWalis, payloadWithWalis);
      try {
        const response: AxiosResponse<EncryptionApiResponse<EncryptedPayload>> =
          await firstValueFrom(
            this.http.post<EncryptionApiResponse<EncryptedPayload>>(
              targetUrl,
              dto.isHaveWalis ? payloadWithWalis : payload,
              { headers: { 'Content-Type': 'application/json' } },
            ),
          );
        const encryptedData: EncryptedPayload = response.data.data;
        encryptedPayloads.push(response.data.data);

        // Step 2: Submit encrypted
        const submitResponse: AxiosResponse<
          EncryptionApiResponse<EncryptedPayload>
        > = await firstValueFrom(
          this.http.post<EncryptionApiResponse<EncryptedPayload>>(
            postUrl,
            {
              ...encryptedData,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic Y2xpZW50MTpzM2NyM3Q=',
              },
            },
          ),
        );

        sentResponses.push({
          status: submitResponse.data,
          payload: encryptedData,
        });
        console.log(`📤 Submitted encrypted payload trace_id=${traceId}`);
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.error(
            `❌ Error sending payload trace_id=${traceId}`,
            error.response?.data ?? error.message,
          );
        } else {
          console.error(`❌ Error sending payload trace_id=${traceId}`, error);
        }
      }
    }

    return { count: sentResponses.length, sent: sentResponses };
  }
}
