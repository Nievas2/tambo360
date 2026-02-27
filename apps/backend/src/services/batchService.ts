import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";
import { CrearLoteDTO } from "../schemas/batchSchema";

export class LoteService {

    static async crearLote(idUsuario: string, data: CrearLoteDTO) {
        const establecimiento = await prisma.establecimiento.findFirst({
            where: { idUsuario },
        });

        if (!establecimiento) {
            throw new AppError("El usuario no tiene un establecimiento registrado", 400);
        }

        const producto = await prisma.producto.findUnique({
            where: { idProducto: data.idProducto },
        });

        if (!producto) {
            throw new AppError("El producto seleccionado no existe", 400);
        }

        const lote = await prisma.loteProduccion.create({
            data: {
                idProducto: data.idProducto,
                idEstablecimiento: establecimiento.idEstablecimiento,
                cantidad: data.cantidad,
                unidad: data.unidad,
                fechaProduccion: data.fechaProduccion ?? undefined,
                estado: data.estado ?? false,
            },
            include: {
                producto: {
                    select: {
                        nombre: true,
                        categoria: true
                    }
                }
            }
        });

        return lote;
    }

    static async editarLote(idLote: string, data: Partial<CrearLoteDTO>) {
        const lote = await prisma.loteProduccion.findUnique({ where: { idLote } });
        if (!lote) {
            throw new AppError("El lote no existe", 404);
        }

        return prisma.loteProduccion.update({
            where: { idLote },
            data: {
                cantidad: data.cantidad ?? lote.cantidad,
                unidad: data.unidad ?? lote.unidad,
                fechaProduccion: data.fechaProduccion ? new Date(data.fechaProduccion) : lote.fechaProduccion,
                estado: data.estado ?? lote.estado,
            },
        });
    }

    static async eliminarLote(idLote: string) {
        const lote = await prisma.loteProduccion.findUnique({
            where: { idLote },
            include: { mermas: true, costosDirectos: true },
        });

        if (!lote) {
            throw new AppError("El lote no existe", 404);
        }

        if ((lote.mermas.length > 0) || (lote.costosDirectos.length > 0)) {
            throw new AppError("No se puede eliminar el lote, tiene información asociada", 400);
        }

        return prisma.loteProduccion.delete({ where: { idLote } });
    }

    static async listarLotes(idUsuario: string) {
        const establecimiento = await prisma.establecimiento.findFirst({
            where: { idUsuario },
        });

        if (!establecimiento) {
            throw new AppError("El usuario no tiene un establecimiento registrado", 400);
        }

        const lotes = await prisma.loteProduccion.findMany({
            where: { idEstablecimiento: establecimiento.idEstablecimiento },
            include: { producto: true, mermas: true, costosDirectos: true },
        });

        return lotes;
    }

    static async obtenerLote(idLote: string, idUsuario: string) {
        const lote = await prisma.loteProduccion.findUnique({
            where: { idLote },
            include: { producto: true, mermas: true, costosDirectos: true, establecimiento: true },
        });

        if (!lote) {
            throw new AppError("El lote no existe", 404);
        }

        if (lote.establecimiento.idUsuario !== idUsuario) {
            throw new AppError("No tiene permisos para ver este lote", 403);
        }

        return lote;
    }
}