import {DataTypes, Model} from "sequelize";
import {sequelize} from "../../Database";

class Entity extends Model {

    id: number;
    name: string;
    description: string;
    path: string;
    tableName: string;

    constructor() {
        super();
    }
}

Entity.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tableName: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Entity',
    createdAt: false,
    updatedAt: false,
    tableName: 'w_config_Entity',
});

export default Entity;
