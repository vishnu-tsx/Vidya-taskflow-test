const AG_ROW_SELECTOR = '.ag-row';
const AG_FLOATING_FILTER_SELECTOR = '.ag-floating-filter';
const AG_COL_COUNT_ATTR = 'aria-colcount';

export const getGridElement = (gridElements: HTMLElement[]): HTMLElement => {
	const grid = gridElements[0];
	if (!grid) throw new Error('No grid element found');
	return grid;
};

export const getRenderedRowCount = (gridElement: HTMLElement): number =>
	gridElement.querySelectorAll(AG_ROW_SELECTOR).length;

export const getAriaColumnCount = (gridElement: HTMLElement): number =>
	Number(gridElement.getAttribute(AG_COL_COUNT_ATTR));

export const hasFloatingFilters = (gridElement: HTMLElement): boolean =>
	gridElement.querySelectorAll(AG_FLOATING_FILTER_SELECTOR).length > 0;
