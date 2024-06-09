# User Guide

## Creating a Test Plan

### Test Plan Data Structure

The test plan is written in YAML format. You can find some references in the [examples](../examples/) directory.

A test plan includes the following data:

#### Providers

The `providers` section describes a set of target models to be tested and is an array structure.

- `providers.name`: The name of the model API provider. Relia will match the corresponding API client based on this field. For unknown providers, it will fall back to using an OpenAI-compatible client.
- `providers.model`: The model name, which should match the name in the model API documentation.
- `providers.baseURL`: The model API endpoint, in the format `https://api.openai.com/v1`.
- `providers.apiKey`: The model API key. For security, refer to the corresponding section below.
- `providers.temperature`: The temperature parameter for the model API call (optional).

#### Suites

The `suites` section describes a set of test cases and is an array structure.

- `suites.messages`: A set of conversation messages in the OpenAI-compatible messages format. If the model being tested does not support this format, you need to develop a corresponding model API client.
- `suites.result`: The expected conversation result, in the OpenAI-compatible tool_calls format.
- `suites.temperature`: The temperature parameter for executing the test case (optional).

#### Tools

The `tools` section describes the functions/tools being tested, in an OpenAI-compatible tools format.

#### Round

The number of execution rounds for each test case, an integer type.

### Running the Test Plan via UI

Visit the Relia service at the `/reports/create` route. Fill in the YAML format test plan in the create test report form and submit to run the plan.

### Running the Test Plan via API

To be update.

## API Key Security

In the test plan, Relia requires the `apiKey` field to access the corresponding model provider API. During testing, the API key information will be sent from the browser to the Relia service.

Firstly, we assure you that all the code you use on the Relia official website is stored in the current open-source repository. You can audit the open-source code to ensure we do not have any behavior that records API key information. We will also ensure that our deployment platform does not log related information.

Secondly, you can deploy an API proxy service and hide your API key information within that proxy service. By pointing `baseURL` to the API proxy service address and leaving `apiKey` blank, you can achieve better API key security.

Lastly, you can deploy the Relia service yourself, keeping all data under your control.
