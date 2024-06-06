import { NotFoundHandler } from 'hono';

const handler: NotFoundHandler = (c) => {
	return c.render(
		<div class="container">
			<h1 class="terminal-prompt">Sorry, Not Found...</h1>
		</div>
	);
};

export default handler;
