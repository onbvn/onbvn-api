const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

/**
 * @swagger
 * tags:
 *    - name: Authorization Routes
 *      description: The user login/authorization happens here
 * /api/v1/auth:
 *   post:
 *     summary: Authenticates the user
 *     tags:
 *       - Authorization Routes
 *     description: Authenticate the user
 *     produces:
 *       - application/json
 *     parameters:
 *       - username: username
 *         description: The username of the user
 *         required: true
 *         in: formData
 *       - name: password
 *         description: Password of the user
 *         required: true
 *         in: formData
 *     responses:
 *       200:
 *         description: returns a JWT auth token
 *       500:
 *         description: User has not been created...Internal server error occurred
 */
router.post('/', AuthController.authorize);

module.exports = router;
