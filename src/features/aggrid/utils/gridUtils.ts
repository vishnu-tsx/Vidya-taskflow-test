import type {
	CellClassParams,
	CellStyle,
	RowClassParams,
} from 'ag-grid-community';
import { COLORS, SENIOR_AGE_MIN, YOUNG_AGE_MAX } from '../constants';
import type { User } from '../models/user.model';

export const getRowStyle = (
	params: RowClassParams<User>
): { borderLeft: string } => {
	const color =
		params.data?.gender === 'female'
			? COLORS.female.border
			: COLORS.male.border;
	return { borderLeft: `3px solid ${color}` };
};

export const defaultCellStyle: CellStyle = {
	padding: '8px',
	fontSize: '14px',
	color: COLORS.cellText,
};

export const getAgeCellStyle = (params: CellClassParams<User>): CellStyle => {
	const age = params.value as number;
	if (age < YOUNG_AGE_MAX) {
		return { backgroundColor: COLORS.young.bg, color: COLORS.young.fg };
	}
	if (age > SENIOR_AGE_MIN) {
		return { backgroundColor: COLORS.senior.bg, color: COLORS.senior.fg };
	}
	return { backgroundColor: COLORS.middle.bg, color: COLORS.middle.fg };
};

export const getGenderCellStyle = (
	params: CellClassParams<User>
): CellStyle => {
	const palette = params.value === 'female' ? COLORS.female : COLORS.male;
	return {
		backgroundColor: palette.bg,
		color: palette.fg,
		fontWeight: 'bold',
	};
};
