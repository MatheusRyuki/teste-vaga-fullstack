import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data, DataDocument } from './data.schema';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(Data.name) private readonly dataModel: Model<DataDocument>,
  ) {}

  async processCsvData(csvData: any[]): Promise<any[]> {
    try {
      const savedData = await this.dataModel.create(csvData);
      return savedData;
    } catch (error) {
      throw new Error('Erro ao salvar dados no MongoDB');
    }
  }
}
