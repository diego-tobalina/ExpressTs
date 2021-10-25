import {Request, Response, Router} from 'express'
import IController from "../../../shared/IController";
import EntityServiceImpl from "../../application/EntityServiceImpl";
import EntityRepositoryImpl from "../repository/EntityRepositoryImpl";
import IEntityRepository from "../repository/IEntityRepository";
import IEntityService from "../../application/IEntityService";
import FindEntityUseCase from "../../application/usecase/FindEntityUseCase";
import CreateEntityUseCase from "../../application/usecase/CreateEntityUseCase";
import transactional from "../../../shared/middleware/transaction/Transactional";
import ITransactionalRequest from "../../../shared/ITransactionalRequest";
import validateDTO from "../../../shared/middleware/DTOValidation";
import EntityInputDTO from "./dto/EntityInputDTO";
import {EntityInputDTOToEntity, EntityMapper, EntityToEntityBaseOutputDTO} from "../../domain/EntityMapper";
import Entity from "../../domain/Entity";


class EntityController implements IController {

    public path = '/entities';
    public router = Router();
    public entityRepository: IEntityRepository = new EntityRepositoryImpl();
    public entityService: IEntityService = new EntityServiceImpl(this.entityRepository);

    public findEntityUseCase: FindEntityUseCase = new FindEntityUseCase(this.entityService);
    public createEntityUseCase: CreateEntityUseCase = new CreateEntityUseCase(this.entityService);

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path + '/:id', this.getEntity)
        this.router.get(this.path, this.getAllEntities)
        this.router.post(this.path, validateDTO(EntityInputDTO), transactional(this.createEntity))
    }

    getEntity = async (req: Request, res: Response, next) => {
        try {
            const id: number = +req.params.id;
            const entity: Entity = await this.findEntityUseCase.findEntity(id);
            const entityBaseOutputDTO = EntityMapper.createMapper().map(EntityToEntityBaseOutputDTO, entity);
            res.json(entityBaseOutputDTO)
            next();
        } catch (e) {
            next(e);
        }
    }

    getAllEntities = async (req: ITransactionalRequest, res: Response, next) => {
        try {
            const entities = await this.findEntityUseCase.findAll();
            res.json(entities.map(entity => EntityMapper.createMapper().map(EntityToEntityBaseOutputDTO, entity)))
            next();
        } catch (e) {
            next(e);
        }
    }

    createEntity = async (req: Request, res: Response, next) => {
        try {
            const entityInputDTO: EntityInputDTO = req.body
            const entity = EntityMapper.createMapper().map(EntityInputDTOToEntity, entityInputDTO);
            const createdEntity: Entity = await this.createEntityUseCase.create(entity);
            const entityBaseOutputDTO = EntityMapper.createMapper().map(EntityToEntityBaseOutputDTO, createdEntity);
            res.json(entityBaseOutputDTO)
            next();
        } catch (e) {
            next(e);
        }
    }
}

export default EntityController
