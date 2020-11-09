module.exports = (sequelize,Sequelize) =>{
    const share = sequelize.define("share", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    postId: {
        type: Sequelize.INTEGER
    },

    userId: {
        type: Sequelize.INTEGER
    },
   
    });
    return share;

}