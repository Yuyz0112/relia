import type OpenAI from "openai";

export type TestPlan = {
  providers: Provider[];
  suites: Suite[];
  tools: Tool[];
  round: number;
  reporter?: Reporter;
};

export type Provider = {
  name: string;
  model: string;
  apiKey: string;
  baseURL: string;
  temperature?: number;
};

export type Suite = OpenAICompatibleSuite;

export type OpenAICompatibleSuite = {
  messages: OpenAI.ChatCompletionMessageParam[];
  result: {
    name: string;
    arguments: unknown;
  };
};

export type Tool = OpenAI.ChatCompletionTool;

export type Reporter = {
  mode: "json" | "diff";
};
