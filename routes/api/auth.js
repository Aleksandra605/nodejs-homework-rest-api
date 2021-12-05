const express = require('express');
const { userSchemaJoi } = require('../../model/user');
const { register } = require('../../controllers/index');
const login = require('../../controllers/auth/login');
const logout = require('../../controllers/auth/logout');
const validation = require('../../middlewares/validation');
const authenticate = require('../../middlewares/authenticate');
const currentUser = require('../../controllers/auth/currentUser');
const upload = require('../../middlewares/upload');
const updateAvatar = require('../../controllers/user/updateAvatar');
const verify = require('../../controllers/auth/verify');
const repeatVerification = require('../../controllers/auth/repeatVerification');

const router = express.Router();

router.post('/signup', validation(userSchemaJoi), register);

router.post('/login', validation(userSchemaJoi), login);

router.get('/logout', authenticate, logout);

router.get('/current', authenticate, currentUser);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatarURL'),
  updateAvatar
);

router.get('/verify/:verificationToken', verify);

router.post('/verify', repeatVerification);

module.exports = router;
