import { ChatOpenRouter } from "@langchain/openrouter";
import { initChatModel } from "langchain";

const model =new ChatOpenRouter({
        model : 'z-ai/glm-5.2',
    temperature: 0.5,
    timeout: 600_000,
    maxTokens : 1000
}
)

const response = await model.invoke('What is langchain?')
console.log(response.content)