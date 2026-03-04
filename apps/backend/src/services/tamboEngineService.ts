import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

const IA_URL = process.env.TAMBO_AI_URL || "http://127.0.0.1:8000";
const MINIMO_LOTES = 15;

export class TamboEngineService {
    static async analizarSiCorresponde(idEstablecimiento: string) {
        try {
            // 1. Buscar todos los lotes COMPLETOS del establecimiento
            const lotes = await prisma.loteProduccion.findMany({
                where: { idEstablecimiento, estado: true },
                include: { producto: true, mermas: true, costosDirectos: true, establecimiento: true }
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
                        descripcion: m.descripcion,
                        cantidad: Number(m.cantidad),
                        unidad: m.unidad,
                    })),
                    costosDirectos: l.costosDirectos.map(c => ({
                        concepto: c.concepto,
                        monto: Number(c.monto),
                        moneda: "ARS", // Predeterminado ya que no existe en el schema actual
                    })),
                }))
            };

            // 4. Llamar al servicio de IA
            const response = await fetch(`${IA_URL}/api/v1/tambo/analyze`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                console.error("[TamboEngine] Error de análisis:", await response.text());
            } else {
                console.log("[TamboEngine] Análisis completado correctamente");
            }
        } catch (error) {
            console.error("[TamboEngine] Excepción al disparar análisis:", error);
        }
    }

    static async getAlertas(idEstablecimiento: string) {
        try {
            const response = await fetch(`${IA_URL}/api/v1/tambo/alertas/${idEstablecimiento}`);
            if (!response.ok) {
                throw new Error("Error HTTP de la IA: " + response.status);
            }
            return await response.json();
        } catch (error) {
            console.error("[TamboEngine] Error consultando alertas:", error);
            throw new AppError("Error conectando con el servicio de Inteligencia Artificial", 502);
        }
    }

    static async getUltimasAlertas(idEstablecimiento: string) {
        try {
            const response = await fetch(`${IA_URL}/api/v1/tambo/alertas/${idEstablecimiento}/ultimas`);
            if (!response.ok) {
                throw new Error("Error HTTP de la IA: " + response.status);
            }
            return await response.json();
        } catch (error) {
            console.error("[TamboEngine] Error consultando últimas alertas:", error);
            throw new AppError("Error conectando con el servicio de Inteligencia Artificial", 502);
        }
    }
}
