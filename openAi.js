const OpenAI = require("openai");
const apiKey = process.env.OPENAI_API;
console.log(apiKey);
const openai = new OpenAI({ apiKey })
    ;
async function main(text) {
    console.log("recieved text is : ", text);
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: text }],
        model: "gpt-4o-mini",
    });

    console.log(completion.choices[0]);
    return completion;
}
// main();

module.exports = main