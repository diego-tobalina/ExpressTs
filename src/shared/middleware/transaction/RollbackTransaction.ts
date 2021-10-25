import {Response} from 'express'
import ITransactionalRequest from "../../ITransactionalRequest";

const rollbackTransaction = (err: Error, req: ITransactionalRequest, resp: Response, next) => {
    next(err);
    const transaction = req.transaction;
    if (transaction != null) {
        console.log("Rollback transaction")
        transaction.rollback().then(r => {
        });
        req.transaction = null;
    }
}

export default rollbackTransaction
