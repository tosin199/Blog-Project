
module.exports = (sequelize,Sequelize) => {
  const User =  sequelize.define(
    'user',
    {
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
        },
        firstname:{
          type:Sequelize.STRING,
          allowNull:false
        },
        lastname:{
          type:Sequelize.STRING,
          allowNull:false
        },
      email :{ 
        type:Sequelize.STRING,
        allowNull:false
      },
      password:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true
      }
    }
  );
  return User;
} 