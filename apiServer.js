require('dotenv').config()
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
const port = 3000
const chatBotBasic = require("./openAi");

app.post('/', async (req, res) => {
    try {
        console.log("request recieved : ", req.body)
        const recText = req.body.text;
        if (!recText || recText == "undefined") {
            res.send({
                success: false,
                message: "data is not correct",
                receivedPayload: req?.body
            })
            return;
        }
        const rsp = await chatBotBasic(req.body.text)
        console.log("response from gpt server : ", rsp.choices[0]);

        res.send({
            success: true,
            data: rsp.choices[0]
        })
    } catch (error) {
        console.log(error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
// chatBotBasic("hello")