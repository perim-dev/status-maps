var http = require('http');
var axios = require('axios');
const cors = require('cors');

const express = require('express');
const app = express();
const port = 5001;

const bodyParser = require('body-parser');
var MjpegProxy = require('mjpeg-proxy').MjpegProxy;

// const URL_BASE = "http://192.168.165.110:8080";
const URL_BASE = "https://dev.status.rio";

app.use(bodyParser.json())

app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS');
    app.use(cors());
    next();
});




var config = {
    headers: { 'Authorization': 'Basic MjYyMjYyNTU6MTIzNDU=' }
};

// app.get('/camera', (req, res, next) => { 
//   console.log(req.url);
//   return (req,res, next);
// }, new MjpegProxy('http://10.50.3.180:9150/video-1').proxyRequest);

app.get('/*', (req, res) => {
    console.log(req.path, req.method, req.url);

    if (req.path === '/status/atualizacaoDePontos') {
        console.log('drop');
        return res.send({});
    }

    if (req.url.includes('/camera/?cam=')) {
        const param = req.url.replace('/camera/?cam=', '')
        console.log('cameras', param);
        // const urlCamera = `http://10.50.3.180:${param}/video-1`;
        const urlCamera = `http://187.111.99.18:9004/?CODE=${param}`;

        try {

            return new MjpegProxy(urlCamera).proxyRequest(req, res);
        } catch (err) {
            return res.status(404).send('');
        }


        // axios.get(urlCamera)
        // .then(function(response){
        //   console.log(response.status); // ex.: 200
        //   console.log('data',response.data)
        //   res.send(response.data);
        // }).catch(e => {
        //   console.log("deu ruim", e)
        //   res.send({});
        // });  
    } else {


        // Requisições do tipo GET
        //const query = 
        // const queryreq.query[0]);
        const url = `${URL_BASE}${req.url}`

        axios.get(url, config)
            .then(function(response) {
                //console.log(response.data); // ex.: { user: 'Your User'}
                console.log(response.status); // ex.: 200
                res.send(response.data);
            }).catch(e => {
                console.log("deu ruim", e)
                res.send({});
            });
    }


})

app.put('/*', (req, res) => {
    console.log(req.path, req.method, req.url);

    // Requisições do tipo GET
    //const query = 
    // const queryreq.query[0]);
    const url = `${URL_BASE}${req.url}`
    axios.put(url, req.body, config)
        .then(function(response) {
            //console.log(response.data); // ex.: { user: 'Your User'}
            console.log(response.status); // ex.: 200
            res.send(response.data);
        }).catch(err => {
            console.error(err);
        });


})

app.post('/*', (req, res) => {
    console.log(req.path, req.method, req.url);

    // Requisições POST, note há um parâmetro extra indicando os parâmetros da requisição
    // axios.post('/save', { firstName: 'Marlon', lastName: 'Bernardes' })
    const url = `${URL_BASE}${req.url}`
    axios.post(url, req.body, config)
        .then(function(response) {
            //console.log(response.data); // ex.: { user: 'Your User'}
            console.log('SUCESSO', response.status); // ex.: 200
            res.status(response.status).send(response.data);
        }).catch(err => {

            console.error(err.response);
            res.status(err.response.status).send(err.response.data);
        });
})

app.delete('/*', (req, res) => {
    console.log(req.path, req.method, req.url);

    // Requisições POST, note há um parâmetro extra indicando os parâmetros da requisição
    // axios.post('/save', { firstName: 'Marlon', lastName: 'Bernardes' })
    const url = `${URL_BASE}${req.url}`
    axios.delete(url, req.body, config)
        .then(function(response) {
            //console.log(response.data); // ex.: { user: 'Your User'}
            console.log('SUCESSO', response.status); // ex.: 200
            res.status(response.status).send(response.data);
        }).catch(err => {

            console.error(err.response);
            res.status(err.response.status).send(err.response.data);
        });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});



/*
function onRequest(req, res) {
  console.log('serve: ' + req.url, req.headers, req.method);
  let header = {...req.headers};
  header['Access-Control-Allow-Origin'] =  '*';
  header['Access-Control-Allow-Methods'] = 'OPTIONS, POST, GET';
  header['Access-Control-Max-Age'] = 2592000;
  header['Content-Type']= 'application/json';
  
  res.writeHead(header);
  res.end(JSON.stringify({ a: 1 }));
  res.end()
}

http.createServer(onRequest).listen(5001);
*/
/*
function onRequest(client_req, client_res) {
  console.log('serve: ' + client_req.url, client_req.headers);
  let header = {...client_req.headers};
  header['Access-Control-Allow-Origin'] =  '*';
  header['Access-Control-Allow-Methods'] = 'OPTIONS, POST, GET';
  header['Access-Control-Max-Age'] = 2592000;
  
  var options = {
    hostname: '34.120.28.181',
    port: 80,
    path: client_req.url,
    method: client_req.method,
    headers: header
  };

  var proxy = http.request(options, function (res) {
    console.log({...res.headers, "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000});
    client_res.writeHead(res.statusCode, {...res.headers, "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000})
    //console.log(res);
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
}*/