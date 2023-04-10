/**
 * @swagger
 * components:
 *  schemas:
 *      roles:
 *          type: object
 *          properties:
 *             idroles:
 *                 type: number
 *                 description: PK, numero unico que identifica al rol en la base de datos.
 *             roles:
 *                 type: string
 *                 description: siglas, abreviatura o representación del rol.
 *             roles_description:
 *                 type: string
 *                 description: Descripción del rol
 *          required:
 *             - roles
 *             - roles_description
 *          example:
 *             "roles": "GH"
 *             "roles_description": "Equipo de Gestion Humana"
 */

/**            
 * @swagger
 * /getRoles:
 *  get:
 *    summary: Trae la información de los roles de la compañia
 *    tags: [Roles]
 *    responses:
 *      200:
 *          description: Object
 *      508: 
 *          description: Error del servidor al traer los roles
 */

/** 
 * @swagger
 * /postRoles:
 *  post:
 *    summary: Agregar un nuevo rol
 *    tags: [Roles]
 *    requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/roles'
 *    responses:
 *      200:
 *          description: Rol, ROL creado satisfactoriamente
 *      201:
 *          description: El rol ROL, ya existe en la base de datos
 *      508:
 *          description: Error del servidor al crear un rol
 * 
 */ 