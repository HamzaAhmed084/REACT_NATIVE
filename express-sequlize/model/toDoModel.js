module.exports = (sequelize,Sequelize) =>{
    const toDo = sequelize.define(`toDo`,{
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
        job:{
            type: Sequelize.STRING,
        },
        discription: {
            type: Sequelize.STRING,
        },
        
    })
    return toDo;
}