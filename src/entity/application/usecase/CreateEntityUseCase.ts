import IEntityService from "../IEntityService";
import {Transaction} from "sequelize";
import Entity from "../../domain/Entity";

class CreateEntityUseCase {

    private entityService: IEntityService;

    constructor(service: IEntityService) {
        this.entityService = service;
    }

    create = async (entity: Entity, t?: Transaction): Promise<Entity> => {
        return this.entityService.create(entity, t);
    }

}

export default CreateEntityUseCase
