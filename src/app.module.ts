import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageGeneratorController } from './image-generator/image-generator.controller';
import { ImageGeneratorService } from './image-generator/image-generator.service';
import { PeIkGeneratorModule } from './pe-ik-generator/pe-ik-generator.module';

@Module({
  imports: [PeIkGeneratorModule],
  controllers: [AppController, ImageGeneratorController],
  providers: [AppService, ImageGeneratorService],
})
export class AppModule {}
