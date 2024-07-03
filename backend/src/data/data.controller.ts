import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

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
      const dataObject = {
        nrInst: columns[0].trim(),
        nrAgencia: columns[1].trim(),
        cdClient: columns[2].trim(),
        nmClient: columns[3].trim(),
        nrCpfCnpj: columns[4].trim(),
        nrContrato: columns[5].trim(),
        dtContrato: columns[6].trim(),
        qtPrestacoes: parseInt(columns[7].trim(), 10),
        vlTotal: parseFloat(columns[8].trim()),
        cdProduto: columns[9].trim(),
        dsProduto: columns[10].trim(),
        cdCarteira: columns[11].trim(),
        dsCarteira: columns[12].trim(),
        nrProposta: columns[13].trim(),
        nrPresta: columns[14].trim(),
        tpPresta: columns[15].trim(),
        nrSeqPre: columns[16].trim(),
        dtVctPre: columns[17].trim(),
        vlPresta: parseFloat(columns[18].trim()),
        vlMora: parseFloat(columns[19].trim()),
        vlMulta: parseFloat(columns[20].trim()),
        vlOutAcr: parseFloat(columns[21].trim()),
        vlIof: parseFloat(columns[22].trim()),
        vlDescon: parseFloat(columns[23].trim()),
        vlAtual: parseFloat(columns[24].trim()),
        idSituac: columns[25].trim(),
        idSitVenc: columns[26].trim(),
      };

      results.push(dataObject);
    }

    return results;
  }
}
