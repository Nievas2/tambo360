type EstablecimientoEntrada = {
    nombre: string;
    fechaCreacion: string;
    localidad: string;
    provincia: string;
};

type Establecimiento = EstablecimientoEntrada & {
    id: number;
};


class ServicioEstablecimientos {
    private establecimientos: Establecimiento[] = [];
    private idActual: number = 1;

    async crear(datos: EstablecimientoEntrada): Promise<Establecimiento> {
        const nuevo: Establecimiento = {
            id: this.idActual++,
            ...datos,
        };
        this.establecimientos.push(nuevo);
        return nuevo;
    }

    obtenerTodos(): Establecimiento[] {
        return this.establecimientos;
    }
}

export default new ServicioEstablecimientos();
