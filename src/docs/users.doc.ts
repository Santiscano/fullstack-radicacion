/**
 * @swagger
 * components:
 *  schemas:
 *      Users:
 *          type: object
 *          properties:
 *             idusers:
 *                 type: number
 *                 description: PK, numero unico que identifica al usuario en la base de datos.
 *             idroles:
 *                 type: number
 *                 description: FK asociado al rol del usuario.
 *             idsedes:
 *                 type: string
 *                 description: FK asociado a la sede del usuario.
 *             users_cc:
 *                 type: string
 *                 description: Cedula del usuario.
 *             users_name:
 *                 type: string
 *                 description: Nombre del usuario.
 *             users_lastname:
 *                 type: string
 *                 description: Apellido del usurio.
 *             users_phone:
 *                 type: string
 *                 description: Telefono del usuario
 *             users_email:
 *                 type: string
 *                 description: Correo del usuario, asociado al inicio de sesión
 *             users_password:
 *                 type: string
 *                 description: Contraseña para iniciar sesión en la plataforma
 *             users_status:
 *                 type: string
 *                 description: Estado de actividad del usuario en la plataforma.
 *          required:
 *             - idroles
 *             - idsedes
 *             - users_cc
 *             - users_name
 *             - users_lastname
 *             - users_phone
 *             - users_email
 *             - users_password
 *          example:
 *             "idroles": "4"
 *             "idsedes": "1"
 *             "users_cc": "1037637170"
 *             "users_name": "David"
 *             "users_lastname": "Giraldo Urrego"
 *             "users_phone": "3023186572" 
 *             "users_email": "david.giraldo@hotmail.com" 
 *             "users_password": "password123" 
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      validateLogin:
 *          type: object
 *          properties:
 *             users_email:
 *                 type: string
 *                 description: Email del usuario a validad
 *             users_password:
 *                 type: string
 *                 description: Contraseña del usuario a validar
 *          required:
 *             - users_email
 *             - users_password
 *          example:
 *             "users_email": "david.giraldo@hotmail.com"
 *             "users_password": "password123"
 */

/**            
 * @swagger
 * /getUsers:
 *  get:
 *    summary: Trae la información de los usuarios registrados en la base de datos
 *    tags: [Users]
 *    responses:
 *      200:
 *          description: Object
 *      508: 
 *          description: Error del servidor al traer los roles
 */

/**            
 * @swagger
 * /getValidateUser:
 *  get:
 *    summary: Valida si el correo y la contraseña pertenecen a un usuario en la base de datos.
 *    tags: [Validar]
 *    requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/validateLogin'
 *    responses:
 *      200:
 *          description: true, Object
 *      404:
 *          description: false, Correo y/o contraseña invalidos 
 *      508: 
 *          description: Error del servidor al loguear el usuario
 */

/** 
 * @swagger
 * /postUsers:
 *  post:
 *    summary: Agregar un nuevo usuario
 *    tags: [Users]
 *    requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *          description: Object
 *      201:
 *          description: El usuario con cedula CEDULA y/o email EMAIL ya existe en la base de datos.
 *      508:
 *          description: Error del servidor al crear un usuario.
 *  
 */ 