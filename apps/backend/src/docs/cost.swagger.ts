/**
 * @swagger
 * components:
 *   schemas:
 *     CrearCostoRequest:
 *       type: object
 *       required:
 *         - loteId
 *         - concepto
 *         - monto
 *       properties:
 *         loteId:
 *           type: string
 *           format: uuid
 *           description: ID del lote asociado
 *         concepto:
 *           type: string
 *           description: Concepto del costo
 *         monto:
 *           type: number
 *           description: Monto del costo
 *         observaciones:
 *           type: string
 *           description: Observaciones opcionales
 *       example:
 *         loteId: "4ef0daea-a4e3-4b9c-adec-ee2d0df2ea93"
 *         concepto: "Compra de fertilizante"
 *         monto: 15000
 *         observaciones: "Proveedor local"
 *
 *     ActualizarCostoRequest:
 *       type: object
 *       properties:
 *         concepto:
 *           type: string
 *         monto:
 *           type: number
 *         observaciones:
 *           type: string
 *       example:
 *         concepto: "Actualización fertilizante"
 *         monto: 18000
 *         observaciones: "Cambio de precio"
 *
 *     Costo:
 *       type: object
 *       properties:
 *         idCostoDirecto:
 *           type: string
 *           format: uuid
 *         idLote:
 *           type: string
 *           format: uuid
 *         concepto:
 *           type: string
 *         monto:
 *           type: number
 *         observaciones:
 *           type: string
 *         fechaCreacion:
 *           type: string
 *           format: date-time
 *
 * /costos/registrar:
 *   post:
 *     tags:
 *       - costos
 *     summary: Registrar un costo directo
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearCostoRequest'
 *     responses:
 *       201:
 *         description: Costo registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Costo'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             example:
 *               message: Datos inválidos
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             example:
 *               message: Usuario no autenticado
 *       403:
 *         description: No tiene permisos sobre este lote
 *         content:
 *           application/json:
 *             example:
 *               message: No tiene permisos sobre este lote
 *
 * /costos/costos-lote/{loteId}:
 *   get:
 *     tags:
 *       - costos
 *     summary: Obtener costos por lote
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: loteId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de costos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Costo'
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             example:
 *               message: Usuario no autenticado
 *       403:
 *         description: No tiene permisos para ver los costos de este lote
 *         content:
 *           application/json:
 *             example:
 *               message: No tiene permisos para ver los costos de este lote
 *       404:
 *         description: Lote no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Lote no encontrado
 *
 * /costos/detalle/{id}:
 *   get:
 *     tags:
 *       - costos
 *     summary: Obtener detalle de un costo
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Costo obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Costo'
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             example:
 *               message: Usuario no autenticado
 *       403:
 *         description: No tiene permisos para ver este costo
 *         content:
 *           application/json:
 *             example:
 *               message: No tiene permisos para ver este costo
 *       404:
 *         description: Costo no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Costo no encontrado
 *
 * /costos/actualizar/{id}:
 *   put:
 *     tags:
 *       - costos
 *     summary: Actualizar un costo
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarCostoRequest'
 *     responses:
 *       200:
 *         description: Costo actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Costo'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             example:
 *               message: Datos inválidos
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             example:
 *               message: Usuario no autenticado
 *       403:
 *         description: No tiene permisos para actualizar este costo
 *         content:
 *           application/json:
 *             example:
 *               message: No tiene permisos para actualizar este costo
 *       404:
 *         description: Costo no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Costo no encontrado
 *
 * /costos/eliminar/{id}:
 *   delete:
 *     tags:
 *       - costos
 *     summary: Eliminar un costo
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Costo eliminado correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: Costo eliminado correctamente
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             example:
 *               message: Usuario no autenticado
 *       403:
 *         description: No tiene permisos para eliminar este costo
 *         content:
 *           application/json:
 *             example:
 *               message: No tiene permisos para eliminar este costo
 *       404:
 *         description: Costo no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Costo no encontrado
 */