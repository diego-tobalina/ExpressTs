import {MapperConfiguration, MappingPair} from '@dynamic-mapper/mapper';
import EntityInputDTO from "../infrastructure/controller/dto/EntityInputDTO";
import EntityBaseOutputDTO from "../infrastructure/controller/dto/EntityBaseOutputDTO";
import Entity from "./Entity";

const EntityInputDTOToEntity = new MappingPair<EntityInputDTO, Entity>();
const EntityToEntityBaseOutputDTO = new MappingPair<Entity, EntityBaseOutputDTO>();

const EntityMapper = new MapperConfiguration(cfg => {
    cfg.createMap(EntityInputDTOToEntity, {
        name: opt => opt.mapFrom(src => `${src.name}`),
        description: opt => opt.mapFrom(src => src.description),
    });
    cfg.createAutoMap(EntityToEntityBaseOutputDTO, {});
});

export {
    EntityMapper,
    EntityInputDTOToEntity,
    EntityToEntityBaseOutputDTO
};

