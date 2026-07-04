import { ChatOpenRouter } from "@langchain/openrouter";
import { createAgent, SystemMessage, tool } from "langchain";
import * as z from "zod";

const getWeather = tool((input) => `It's always reiny in ${input.city}!`, {
  name: "get_weather",
  description: "Get the weather for a given city",
  schema: z.object({
    city: z.string().describe("The city to get weather for"),
  }),
});

const model =new ChatOpenRouter({
        model : 'z-ai/glm-5.2',
    temperature: 0.5,
    timeout: 600_000,
    maxTokens : 1000
})
const agent = createAgent({
    model : model,
    tools : [getWeather]
})


console.log(await agent.invoke({messages : [{role : 'user', content : "Whats the weather in san francisco"}]}))

