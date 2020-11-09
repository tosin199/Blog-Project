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