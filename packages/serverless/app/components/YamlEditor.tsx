import { css, cx } from 'hono/css';
import { useState } from 'hono/jsx';
import { dump, load } from 'js-yaml';

type YamlEditorProps<T> = {
	initialValue: T;
	onChange: (value: T) => void;
	rows?: number;
	cols?: number;
};

const YamlEditorStyle = css`
	&.error {
		border-color: var(--error-color);
	}
`;

function YamlEditor<T>({ initialValue, onChange, rows = 3, cols = 30 }: YamlEditorProps<T>) {
	const [value, setValue] = useState(dump(initialValue));
	const [error, setError] = useState<unknown>(null);

	const handleInputChange = (event: Event) => {
		const newValue = (event.target as HTMLTextAreaElement).value;
		setValue(newValue);

		try {
			onChange(load(newValue) as T);
			setError(null);
		} catch (err) {
			setError(err);
		}
	};

	return (
		<textarea class={cx(YamlEditorStyle, Boolean(error) && 'error')} value={value} onChange={handleInputChange} rows={rows} cols={cols} />
	);
}

export default YamlEditor;
