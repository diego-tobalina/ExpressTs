import IEntityService from "./IEntityService";
import IEntityRepository from "../infrastructure/repository/IEntityRepository";
import {Transaction} from "sequelize";
import Entity from "../domain/Entity";

class EntityServiceImpl implements IEntityService {

    private repository: IEntityRepository;

    constructor(repository: IEntityRepository) {
        this.repository = repository;
    }

    findAll = (): Promise<Entity[]> => {
        return this.repository.findAll();
    }

    findById = async (id: number): Promise<Entity> => {
        return this.repository.findById(id);
    }

    findByIdOrNull = async (id: number, t?: Transaction): Promise<Entity> => {
        return this.repository.findByIdOrNull(id);
    }

    findAllByIds = async (ids: number[]): Promise<Entity[]> => {
        return this.repository.findAllByIds(ids);
    }

    create = async (entity: Entity, t?: Transaction): Promise<Entity> => {
        return this.repository.create(entity, t);
    }

    createAll(entities: Entity[], t?: Transaction): Promise<Entity>[] {
        return this.repository.createAll(entities, t);
    }


    deleteAllById = async (ids: number[], t?: Transaction): Promise<Entity[]> => {
        return this.repository.deleteAllById(ids, t);
    }

    deleteById = async (id: number, t?: Transaction): Promise<Entity> => {
        return this.repository.deleteById(id, t);
    }


    update = async (entity: Entity, t?: Transaction): Promise<Entity> => {
        return this.repository.update(entity, t);
    }

    updateAll(entities: Entity[], t?: Transaction): Promise<Entity>[] {
        return this.repository.updateAll(entities, t);
    }
}

export default EntityServiceImpl
