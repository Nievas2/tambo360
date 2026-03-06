import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

const IA_URL = process.env.TAMBO_AI_URL || "http://127.0.0.1:8000";
const MINIMO_LOTES = 15;

export class TamboEngineService {
    private static async fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 15000) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(id);
            return response;
        } catch (error: any) {
            clearTimeout(id);
            if (error.name === 'AbortError') {
                throw new AppError("Timeout: La IA tardó demasiado en responder", 504);
            }
            throw new AppError("Error de red: No se pudo conectar con la IA", 503);
        }
    }

    static async analizarSiCorresponde(idEstablecimiento: string) {
        try {
            const fechaLimite = new Date();
            fechaLimite.setDate(fechaLimite.getDate() - 15);

            // 1. Buscar todos los lotes COMPLETOS del establecimiento de los últimos 15 días
            const lotes = await prisma.loteProduccion.findMany({
                where: {
                    idEstablecimiento,
                    estado: true,
                    fechaProduccion: { gte: fechaLimite }
                },
                include: { producto: true, mermas: true, costosDirectos: true, establecimiento: true },
                orderBy: { fechaProduccion: 'asc' } // Opcional, pero ayuda a que la IA los reciba ordenados cronológicamente
            });

            // 2. Verificar mínimo de lotes
            if (lotes.length < MINIMO_LOTES) return;

            // 3. Armar el payload para el servicio de IA
            const payload = {
                idEstablecimiento,
                nombreEstablecimiento: lotes[0].establecimiento?.nombre || idEstablecimiento,
                periodo: new Date().toLocaleString("es-AR", { month: "long", year: "numeric" }),
                lotes: lotes.map(l => ({
                    idLote: l.idLote,
                    fechaProduccion: l.fechaProduccion.toISOString().split("T")[0],
                    producto: l.producto.nombre,
                    categoria: l.producto.categoria,
                    cantidad: Number(l.cantidad),
                    unidad: l.unidad,
                    mermas: l.mermas.map(m => ({
                        descripcion: m.observacion || m.tipo,
                        cantidad: Number(m.cantidad),
                        unidad: l.unidad, // La merma ahora usa la misma unidad que el lote
                    })),
                    costosDirectos: l.costosDirectos.map(c => ({
                        concepto: c.concepto,
                        monto: Number(c.monto),
                        moneda: "ARS", // Predeterminado ya que no existe en el schema actual
                    })),
                }))
            };

            // 4. Llamar al servicio de IA con Timeout ampliado para análisis pesado (15s)
            const response = await this.fetchWithTimeout(`${IA_URL}/api/v1/tambo/analyze`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }, 15000);

            if (!response.ok) {
                console.error(`[TamboEngine] Error de análisis (HTTP ${response.status}):`, await response.text());
            } else {
                console.log("[TamboEngine] Análisis completado correctamente");
            }
        } catch (error: any) {
            // Como este es un proceso de fondo disparado desde un endpoint, solo logueamos para no romper la app
            console.error("[TamboEngine] Falló el análisis en background:", error.message || error);
        }
    }

    static async getAlertas(idEstablecimiento: string) {
        try {
            const response = await this.fetchWithTimeout(`${IA_URL}/api/v1/tambo/alertas/${idEstablecimiento}`, {}, 15000);

            if (!response.ok) {
                if (response.status === 404) return []; // Si no hay respuestas de IA aún, retornar array vacío
                throw new AppError(`Error interno en la IA (Status: ${response.status})`, response.status);
            }

            return await response.json();
        } catch (error: any) {
            console.error("[TamboEngine] Error consultando alertas:", error);
            // Re-lanzamos el AppError si ya lo es, sino envolvemos en un 502 generico
            if (error instanceof AppError) throw error;
            throw new AppError("El servicio de Inteligencia Artificial devolvió una respuesta inesperada.", 502);
        }
    }

    static async getUltimasAlertas(idEstablecimiento: string) {
        try {
            const response = await this.fetchWithTimeout(`${IA_URL}/api/v1/tambo/alertas/${idEstablecimiento}/ultimas`, {}, 15000);

            if (!response.ok) {
                if (response.status === 404) return [];
                throw new AppError(`Error interno en la IA (Status: ${response.status})`, response.status);
            }

            return await response.json();
        } catch (error: any) {
            console.error("[TamboEngine] Error consultando últimas alertas:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("El servicio de Inteligencia Artificial devolvió una respuesta inesperada.", 502);
        }
    }
}
