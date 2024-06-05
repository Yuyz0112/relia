const { runTests } = require("../dist");

runTests({
  providers: ["gpt-4o", "gpt-3.5-turbo"].map((model) => ({
    name: "openAI",
    model,
    temperature: 0.1,
    baseURL: "https://clear-robin-12.deno.dev/v1" || 'https://api.openai.com/v1',
    apiKey: process.env.OPENAI_API_KEY,
  })),
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
