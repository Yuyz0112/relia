import { createRoute } from 'honox/factory';

export default createRoute(async (c) => {
	return c.render(
		<div class="container">
			<h1>Relia Test Report</h1>
		</div>,
		{
			title: 'Relia!',
		}
	);
});
