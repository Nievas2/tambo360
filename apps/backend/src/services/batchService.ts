type LoteEntrada = {
    fechaProduccion: string;
    tipoProduccion: string;
    cantidad: number;
    unidad: string;
};

type Lote = LoteEntrada & {
    id: number;
};

class ServicioLotes {
    private lotes: Lote[] = [];
    private idActual: number = 1;

    // Crear un nuevo lote
    async crear(loteData: LoteEntrada): Promise<Lote> {
        const nuevoLote: Lote = {
            id: this.idActual++,
            ...loteData,
        };

        this.lotes.push(nuevoLote);
        return nuevoLote;
    }

    // Editar un lote existente por id
    async editar(loteData: Lote): Promise<Lote> {
        const loteExistente = this.lotes.find(l => l.id === loteData.id);
        if (!loteExistente) {
            throw new Error("Lote no encontrado");
        }

        // Actualiza los campos
        loteExistente.fechaProduccion = loteData.fechaProduccion;
        loteExistente.tipoProduccion = loteData.tipoProduccion;
        loteExistente.cantidad = loteData.cantidad;
        loteExistente.unidad = loteData.unidad;

        return loteExistente;
    }

    // Obtener todos los lotes
    obtenerTodos(): Lote[] {
        return this.lotes;
    }

    obtenerPorId(id: number): Lote | undefined {
        return this.lotes.find(l => l.id === id);
    }

}

export default new ServicioLotes();
