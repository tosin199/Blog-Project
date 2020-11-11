module.exports = (sequelize,Sequelize) => {
  const Sub =  sequelize.define(
    'subs',
    {
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
        }
    }
  );
  return Sub;
} 
