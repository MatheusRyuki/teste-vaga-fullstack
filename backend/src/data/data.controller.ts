import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from './data.service';
import { DataDocument } from './data.schema';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  async getAllSheets(): Promise<DataDocument[]> {
    return this.dataService.getAllSheets();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File): Promise<any> {
    try {
      const fileBuffer = file.buffer;
      const parsedData = await this.parseCsvData(fileBuffer);

      const savedData = await this.dataService.processCsvData(parsedData);

      return { message: 'Dados salvo com sucesso', data: savedData };
    } catch (error) {
      return { message: 'Erro ao salvar dados', error: error.message };
    }
  }

  private async parseCsvData(fileBuffer: Buffer): Promise<any[]> {
    const results = [];
    const lines = fileBuffer.toString().split('\n');

    for (const line of lines) {
      const columns = line.split(',');

      if (columns.length < 27) {
        continue;
      }

      const parseString = (value: string): string | null => {
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : null;
      };

      const parseNumber = (value: string): number | null => {
        const parsed = parseFloat(value.trim());
        return isNaN(parsed) ? null : parsed;
      };

      const parseIntNumber = (value: string): number | null => {
        const parsed = parseInt(value.trim(), 10);
        return isNaN(parsed) ? null : parsed;
      };

      const dataObject = {
        nrInst: parseString(columns[0]),
        nrAgencia: parseString(columns[1]),
        cdClient: parseString(columns[2]),
        nmClient: parseString(columns[3]),
        nrCpfCnpj: parseString(columns[4]),
        nrContrato: parseString(columns[5]),
        dtContrato: parseString(columns[6]),
        qtPrestacoes: parseIntNumber(columns[7]),
        vlTotal: parseNumber(columns[8]),
        cdProduto: parseString(columns[9]),
        dsProduto: parseString(columns[10]),
        cdCarteira: parseString(columns[11]),
        dsCarteira: parseString(columns[12]),
        nrProposta: parseString(columns[13]),
        nrPresta: parseString(columns[14]),
        tpPresta: parseString(columns[15]),
        nrSeqPre: parseString(columns[16]),
        dtVctPre: parseString(columns[17]),
        vlPresta: parseNumber(columns[18]),
        vlMora: parseNumber(columns[19]),
        vlMulta: parseNumber(columns[20]),
        vlOutAcr: parseNumber(columns[21]),
        vlIof: parseNumber(columns[22]),
        vlDescon: parseNumber(columns[23]),
        vlAtual: parseNumber(columns[24]),
        idSituac: parseString(columns[25]),
        idSitVenc: parseString(columns[26]),
      };

      results.push(dataObject);
    }

    return results;
  }
}
