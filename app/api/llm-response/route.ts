import { createOpenAI } from "@ai-sdk/openai";
import { HfInference } from '@huggingface/inference';
import { convertToCoreMessages, generateText, streamText } from "ai";
import dotenv from "dotenv";
import { GoogleGenerativeAI  } from "@google/generative-ai";

dotenv.config();

export async function POST(req: Request) {
  // Parse the request body
  const reqBody = await req.json();
  const prompt = reqBody.data.prompt;

  // Create an instance of the OpenAI client
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  // const openai = createOpenAI({
  //   baseURL: "https://api.groq.com/openai/v1/",
  //   apiKey: process.env.GEMINI_API_KEY
  // });

  // Generate text using the OpenAI model
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Extract the text from the result object
  // Return a response with the generated text
  return new Response(text, {
    headers: { 'Content-Type': 'text/plain' },
  });
}

// export async function POST(req: Request) {
//   const reqBody = await req.json();
//   const prompt = reqBody.data.prompt;
//   // Parse the request body
//   const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

//   const inference = new HfInference(HF_ACCESS_TOKEN);

//   const model = "meta-llama/Meta-Llama-3.1-405B-Instruct";

//   const result = await inference.chatCompletion({
//     data: prompt,
//     model: model,
//   })

//   return result.generated_text;
// }
