import {Response} from 'express'
import {sequelize} from "../../../Database";
import ITransactionalRequest from "../../ITransactionalRequest";

const beginTransaction = async (req: ITransactionalRequest, resp: Response, next) => {
    req.transaction = await sequelize.transaction();
    console.log("Begin transaction")
    next();
}

export default beginTransaction
