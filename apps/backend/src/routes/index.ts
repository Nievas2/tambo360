import express from "express";

import RutasAutenticacion from "./auth";
import HealthRoutes from "./health";
import RutasEstablecimientos from "./establishment";
import RutasLotes from "./batch";
import RutasMermas from "./decrease";
import RutasCostos from "./cost";
import RutasProductos from "./product";

const router = express.Router();

// Rutas de la API
router.use('/auth', RutasAutenticacion);
router.use('/health', HealthRoutes);
router.use('/establecimiento', RutasEstablecimientos);
router.use('/lote', RutasLotes);
router.use('/mermas', RutasMermas);
router.use('/costos', RutasCostos);
router.use('/productos', RutasProductos);

export default router;
