import styled from 'styled-components';
import React from 'react';
import useParseDate from '@src/hooks/useParseDate';
import { ScaleLoader } from 'react-spinners';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

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
	const [sortColumn, setSortColumn] = React.useState<string>('created_at');
	const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

	const sortByColumn = (column: string) => {
		if (sortColumn === column) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortDirection('asc');
		}
	};

	const handleSort = (a: any, b: any) => {
		// compare the first character of the string
		const compare = (a: any, b: any) => {
			if (a[sortColumn] < b[sortColumn]) {
				return -1;
			}
			if (a[sortColumn] > b[sortColumn]) {
				return 1;
			}
			return 0;
		};

		if (sortDirection === 'asc') {
			return compare(a, b);
		} else {
			return compare(b, a);
		}
	};

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
								<th onClick={() => sortByColumn(column.name)} key={column.name}>
									<div className={`d-flex align-items-center gap-1`}>
										<span style={{ cursor: 'pointer' }}>{column.label}</span>
										{sortColumn === column.name && (
											<span>
												{sortDirection === 'asc' ? (
													<IoChevronUpOutline size={18} />
												) : (
													<IoChevronDownOutline size={18} />
												)}
											</span>
										)}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{resource.length === 0 && (
							<tr>
								<td colSpan={columns.length} className="text-center">
									No data found
								</td>
							</tr>
						)}
						{resource?.sort(handleSort).map((resource: any, index: number) => (
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
