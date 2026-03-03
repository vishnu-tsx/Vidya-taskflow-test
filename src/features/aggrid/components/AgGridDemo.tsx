import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { SetFilterModule } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import { useAgGridData } from '../hooks/useAgGridData';
import type { User } from '../models/user.model';
import { getRowStyle } from '../utils/gridUtils';
import { USER_COLUMN_DEFS } from './agGridColumnDefs';

ModuleRegistry.registerModules([AllCommunityModule, SetFilterModule]);

const GRID_CONTAINER_STYLE = { height: 550, width: '100%' };

const AgGridDemo = () => {
	const { rowData, loading, error } = useAgGridData();
	const [showFilters, setShowFilters] = useState(true);

	const defaultColDef: ColDef<User> = useMemo(
		() => ({
			sortable: true,
			resizable: true,
			filter: true,
			floatingFilter: showFilters,
		}),
		[showFilters]
	);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-lg text-gray-600">Loading AG Grid data...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-96" role="alert">
				<div className="text-lg text-red-700">{error}</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-end gap-2">
				<button
					onClick={() => setShowFilters(true)}
					type="button"
					className={`px-4 py-2 rounded-lg font-medium transition-colors ${
						showFilters
							? 'bg-blue-600 text-white'
							: 'bg-gray-300 text-gray-700 hover:bg-gray-400'
					}`}
				>
					Show Filters
				</button>
				<button
					onClick={() => setShowFilters(false)}
					type="button"
					className={`px-4 py-2 rounded-lg font-medium transition-colors ${
						!showFilters
							? 'bg-blue-600 text-white'
							: 'bg-gray-300 text-gray-700 hover:bg-gray-400'
					}`}
				>
					Remove Filters
				</button>
			</div>
			<div className="ag-theme-quartz" style={GRID_CONTAINER_STYLE}>
				<AgGridReact<User>
					rowData={rowData}
					columnDefs={USER_COLUMN_DEFS}
					getRowStyle={getRowStyle}
					defaultColDef={defaultColDef}
					pagination={true}
					paginationPageSize={10}
					paginationPageSizeSelector={[10, 20, 50]}
					animateRows={true}
				/>
			</div>
		</div>
	);
};

export default AgGridDemo;
