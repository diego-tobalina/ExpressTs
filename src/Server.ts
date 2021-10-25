require('dotenv').config();

import App from './App'
import * as bodyParser from 'body-parser'
import EntityController from "./entity/infrastructure/controller/EntityController";
import FieldController from "./field/infrastructure/controller/FieldController";


const app = new App({
    port: +process.env.PORT || 8080,
    controllers: [
        new EntityController(),
        new FieldController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({extended: true}),
    ]
})

app.listen();
