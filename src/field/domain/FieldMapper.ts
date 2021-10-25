import {MapperConfiguration, MappingPair} from '@dynamic-mapper/mapper';
import FieldBaseOutputDTO from "../infrastructure/controller/dto/FieldBaseOutputDTO";
import FieldInputDTO from "../infrastructure/controller/dto/FieldInputDTO";
import Field from "./Field";

const FieldInputDTOToField = new MappingPair<FieldInputDTO, Field>();
const FieldToFieldBaseOutputDTO = new MappingPair<Field, FieldBaseOutputDTO>();

const FieldMapper = new MapperConfiguration(cfg => {
    cfg.createMap(FieldInputDTOToField, {
        name: opt => opt.mapFrom(src => `${src.name}`),
        description: opt => opt.mapFrom(src => src.description),
    });
    cfg.createAutoMap(FieldToFieldBaseOutputDTO, {});
});

export {
    FieldMapper,
    FieldInputDTOToField,
    FieldToFieldBaseOutputDTO
};

