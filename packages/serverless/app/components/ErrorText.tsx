import * as Diff from 'diff';
import { css, cx } from 'hono/css';

const errorBtn = css`
	margin-left: 0.25rem;
	padding: 0.125rem;
`;

type Props = {
	labelFor: string;
	error?: any;
};

export default function ErrorText({ error, labelFor }: Props) {
	if (!error) {
		return <></>;
	}

	const { actual, expected, code, operator } = error;

	let errorDetail = <></>;
	if (code !== 'ERR_ASSERTION' || !['deepStrictEqual', 'deepEqual'].includes(operator)) {
		errorDetail = <pre class="error-info">{JSON.stringify(error, null, 2)}</pre>;
	} else {
		const diff = Diff.diffChars(JSON.stringify(actual, null, 2), JSON.stringify(expected, null, 2));
		errorDetail = (
			<pre class="error-info">
				{diff.map((item) => {
					if (item.added) {
						return <span class="bg-diff-add">{item.value}</span>;
					}
					if (item.removed) {
						return <span class="bg-diff-remove">{item.value}</span>;
					}
					return <span>{item.value}</span>;
				})}
			</pre>
		);
	}

	return (
		<>
			<label for={labelFor} class={cx('btn btn-error btn-ghost', errorBtn)}>
				Show Error
			</label>
			<input type="checkbox" id={labelFor} class="error-checkbox" />
			{errorDetail}
		</>
	);
}
