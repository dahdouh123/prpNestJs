import { Controller, Get, Post, Body, Param, Put, Delete, Query, ValidationPipe } from '@nestjs/common';
import { DenominationProduitsService } from './denom.service';
import { CreateDenominationProduitsDto } from './dto/CreateDenominationProduitsDto';
import { DenominationProduitsDto } from './dto/DenominationProduitsDto';

@Controller('api/denominations')
export class DenominationProduitsController {
    constructor(private readonly service: DenominationProduitsService) {}
    @Get('list')
    async getProd(
      @Query('page') page: number = 1,
      @Query('pageSize') pageSize: number = 10,
      @Query('acsHoldingId') acsHoldingId: string,
    ): Promise<{ data: DenominationProduitsDto[]; rowCount: number }> {
            return this.service.getProductions(page, pageSize, acsHoldingId);
    }
    @Post()
    async create(@Body() createDto: CreateDenominationProduitsDto): Promise<DenominationProduitsDto> {
              return await this.service.create(createDto);
    }
    @Post('fromFile')
    async createAll(@Body() createDto: CreateDenominationProduitsDto[]): Promise<DenominationProduitsDto[]> {
        return await this.service.createMany(createDto); // Change this to call a new service method for multiple creations
    }

    @Put('ConvertAllUnitsToTonne')
    async updateAll(@Body() createDto: CreateDenominationProduitsDto[]): Promise<DenominationProduitsDto[]> {
        
        return await this.service.updateMany(createDto); // Change this to call a new service method for multiple creations
    }

    @Get()
    async findAll(@Query('page') page = 1, @Query('pageSize') limit = 10): Promise<DenominationProduitsDto[]> {
        return await this.service.findAll(+page, +limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<DenominationProduitsDto> {
              return await this.service.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDto: CreateDenominationProduitsDto): Promise<DenominationProduitsDto> {
        return await this.service.update(id, updateDto);
    }

    @Delete('supprimer/:id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.service.remove(id);
    }

   

}
