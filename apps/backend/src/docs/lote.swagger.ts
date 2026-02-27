/**
 * @swagger
 * components:
 *   schemas:
 *     CrearLoteRequest:
 *       type: object
 *       required:
 *         - idProducto
 *         - cantidad
 *         - unidad
 *         - fechaProduccion
 *       properties:
 *         idProducto:
 *           type: string
 *           description: ID del producto a asociar
 *         cantidad:
 *           type: number
 *           description: Cantidad producida
 *         unidad:
 *           type: string
 *           enum: [kg, litros]
 *           description: Unidad de medida
 *         fechaProduccion:
 *           type: string
 *           format: date
 *           description: Fecha de producción en formato dd/mm/aaaa
 *         merma:
 *           type: number
 *           description: Merma opcional
 *         estado:
 *           type: boolean
 *           description: Estado del lote
 *       example:
 *         idProducto: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         cantidad: 100
 *         unidad: kg
 *         fechaProduccion: "25/02/2026"
 *         merma: 2
 *         estado: false
 *
 *     Lote:
 *       type: object
 *       properties:
 *         idLote:
 *           type: string
 *           format: uuid
 *         idProducto:
 *           type: string
 *           format: uuid
 *         cantidad:
 *           type: number
 *         unidad:
 *           type: string
 *           enum: [kg, litros]
 *         fechaProduccion:
 *           type: string
 *           format: date-time
 *         estado:
 *           type: boolean
 *         producto:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             categoria:
 *               type: string
 *
 * /lote/crear:
 *   post:
 *     tags:
 *       - lote
 *     summary: Crear un lote de producción
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearLoteRequest'
 *     responses:
 *       201:
 *         description: Lote creado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Usuario no autenticado
 *
 * /lote/editar/{idLote}:
 *   patch:
 *     tags:
 *       - lote
 *     summary: Editar un lote existente
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: idLote
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearLoteRequest'
 *     responses:
 *       200:
 *         description: Lote actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Usuario no autenticado
 *       404:
 *         description: Lote no encontrado
 *
 * /lote/eliminar/{idLote}:
 *   delete:
 *     tags:
 *       - lote
 *     summary: Eliminar un lote
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: idLote
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lote eliminado correctamente
 *       400:
 *         description: Id de lote requerido
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No se puede eliminar el lote (tiene información asociada)
 *
 * /lote/listar:
 *   get:
 *     tags:
 *       - lote
 *     summary: Listar todos los lotes del usuario
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lotes listados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lote'
 *       401:
 *         description: Usuario no autenticado
 *
 * /lote/{idLote}:
 *   get:
 *     tags:
 *       - lote
 *     summary: Obtener un lote específico
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: idLote
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lote obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lote'
 *       400:
 *         description: Id de lote requerido
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos para ver este lote
 *       404:
 *         description: Lote no encontrado
 */