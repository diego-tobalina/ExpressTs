import {DataTypes, Model} from "sequelize";
import {sequelize} from "../../Database";
import Entity from "../../entity/domain/Entity";

class Field extends Model {

    id: number;
    name: string;
    description: string;
    idEntity: number;

    constructor() {
        super();
    }
}

Field.init({
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
    idEntity: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Field',
    createdAt: false,
    updatedAt: false,
    tableName: "w_config_Field"
});


export default Field;
