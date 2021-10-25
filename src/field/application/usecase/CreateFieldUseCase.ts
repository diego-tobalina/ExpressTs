import IFieldService from "../IFieldService";
import {Transaction} from "sequelize";
import Field from "../../domain/Field";

class CreateFieldUseCase {

    private fieldService: IFieldService;

    constructor(service: IFieldService) {
        this.fieldService = service;
    }

    create = async (Field: Field, t?: Transaction): Promise<Field> => {
        return this.fieldService.create(Field, t);
    }

}

export default CreateFieldUseCase
