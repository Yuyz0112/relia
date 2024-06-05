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

interface IMessage<T> {
  type: string;
  data: T;
}

interface INewTestMessage extends IMessage<INewTestMessageInput> {
  type: "TEST_START";
}

interface ITestEndMessage extends IMessage<ITestEndMessageInput> {
  type: "TEST_END";
}

interface IErrorMessage extends IMessage<{ error: unknown }> {
  type: "ERROR";
}

export type TestMessage = IErrorMessage | ITestEndMessage | INewTestMessage;

interface INewTestMessageInput {
  description: string;
}

interface ITestEndMessageInput {
  description: string;
  executionTime: number;
  pass: boolean;
}

export type TestOpts = Partial<{
  timeout: number;
  reporter?: (message: TestMessage) => void;
}>;
