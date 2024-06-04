import OpenAI from "openai";
import { Provider } from "./types";

export const createClient = (provider: Provider) => {
  switch (provider.name) {
    case "openAI":
    case "fireworks":
    case "groq":
    case "anthropic":
    default:
      return new OpenAI({
        baseURL: provider.baseURL,
        apiKey: provider.apiKey,
      });
  }
};
