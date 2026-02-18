type CostoEntrada = {
    loteId: number;
    concepto: string;
    monto: number;
    moneda: string;
    fecha: string;
};

type Costo = CostoEntrada & {
    id: number;
};

class ServicioCostos {
    private costos: Costo[] = [];
    private idActual: number = 1;

    // Crear costo
    async crear(data: CostoEntrada): Promise<Costo> {
        const nuevoCosto: Costo = {
            id: this.idActual++,
            ...data,
        };

        this.costos.push(nuevoCosto);
        return nuevoCosto;
    }

    // Obtener por id
    obtenerPorId(id: number): Costo | undefined {
        return this.costos.find(c => c.id === id);
    }

    // Obtener por lote
    obtenerPorLote(loteId: number): Costo[] {
        return this.costos.filter(c => c.loteId === loteId);
    }

    // Actualizar
    async actualizar(id: number, data: CostoEntrada): Promise<Costo> {
        const existente = this.costos.find(c => c.id === id);

        if (!existente) {
            throw new Error("Costo no encontrado");
        }

        existente.loteId = data.loteId;
        existente.concepto = data.concepto;
        existente.monto = data.monto;
        existente.moneda = data.moneda;
        existente.fecha = data.fecha;

        return existente;
    }

    // Eliminar
    async eliminar(id: number): Promise<void> {
        const index = this.costos.findIndex(c => c.id === id);

        if (index === -1) {
            throw new Error("Costo no encontrado");
        }

        this.costos.splice(index, 1);
    }
}

export default new ServicioCostos();
