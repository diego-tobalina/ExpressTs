import {Request} from 'express'
import {Transaction} from "sequelize";

interface ITransactionalRequest extends Request {
    transaction: Transaction;
}

export default ITransactionalRequest;
