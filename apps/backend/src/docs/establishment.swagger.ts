/**
 * @swagger
 * components:
 *   schemas:
 *     CreateEstablishmentRequest:
 *       type: object
 *       required:
 *         - nombre
 *         - localidad
 *         - provincia
 *       properties:
 *         nombre:
 *           type: string
 *         localidad:
 *           type: string
 *         provincia:
 *           type: string
 *       example:
 *         nombre: "Establecimiento Norte"
 *         localidad: "Rafaela"
 *         provincia: "Santa Fe"
 *
 *     Establishment:
 *       type: object
 *       properties:
 *         idEstablecimiento:
 *           type: string
 *           format: uuid
 *         nombre:
 *           type: string
 *         localidad:
 *           type: string
 *         provincia:
 *           type: string
 *         idUsuario:
 *           type: string
 *           format: uuid
 */
/**
 * @swagger
 * /establecimiento/registrar:
 *   post:
 *     tags:
 *       - establecimiento
 *     summary: Registrar establecimiento del usuario autenticado
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEstablishmentRequest'
 *     responses:
 *       201:
 *         description: Establecimiento creado correctamente
 *       400:
 *         description: Datos inválidos o usuario ya tiene establecimiento
 *       401:
 *         description: Usuario no autenticado
 *
 * /establecimiento/listar:
 *   get:
 *     tags:
 *       - establecimiento
 *     summary: Obtener establecimiento del usuario autenticado
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Establecimiento obtenido correctamente
 *       401:
 *         description: Usuario no autenticado
 */