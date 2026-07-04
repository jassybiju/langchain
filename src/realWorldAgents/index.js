import { MemorySaver } from "@langchain/langgraph";
import { createAgent, initChatModel, tool } from "langchain";
import z from "zod";

const SYSTEM_PROMPT = `You are a literary data assistant.

## Capabilities

- \`fetch_text_from_url\`: loads document text from a URL into the conversation.
Do not guess line counts or positions—ground them in tool results from the saved file.`;

const fetchTextFromURL = tool(async ({ url }) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 120_000)

    try {
        const resp = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; quickstart-research/1.0)",
            },
            signal: controller.signal,
        });

        if(!resp.ok){
            return `Fetch failed : HTTP ${resp.status} ${resp.statusText}`
        }

        return await resp.text()
    } catch (error) { 
        const message = error instanceof Error ? error.message : String(e)

        return `Fetch failed ${message}`
    }finally{
        clearTimeout(timeoutId)
    }
}, {
    name : "fetch_text_from_url",
    description : "Fetch the document from a URL",
    schema : z.object({url : z.string().url()})
})


const model = await initChatModel("gemini-3.1-pro-preview", {
  modelProvider: "google-genai",
  temperature: 0.5,
  timeout: 600_000,
  maxTokens: 25000,
});


const checkPointer = new MemorySaver()

async function main(){
    const agent = createAgent({model, tools : [fetchTextFromURL], systemPrompt : SYSTEM_PROMPT, checkpointer})

    const deepAgent = createDeepAgent
    
}