module.exports = (sequelize, Sequelize)=> {
    const reaction = sequelize.define(
        'reaction',
        {
            id:{
                type:Sequelize.INTEGER,
                allowNull : false,
                autoincrement: true,
                primaryKey: true
            },
            postId : {
            type:Sequelize.INTEGER,
            allowNull : false,
            foreignKey: true
        },
            userId : {
            type:Sequelize.INTEGER,
            allowNull: false             
        },
        reaction:{
            type:Sequelize.BOOLEAN,
            allowNull: false
        }
    });
        
        return reaction;
    }