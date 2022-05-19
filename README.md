# Pokemon api 

This project is designed to consume pokeapi using nodejs and expressjs, coded using typescript


It is hosted on heroku, and it is deployed through a docker image described on this repository
> https://pokemon-test-api.herokuapp.com

The api is mapped on the postman collection as pokeapi.postman_collection.json on the root of the dir

The requirements to run locally area mainly nodejs 16.5.0 and run the next commands


```shell
npm install
npm start
```

By default, the api runs on 3000 port, but you can set other port using an environment variable defined as PORT

For the test part it is required to install the dev dependencies, the framework to test used is Jest

With the next command you can execute the coded test
```shell
npm run test
```

If you want to use the docker image run this on the root directory of the repo to build
```shell
docker build -t nameimage .
```
And next:

```shell
docker run -p 3000:3000 nameimage
```


> Note:
If you try to get in a route not mapped it will return an error like this:
```js
{"errors":[{"message":"not found on api"}]}
```
