import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data, DataDocument } from './data.schema';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(Data.name) private readonly dataModel: Model<DataDocument>,
  ) {}

  private generateSpreadsheetId(): string {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    return timestamp.toString() + randomNum.toString();
  }

  private isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (
      cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(9))) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  }

  private isValidCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (
      cnpj.length !== 14 ||
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    ) {
      return false;
    }

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) {
      return false;
    }

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) {
      return false;
    }

    return true;
  }

  private validateCpfCnpj(value: string): string {
    const cleanedValue = value.replace(/[^\d]/g, '');

    if (cleanedValue.length === 11) {
      if (!this.isValidCPF(cleanedValue)) {
        throw new Error(`CPF inválido: ${value}`);
      }
      return cleanedValue;
    } else if (cleanedValue.length === 14) {
      if (!this.isValidCNPJ(cleanedValue)) {
        throw new Error(`CNPJ inválido: ${value}`);
      }
      return cleanedValue;
    } else {
      throw new Error(`Número de CPF ou CNPJ inválido: ${value}`);
    }
  }

  private convertToDate(value: string): Date {
    const year = parseInt(value.substring(0, 4), 10);
    const month = parseInt(value.substring(4, 6), 10) - 1;
    const day = parseInt(value.substring(6, 8), 10);
    return new Date(year, month, day);
  }

  private validateValues(data: any): boolean {
    const totalValue = parseFloat(data.vlTotal);
    const installmentCount = parseInt(data.qtPrestacoes, 10);
    const installmentValue = parseFloat(data.vlPresta);
    const moraValue = parseFloat(data.vlMora);
    const multaValue = parseFloat(data.vlMulta);

    const expectedValue = installmentCount * installmentValue;

    if (
      Math.round((totalValue + moraValue + multaValue) * 100) / 100 !==
      expectedValue
    ) {
      console.warn(
        `Pagamento inconsistente para o cliente ${data.cdClient}: valores de mora e multa não coincidem.`,
      );
    }

    return true;
  }

  async processCsvData(csvData: any[]): Promise<any[]> {
    const spreadsheetId = this.generateSpreadsheetId();

    try {
      const processedData = csvData
        .map((data) => {
          try {
            if (!this.validateValues(data)) {
              return null;
            }

            return {
              ...data,
              nrCpfCnpj: this.validateCpfCnpj(data.nrCpfCnpj),
              dtContrato: this.convertToDate(data.dtContrato),
              dtVctPre: this.convertToDate(data.dtVctPre),
              spreadsheetId,
            };
          } catch (error) {
            return null;
          }
        })
        .filter((data) => data !== null);

      const dados = await this.dataModel.create(processedData);
      return dados;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao salvar dados no MongoDB');
    }
  }

  async getAllSheets(): Promise<DataDocument[]> {
    try {
      const sheets = await this.dataModel.find().exec();
      return sheets;
    } catch (error) {
      throw new Error('Erro ao buscar planilhas');
    }
  }
}
