module.exports = (sequelize, Sequelize)=> {
    const reaction = sequelize.define(
        'reaction',
        {
        id:{
            type:Sequelize.INTEGER,
            allowNull : false,
            autoIncrement: true,
            primaryKey: true
        },
        // postId : {
        //     type:Sequelize.INTEGER,
        //     allowNull : false,
        //     foreignKey: true
        // },
        // userId : {
        //     type:Sequelize.INTEGER,
        //     allowNull: false             
        // },
        reaction:{
            type:Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    });
        
        return reaction;
    }