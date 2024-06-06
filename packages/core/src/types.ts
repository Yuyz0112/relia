import type OpenAI from "openai";

export type TestPlan = {
  providers: Provider[];
  suites: Suite[];
  tools: Tool[];
  round?: number;
  concurrency?: number;
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
  // suite-level temperature
  temperature?: number;
  result: {
    name: string;
    arguments: unknown;
  };
};

export type Tool = OpenAI.ChatCompletionTool;

export type Reporter = {
  mode: "json" | "diff";
};

interface IMessage<T> {
  type: string;
  data: T;
  meta?: Record<string, unknown>;
}

export interface INewTestMessage extends IMessage<INewTestMessageInput> {
  type: "TEST_START";
}

export interface ITestEndMessage extends IMessage<ITestEndMessageInput> {
  type: "TEST_END";
}

export type TestMessage = ITestEndMessage | INewTestMessage;

interface INewTestMessageInput {
  description: string;
}

interface ITestEndMessageInput {
  description: string;
  executionTime: number;
  pass: boolean;
  error?: unknown;
}

export type TestOpts = Partial<{
  timeout: number;
  reporter?: (message: TestMessage) => void;
  meta?: IMessage<unknown>["meta"];
}>;
