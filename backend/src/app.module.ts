import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { Data, DataSchema } from './data/data.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bancodedados'),
    DataModule,
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
