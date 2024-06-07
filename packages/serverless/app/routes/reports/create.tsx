import { createRoute } from 'honox/factory';
import CreateForm from '../../islands/create-form';

export default createRoute((c) => {
	return c.render(
		<div class="container">
			<CreateForm />
		</div>,
		{ title: 'Relia: crete report.' }
	);
});
