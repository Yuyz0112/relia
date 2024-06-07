// app/routes/about/index.ts
import { Hono } from 'hono';

const app = new Hono();

// matches `/about/:name`
app.get('/:name', (c) => {
	const name = c.req.param('name');
	return c.json({
		'your name is': name,
	});
});

export default app;
