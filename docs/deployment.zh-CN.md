# 部署

## 部署到 Cloudflare

如果您还没有 Cloudflare 账户，请[在这里创建](https://dash.cloudflare.com/sign-up)。

1. 进入 Cloudflare 仪表板并设置 Cloudflare Workers 子域名。
2. 运行 `yarn`
3. 运行 `cd packages/serverless`
4. 运行 `yarn deploy` – 这将创建一个新的 Page `relia-pages`，现在可以在 Cloudflare 的 _Workers and Pages_ 下看到。
5. 它现在应该已经上线。访问 `https://relia-pages.{您的子域名}.pages.dev`。
