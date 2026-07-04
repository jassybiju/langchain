import { initChatModel } from "langchain";

const model = await initChatModel("gemini-2.5-flash-lite", {
  modelProvider: "google-genai",
  temperature: 0.5,
  timeout: 600_000,
  maxTokens: 100,
});


const stream = await model.stream('Why do parrots have colorufl feather?')

for await (const chunk of stream){
    console.log(chunk.text)
}

// console.log(stream.values)