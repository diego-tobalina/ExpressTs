import IEntityService from "../IEntityService";
import Entity from "../../domain/Entity";

class FindEntityUseCase {

    private entityService: IEntityService;

    constructor(service: IEntityService) {
        this.entityService = service;
    }

    findEntity = async (id: number): Promise<Entity> => {
        return await this.entityService.findById(id);
    }

    findAll = async (): Promise<Entity[]> => {
        return await this.entityService.findAll();
    }

}

export default FindEntityUseCase
