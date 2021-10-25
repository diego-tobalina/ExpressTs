import IFieldService from "./IFieldService";
import IFieldRepository from "../infrastructure/repository/IFieldRepository";
import {Transaction} from "sequelize";
import Field from "../domain/Field";

class FieldServiceImpl implements IFieldService {

    private repository: IFieldRepository;

    constructor(repository: IFieldRepository) {
        this.repository = repository;
    }

    findAll = (): Promise<Field[]> => {
        return this.repository.findAll();
    }

    findById = async (id: number): Promise<Field> => {
        return this.repository.findById(id);
    }

    findByIdOrNull = async (id: number, t?: Transaction): Promise<Field> => {
        return this.repository.findByIdOrNull(id);
    }

    findAllByIds = async (ids: number[]): Promise<Field[]> => {
        return this.repository.findAllByIds(ids);
    }

    create = async (entity: Field, t?: Transaction): Promise<Field> => {
        return this.repository.create(entity, t);
    }

    createAll(entities: Field[], t?: Transaction): Promise<Field>[] {
        return this.repository.createAll(entities, t);
    }


    deleteAllById = async (ids: number[], t?: Transaction): Promise<Field[]> => {
        return this.repository.deleteAllById(ids, t);
    }

    deleteById = async (id: number, t?: Transaction): Promise<Field> => {
        return this.repository.deleteById(id, t);
    }


    update = async (entity: Field, t?: Transaction): Promise<Field> => {
        return this.repository.update(entity, t);
    }

    updateAll(entities: Field[], t?: Transaction): Promise<Field>[] {
        return this.repository.updateAll(entities, t);
    }

    findAllByIdEntity(idEntity: number): Promise<Field[]> {
        return this.repository.findAllByIdEntity(idEntity);
    }

    findAllByIdEntityIn(idEntities: number[]): Promise<Field[]> {
        return this.repository.findAllByIdEntityIn(idEntities);
    }
}

export default FieldServiceImpl
