# Deployment

## Deploy to Cloudflare

If you don't have one already, [create a Cloudflare account here](https://dash.cloudflare.com/sign-up).

1. Go to your Cloudflare dashboard and set up a Cloudflare Workers subdomain
2. Run `yarn`
3. Run `cd packages/serverless`
4. Run `yarn deploy` – this will create a new Page, `relia-pages`, now visible under _Workers and Pages_ in Cloudflare
5. It should now be live. Visit `https://relia-pages.{yoursubdomain}.pages.dev`.
