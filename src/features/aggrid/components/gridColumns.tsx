import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { THUMBNAIL_SIZE_PX } from '../constants';
import type { User } from '../models/user.model';
import {
	defaultCellStyle,
	getAgeCellStyle,
	getGenderCellStyle,
} from '../utils/gridUtils';

const thumbnailStyle: React.CSSProperties = {
	width: THUMBNAIL_SIZE_PX,
	height: THUMBNAIL_SIZE_PX,
	borderRadius: '50%',
	objectFit: 'cover',
};

const PictureCell = (params: ICellRendererParams<User, string>) => {
	if (!params.value) return null;
	return <img src={params.value} alt="User" style={thumbnailStyle} />;
};

export const userColumnDefs: ColDef<User>[] = [
	{
		field: 'name.first',
		headerName: 'First Name',
		filter: 'agTextColumnFilter',
		cellStyle: defaultCellStyle,
		editable: true,
	},
	{
		field: 'name.last',
		headerName: 'Last Name',
		filter: 'agTextColumnFilter',
		cellStyle: defaultCellStyle,
		editable: true,
	},
	{
		field: 'email',
		filter: 'agTextColumnFilter',
		cellStyle: defaultCellStyle,
		cellClass: 'font-mono text-sm',
		editable: true,
	},
	{
		field: 'phone',
		filter: 'agTextColumnFilter',
		cellStyle: defaultCellStyle,
		editable: true,
	},
	{
		field: 'dob.age',
		headerName: 'Age',
		filter: 'agNumberColumnFilter',
		cellStyle: getAgeCellStyle,
		editable: true,
	},
	{
		field: 'dob.date',
		headerName: 'DOB',
		filter: 'agDateColumnFilter',
		valueFormatter: (params) =>
			params.value ? new Date(params.value).toLocaleDateString() : '',
		cellStyle: defaultCellStyle,
		editable: true,
	},
	{
		field: 'location.city',
		headerName: 'City',
		filter: 'agTextColumnFilter',
		cellStyle: defaultCellStyle,
		editable: true,
	},
	{
		field: 'gender',
		filter: 'agTextColumnFilter',
		cellStyle: getGenderCellStyle,
		editable: true,
	},
	{
		field: 'picture.thumbnail',
		headerName: 'Picture',
		cellRenderer: PictureCell,
		filter: false,
		editable: false,
	},
];
