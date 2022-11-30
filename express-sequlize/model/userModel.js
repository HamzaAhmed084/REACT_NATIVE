const validator = require('validator');

module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define('user',{
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
        name:{
            type:Sequelize.STRING,
            required:[true,'please enter your name'],

        },
        email:{
            type:Sequelize.STRING,
            required:[true,'Enter your email'],
            unique:true,
            validator:[validator.isEmail,'Enter a valid email']
            
        },
        password:{
            type:Sequelize.STRING,
            required:[true],
            minLength:[8,"password should be greator then 8 characters "],
        },
        jobCount:{
          type:Sequelize.INTEGER,
          required:[false],
        },
        
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        //   resetPasswordToken:String,
        //   resetPasswordExpire:Date,


    })
    
    
    return users;
}