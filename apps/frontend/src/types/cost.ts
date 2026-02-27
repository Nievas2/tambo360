import { Batch } from '@/src/types/batch'

export interface Cost {
  idCostoDirecto: string
  concepto: string
  monto: number
  moneda: string
  fechaCreacion: string
  idLote: string
  lote: Batch
}
