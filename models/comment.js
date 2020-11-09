module.exports = function(sequelize, Sequelize){
    const Comment = sequelize.define('comment', {
        commentId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        postId: {
            type: Sequelize.INTEGER,
            allowNull: false,

        },

        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        content: {
            type: Sequelize.TEXT,
            allowNull: true,
        }
    }
    );

    return Comment;
}