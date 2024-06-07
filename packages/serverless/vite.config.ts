import pages from '@hono/vite-cloudflare-pages';
import adapter from '@hono/vite-dev-server/cloudflare';
import honox from 'honox/vite';
import client from 'honox/vite/client';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig(({ mode }) => {
	if (mode === 'client') {
		return {
			define: {
				exports: {},
			},
			plugins: [commonjs(), client()],
		};
	} else {
		return {
			ssr: {
				external: ['openai'],
			},
			define: {
				exports: {},
			},
			plugins: [
				commonjs(),
				honox({
					devServer: {
						adapter,
					},
				}),
				pages(),
			],
		};
	}
});
