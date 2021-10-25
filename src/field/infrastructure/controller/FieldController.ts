import {Request, Response, Router} from 'express'
import IController from "../../../shared/IController";
import FieldServiceImpl from "../../application/FieldServiceImpl";
import FieldRepositoryImpl from "../repository/FieldRepositoryImpl";
import IFieldRepository from "../repository/IFieldRepository";
import IFieldService from "../../application/IFieldService";
import FindFieldUseCase from "../../application/usecase/FindFieldUseCase";
import CreateFieldUseCase from "../../application/usecase/CreateFieldUseCase";
import transactional from "../../../shared/middleware/transaction/Transactional";
import ITransactionalRequest from "../../../shared/ITransactionalRequest";
import validateDTO from "../../../shared/middleware/DTOValidation";
import FieldInputDTO from "./dto/FieldInputDTO";
import {FieldInputDTOToField, FieldMapper, FieldToFieldBaseOutputDTO} from "../../domain/FieldMapper";
import Field from "../../domain/Field";


class FieldController implements IController {

    public path = '/fields';
    public router = Router();
    public FieldRepository: IFieldRepository = new FieldRepositoryImpl();
    public FieldService: IFieldService = new FieldServiceImpl(this.FieldRepository);

    public findFieldUseCase: FindFieldUseCase = new FindFieldUseCase(this.FieldService);
    public createFieldUseCase: CreateFieldUseCase = new CreateFieldUseCase(this.FieldService);

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path + '/:id', this.getField)
        this.router.get(this.path, this.getAllEntities)
        this.router.post(this.path, validateDTO(FieldInputDTO), transactional(this.createField))
    }

    getField = async (req: Request, res: Response, next) => {
        try {
            const id: number = +req.params.id;
            const field: Field = await this.findFieldUseCase.findField(id);
            const fieldBaseOutputDTO = FieldMapper.createMapper().map(FieldToFieldBaseOutputDTO, field);
            res.json(fieldBaseOutputDTO)
            next();
        } catch (e) {
            next(e);
        }
    }

    getAllEntities = async (req: ITransactionalRequest, res: Response, next) => {
        try {
            const entities = await this.findFieldUseCase.findAll();
            res.json(entities.map(Field => FieldMapper.createMapper().map(FieldToFieldBaseOutputDTO, Field)))
            next();
        } catch (e) {
            next(e);
        }
    }

    createField = async (req: Request, res: Response, next) => {
        try {
            const fieldInputDTO: FieldInputDTO = req.body
            const field = FieldMapper.createMapper().map(FieldInputDTOToField, fieldInputDTO);
            const createdField: Field = await this.createFieldUseCase.create(field);
            const fieldBaseOutputDTO = FieldMapper.createMapper().map(FieldToFieldBaseOutputDTO, createdField);
            res.json(fieldBaseOutputDTO)
            next();
        } catch (e) {
            next(e);
        }
    }

}

export default FieldController
