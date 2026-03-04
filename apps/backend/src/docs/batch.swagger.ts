/**
 * @swagger
 * tags:
 *   - name: Lotes
 *     description: Gestión de lotes de producción
 */

/**
 * @swagger
 * /lote/registrar:
 *   post:
 *     summary: Crear un nuevo lote
 *     tags: [Lotes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - cantidad
 *               - fechaProduccion
 *             properties:
 *               idProducto:
 *                 type: string
 *                 format: uuid
 *                 example: "a1b2c3d4-5678-90ab-cdef-1234567890ab"
 *               cantidad:
 *                 type: number
 *                 example: 100
 *               fechaProduccion:
 *                 type: string
 *                 format: date
 *                 example: "01/03/2026"
 *               estado:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Lote creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode: { type: integer, example: 201 }
 *                 message: { type: string, example: "Lote creado correctamente" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     idLote: { type: string, format: uuid, example: "b2c3d4e5-6789-01ab-cdef-234567890abc" }
 *                     idProducto: { type: string, format: uuid, example: "a1b2c3d4-5678-90ab-cdef-1234567890ab" }
 *                     cantidad: { type: number, example: 100 }
 *                     unidad: { type: string, example: "kg" }
 *                     fechaProduccion: { type: string, format: date-time, example: "2026-03-01T00:00:00.000Z" }
 *                     estado: { type: boolean, example: false }
 *                     numeroLote: { type: integer, example: 1 }
 *                     producto:
 *                       type: object
 *                       properties:
 *                         nombre: { type: string, example: "Queso Cremoso" }
 *                         categoria: { type: string, example: "quesos" }
 *       400:
 *         description: Datos inválidos o usuario sin establecimiento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode: { type: integer, example: 400 }
 *                 message: { type: string, example: "El usuario no tiene un establecimiento registrado" }
 *                 data: { type: null }
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode: { type: integer, example: 401 }
 *                 message: { type: string, example: "Usuario no autenticado" }
 *                 data: { type: null }
 */

/**
 * @swagger
 * /lote/listar:
 *   get:
 *     summary: Listar todos los lotes del usuario
 *     tags: [Lotes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lotes listados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "Lotes listados correctamente" }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idLote: { type: string, format: uuid }
 *                       idProducto: { type: string, format: uuid }
 *                       cantidad: { type: number }
 *                       unidad: { type: string }
 *                       fechaProduccion: { type: string, format: date-time }
 *                       estado: { type: boolean }
 *                       numeroLote: { type: integer }
 *                       producto:
 *                         type: object
 *                         properties:
 *                           nombre: { type: string }
 *                           categoria: { type: string }
 *                       mermas: { type: array, items: { type: object } }
 *                       costosDirectos: { type: array, items: { type: object } }
 *       400:
 *         description: Usuario sin establecimiento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode: { type: integer, example: 400 }
 *                 message: { type: string, example: "El usuario no tiene un establecimiento registrado" }
 *                 data: { type: null }
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode: { type: integer, example: 401 }
 *                 message: { type: string, example: "Usuario no autenticado" }
 *                 data: { type: null }
 */

/**
 * @swagger
 * /lote/buscar-lote/{idLote}:
 *   get:
 *     summary: Obtener un lote por ID
 *     tags: [Lotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLote
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del lote
 *     responses:
 *       200:
 *         description: Lote obtenido correctamente
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos
 *       404:
 *         description: Lote no encontrado
 */

/**
 * @swagger
 * /lote/eliminar/{idLote}:
 *   delete:
 *     summary: Eliminar un lote
 *     tags: [Lotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLote
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del lote a eliminar
 *     responses:
 *       200:
 *         description: Lote eliminado correctamente
 *       400:
 *         description: No se puede eliminar el lote
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos
 *       404:
 *         description: Lote no encontrado
 */

/**
 * @swagger
 * /lote/completar/{idLote}:
 *   post:
 *     summary: Completar un lote
 *     tags: [Lotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLote
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del lote a completar
 *     responses:
 *       200:
 *         description: Lote completado correctamente
 *       400:
 *         description: Lote ya completado
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: No tiene permisos
 *       404:
 *         description: Lote no encontrado
 */

/**
 * @swagger
 * /lote/produccion-hoy:
 *   get:
 *     summary: Listar producción del día
 *     tags: [Lotes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Producción del día obtenida correctamente
 *       400:
 *         description: Usuario sin establecimiento
 *       401:
 *         description: Usuario no autenticado
 */