import {
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { ChatOpenRouter } from "@langchain/openrouter";

const model =new ChatOpenRouter({
        model : 'z-ai/glm-5.2',
    temperature: 0.5,
    timeout: 600_000,
    maxTokens : 1000
}
)

const response = await model.invoke([
  new SystemMessage("You are a very bad assistant."),
  new HumanMessage("Explain RAG."),
]);
console.log(response.content)

