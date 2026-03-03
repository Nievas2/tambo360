import { prisma } from "../lib/prisma"


export class MermaService {

  async create(data: any) {

    const lote = await prisma.loteProduccion.findUnique({
      where: { idLote: data.idLote }
    })

    if (!lote) {
      throw new Error("El lote no existe")
    }

    if (Number(data.cantidad) > Number(lote.cantidad)) {
      throw new Error("La cantidad supera el stock disponible")
    }

    return prisma.$transaction(async (tx) => {

      const merma = await tx.merma.create({
        data: {
          descripcion: data.descripcion,
          cantidad: data.cantidad,
          unidad: data.unidad,
          idLote: data.idLote
        }
      })

      await tx.loteProduccion.update({
        where: { idLote: data.idLote },
        data: {
          cantidad: {
            decrement: data.cantidad
          }
        }
      })

      return merma
    })
  }

  async findAll() {
    return prisma.merma.findMany({
      include: { lote: true }
    })
  }

  async findById(id: string) {
    return prisma.merma.findUnique({
      where: { idMerma: id },
      include: { lote: true }
    })
  }

  async update(id: string, data: any) {

    const mermaAnterior = await prisma.merma.findUnique({
      where: { idMerma: id }
    })

    if (!mermaAnterior) {
      throw new Error("Merma no encontrada")
    }

    return prisma.$transaction(async (tx) => {

      const diferencia =
        Number(data.cantidad) - Number(mermaAnterior.cantidad)

      const lote = await tx.loteProduccion.findUnique({
        where: { idLote: mermaAnterior.idLote }
      })

      if (!lote) {
        throw new Error("Lote no encontrado")
      }

      if (diferencia > 0 && diferencia > Number(lote.cantidad)) {
        throw new Error("Stock insuficiente")
      }

      await tx.loteProduccion.update({
        where: { idLote: mermaAnterior.idLote },
        data: {
          cantidad: {
            decrement: diferencia
          }
        }
      })

      return tx.merma.update({
        where: { idMerma: id },
        data: {
          descripcion: data.descripcion ?? mermaAnterior.descripcion,
          cantidad: data.cantidad ?? mermaAnterior.cantidad,
          unidad: data.unidad ?? mermaAnterior.unidad
        }
      })
    })
  }

  async delete(id: string) {

    const merma = await prisma.merma.findUnique({
      where: { idMerma: id }
    })

    if (!merma) {
      throw new Error("Merma no encontrada")
    }

    return prisma.$transaction(async (tx) => {

      await tx.loteProduccion.update({
        where: { idLote: merma.idLote },
        data: {
          cantidad: {
            increment: merma.cantidad
          }
        }
      })

      return tx.merma.delete({
        where: { idMerma: id }
      })
    })
  }
}