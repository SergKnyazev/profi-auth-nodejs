const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require('./config');

const MESSAGE_REGISTRATION_ERROR = 'Error of method authController.registration';
const MESSAGE_LOGIN_ERROR = 'Error of method authController.login';

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: `ERROR--authController--registration : Ошибка при регистрации!`, errors});
      }
      const {username, password} = req.body;
      const candidate = await User.findOne({username});
      if (candidate) {
        return res.status(400).json({message: `ERROR--authController--registration : Пользователь ${username} уже существует!`});
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value : 'USER'});
      if (!userRole) {
        return res.status(400).json({message: `ERROR--authController--registration : Роль ${userRole} НЕ существует!`});
      }
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value]
      });

      await user.save();
      return res.json({message: `Пользователь username=${username} успешно зарегистрирован!`})

    } catch (err) {
      console.log(MESSAGE_REGISTRATION_ERROR + ` : ${err}`);
      res.status(400).json({message : MESSAGE_REGISTRATION_ERROR + ` : ${err}`})
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json({message: `ERROR--authController--login : Пользователь ${username} не найден!`});
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({message: `ERROR--authController--login : Введен неверный пароль!`});
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({token})

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

      const users = await User.find();
      res.json(users);

//********************************************************************************************************************
    } catch (err) {
      console.log(`Error of method "authController.getUsers" : ${err}`)
    }
  }
}

module.exports = new authController();
