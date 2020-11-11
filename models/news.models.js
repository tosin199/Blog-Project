module.exports = (sequelize, Sequelize) => {
    const news = sequelize.define('news', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      Name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: false
      },
      Description: {
        type: Sequelize.STRING(250),
        allowNull: true,
        primaryKey: false
      },
  
    });
    return news;
  } 
  