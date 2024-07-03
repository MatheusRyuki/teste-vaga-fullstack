import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Data {
  @Prop()
  nrInst: string;

  @Prop()
  nrAgencia: string;

  @Prop()
  cdClient: string;

  @Prop()
  nmClient: string;

  @Prop()
  nrCpfCnpj: string;

  @Prop()
  nrContrato: string;

  @Prop()
  dtContrato: string;

  @Prop()
  qtPrestacoes: number;

  @Prop()
  vlTotal: number;

  @Prop()
  cdProduto: string;

  @Prop()
  dsProduto: string;

  @Prop()
  cdCarteira: string;

  @Prop()
  dsCarteira: string;

  @Prop()
  nrProposta: string;

  @Prop()
  nrPresta: string;

  @Prop()
  tpPresta: string;

  @Prop()
  nrSeqPre: string;

  @Prop()
  dtVctPre: string;

  @Prop()
  vlPresta: number;

  @Prop()
  vlMora: number;

  @Prop()
  vlMulta: number;

  @Prop()
  vlOutAcr: number;

  @Prop()
  vlIof: number;

  @Prop()
  vlDescon: number;

  @Prop()
  vlAtual: number;

  @Prop()
  idSituac: string;

  @Prop()
  idSitVencimento: string;
}

export type DataDocument = Data & Document;
export const DataSchema = SchemaFactory.createForClass(Data);
