const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {

    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: 'creator_id',
                as: 'creator'
            });
        }
    } 
    
    Post.init(
        {
            id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            }, 
            creator_id: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                foreignKey:  true,
                as: 'sender'
            },
            subject: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            body: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true
            },
            }, {
                paranoid: true,
                timestamps: true,
                freezeTableName: true,
                underscored: true,
                tableName: 'blg_posts',
                sequelize,
                modelName: 'Posts'
            }
    );

    return Post;
};
