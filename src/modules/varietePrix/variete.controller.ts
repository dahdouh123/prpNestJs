import { Controller, Get, Post, Body, Param, Put, Delete, Query, ValidationPipe } from '@nestjs/common';
import { CreateVarieteProduitsDto } from './dto/CreateVarietePrixDto';
import { VarieteProduitsDto } from './dto/VarieteProduitsDto';
import { VarieteProduitsService } from './variete.service';

@Controller('api/variete')
export class VarieteProduitsController {
    constructor(private readonly service: VarieteProduitsService) {}
    @Get('list')
    async getProd(
      @Query('page') page: number = 1,
      @Query('pageSize') pageSize: number = 10,
      @Query('acsHoldingId') acsHoldingId: string,
    ): Promise<{ data: VarieteProduitsDto[]; rowCount: number }> {
            return this.service.getProductions(page, pageSize, acsHoldingId);
    }
    @Post()
    async create(@Body() createDto: CreateVarieteProduitsDto): Promise<VarieteProduitsDto> {
              return await this.service.create(createDto);
    }
    @Post('fromFile')
    async createAll(@Body() createDto: CreateVarieteProduitsDto[]): Promise<VarieteProduitsDto[]> {
        return await this.service.createMany(createDto); // Change this to call a new service method for multiple creations
    }

    @Get()
    async findAll(@Query('page') page = 1, @Query('pageSize') limit = 10): Promise<VarieteProduitsDto[]> {
        return await this.service.findAll(+page, +limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<VarieteProduitsDto> {
              return await this.service.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDto: CreateVarieteProduitsDto): Promise<VarieteProduitsDto> {
        return await this.service.update(id, updateDto);
    }

    @Delete('supprimer/:id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.service.remove(id);
    }

   

}
