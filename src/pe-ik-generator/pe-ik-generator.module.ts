// src/payloads/payloads.module.ts
import { Module } from '@nestjs/common';
import { PeIkGeneratorController } from './pe-ik-generator.controller';
import { PeIkGeneratorService } from './pe-ik-generator.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PeIkGeneratorController],
  providers: [PeIkGeneratorService],
  imports: [HttpModule],
})
export class PeIkGeneratorModule {}
