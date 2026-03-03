import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement } from 'react';

export const renderComponent = (
	component: ReactElement,
	options?: RenderOptions
) => {
	return render(component, options);
};

export const checkGridLoaded = (gridElement: HTMLElement): boolean => {
	const rowCount = gridElement.getAttribute('aria-rowcount');
	if (rowCount !== null) {
		const parsedRowCount = Number(rowCount);
		if (!Number.isNaN(parsedRowCount)) {
			return parsedRowCount > 1;
		}
	}

	return gridElement.querySelectorAll('[role="row"][aria-rowindex]').length > 1;
};

export const checkColumnCount = (
	gridElement: HTMLElement,
	expectedCount: number
): boolean => {
	const columnCount = gridElement.getAttribute('aria-colcount');
	if (columnCount === null) {
		return false;
	}

	const parsedColumnCount = Number(columnCount);
	if (Number.isNaN(parsedColumnCount)) {
		return false;
	}

	return parsedColumnCount === expectedCount;
};

export const checkFiltersEnabled = (gridElement: HTMLElement): boolean => {
	return (
		gridElement.querySelectorAll('input[aria-label$="Filter Input"]').length > 0
	);
};
