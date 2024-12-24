import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UpdatePrixDto } from './dto/update-prix.dto';
import { ValiderDonneesPrixCommand } from './dto/valider-donnees-prix.command';
import { Prix } from './entities/prix.entity';
import { InsertPrixDto } from './dto/create-prix.dto';
import { PrixService } from './prix.service';

@Controller('api/prix')
export class PrixController {
  constructor(private readonly prixService: PrixService) {}

  @Post()
  async createPrix(@Body() createPrixDto: InsertPrixDto): Promise<Prix> {
        return this.prixService.createPrix(createPrixDto);
  }


// Get all prixs
@Get()
async getAll(): Promise<Prix[]> {
  return this.prixService.findAll();
}
@Get('getProd')
async getProd(
  @Query('page') page: number,
  @Query('pageSize') pageSize: number,
  @Query('idUtilisateur') idUtilisateur: string
): Promise<{ data: Prix[]; rowCount: number , currentPage : number , pageSize: number }> {
  return this.prixService.getPrixs(
    page,
    pageSize,
    idUtilisateur,
  );
}


// Update a prix
@Patch(':id')
  async updatePrix(@Param('id') id: string, @Body() updatePrixDto: UpdatePrixDto): Promise<Prix> {
    return this.prixService.updatePrix(id, updatePrixDto);
  }

// Delete a prix
@Delete('supprimer/:id')
async remove(@Param('id') id: string): Promise<void> {
  return this.prixService.remove(id);
}

@Post('valider')
public async validatePrix(@Body() command: ValiderDonneesPrixCommand): Promise<void> {
    await this.prixService.validatePrixData(command);
}

}
