import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // Allow other modules to use services provided by this module
})
export class DatabaseModule {}
