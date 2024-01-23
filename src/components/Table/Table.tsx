import styled from 'styled-components';
import React from 'react';
import useParseDate from '@src/hooks/useParseDate';
import { ScaleLoader } from 'react-spinners';

type TableProps = {
	resource: any;
	columns: {
		name: string;
		label: string;
		render?: (resource: any) => JSX.Element;
	}[];
	handleAddEdit: (resource: any) => void;
};

const Table = ({ resource, columns, handleAddEdit }: TableProps) => {
	const { parseDate } = useParseDate();

	return (
		<StyledTable>
			{!resource ? (
				<span
					className="d-flex flex-column justify-content-center align-items-center w-100"
					style={{ height: '200px' }}
				>
					<ScaleLoader color="rgb(16, 37, 38)" className="mb-4" />
					Loading data...
				</span>
			) : (
				<>
					<thead>
						<tr>
							{columns.map(column => (
								<th key={column.name}>{column.label}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{resource
							?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
							.map((resource: any, index: number) => (
								<tr key={index} onClick={() => handleAddEdit(resource)}>
									{columns.map(column => {
										if (column.render) {
											return <td key={column.name}>{column.render(resource)}</td>;
										}
										if (
											column.name === 'created_at' ||
											column.name === 'updated_at' ||
											column.name === 'meetingExpiryTime'
										) {
											return (
												<td key={column.name}>
													{resource[column.name] ? parseDate(resource[column.name]) : '-'}
												</td>
											);
										} else {
											return (
												<td key={column.name}>
													{resource[column.name] === '' ? '-' : resource[column.name]}
												</td>
											);
										}
									})}
								</tr>
							))}
					</tbody>
				</>
			)}
		</StyledTable>
	);
};

export default Table;

const StyledTable = styled.table`
	table-layout: fixed;
	font-size: 12px;
	border-collapse: collapse;
	border-spacing: 0;
	border: none;
	min-width: 100%;
	tr {
		border-bottom: 1px #dbdbdb solid;
	}
	tbody {
		tr {
			transition: background 0.2s;
			&:hover {
				background-color: rgb(232, 237, 235);
			}
		}
	}
	tbody {
		background: #fff;
		td.sticky {
			position: sticky;
			left: 0;
			top: 0;
			z-index: 2;
			background: inherit;
		}
		tr {
			&:hover {
				cursor: pointer;
			}
		}
	}
	td,
	th {
		padding: 6px 12px;
		vertical-align: middle;
	}
	th {
		padding-top: 15px;
		padding-bottom: 15px;
		/* text-transform: uppercase;
		font-weight: 500;
		font-size: 12px; */
		background: none;
		a {
			color: #1f1f1f;
			text-decoration: none;
		}
		.list-heading-label-caret {
			display: none;
		}
		&.sort-active {
			.list-heading-label-caret {
				display: inline;
				transition: transform 0.2s;
			}
		}
		a:hover {
			color: #000;
			text-decoration: underline;
		}
		&.not-sortable {
			a {
				pointer-events: none;
			}
		}
		&.sort-active a {
			color: var(--color-purple);
			text-decoration: underline;
		}
		&.sort-active.sort-dir-desc .list-heading-label-caret {
			transform: rotate(-180deg);
		}
	}
	thead {
		border-bottom: 1px solid var(--color-border);
		background: none;
	}
`;
