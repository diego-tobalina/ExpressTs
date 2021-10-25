import * as express from 'express'
import RequestError from "./shared/RequestError";
import {connect} from "./Database";

class App {

    public app: express.Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        this.app = express()
        this.port = appInit.port

        this.logger()
        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
        this.assets()
        this.template()

        connect().then(r => {
            // empty
        }).catch(e => console.log(`unknown error ${e}`));
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/api/v0/', controller.router, function (err, req, res, next) {
                let error = err instanceof RequestError ? err.error : err;
                let status = err instanceof RequestError ? err.code : 500;
                res.status(status)
                res.json({error: error});
            });
        })
    }

    private assets() {
        this.app.use(express.static('public'))
        this.app.use(express.static('views'))
    }

    private template() {
        this.app.set('view engine', 'pug')
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on http://localhost:${this.port}`)
        })
    }

    private logger() {
        const morgan = require('morgan')
        this.app.use(morgan('combined'))
    }
}

export default App
