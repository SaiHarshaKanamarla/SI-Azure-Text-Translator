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
            'from': req.body.sourcelang,
            'to': req.body.destlang
        },
        data: [{
            'text': req.body.text
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        res.status(200).send(JSON.stringify(response.data, null, 4));
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
            'text': req.body.texttotranslate
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        res.status(200).send(JSON.stringify(response.data, null, 4))
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
        res.status(200).send(JSON.stringify(response.data, null, 4))
    }).catch((err)=>{
        res.status(404).send(err);
    })
})

//Get sentence length
app.post('/api/length',(req,res)=>{
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
            'to': req.body.to,
            'includeSentenceLength': true
        },
        data: [{
            'text': req.body.text
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        res.status(200).send(JSON.stringify(response.data, null, 4))
    }).catch((err)=>{
        res.status(404).send(err);
    })
})

//Getting sentence length without translation
app.post('/api/len',(req,res)=>{
    axios({
        baseURL: endpoint,
        url: '/breaksentence',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',           
        },
        data: [{
            'text': req.body.text
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        res.status(200).send(JSON.stringify(response.data, null, 4))
    }).catch((err)=>{
        res.status(404).send(err);
    })
})

//Dictionary lookup (alternate translations)
//With the endpoint, you can get alternate translations for a word or phrase. For example, when translating the word "shark" from en to es, this endpoint returns both "tiburón" and "escualo".

app.post('/api/lookup',(req,res)=>{
    axios({
        baseURL: endpoint,
        url: '/dictionary/lookup',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',     
            'from': req.body.from, // 'en'
            'to': req.body.to //'es'
        },
        data: [{
            'text': req.body.text
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        res.status(200).send(JSON.stringify(response.data, null, 4))
    }).catch((err)=>{
        res.status(404).send(err);
    })
})

//Dictionary examples (translations in context)
app.post('/api/dictionary-examples',(req,res)=>{
    axios({
        baseURL: endpoint,
        url: '/dictionary/lookup',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',     
            'from': req.body.from, // 'en'
            'to': req.body.to //'es'
        },
        data: [{
            'text': req.body.text,
            'translation' : req.body.translation
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        res.status(200).send(JSON.stringify(response.data, null, 4))
    }).catch((err)=>{
        res.status(404).send(err);
    })
})

app.get('/*',(req,res)=>{
    res.send("Page does not exist");
})


app.listen(port);