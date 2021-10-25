import {MaxLength, MinLength} from "class-validator";
import {Trim} from "class-sanitizer";

class EntityInputDTO {

    @Trim()
    @MinLength(4, {message: "name should be minimum of 4 characters"})
    public name?: string;

    @Trim()
    @MaxLength(255, {message: "description should be maximum of 255 characters"})
    public description?: string;

    public path?: string;
    public tableName?:string;

}

export default EntityInputDTO;
