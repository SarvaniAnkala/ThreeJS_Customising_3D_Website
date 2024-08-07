import express from 'express'
import * as dotenv from 'dotenv'
import Configuration from 'openai'
import  OpenAIApi from 'openai'

dotenv.config()
 
const router = express.Router()

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

router.route('/').get((req,res) => {
    res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
    try {

        const { prompt } = req.body;
        console.log('Prompt received:', prompt);

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        })

        console.log('Response from OpenAI:', response.data);

        const image = response.data.data[0].b64_json

        res.status(200).json({ photo: image })
    } 
    catch (error) {
        console.error('Error creating image:',error)
        res.status(500).json({ message: "Something went wrong", error: error.message})
    }
})

export default router