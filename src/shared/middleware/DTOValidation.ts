import {RequestHandler} from "express";
import {plainToClass} from "class-transformer";
import {validate, ValidationError} from "class-validator";
import {sanitize} from "class-sanitizer";
import RequestError from "../RequestError";


function validateDTO(type: any, skipMissingProperties = false): RequestHandler {

    return (req, res, next) => {
        const dto = plainToClass(type, req.body);
        validate(dto, {skipMissingProperties}).then(
            (errors: ValidationError[]) => {

                // si hay errores pasa al siguiente middleware con los errores
                if (errors.length > 0) {
                    const dtoErrors = errors.map((error: ValidationError) => (Object as any).values(error.constraints));
                    next(new RequestError(400, {failedInputValidations: dtoErrors}));
                    return;
                }

                // si no hay errores limpia el dto y pasa al siguiente middleware
                sanitize(dto);
                req.body = dto;
                next();
            }
        );
    };
}


export default validateDTO;
