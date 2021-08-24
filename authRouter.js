const Router = require('express');
const router = new Router();
const controller = require('./authController');

// router.post('/registration', controller.registration);
// router.post('/login', controller.login);
// router.get('/users', controller.getUsers);

router.route('/registration')
  .post(controller.registration);

router.route('/login')
  .post(controller.login);

router.route('/users')
  .get(controller.getUsers);

module.exports = router;
