const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Open AI Configuration
const configuration = new Configuration({
    organization: "",
    apiKey: "",
});
const openai = new OpenAIApi(configuration);

// Express Configuration
const app = express()
const port = 3080

app.use(bodyParser.json())
app.use(cors())
app.use(require('morgan')('dev'))


// Routing 

app.post('/', async (req, res) => {
	const { message, currentModel, temperature } = req.body;
	const response = await openai.createCompletion({
		model: `${currentModel}`,// "text-davinci-003",
		prompt: `${message}`,
		max_tokens: 100, 
		temperature,
	  });
	res.json({
		message: response.data.choices[0].text,
	})
});

// Primary Open AI Route
// app.post('/', async (req, res) => {
// 	const { message, currentModel, temperature } = req.body;
// 	const response = await openai.createCompletion({
// 		model: `${currentModel}`,// "text-davinci-003",
// 		prompt: `I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. 
// 		AI Tour Guide: Hello, how can I help you today?
// 		You: "${message}`,
// 		max_tokens: 100, 
// 		temperature,
// 	  });
// 	res.json({
// 		message: response.data.choices[0].text,
// 	})
// });

// Get Models Route
app.get('/models', async (req, res) => {
	const response = await openai.listEngines();
	res.json({
		models: response.data
	})
});

// Start the server
app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
});