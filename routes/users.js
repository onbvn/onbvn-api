const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: GET all users
 *     tags:
 *       - User Routes
 *     description: Gets a list of all the users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns a list of users without their passwords
 *       500:
 *         description: Could not get users...Internal server error occurred
 */
/* GET users listing. */
router.get('/', userController.getAll);
/**
 * @swagger
 * tags:
 *    - name: User Routes
 *      description: All user CRUD operations are handled here
 * /api/v1/users:
 *   post:
 *     summary: CREATE a new user
 *     tags:
 *       - User Routes
 *     description: CREATE a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: The name of the user
 *         required: true
 *         in: formData
 *       - name: username
 *         description: The username of the user
 *         required: true
 *         in: formData
 *       - name: mobileNumber
 *         description: The mobile number of the user
 *         required: true
 *         in: formData
 *       - name: email
 *         description: The email id of the user
 *         required: true
 *         in: formData
 *       - name: profilePicture
 *         description: The profile picture of the user ( will be a URL)
 *         in: formData
 *       - name: aadharUID
 *         description: The Aadhar ID of the user
 *         required: true
 *         in: formData
 *       - name: password
 *         description: Password of the user which will be used to login
 *         required: true
 *         in: formData
 *       - name: aadharFrontImage
 *         description: URL of the front image of aadhar
 *         required: true
 *         in: formData
 *       - name: aadharBackImage
 *         description: URL of the back image of aadhar
 *         required: true
 *         in: formData
 *     responses:
 *       200:
 *         description: returns the newly created user without password
 *       500:
 *         description: User has not been created...Internal server error occurred
 */
/* POST create a user */
router.post('', userController.create);

/**
 * @swagger
 * /api/v1/users/:userID:
 *   get:
 *     summary: GET user by userID
 *     tags:
 *       - User Routes
 *     description: Gets the user by userID
 *     parameters:
 *       - in: path
 *         name: userID
 *         description: The userID of the user who has to be searched
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns the user queried without password
 *       500:
 *         description: Could not get user...Internal server error occurred
 */
/* GET user by id */
router.get('/:userID', userController.findUser);

/* UPDATE user */
/**
 * @swagger
 * /api/v1/users/:username:
 *   put:
 *     summary: UPDATE user details
 *     tags:
 *       - User Routes
 *     description: UPDATE the user details. But these details can be updated only if the user is logged in.
 *     parameters:
 *       - in: path
 *         name: username
 *       - name: name
 *         description: The name of the user
 *         in: formData
 *       - name: username
 *         description: The username of the user
 *         in: formData
 *       - name: mobileNumber
 *         description: The mobile number of the user
 *         in: formData
 *       - name: email
 *         description: The email id of the user
 *         in: formData
 *       - name: profilePicture
 *         description: The profile picture of the user ( will be a URL)
 *         in: formData
 *       - name: AadharUID
 *         description: The Aadhar ID of the user
 *         in: formData
 *       - name: password
 *         description: Password of the user which will be used to login
 *         in: formData
 *       - name: aadharFrontImage
 *         description: URL of the front image of aadhar card
 *         in: formData
 *       - name: aadharBackImage
 *         description: URL of the back image of aadhar card
 *         in: formData
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns the updated user
 *       500:
 *         description: Could not update user...Internal server error occurred
 */
router.put('/:userID', userController.updateUser);

/* DELETE user */
/**
 * @swagger
 * /api/v1/users/:username:
 *  delete:
 *    summary: DELETE a user
 *    tags:
 *      - User Routes
 *    description: This route is for deleting a user. This route is not really important as we aren't sure if this feature of allowing users to delete their accounts should be their or not.
 *    parameters:
 *      - in: path
 *        name: username
 *        description: The username of the user whose details has to be updated
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Deleted the user successfully
 *      500:
 *        description: Could not delete user....Internal Server Error occurred.
 */
router.delete('/:userID', userController.deleteUser);

module.exports = router;
