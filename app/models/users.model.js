const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {

    class User extends Model {
        static associate(models) {
            User.hasMany(models.Post, {
                foreignKey: "creator_id",
                onDelete: "CASCADE",
                as: 'posts',
                onUpdate: "CASCADE"
            });
        }
    } 
    
    User.init(
        {
            id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true
            },
            first_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true
            },
            last_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true
            }
            }, {
                timestamps: true,
                freezeTableName: true,
                underscored: true,
                tableName: 'usr_users',
                sequelize,
                modelName: 'User',
            }
    );
    return User;
};
