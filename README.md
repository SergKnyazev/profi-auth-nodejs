# profi_auth_nodejs
auth_nodejs

//TODO ::: Разобраться с логированием ошибки подключения к БД =======================================================

https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs/mongoose

//TODO ::: скрыть в dotenv логин, пароль и имя БД ===================================================================

https://www.npmjs.com/package/dotenv

npm install dotenv

Usage
As early as possible in your application, require and configure dotenv.

require('dotenv').config()

Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:

DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3

process.env now has the keys and values you defined in your .env file.

const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})

=====================================================================================================================





//6:02

//16:18 
add a schema and models User and Role

//23:47
 add validation and jwt-token

//27:36
