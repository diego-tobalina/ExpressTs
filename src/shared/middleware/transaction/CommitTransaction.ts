import {Response} from 'express'
import ITransactionalRequest from "../../ITransactionalRequest";

const commitTransaction = (req: ITransactionalRequest, resp: Response, next) => {
    next();
    const transaction = req.transaction;
    if (transaction != null) {
        console.log("Commit transaction");
        transaction.commit().then(r => {
        });
        req.transaction = null;
    }

}

export default commitTransaction
