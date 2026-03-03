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

        const ultimoLote = await prisma.loteProduccion.findFirst({
            where: { idEstablecimiento: establecimiento.idEstablecimiento },
            orderBy: { numeroLote: 'desc' }
        });

        const nuevoNumeroLote = ultimoLote ? ultimoLote.numeroLote + 1 : 1;

        const unidad: "kg" | "litros" = producto.categoria === "quesos" ? "kg" : "litros";

        const lote = await prisma.loteProduccion.create({
            data: {
                idProducto: data.idProducto,
                idEstablecimiento: establecimiento.idEstablecimiento,
                cantidad: data.cantidad,
                unidad,
                fechaProduccion: data.fechaProduccion ?? undefined,
                estado: data.estado ?? false,
                numeroLote: nuevoNumeroLote,
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

    static async editarLote(idLote: string, data: Partial<CrearLoteDTO>, idUsuario: string) {
        const lote = await prisma.loteProduccion.findUnique({
            where: { idLote },
            include: { establecimiento: true, mermas: true, costosDirectos: true }
        });

        if (!lote) throw new AppError("El lote no existe", 404);

        if (lote.establecimiento.idUsuario !== idUsuario) {
            throw new AppError("No tiene permisos para modificar este lote", 403);
        }

        if (lote.mermas.length > 0 || lote.costosDirectos.length > 0) {
            throw new AppError(
                "El lote tiene mermas o costos directos asociados y no puede editarse",
                400
            );
        }

        let idProducto = lote.idProducto;
        let unidad = lote.unidad;

        if (data.idProducto && data.idProducto !== lote.idProducto) {
            const producto = await prisma.producto.findUnique({
                where: { idProducto: data.idProducto }
            });

            if (!producto) {
                throw new AppError("El producto seleccionado no existe", 400);
            }

            idProducto = data.idProducto;
            unidad = producto.categoria === "quesos" ? "kg" : "litros";
        }

        return prisma.loteProduccion.update({
            where: { idLote },
            data: {
                idProducto,
                unidad,
                cantidad: data.cantidad ?? lote.cantidad,
                fechaProduccion: data.fechaProduccion
                    ? new Date(data.fechaProduccion)
                    : lote.fechaProduccion,
            },
            include: {
                producto: true,
                mermas: true,
                costosDirectos: true
            }
        });
    }

    static async eliminarLote(idLote: string, idUsuario: string) {
        const lote = await prisma.loteProduccion.findUnique({
            where: { idLote },
            include: { establecimiento: true, mermas: true, costosDirectos: true },
        });

        if (!lote) {
            throw new AppError("El lote no existe", 404);
        }

        if (lote.establecimiento.idUsuario !== idUsuario) {
            throw new AppError("No tiene permisos para eliminar este lote", 403);
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

    static async listarProduccionDelDia(idUsuario: string) {
        const establecimiento = await prisma.establecimiento.findFirst({ where: { idUsuario } });
        if (!establecimiento) throw new AppError("El usuario no tiene un establecimiento registrado", 400);

        const hoy = new Date();
        const inicioDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0, 0);
        const finDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59, 999);

        return prisma.loteProduccion.findMany({
            where: {
                idEstablecimiento: establecimiento.idEstablecimiento,
                fechaProduccion: { gte: inicioDia, lte: finDia }
            },
            include: { producto: true, mermas: true, costosDirectos: true }
        });
    }

    static async completarLote(idLote: string, idUsuario: string) {

        const lote = await prisma.loteProduccion.findUnique({
            where: { idLote },
            include: { establecimiento: true }
        });

        if (!lote) {
            throw new AppError("El lote no existe", 404);
        }

        if (lote.establecimiento.idUsuario !== idUsuario) {
            throw new AppError("No tiene permisos para modificar este lote", 403);
        }

        if (lote.estado) {
            throw new AppError("El lote ya está completado", 400);
        }

        return prisma.loteProduccion.update({
            where: { idLote },
            data: { estado: true },
        });
    }

    static async listarPorMes(userId: string) {
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = hoy.getMonth() + 1; // 0-11, por eso +1
        const fechaInicio = new Date(anio, mes - 1, 1); // 1er día del mes
        const fechaFin = new Date(anio, mes, 0, 23, 59, 59, 999); // último día del mes

        const result = await prisma.loteProduccion.findMany({
            where: {
                establecimiento: {
                    idUsuario: userId
                },
                fechaProduccion: {
                    gte: fechaInicio,
                    lte: fechaFin
                }
            },
            include: {
                mermas: true,
                costosDirectos: true
            }
        })
        
        return result
    }
}
