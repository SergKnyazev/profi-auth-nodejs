const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require('express-validator');

const checkRouteRegistration = [
  check('username', 'Имя пользователя не может быть пустым!').notEmpty(),
  check('password', 'Пароль должен быть больше 6(шести) символов!').notEmpty().isLength({min: 7})
];

// router.post('/registration', controller.registration);
// router.post('/login', controller.login);
// router.get('/users', controller.getUsers);

router.route('/registration')
  .post(checkRouteRegistration, controller.registration);

router.route('/login')
  .post(controller.login);

router.route('/users')
  .get(controller.getUsers);

module.exports = router;
