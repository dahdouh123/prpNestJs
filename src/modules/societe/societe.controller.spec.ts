import { Test, TestingModule } from '@nestjs/testing';
import { SocieteController } from './societe.controller';

describe('SocieteController', () => {
  let controller: SocieteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocieteController],
    }).compile();

    controller = module.get<SocieteController>(SocieteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
