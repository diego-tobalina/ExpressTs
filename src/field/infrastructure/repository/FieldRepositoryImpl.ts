import IFieldRepository from "./IFieldRepository";
import {Transaction} from "sequelize";
import Field from "../../domain/Field";

class FieldRepositoryImpl implements IFieldRepository {

    constructor() {
        // empty
    }

    findAll = (): Promise<Field[]> => {
        return Field.findAll();
    }

    findById = async (id: number): Promise<Field> => {
        let field = await Field.findOne({where: {id: id}, raw: true});
        if (field == null) throw new Error(`field not found with id: ${id}`);
        return field;
    }

    findByIdOrNull = async (id: number, t?: Transaction): Promise<Field> => {
        return await Field.findOne({where: {id: id}, raw: true});
    }

    findAllByIds = async (ids: number[]): Promise<Field[]> => {
        return await Field.findAll({where: {id: ids}, raw: true});
    }

    create = async (field: Field, t?: Transaction): Promise<Field> => {
        return await field.save({transaction: t});
    }

    createAll(fields: Field[], t?: Transaction): Promise<Field>[] {
        return fields.map(u => this.create(u, t));
    }

    deleteAllById = async (ids: number[], t?: Transaction): Promise<Field[]> => {
        const fields = await Field.findAll({where: {id: ids}, raw: true});
        await Field.destroy({where: {id: ids}, transaction: t});
        return fields;
    }

    deleteById = async (id: number, t?: Transaction): Promise<Field> => {
        const field = await Field.findOne({where: {id: id}, raw: true});
        await Field.destroy({where: {id: id}, transaction: t});
        return field;
    }


    update = async (field: Field, t?: Transaction): Promise<Field> => {
        const [updatedFieldsCount, fields] = await Field.update(field, {where: {id: field.id}, transaction: t});
        return await this.findById(field.id);
    }

    updateAll(fields: Field[], t?: Transaction): Promise<Field>[] {
        return fields.map(u => this.update(u, t));
    }

    async findAllByIdEntity(idEntity: number): Promise<Field[]> {
        return await Field.findAll({where: {idEntity: idEntity}, raw: true});
    }

    async findAllByIdEntityIn(idEntities: number[]): Promise<Field[]> {
        return await Field.findAll({where: {idEntity: idEntities}, raw: true});
    }
}


export default FieldRepositoryImpl
