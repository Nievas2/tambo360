/**
 * @swagger
 * tags:
 *   name: Alertas
 *   description: API para consultar las alertas generadas por TamboEngine.
 */

/**
 * @swagger
 * /alertas/{idEstablecimiento}:
 *   get:
 *     summary: Obtener todas las alertas históricas de un establecimiento
 *     tags: [Alertas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: idEstablecimiento
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del establecimiento a consultar
 *     responses:
 *       200:
 *         description: Lista de alertas históricas obtenida exitosamente.
 *       400:
 *         description: Petición inválida (ej. falta ID).
 *       401:
 *         description: No autenticado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /alertas/{idEstablecimiento}/ultimas:
 *   get:
 *     summary: Obtener las alertas más recientes generadas tras el último análisis
 *     tags: [Alertas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: idEstablecimiento
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del establecimiento a consultar
 *     responses:
 *       200:
 *         description: Lista de las últimas alertas obtenida correctamente.
 *       400:
 *         description: Petición inválida (ej. falta ID).
 *       401:
 *         description: No autenticado.
 *       500:
 *         description: Error interno del servidor.
 */
