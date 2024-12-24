// src/consolide/consolide.controller.ts
import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ConsolideService } from './consolide.service';
import { ConsolidePRP } from './dto/consolide-prp.dto';
import { join } from 'path';
import { promises as fsPromises } from 'fs';

import { Response } from 'express';
import { createReadStream } from 'fs';
@Controller('api/consolide')
export class ConsolideController {
  constructor(private readonly consolideService: ConsolideService) {}

 readonly uploadDir = join(process.cwd(), 'src/uploads'); // Adjust the path as necessary
 // private readonly uploadDir = join(process.cwd(), 'C:/Users/a.azzouni/Desktop/ecoffe/'); // Adjust the path as necessary

 
 @Get(':filename')
 async downloadFile(@Param('filename') filename: string, @Res() response: Response) {
   const filePath = join(this.uploadDir, filename);
   console.log("file path", filePath);
   console.log("file name", filename);

   const fileStream = createReadStream(filePath);
   console.log("file str", fileStream);

   response.set({
     'Content-Disposition': `attachment; filename="${filename}"`,
     'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // For .xlsx files
   });

   // Pipe the file stream to the response
   fileStream.pipe(response);

   // After the file has been downloaded, copy it to another location
   fileStream.on('end', async () => {
    const destinationPath = `C:/Users/a.azzouni/Desktop/ecoffe/${filename}`; // Destination path
    await this.copyFile(filePath, destinationPath);
  });
 }

 async copyFile(source: string, destination: string): Promise<void> {
   try {
     await fsPromises.copyFile(source, destination);
     console.log(`File copied from ${source} to ${destination}`);
   } catch (error) {
     console.error(`Error copying file: ${error}`);
   }
 }
    @Get()
    async getConsolideData(
      @Query('page') page: number,
      @Query('size') size: number,
      @Query('affiliation') affiliation: string,
      @Query('affectation') affectation: string,
      @Query('exercice') exercice?: string,
      @Query('trimestre') trimestre?: string,
    ) {
      return this.consolideService.getConsolideData(page, size, affiliation,affectation, exercice, trimestre);
    }
}