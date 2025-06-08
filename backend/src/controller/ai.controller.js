const aiService = require('../services/ai.service');

const getprompt = async (req,res)=>{
    const prompt = req.body.code;
    if (!prompt) {
        return res.status(400).json({ error: "Code is required" });
    }
    const response = await aiService(prompt);
    console.log("Response from AI service:", response);
    res.status(200).json({response});
}

module.exports = {
    getprompt
};