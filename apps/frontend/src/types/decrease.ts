import { Batch } from '@/src/types/batch'

export interface Decrease {
  idMerma: string
  cantidad: string
  descripcion: string
  unidad: string
  idLote: string
  lote: Batch
  fechaCreacion: string
}
