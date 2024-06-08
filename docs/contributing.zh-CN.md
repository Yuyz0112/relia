# 贡献代码

## 本地启动 Relia

1. 运行 `yarn`
2. 构建 core package
   2-1. 运行 `cd packages/core`
   2-2. 运行 `yarn build`
   2-3. 运行 `cd ../../` 返回根目录
3. 启动 Relia 服务
   3-1. 运行 `cd packages/serverless`
   3-2. 运行 `yarn dev`

如需开发修改 core package 代码，则重复步骤 2。如需开发 Relia 服务，则保持 3-2 dev server 运行的情况下修改代码即可。

## 添加模型 API 客户端

许多模型 API 都实现了与 OpenAI API 兼容，Relia 默认也会使用 OpenAI SDK 调用 API。

但如果您需要测试的模型 API，则需要实现对应的 API 客户端，将 Relia 测试计划的数据结构转换为该模型 API 需要的结构。

具体为修改 [client.ts](../packages/core/src/client.ts)，增加一个 `provider.name` case 及对应的客户端代码。
