const express = require('express');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const app = express()

const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const subscriptionKey = "610d599b404846a2ab6c2ee10022da68";
const location = "eastus";
const endpoint = "https://api.cognitive.microsofttranslator.com/";

app.post('/api/translate',(req,res)=>{
    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': 'en',
            'to': req.body.to
        },
        data: [{
            'text': req.body.text
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        res.send(JSON.stringify(response.data, null, 4));
    }).catch((err)=>{
        res.status(404).send(err);
    })
})


// Detecting Source Language without translation
app.post('/api/detect',(req,res)=>{
    axios({
        baseURL: endpoint,
        url: '/detect',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0'
        },
        data: [{
            'text': req.body.text
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        res.send(JSON.stringify(response.data, null, 4))
        //res.send(JSON.stringify(response.data[0].language+" "+response.data[0].score, null, 4));        
    }).catch((err)=>{
        res.status(404).send(err);
    })
})

//Transliterate without translation
app.post('/api/transliterate',(req,res)=>{
    axios({
        baseURL: endpoint,
        url: '/transliterate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'language': req.body.language,
            'fromScript': req.body.fromScript,
            'toScript': req.body.toScript
        },
        data: [{
            'text': req.body.text
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        res.send(JSON.stringify(response.data, null, 4))
    }).catch((err)=>{
        res.status(404).send(err);
    })
})


app.listen(port);