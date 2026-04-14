import {
	CellStyleModule,
	type CellValueChangedEvent,
	ClientSideRowModelModule,
	type ColDef,
	DateEditorModule,
	DateFilterModule,
	ModuleRegistry,
	NumberEditorModule,
	NumberFilterModule,
	PaginationModule,
	RowStyleModule,
	TextEditorModule,
	TextFilterModule,
	ValidationModule,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState } from 'react';
import { GRID_HEIGHT_PX, PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../constants';
import { useAgGridData } from '../hooks/useAgGridData';
import type { User } from '../models/user.model';
import { getRowStyle } from '../utils/gridUtils';
import FilterToggle from './FilterToggle';
import { userColumnDefs } from './gridColumns';

ModuleRegistry.registerModules([
	ClientSideRowModelModule,
	PaginationModule,
	TextFilterModule,
	NumberFilterModule,
	DateFilterModule,
	TextEditorModule,
	NumberEditorModule,
	DateEditorModule,
	CellStyleModule,
	RowStyleModule,
	ValidationModule,
]);

const gridContainerStyle: React.CSSProperties = {
	height: GRID_HEIGHT_PX,
	width: '100%',
};

const AgGridDemo = () => {
	const { users, isLoading, error } = useAgGridData();
	const [areFiltersVisible, setAreFiltersVisible] = useState(true);

	const defaultColDef: ColDef = useMemo(
		() => ({
			sortable: true,
			resizable: true,
			filter: true,
			floatingFilter: areFiltersVisible,
		}),
		[areFiltersVisible]
	);

	const handleCellValueChanged = useCallback(
		(event: CellValueChangedEvent<User>) => {
			console.log('Cell value changed:', {
				field: event.colDef.field,
				oldValue: event.oldValue,
				newValue: event.newValue,
				data: event.data,
			});
		},
		[]
	);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-lg text-gray-600">Loading AG Grid data...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div
				role="alert"
				className="flex items-center justify-center h-96 text-red-600"
			>
				Failed to load users: {error.message}
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<FilterToggle
				isActive={areFiltersVisible}
				onToggle={setAreFiltersVisible}
			/>
			<div className="ag-theme-quartz" style={gridContainerStyle}>
				<AgGridReact
					rowData={users}
					columnDefs={userColumnDefs}
					getRowStyle={getRowStyle}
					defaultColDef={defaultColDef}
					pagination={true}
					paginationPageSize={PAGE_SIZE}
					paginationPageSizeSelector={PAGE_SIZE_OPTIONS}
					animateRows={true}
					onCellValueChanged={handleCellValueChanged}
				/>
			</div>
		</div>
	);
};

export default AgGridDemo;
