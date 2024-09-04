import { createOpenAI } from "@ai-sdk/openai";
import { HfInference } from '@huggingface/inference';
import { convertToCoreMessages, generateText, streamText } from "ai";
// import dotenv from "dotenv";
import { GoogleGenerativeAI  } from "@google/generative-ai";

// dotenv.config();

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

// // import { NextRequest, NextResponse } from 'next/server';
// // import { Configuration, OpenAIApi } from 'openai';

// // export async function POST(req: NextRequest) {
// //   // Parse the request body
// //   const reqBody = await req.json();
// //   const prompt = reqBody.data.prompt;

// //   // Create an instance of the OpenAI client
// //   const configuration = new Configuration({
// //     apiKey: process.env.OPENAI_API_KEY,
// //   });
// //   const openai = new OpenAIApi(configuration);

// //   // Generate text using the OpenAI model
// //   const completion = await openai.createCompletion({
// //     model: "text-davinci-003", // or any other OpenAI model you want to use
// //     prompt: prompt,
// //     max_tokens: 150, // adjust as needed
// //   });

// //   // Extract the generated text from the response
// //   const text = completion.data.choices[0]?.text || '';

// //   // Return a response with the generated text
// //   return new NextResponse(text, {
// //     headers: { 'Content-Type': 'text/plain' },
// //   });
// // }

// // export async function POST(req: Request) {
// //   const reqBody = await req.json();
// //   const prompt = reqBody.data.prompt;
// //   // Parse the request body
// //   const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

// //   const inference = new HfInference(HF_ACCESS_TOKEN);

// //   const model = "meta-llama/Meta-Llama-3.1-405B-Instruct";

// //   const result = await inference.chatCompletion({
// //     data: prompt,
// //     model: model,
// //   })

// //   return result.generated_text;
// // }

// import { NextRequest, NextResponse } from 'next/server';
// import OpenAI from 'openai';

// // Create an instance of the OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
//  // Optional: Set your project ID if necessary
// });

// export async function POST(req: NextRequest) {
//   try {
//     // Parse the request body
//     const reqBody = await req.json();
//     const prompt = reqBody.data.prompt;

//     // Generate text using the OpenAI model
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini", // specify the model you want to use
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7, // you can adjust the temperature as needed
//     });

//     // Extract the generated text from the response
//     const text = completion.choices[0]?.message?.content || '';

//     // Return a response with the generated text
//     return new NextResponse(text, {
//       headers: { 'Content-Type': 'text/plain' },
//     });

//   } catch (error) {
//     console.error("Error generating text:", error);
//     return new NextResponse("Error generating text", { status: 500 });
//   }
// }