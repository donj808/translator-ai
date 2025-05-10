import { Request, Response } from 'express';
import OpenAI from 'openai';

export const getTranslation = async (req: Request, res: Response) => {
    const textToTranslate = req.body.text;
    const targetLanguage = req.body.target;

    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
        console.error('OpenAI API key not found in environment variables.');
        process.exit(1);
    }

    const openai = new OpenAI({ apiKey: openaiApiKey });

    if (!textToTranslate || !targetLanguage) {
        res.status(400).send({ error: 'Please provide text to translate and the target language.' });
    }

    const prompt = `Translate the following text to ${targetLanguage} asphonetic alphanumeric representation (e.g., using Romaji for Japanese or Pinyin for Chinese) if applicable:\n\n"${textToTranslate}"`;


    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Or another suitable model
            messages: [{ role: "user", content: prompt }],
        });

        const translation = completion.choices[0]?.message?.content?.trim();
        res.send({ translation });
    } catch (error: any) {
        console.error('Error calling OpenAI for translation:', error);
        res.status(500).send({ error: 'Failed to get a translation from the AI.' });
    }
};
