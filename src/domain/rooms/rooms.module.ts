import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { LocalUploadsService } from '@/domain/uploads/local-uploads.service';

@Module({
  controllers: [RoomsController],
  providers: [
    RoomsService,
    { provide: 'Uploads', useClass: LocalUploadsService },
  ],
  exports: [RoomsService],
})
export class RoomsModule {}
