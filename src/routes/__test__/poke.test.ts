import request from 'supertest'
import {app} from "../../app";


it('should get not found for all routes not mapped', async function () {
    await request(app)
        .get('/test')
        .send()
        .expect( 404 )
    await request(app)
        .get('/aa')
        .send()
        .expect( 404 )
    await request(app)
        .get('/api')
        .send()
        .expect( 404 )
    await request(app)
        .get('/api/pokemons')
        .send()
        .expect( 404 )
});

it('should get all pokemons', async function () {
    const response = await request(app)
        .get('/api/poke')
        .send()
        .expect( 200 )
    expect(response.body.pokemons.length).toEqual(1126)
});

it('should fail for using bad parameters format', async function () {
     await request(app)
        .get('/api/poke?page=a&limit=20')
        .send()
        .expect( 400 )
    await request(app)
        .get('/api/poke?page=-1&limit=20')
        .send()
        .expect( 400 )
    await request(app)
        .get('/api/poke?page=1&limit=ca')
        .send()
        .expect( 400 )
});

it('should get a part of the pokemons', async function () {
    const response = await request(app)
        .get('/api/poke?page=0&limit=20')
        .send()
        .expect( 200 )
    expect(response.body.pokemons.length).toEqual(20)
});

it('should get a part of the pokemons', async function () {
    const response = await request(app)
        .get('/api/poke?page=0&limit=20')
        .send()
        .expect( 200 )
    expect(response.body.pokemons.length).toEqual(20)
});

it('should search with the word pika', async function () {
    const response = await request(app)
        .get('/api/poke/search?term=pika')
        .send()
        .expect( 200 )
    expect(response.body.pokemons.length).toEqual(17)
    for ( const poke of response.body.pokemons ) {
        expect(poke.name).toContain('pika')
    }
});

it('should search with the word mew, and contain at least two coincidences', async function () {
    const response = await request(app)
        .get('/api/poke/search?term=mew')
        .send()
        .expect( 200 )
    expect(response.body.pokemons.length).toBeGreaterThan(2)
    for ( const poke of response.body.pokemons ) {
        expect(poke.name).toContain('mew')
    }
});

it('should search with the word asdf and return 0 results', async function () {
    const response = await request(app)
        .get('/api/poke/search?term=asdf')
        .send()
        .expect( 200 )
    expect(response.body.pokemons.length).toEqual(0)
});
