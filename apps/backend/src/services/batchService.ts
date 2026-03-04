import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";
import { CrearLoteDTO } from "../schemas/batchSchema";
import { Categoria, CostosDirecto, Merma } from "@prisma/client";
import { InfoMes, SummaryResult } from "../types";
import { meses } from "../utils/data";

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

        const producciones = await prisma.loteProduccion.findMany({
            where: {
                idEstablecimiento: establecimiento.idEstablecimiento,
                fechaProduccion: { gte: inicioDia, lte: finDia }
            },
            include: { producto: true, mermas: true, costosDirectos: true }
        });

        if (producciones.length === 0) {
            throw new AppError("No hay producción registrada para el día de hoy", 404);
        }
        return producciones;
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
        // Fechas del mes actual
        const hoy = new Date()
        const anio = hoy.getFullYear()
        const mes = hoy.getMonth() + 1 // 0-11, por eso +1

        const fechaInicio = new Date(anio, mes - 1, 1)
        const fechaFin = new Date(anio, mes, 0, 23, 59, 59, 999)

        // Fechas del mes anterior
        const mesAnterior = mes - 1
        const anioAnterior = mesAnterior === 0 ? anio - 1 : anio
        const mesAnteriorNormalizado = mesAnterior === 0 ? 12 : mesAnterior

        const fechaInicioMesAnterior = new Date(anioAnterior, mesAnteriorNormalizado - 1, 1)
        const fechaFinMesAnterior = new Date(anioAnterior, mesAnteriorNormalizado, 0, 23, 59, 59, 999)

        // Consultas en paralelo
        const [resultActual, resultPrev] = await Promise.all([
            prisma.loteProduccion.findMany({
                where: {
                    establecimiento: { idUsuario: userId },
                    fechaProduccion: { gte: fechaInicio, lte: fechaFin }
                },
                include: { mermas: true, costosDirectos: true, producto: true }
            }),
            prisma.loteProduccion.findMany({
                where: {
                    establecimiento: { idUsuario: userId },
                    fechaProduccion: { gte: fechaInicioMesAnterior, lte: fechaFinMesAnterior }
                },
                include: { mermas: true, costosDirectos: true, producto: true }
            })
        ])


        // Función para armar resumen
        const buildSummary = (result: InfoMes) => {
            const summary = result.reduce<SummaryResult>((acc, lote) => {
                const category = lote.producto.categoria
                if (!acc[category]) {
                    acc[category] = { cantidad: 0, costos: 0, mermas: 0 }
                }
                acc[category].cantidad += Number(lote.cantidad)
                acc[category].costos += lote.costosDirectos.reduce((sum: number, costo: CostosDirecto) => sum + Number(costo.monto), 0)
                acc[category].mermas += lote.mermas.reduce((sum: number, merma: Merma) => sum + Number(merma.cantidad), 0)
                return acc
            }, {})


            const totalMermas = Object.values(summary).reduce((sum, cat: any) => sum + cat.mermas, 0)
            const totalCostos = Object.values(summary).reduce((sum, cat: any) => sum + cat.costos, 0)

            return {
                leches: summary.leches?.cantidad || 0,
                quesos: summary.quesos?.cantidad || 0,
                mermas: totalMermas,
                costos: totalCostos
            }
        }

        const actual = buildSummary(resultActual)
        const prev = buildSummary(resultPrev)

        // Función para calcular variación porcentual
        const variacion = (actual: number, anterior: number): number | null => {
            if (anterior === 0) return null // no hay mes previo
            return ((actual - anterior) / anterior) * 100
        }

        const variaciones = {
            leches: variacion(actual.leches, prev.leches),
            quesos: variacion(actual.quesos, prev.quesos),
            mermas: variacion(actual.mermas, prev.mermas),
            costos: variacion(actual.costos, prev.costos)
        }

        return { actual, variaciones, mesPrevio: meses[mesAnterior - 1] }
    }
}




