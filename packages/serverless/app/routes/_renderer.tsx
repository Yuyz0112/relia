import { jsxRenderer } from 'hono/jsx-renderer';
import { Script } from 'honox/server';
import { Style, css } from 'hono/css';

export default jsxRenderer(({ children, title }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{title ? <title>{title}</title> : <></>}
				<link rel="stylesheet" href="https://unpkg.com/terminal.css@0.7.4/dist/terminal.min.css" />
				<Style>{css`
					.error-info {
						display: none;
						white-space: pre-wrap;
						margin-top: 4px;
						padding: 2px;
					}
					.error-cell {
						position: relative;
					}
					.error-cell label {
						cursor: pointer;
					}
					.error-checkbox {
						display: none;
					}
					.error-checkbox:checked + .error-info {
						display: block;
					}
					.align-right {
						text-align: right;
					}
					.bg-success {
						background-color: rgb(220 252 231);
					}
					.bg-error {
						background-color: rgb(254 226 226);
					}
					.bg-diff-add {
						background-color: rgb(248 113 113);
					}
					.bg-diff-remove {
						background-color: rgb(74 222 128);
					}
					.break-all {
						word-break: break-all;
					}
					.text-italic {
						font-style: italic;
					}
				`}</Style>
				<Script src="/app/client.ts" />
			</head>
			<body>{children}</body>
		</html>
	);
});