const { runTests } = require("../dist");

runTests({
  providers: [
    {
      name: "openAI",
      model: 'gpt-3.5-turbo',
      temperature: 0.1,
      baseURL: 'https://api.openai.com/v1',
      apiKey: process.env.OPENAI_API_KEY,
    },
    {
      name: "fireworks",
      model: 'accounts/fireworks/models/firefunction-v1',
      temperature: 0.1,
      baseURL: 'https://api.fireworks.ai/inference/v1',
      apiKey: process.env.FIREWORKS_API_KEY,
    },
    {
      name: 'groq',
      model: 'llama3-70b-8192',
      temperature: 0.1,
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY
    }
  ],
  suites: [
    {
      messages: [
        {
          role: "assistant",
          content: "Hello, please provide the stock symbol to get the price.",
        },
        {
          role: "user",
          content: "I want to know the price of Apple.",
        },
      ],
      result: {
        name: "get_stock_price",
        arguments: {
          symbol: "AAPL",
        },
      },
    },
    {
      messages: [
        {
          role: "assistant",
          content: "Please provide the stock symbol to get the price.",
        },
        {
          role: "user",
          content: "Can you get me the price of Tesla?",
        },
      ],
      result: {
        name: "get_stock_price",
        arguments: {
          symbol: "TSLA",
        },
      },
    },
  ],
  tools: [
    {
      type: "function",
      function: {
        name: "get_stock_price",
        description: "Get a stock price",
        parameters: {
          type: "object",
          properties: {
            symbol: {
              type: "string",
              description: "The stock symbol to get the price for",
            },
          },
          required: ["symbol"],
        },
      },
    },
  ],
  round: 2,
});
