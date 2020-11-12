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
        reaction:{
            type:Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    });
        
        return reaction;
    }