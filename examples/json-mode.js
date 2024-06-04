const { runTests } = require("../dist");

runTests({
  providers: ["gpt-4o", "gpt-3.5-turbo"].map((model) => ({
    name: "openAI",
    model,
    temperature: 0.1,
    baseURL: 'https://api.openai.com/v1',
    apiKey: process.env.OPENAI_API_KEY,
  })),
  suites: [
    {
      "messages": [
        {
          "role": "assistant",
          "content": "Hello, please tell me the city and state you are in to get the weather.",
        },
        {
          "role": "user",
          "content": "I am in Los Angeles."
        },
      ],
      "result": {
        "name": "get_the_weather",
        "arguments": {
          "city": "Los Angeles",
          "state": "CA",
        },
      },
    },
    {
      "messages": [
        {
          "role": "assistant",
          "content": "Please provide the city and state you are in to get the weather.",
        },
        {
          "role": "user",
          "content": "I am in NYC.",
        },
      ],
      "result": {
        "name": "get_the_weather",
        "arguments": {
          "city": "New York",
          "state": "NY",
        },
      },
    }
  ],
  tools: [
    {
      "type": "function",
      "function": {
        "name": "get_the_weather",
        "description": "Get the weather",
        "parameters": {
          "type": "object",
          "properties": {
            "city": {
              "type": "string",
              "description": "The city to get the weather for"
            },
            "state": {
              "type": "string",
              "description": "The state to get the weather for, in the style of CA/NY"
            }
          },
          "required": [
            "city",
            "state"
          ]
        }
      }
    }
  ],
  round: 2,
  reporter: {
    mode: "diff",
  },
}).then(results => {
  // handle JSON results
  console.log(results)
});
