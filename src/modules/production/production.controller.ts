import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductionService } from './production.service';
import { Production } from './entities/production.entity';
import { InsertProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ValiderDonneesProductionCommand } from './dto/valider-donnees-production.command';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post()
  @UseInterceptors(FileInterceptor('urlecoffe')) // Intercept the file upload
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductionDto: InsertProductionDto,
  ) {
    if (file) {
      console.log("file imported",file);
      // Save the file path to the DTO
      createProductionDto.urlecoffe = file.path; // Ensure you have a way to save this path
    }
    // Call the service to create a production entry
    const production = await this.productionService.createProduction(createProductionDto);

    // Return a success message along with the created production data
    return {
      message: 'File uploaded successfully!',
      production, // Optionally return the created production data
    };
  }

// Get all productions
@Get()
async getAll(): Promise<Production[]> {
  return this.productionService.findAll();
}
@Get('getProd')
async getProd(
  @Query('page') page: number,
  @Query('pageSize') pageSize: number,
  @Query('idUtilisateur') idUtilisateur: string
): Promise<{ data: Production[]; rowCount: number  , currentPage : number , pageSize: number }> {
  return this.productionService.getProductions(
    page,
    pageSize,
    idUtilisateur,
  );
}


// Update a production
@Patch(':id')
  async updateProduction(@Param('id') id: number, @Body() updateProductionDto: UpdateProductionDto): Promise<Production> {
    return this.productionService.updateProduction(id, updateProductionDto);
  }

// Delete a production
@Delete('supprimer/:id')
async remove(@Param('id') id: number): Promise<void> {
  return this.productionService.remove(id);
}

@Post('valider')
public async validateProduction(@Body() command: ValiderDonneesProductionCommand): Promise<void> {
    await this.productionService.validateProductionData(command);
}

}
