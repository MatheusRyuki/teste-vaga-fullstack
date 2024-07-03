import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { DataSchema } from './data.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Data', schema: DataSchema }])],
  providers: [DataService],
  controllers: [DataController],
})
export class DataModule {}
