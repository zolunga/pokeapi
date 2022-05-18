import request from 'supertest'
import {app} from "../../app";


it('should get all pokemons', async function () {
    const response = await request(app)
        .get('/api/poke')
        .send()
        .expect( 200 )
    expect(response.body.pokemons.length).toEqual(1126)
});

it('should get a part of the pokemons', async function () {
    const response = await request(app)
        .get('/api/poke?page=0&limit=20')
        .send()
        .expect( 200 )
    console.log(response.body)
    expect(response.body.pokemons.length).toEqual(20)
});
