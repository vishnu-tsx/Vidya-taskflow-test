import type {
	CellClassParams,
	CellStyle,
	RowClassParams,
	RowStyle,
} from 'ag-grid-community';
import type { CSSProperties } from 'react';
import type { User } from '../models/user.model';

const FEMALE_ROW_STYLE: RowStyle = {
	borderLeft: '3px solid var(--ag-row-female-border, #ec4899)',
};

const MALE_ROW_STYLE: RowStyle = {
	borderLeft: '3px solid var(--ag-row-male-border, #3b82f6)',
};

const BASE_CELL_STYLE: CellStyle = {
	padding: '8px',
	fontSize: '14px',
	color: 'var(--ag-cell-text, #374151)',
};

const AGE_UNDER_30_STYLE: CellStyle = {
	backgroundColor: 'var(--ag-age-under-30-bg, #e8f5e9)',
	color: 'var(--ag-age-under-30-text, #2e7d32)',
};

const AGE_OVER_60_STYLE: CellStyle = {
	backgroundColor: 'var(--ag-age-over-60-bg, #fff3e0)',
	color: 'var(--ag-age-over-60-text, #e65100)',
};

const AGE_DEFAULT_STYLE: CellStyle = {
	backgroundColor: 'var(--ag-age-default-bg, #e3f2fd)',
	color: 'var(--ag-age-default-text, #1565c0)',
};

const FEMALE_GENDER_STYLE: CellStyle = {
	backgroundColor: 'var(--ag-gender-female-bg, #fce4ec)',
	color: 'var(--ag-gender-female-text, #c2185b)',
	fontWeight: 'bold',
};

const MALE_GENDER_STYLE: CellStyle = {
	backgroundColor: 'var(--ag-gender-male-bg, #e3f2fd)',
	color: 'var(--ag-gender-male-text, #1976d2)',
	fontWeight: 'bold',
};

export const USER_THUMBNAIL_STYLE: CSSProperties = {
	width: 40,
	height: 40,
	borderRadius: '50%',
	objectFit: 'cover',
};

export const getRowStyle = (params: RowClassParams<User>): RowStyle => {
	return params.data?.gender === 'female' ? FEMALE_ROW_STYLE : MALE_ROW_STYLE;
};

export const getCellStyle = (_params: CellClassParams<User>): CellStyle => {
	return BASE_CELL_STYLE;
};

export const getAgeCellStyle = (params: CellClassParams<User>): CellStyle => {
	const age =
		typeof params.value === 'number' ? params.value : Number(params.value);

	if (Number.isNaN(age)) {
		return AGE_DEFAULT_STYLE;
	}

	if (age < 30) {
		return AGE_UNDER_30_STYLE;
	}

	if (age > 60) {
		return AGE_OVER_60_STYLE;
	}

	return AGE_DEFAULT_STYLE;
};

export const getGenderCellStyle = (
	params: CellClassParams<User>
): CellStyle => {
	return params.value === 'female' ? FEMALE_GENDER_STYLE : MALE_GENDER_STYLE;
};
