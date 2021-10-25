import {MaxLength, MinLength} from "class-validator";
import {Trim} from "class-sanitizer";

class FieldInputDTO {

    @Trim()
    @MinLength(4, {message: "name should be minimum of 4 characters"})
    public name?: string;

    @Trim()
    @MaxLength(255, {message: "description should be maximum of 255 characters"})
    public description?: string;

}

export default FieldInputDTO;
