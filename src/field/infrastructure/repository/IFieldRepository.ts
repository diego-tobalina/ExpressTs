import ICrud from "../../../shared/ICrud";
import Field from "../../domain/Field";

interface IFieldRepository extends ICrud {
    findAllByIdEntity(idEntity: number): Promise<Field[]>

    findAllByIdEntityIn(idEntities: number[]): Promise<Field[]>
}

export default IFieldRepository;
