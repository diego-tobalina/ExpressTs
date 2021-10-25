import {Transaction} from "sequelize";

interface ICrud {
    findById(id: number): Promise<any>

    findByIdOrNull(id: number): Promise<any>

    findAll(): Promise<any[]>

    findAllByIds(ids: number[]): Promise<any[]>

    create(entity: any, t?: Transaction): Promise<any>

    createAll(entities: any[], t?: Transaction): Promise<any>[]

    update(entity: any, t?: Transaction): Promise<any>

    updateAll(entities: any[], t?: Transaction): Promise<any>[]

    deleteById(id: number, t?: Transaction): Promise<any>

    deleteAllById(ids: number[], t?: Transaction): Promise<any[]>
}

export default ICrud
