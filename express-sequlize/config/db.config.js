const Sequelize = require("sequelize");
const dbConfig = require("./config.json");


const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,

  {
    host: dbConfig.development.host,
    port: 3306,
    dialect: dbConfig.development.dialect,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models-tables
db.users = require("../model/userModel")(sequelize,Sequelize);
db.toDo = require("../model/toDoModel")(sequelize,Sequelize);

// 1 to many RElation
db.users.hasMany(db.toDo,{
  foreignKey:"User_id",
  as:"toDo"
})
db.toDo.belongsTo(db.users,{
  foreignKey:"User_id",
  as:"users"
})

//many to many Relation
// db.users.belongsToMany(db.toDo,{
//   through:"UserToDo",
//   foreignKey:"User_id",
// })
// db.toDo.belongsToMany(db.users,{
//   through:"UserToDo",
//   foreignKey:"ToDo_id"})

module.exports = db;
