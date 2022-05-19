import express, {Request, Response} from "express";
import axios from "axios";
import {RequestValidationError} from "../errors/validation";
import { query, validationResult} from "express-validator";
const router = express.Router();

router.get('/api/poke', [
    query('page').optional().isInt({min: 0}).withMessage('should be a number greater than 0'),
    query('limit').optional().isInt({min: 0}).withMessage('should be a number greater than 0')
], async (req: Request, res:Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
    let page = req.query.page ? parseInt(req.query.page as string) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit as string) : 0;
    let pokemons;
    const result = { pokemons: [], page: page, items_per_page: limit, total: 0 };
    if ( page >= 0 && limit > 0) {
        const offset = (page && limit ) ? page * limit : 0;
        pokemons = await axios.get( `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}` );
        result.pokemons = pokemons.data.results;
        result.total = pokemons.data.count;
    } else {
        pokemons = await axios.get( 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0' )
        result.pokemons = pokemons.data.results;
        result.total = pokemons.data.results.length;
        result.items_per_page = result.total;
    }
    res.send(result)
})

router.get('/api/poke/search', [
    query('term').isString().withMessage('Term is required')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { term } = req.query
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
    let pokemons = await axios.get( 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0' );
    pokemons.data.results = pokemons.data.results.filter( (pokemon: {name: string}) => pokemon.name.includes(term as string) )
    const result = { pokemons: pokemons.data.results, total: pokemons.data.results.length };
    res.send(result)
})

export { router as pokeSearchRouter }
