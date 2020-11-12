module.exports = (sequelize,Sequelize) =>{
    const share = sequelize.define("share", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
   
    });
    return share;

    // share.associate = function(models){
    //     share.belongsTo (models.post), {
    //         foreignKery: {
    //             allowNull: false
    //         }

    //     }
    // }

}