import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ImageGeneratorService, PointsData } from './image-generator.service';

@Controller('points')
export class ImageGeneratorController {
  constructor(private readonly imageGeneratorService: ImageGeneratorService) {}

  @Post('generate-image')
  async generatePointsImage(@Body() data: PointsData, @Res() res: Response) {
    try {
      const imageBuffer = await this.imageGeneratorService.generatePointsImage(samplePointsData);
      
      res.set({
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length,
        'Content-Disposition': 'inline; filename="points-report.png"',
      });

      res.status(HttpStatus.OK).send(imageBuffer);
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to generate image',
        error: error.message,
      });
    }
  }

  @Post('generate-image-download')
  async generatePointsImageDownload(@Body() data: PointsData, @Res() res: Response) {
    try {
      const imageBuffer = await this.imageGeneratorService.generatePointsImage(samplePointsData);
      
      res.set({
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length,
        'Content-Disposition': 'attachment; filename="points-report.png"',
      });

      res.status(HttpStatus.OK).send(imageBuffer);
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to generate image',
        error: error.message,
      });
    }
  }
}

// Example usage data structure
export const samplePointsData: PointsData = {
  title: "Poins",
  revenue: [
    { date: "03 Jun 2025", items: "Rafika", type: "New", total: 4700000 },
    { date: "10 Jun 2025", items: "Iska", type: "New", total: 4700000 },
    { date: "12 Jun 2025", items: "Violina", type: "New", total: 4700000 },
    { date: "12 Jun 2025", items: "Ibrahim, Rafi dan Numa", type: "New", total: 7500000 },
    { date: "13 Jun 2025", items: "Raya", type: "New", total: 2000000 },
    { date: "14 Jun 2025", items: "Joanna", type: "New", total: 5250000 },
    { date: "14 Jun 2025", items: "Arsyad", type: "New", total: 5250000 },
    { date: "14 Jun 2025", items: "Virian", type: "Down Payment", total: 750000 },
    { date: "18 Jun 2025", items: "Riyuda Nakaya", type: "Down Payment", total: 500000 },
    { date: "25 Jun 2025", items: "Pridesinta & Thanandira", type: "Holiday Program", total: 950000 },
    { date: "26 June 2025", items: "Abeline", type: "New", total: 4700000 },
    { date: "30 Jun 2025", items: "Erlina", type: "New", total: 750000 },
    { date: "30 Jun 2025", items: "Kelas Main", type: "Event", total: 400000 },
    { date: "30 June 2025", items: "Abraham", type: "Installment 1", total: 2000000 },
    { date: "30 Jun 2025", items: "Rahual", type: "Event", total: 425000 }
  ],
  attendance: [
    { date: "Jun 28, 2025", sessions: 3, attended: 7, missed: 1 },
    { date: "Jun 26, 2025", sessions: 4, attended: 9, missed: 4 },
    { date: "Jun 25, 2025", sessions: 4, attended: 7, missed: 1 },
    { date: "Jun 24, 2025", sessions: 4, attended: 11, missed: 2 },
    { date: "Jun 23, 2025", sessions: 4, attended: 7, missed: 2 },
    { date: "Jun 21, 2025", sessions: 3, attended: 8, missed: 0 },
    { date: "Jun 20, 2025", sessions: 5, attended: 3, missed: 6 }
  ],
  staff: [
    { role: "Poins Mall Center Manager", name: "Maria", count: 1 },
    { role: "Pe coach", name: "Azam", count: 1 },
    { role: "teacher", name: "Salsabila, Dina", count: 2 }
  ],
  statistics: {
    registerPremium: 32,
    waitingClass: 15,
    cancel: 32,
    totalStudent: 32
  }
};