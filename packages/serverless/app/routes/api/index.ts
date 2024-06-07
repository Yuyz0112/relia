import { Hono } from 'hono';
import { load } from 'js-yaml';
import * as core from '@relia/core';

const app = new Hono();

app.post('/reports', async (c) => {
	const b = await c.req.json<{ yamlPlan: string }>();
	const plan = load(b.yamlPlan);
	// FIXME: remove hack
	const messages = await (core as any).default.runTests(plan);

	return c.json(messages);
});

export default app;
