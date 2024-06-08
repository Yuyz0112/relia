# Contributing Code

## Running Relia Locally

1. Run `yarn`
2. Build the core package
   2-1. Run `cd packages/core`
   2-2. Run `yarn build`
   2-3. Run `cd ../../` to return to the root directory
3. Start the Relia service
   3-1. Run `cd packages/serverless`
   3-2. Run `yarn dev`

To develop and modify the core package code, repeat step 2. To develop the Relia service, keep the dev server from step 3-2 running while modifying the code.

## Adding a Model API Client

Many model APIs are compatible with the OpenAI API, and Relia will use the OpenAI SDK to call these APIs by default.

However, if you need to test a model API that requires a different structure, you need to implement a corresponding API client to convert the Relia test plan data structure to the required format for that model API.

Specifically, modify [client.ts](../packages/core/src/client.ts) to add a new `provider.name` case and the corresponding client code.
