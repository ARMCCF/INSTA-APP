require('dotenv').config()
const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
let corsOptions = { 
    origin : ['http://localhost:3000'], 
 } 
   
 app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());    
    next();
});

app.get('/posts', (req, res) => {
    const token = process.env.INSTA_TOKEN;
    const fields = "media_url,media_type,permalink";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}`;

    fetch(url)
     .then(res => res.json())
     .then(json =>res.json(json.data))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})