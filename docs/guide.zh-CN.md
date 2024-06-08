# 使用指南

## 制定测试计划

### 测试计划数据结构

测试计划以 YAML 格式编写，您可以在[示例](../examples/)目录中找到一些参考。

一个测试计划包含以下数据。

#### providers

`providers` 用于描述一组需要执行测试的目标模型，本身为数组结构

- `providers.name`: 模型 API 供应商名称。Relia 会根据这一字段匹配对应的 API 客户端，对于未知的供应商，将 fallback 使用 OpenAI 兼容的客户端。
- `providers.model`: 模型名称，应与模型 API 文档中的名称保持一致。
- `providers.baseURL`: 模型 API endpoint，格式如 `https://api.openai.com/v1`。
- `providers.apiKey`: 模型 API key。安全性请参考下方对应章节。
- `providers.temperature`: 模型 API 调用时的 temperature 参数，可选。

#### suites

`suites` 用于描述一组测试用例，本身为数组结构

- `suites.messages`: 一组对话信息，采用与 OpenAI 兼容的 messages 格式。如果测试的模型不支持该格式的对话信息，则需要开发对应的模型 API 客户端。
- `suites.result`: 预期的对话结果，格式为与 OpenAI 兼容的 tool_calls 格式。
- `suites.temperature`: 用例执行时的 temperature 参数，可选。

#### tools

tools 用于描述被测试的 function/tool，本身为与 OpenAI 兼容的 tools 格式。

#### round

每个测试用例的执行轮数，类型为整数。

### 通过 UI 执行测试计划

访问 Relia 服务的 `/reports/create` 路由，在创建测试报告的表单中填写 YAML 格式的测试计划，提交后运行该计划。

### 通过 API 执行测试计划

- API endpoint: `/api/reports`
- method: `POST`
- request body: `{ yamlPlan: string }`

## API key 安全性

在测试计划中，Relia 需要填写 apiKey 字段用于访问相应的模型供应商 API。在测试的过程中，API key 信息会从浏览器发送至 Relia 服务。

首先，我们向您承诺，您在 Relia 官方网站中使用的所有代码均存放于当前开源仓库中。您可以通过审计开源代码，确保我们没有额外记录 API key 信息的行为。我们也将确保我们所使用的部署平台没有使用日志记录相关信息。

其次，您可以部署一个 API 代理服务，并将您的 API key 信息隐藏在该代理服务内部。通过将 baseURL 指向 API 代理服务地址，apiKey 留空，实现更好的 API key 安全性。

最后，您还可以自行部署 Relia 服务，使数据不离开您的掌控。
