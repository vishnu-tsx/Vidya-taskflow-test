import type {
	ColDef,
	ICellRendererParams,
	ValueFormatterParams,
} from 'ag-grid-community';
import type { User } from '../models/user.model';
import {
	USER_THUMBNAIL_STYLE,
	getAgeCellStyle,
	getCellStyle,
	getGenderCellStyle,
} from '../utils/gridUtils';

const formatDob = (
	params: ValueFormatterParams<User, string | null | undefined>
): string => {
	if (!params.value) {
		return 'N/A';
	}

	const parsedDate = new Date(params.value);

	return Number.isNaN(parsedDate.getTime())
		? 'N/A'
		: parsedDate.toLocaleDateString();
};

const renderThumbnail = (
	params: ICellRendererParams<User, string | null | undefined>
) => {
	if (typeof params.value !== 'string' || params.value.length === 0) {
		return null;
	}

	return <img src={params.value} alt="User" style={USER_THUMBNAIL_STYLE} />;
};

export const USER_COLUMN_DEFS: ColDef<User>[] = [
	{
		field: 'name.first',
		headerName: 'First Name',
		filter: 'agTextColumnFilter',
		cellStyle: getCellStyle,
	},
	{
		field: 'name.last',
		headerName: 'Last Name',
		filter: 'agTextColumnFilter',
		cellStyle: getCellStyle,
	},
	{
		field: 'email',
		filter: 'agTextColumnFilter',
		cellStyle: getCellStyle,
		cellClass: 'font-mono text-sm',
	},
	{
		field: 'phone',
		filter: 'agTextColumnFilter',
		cellStyle: getCellStyle,
	},
	{
		field: 'dob.age',
		headerName: 'Age',
		filter: 'agNumberColumnFilter',
		cellStyle: getAgeCellStyle,
	},
	{
		field: 'dob.date',
		headerName: 'DOB',
		filter: 'agDateColumnFilter',
		valueFormatter: formatDob,
		cellStyle: getCellStyle,
	},
	{
		field: 'location.city',
		headerName: 'City',
		filter: 'agSetColumnFilter',
		cellStyle: getCellStyle,
	},
	{
		field: 'gender',
		filter: 'agSetColumnFilter',
		cellStyle: getGenderCellStyle,
	},
	{
		field: 'picture.thumbnail',
		headerName: 'Picture',
		cellRenderer: renderThumbnail,
		filter: false,
	},
];
