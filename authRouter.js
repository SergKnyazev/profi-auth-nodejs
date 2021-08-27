const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require('express-validator');
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');

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
  // .get(authMiddleware, controller.getUsers);
  .get(roleMiddleware(['ADMIN']), controller.getUsers);

module.exports = router;

//TODO ::: router.route('/users') -- когда необх
//TODO ::: применить authMiddleware
//TODO ::: а когда roleMiddleware
//TODO ::: ???
