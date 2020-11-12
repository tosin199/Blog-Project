module.exports = (sequelize, Sequelize) => {
    const post = sequelize.define('post', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      // newsId: {
      //   type: Sequelize.STRING(20),
      //   allowNull: true,
      //   primaryKey: false
      // },
      Title: {
        type: Sequelize.STRING(200),
        allowNull: true,
        primaryKey: false
      },
      Body: {
        type: Sequelize.STRING(2000),
        allowNull: true,
        primaryKey: false
      },
  
    });
    return post;
  } 
  
