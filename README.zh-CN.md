# Relia

[立刻试用](https://relia.dev/)

Relia 是一个针对 LLM 的 E2E 测试框架，帮助您构建适合特定使用场景的 AI 基准测试。

它可以识别最适合您的 LLM 模型，并通过持续测试确保模型升级不会导致性能回退。

Relia 专门为 function calling（或“tool use”）场景设计，这也是代理类 AI 应用程序的核心能力。

## 文档

[使用指南](./docs/guide.zh-CN.md)

[自部署](./docs/deployment.zh-CN.md)

[如何贡献](./docs/contributing.zh-CN.md)

## 适用场景

### 选择最合适的 LLM

在模型选型阶段，基于测试结果识别最适合特定使用场景的 LLM，兼顾性能与成本。

### 优化提示词

在应用开发阶段，在相同模型上比较多组提示词的结果，理解不同提示词对结果的影响并完成优化。

### 持续测试防止回退

在应用发布之后，持续测试同一模型的不同版本，以避免模型升级带来的性能回退。

## 路线图

- [ ] 允许在测试报告中自定义 provider 标题和 suite 标题，以更好地组织和清晰展示。
- [ ] 提高大规模测试计划执行的效率和可靠性。
- [ ] 扩展支持更多的 LLM provider。
- [x] 开发用于编辑测试计划的表单 UI，使创建和管理测试更容易、更直观。
- [ ] 实现测试计划和报告的持久存储。
- [ ] 允许为不同的 suite 自定义评分，以更好地评估和比较测试用例的性能。

欢迎在 [GitHub](https://github.com/Yuyz0112/relia)、[X](https://x.com/Aryu0112) 和 [Bilibili](https://space.bilibili.com/489667127) 上关注我们的项目。
