import { css, cx } from 'hono/css';
import ReportTable, { Props as ReportTableProps } from '../components/ReportTable';
import { useState } from 'hono/jsx';

const wrapper = css`
	/* max-height: 300px;
	overflow-y: auto; */

	.btn-group .btn:not(:first-child) {
		margin-left: -1px;
	}
`;

export type Props = {
	plan: string;
	reportId?: ReportTableProps['reportId'];
	messages: ReportTableProps['messages'];
};

export default function UseCase({ messages, plan, reportId }: Props) {
	const [tabIndex, setTabIndex] = useState(0);

	return (
		<div class={wrapper}>
			<div class="btn-group">
				<button class={cx('btn btn-primary', tabIndex !== 0 && 'btn-ghost')} onClick={() => setTabIndex(0)}>
					Test Result
				</button>
				<button class={cx('btn btn-primary', tabIndex !== 1 && 'btn-ghost')} onClick={() => setTabIndex(1)}>
					Test Plan
				</button>
			</div>
			{tabIndex === 0 && <ReportTable messages={messages} reportId={reportId} />}
			{tabIndex === 1 && <pre dangerouslySetInnerHTML={{ __html: plan }} />}
		</div>
	);
}
