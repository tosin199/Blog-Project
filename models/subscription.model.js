module.exports = (sequelize,Sequelize) => {
  const Sub =  sequelize.define(
    'subs',
    {
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
        },
      UserId: {
        type:Sequelize.INTEGER,
        allowNull:false
      } 
    }
  );
  return Sub;
} 
