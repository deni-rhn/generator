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
  private readonly walisCode = [
    '001',
    '002',
    '003',
    '004',
    '005',
    '006',
    '007',
    '008',
    '009',
    '010',
    '011',
    '012',
    '013',
    '014',
    '015',
  ];
  private readonly firstNames = ['Alan', 'Sinta', 'Budi', 'Ayu', 'Rizky', 'Putri', 'Bagus', 'Prasetya'];
  private readonly lastNames  = ['Prasetya', 'Maharani', 'Santoso', 'Putri', 'Maulana', 'Hidayat', 'Pratama', 'Lestari'];
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
  private randomFullName(): string {
    return `${this.randomItem(this.firstNames)} ${this.randomItem(this.lastNames)} ${this.randomItem(this.firstNames)}`;
  }
  private numStr(len: number): string {
    return Array.from({ length: len }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
  }

  constructor(
    private readonly service: PeIkGeneratorService,
    private readonly http: HttpService,
  ) {}

  @Post('generate')
  async generate(
    @Body() dto: GeneratePayloadDto,
  ): Promise<{ sent: SentResponse[], count: number }> {
    const payloads = this.service.generate(dto.count, dto.unique);

    const targetUrl = 'https://api-stg.dto.kemkes.go.id/asik-pe-ik/v1/api/patient/encryption';
    const postUrl = 'https://api-stg.dto.kemkes.go.id/asik-pe-ik/v1/api/patient/registration';
    // const targetUrl = 'https://asik-be.sesasi.xyz/v1/api/patient/encryption';
    // const postUrl = 'https://asik-be.sesasi.xyz/v1/api/patient/registration';
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
      jenis_kelamin: '1',
      name: this.randomFullName(),
      nik: nextNik(),
      no_handphone: nextPhone(),
      relasi_code: this.randomItem(this.walisCode),
      tgl_lahir: this.randomDate(),
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
