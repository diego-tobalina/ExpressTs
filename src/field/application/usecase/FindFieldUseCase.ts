import IFieldService from "../IFieldService";
import Field from "../../domain/Field";

class FindFieldUseCase {

    private fieldService: IFieldService;

    constructor(service: IFieldService) {
        this.fieldService = service;
    }

    findField = async (id: number): Promise<Field> => {
        return await this.fieldService.findById(id);
    }

    findAll = async (): Promise<Field[]> => {
        return await this.fieldService.findAll();
    }

}

export default FindFieldUseCase
