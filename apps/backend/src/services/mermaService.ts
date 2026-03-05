import { prisma } from "../lib/prisma"
import { TipoMerma } from "@prisma/client"

export class MermaService {

  async getTipos() {
    return [
      "Natural",
      "Tecnica",
      "Administrativa",
      "Danio"
    ]
  }

  // Registro de mermas
  async create(data: any) {

    // validar campos obligatorios de los inputs
    if (!data.idLote) {
      throw new Error("El id del lote es obligatorio")
    }

    if (!data.tipo) {
      throw new Error("El tipo de merma es obligatorio")
    }

    if (!data.cantidad) {
      throw new Error("La cantidad es obligatoria")
    }

    // validar tipo de merma
    if (!Object.values(TipoMerma).includes(data.tipo)) {
      throw new Error("Tipo de merma inválido")
    }

    // validar cantidad
    if (isNaN(Number(data.cantidad)) || Number(data.cantidad) <= 0) {
      throw new Error("La cantidad debe ser un número mayor a 0")
    }

    // validar que el lote exista
    const lote = await prisma.loteProduccion.findUnique({
      where: { idLote: data.idLote }
    })

    if (!lote) {
      throw new Error("El lote indicado no existe")
    }

    // validar que la merma no supere la cantidad del lote
    if (Number(data.cantidad) > Number(lote.cantidad)) {
      throw new Error("La merma no puede superar la cantidad del lote")
    }

    const merma = await prisma.merma.create({
      data: {
        tipo: data.tipo,
        observacion: data.observacion,
        cantidad: data.cantidad,
        idLote: data.idLote
      }
    })

    return merma
  }

  // Para obtener todas las mermas en general
  async findAll() {

    const mermas = await prisma.merma.findMany({
      include: {
        lote: true
      }
    })

    return mermas
  }

  // Para obtener merma determinada por id
  async findById(idMerma: string) {

    const merma = await prisma.merma.findUnique({
      where: { idMerma },
      include: {
        lote: true
      }
    })

    if (!merma) {
      throw new Error("La merma no existe")
    }

    return merma
  }

  // Obtener mermas por lote
  async getByLote(idLote: string) {

    // validar que el lote exista
    const lote = await prisma.loteProduccion.findUnique({
      where: { idLote }
    })

    if (!lote) {
      throw new Error("El lote indicado no existe")
    }

    const mermas = await prisma.merma.findMany({
      where: { idLote }
    })

    return mermas
  }

  // Actualizacion de mermas
  async update(idMerma: string, data: any) {

    // validar que exista la merma
    const merma = await prisma.merma.findUnique({
      where: { idMerma }
    })

    if (!merma) {
      throw new Error("La merma no existe")
    }

    // validar cantidad si la envían
    if (data.cantidad !== undefined) {

      if (isNaN(Number(data.cantidad)) || Number(data.cantidad) <= 0) {
        throw new Error("La cantidad debe ser mayor a 0")
      }

      const lote = await prisma.loteProduccion.findUnique({
        where: { idLote: merma.idLote }
      })

      if (Number(data.cantidad) > Number(lote?.cantidad)) {
        throw new Error("La merma no puede superar la cantidad del lote")
      }
    }

    // validar tipo si lo envían
    if (data.tipo && !Object.values(TipoMerma).includes(data.tipo)) {
      throw new Error("Tipo de merma inválido")
    }

    const mermaActualizada = await prisma.merma.update({
      where: { idMerma },
      data: {
        tipo: data.tipo ?? merma.tipo,
        observacion: data.observacion ?? merma.observacion,
        cantidad: data.cantidad ?? merma.cantidad
      }
    })

    return mermaActualizada
  }

  // Eliminacion de mermas
  async delete(idMerma: string) {

    const merma = await prisma.merma.findUnique({
      where: { idMerma }
    })

    if (!merma) {
      throw new Error("La merma no existe")
    }

    await prisma.merma.delete({
      where: { idMerma }
    })

    return { message: "Merma eliminada correctamente" }
  }

}