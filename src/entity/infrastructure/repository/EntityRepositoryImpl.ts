import IEntityRepository from "./IEntityRepository";
import {Transaction} from "sequelize";
import Entity from "../../domain/Entity";

class EntityRepositoryImpl implements IEntityRepository {

    constructor() {
        // empty
    }

    findAll = async (): Promise<Entity[]> => {
        return await Entity.findAll({raw: true});
    }

    findById = async (id: number): Promise<Entity> => {
        let entity = await Entity.findOne({where: {id: id}, raw: true});
        if (entity == null) throw new Error(`entity not found with id: ${id}`);
        return entity;
    }

    findByIdOrNull = async (id: number, t?: Transaction): Promise<Entity> => {
        return await Entity.findOne({where: {id: id, raw: true}});
    }

    findAllByIds = async (ids: number[]): Promise<Entity[]> => {
        return await Entity.findAll({where: {id: ids, raw: true}});
    }

    create = async (entity: Entity, t?: Transaction): Promise<Entity> => {
        return await entity.save({transaction: t});
    }

    createAll(entities: Entity[], t?: Transaction): Promise<Entity>[] {
        return entities.map(u => this.create(u, t));
    }

    deleteAllById = async (ids: number[], t?: Transaction): Promise<Entity[]> => {
        const entities = await Entity.findAll({where: {id: ids}, raw: true});
        await Entity.destroy({where: {id: ids}, transaction: t});
        return entities;
    }

    deleteById = async (id: number, t?: Transaction): Promise<Entity> => {
        const entity = await Entity.findOne({where: {id: id, raw: true}});
        await Entity.destroy({where: {id: id}, transaction: t});
        return entity;
    }


    update = async (entity: Entity, t?: Transaction): Promise<Entity> => {
        const [updatedEntitiesCount, entities] = await Entity.update(entity, {where: {id: entity.id}, transaction: t});
        return entities[0];
    }

    updateAll(entities: Entity[], t?: Transaction): Promise<Entity>[] {
        return entities.map(u => this.update(u, t));
    }
}


export default EntityRepositoryImpl
