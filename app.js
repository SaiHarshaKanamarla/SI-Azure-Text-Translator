const express = require('express');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const app = express()
var cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const port = 3000;
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
    definition: {
        info: {
            title : 'Microsoft Azure Translate API - Swagger Documentation',
            version: '1.0.0',
            description: 'Playground to test your translate API\'s'
        }
    },
    apis: ['app.js']
}

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const subscriptionKey = "610d599b404846a2ab6c2ee10022da68";
const location = "eastus";
const endpoint = "https://api.cognitive.microsofttranslator.com/";

/**
 * @swagger
 * /api/translate:
 *  post:
 *      description: Post Request to translate a given text into required languages. For the inputs "from" and "to", provide the languages in encoded form. Like 'en' for english and 'de' for German. The input "text" must be given in the same language as one set in "from" key.
 *      parameters:
 *          - name: reqBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  from:
 *                    type: string
 *                  to:
 *                    type: array
 *                    items:
 *                      type: string
 *                    uniqueItems: true                 
 *                  text:   
 *                    type: string
 *              required:
 *                  - from
 *                  - to
 *                  - text
 *      responses:
 *          '200':
 *              description: A successful response
 *          '400':
 *              description: Invalid input parameters
 *          '500':
 *              description: Server Error
 */

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
            'from': req.body.from,
            'to': req.body.to
        },
        data: [{
            'text': req.body.text
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        res.status(200).send(JSON.stringify(response.data, null, 4));
    }).catch((err)=>{
        if(err.message){
            res.status(400).send("There is an issue with your input parameters. Please verify");
        }else{
            res.status(500).send("Server is not responding. Please try again later");
        }
    })
})

/**
 * @swagger
 * /api/detect:
 *  post:
 *      description: Post Request to detect the source language
 *      parameters:
 *          - name: reqBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:                
 *                  text:   
 *                    type: string
 *              required:
 *                  - text
 *      responses:
 *          '200':
 *              description: A successful response
 *          '400':
 *              description: Invalid input parameters
 *          '500':
 *              description: Server Error
 */

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
        res.status(200).send(JSON.stringify(response.data, null, 4))
        //res.send(JSON.stringify(response.data[0].language+" "+response.data[0].score, null, 4));        
    }).catch((err)=>{
        if(err.message){
            res.status(400).send("There is an issue with your input parameters. Please verify");
        }else{
            res.status(500).send("Server is not responding. Please try again later");
        }
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

/**
 * @swagger
 * /api/len:
 *  post:
 *      description: Post Request to detect the length of source language after translation
 *      parameters:
 *          - name: reqBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:                
 *                  text:   
 *                    type: string
 *              required:
 *                  - text
 *      responses:
 *          '200':
 *              description: A successful response
 *          '400':
 *              description: Invalid input parameters
 *          '500':
 *              description: Server Error
 */


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
        if(err.message){
            res.status(400).send("There is an issue with your input parameters. Please verify");
        }else{
            res.status(500).send("Server is not responding. Please try again later");
        }
    })
})

//Dictionary lookup (alternate translations)
//With the endpoint, you can get alternate translations for a word or phrase. For example, when translating the word "shark" from en to es, this endpoint returns both "tiburón" and "escualo".

/**
 * @swagger
 * /api/lookup:
 *  post:
 *      description: Post Request to fetch the dictionary meaning for a given word. For the inputs "from" and "to", provide the languages in encoded form. Like 'en' for english and 'de' for German.The input "text" must be given in the same language as one set in "from" key.
 *      parameters:
 *          - name: reqBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  from:
 *                    type: string
 *                  to:
 *                    type: array
 *                    items:
 *                      type: string
 *                    uniqueItems: true                 
 *                  text:   
 *                    type: string
 *              required:
 *                  - from
 *                  - to
 *                  - text
 *      responses:
 *          '200':
 *              description: A successful response
 *          '400':
 *              description: Invalid input parameters
 *          '500':
 *              description: Server Error
 */

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
        if(err.message){
            res.status(400).send("There is an issue with your input parameters. Please verify");
        }else{
            res.status(500).send("Server is not responding. Please try again later");
        }
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

app.get('*',(req,res)=>{
    res.send("Page does not exist");
})


app.listen(port);