import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { pokeSearchRouter } from "./routes/poke-search";
import {errorHandler} from "./middleware/error-handler";
import {NotFound} from "./errors/not-found";

const app = express();
app.use( json() );

app.use(pokeSearchRouter);


app.all('*', async (req, res) => {
    throw new NotFound()
})
app.use(errorHandler)




export {app }
