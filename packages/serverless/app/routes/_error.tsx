// app/routes/_error.tsx
import { ErrorHandler } from 'hono';

const handler: ErrorHandler = (e, c) => {
	return c.render(
		<div class="container">
			<h1 class="terminal-prompt">Error! {e.message}</h1>
		</div>
	);
};

export default handler;
