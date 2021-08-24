const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');

const MESSAGE_REGISTRATION_ERROR = 'Error of method "authController.registration"';
const MESSAGE_LOGIN_ERROR = 'Error of method "authController.registration"';

class authController {

  async registration(req, res) {
    try {
      const {username, password} = req.body;
      const candidate = await User.findOne({username});
      if (candidate) {
        return res.status(400).json({message: `ERROR--authController--registration : Пользователь c именем ${username} уже существует!`});
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value : 'USER'});
      if (!userRole) {
        return res.status(400).json({message: `ERROR--authController--registration : Роль пользователя ${userRole} НЕ существует!`});
      }
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value]
      });

      await user.save();
      return res.json({message: `Пользователь username=${username} успешно зарегистрирован!`})

      // res.json('method "authController.registration" worked...');
    } catch (err) {
      console.log(MESSAGE_REGISTRATION_ERROR + ` : ${err}`);
      res.status(400).json({message : MESSAGE_REGISTRATION_ERROR + ` : ${err}`})
    }
  }

  async login(req, res) {
    try {
      res.json('method "authController.login" worked...');
    } catch (err) {
      console.log(MESSAGE_LOGIN_ERROR + ` : ${err}`);
      res.status(400).json({message : MESSAGE_LOGIN_ERROR + ` : ${err}`})
    }
  }

  async getUsers(req, res) {
    try {

      // const userRole = new Role();
      // const adminRole = new Role({value: 'ADMIN'});
      // await userRole.save();
      // await adminRole.save();

      res.json('method "authController.getUsers" worked...');
    } catch (err) {
      console.log(`Error of method "authController.getUsers" : ${err}`)
    }
  }
}

module.exports = new authController();
