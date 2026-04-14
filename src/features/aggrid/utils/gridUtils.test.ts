import type { CellClassParams, RowClassParams } from 'ag-grid-community';
import { describe, expect, it } from 'vitest';
import { COLORS } from '../constants';
import type { User } from '../models/user.model';
import { getAgeCellStyle, getGenderCellStyle, getRowStyle } from './gridUtils';

const makeCellParams = (value: unknown): CellClassParams<User> =>
	({ value }) as CellClassParams<User>;

describe('gridUtils', () => {
	it('colors young ages green', () => {
		const style = getAgeCellStyle(makeCellParams(25));
		expect(style).toMatchObject({ backgroundColor: COLORS.young.bg });
	});

	it('colors senior ages orange', () => {
		const style = getAgeCellStyle(makeCellParams(70));
		expect(style).toMatchObject({ backgroundColor: COLORS.senior.bg });
	});

	it('colors middle ages blue', () => {
		const style = getAgeCellStyle(makeCellParams(45));
		expect(style).toMatchObject({ backgroundColor: COLORS.middle.bg });
	});

	it('renders female cells with pink palette and bold weight', () => {
		const style = getGenderCellStyle(makeCellParams('female'));
		expect(style).toMatchObject({
			backgroundColor: COLORS.female.bg,
			fontWeight: 'bold',
		});
	});

	it('uses gender-specific row border colors', () => {
		const femaleRow = getRowStyle({
			data: { gender: 'female' },
		} as RowClassParams<User>);
		const maleRow = getRowStyle({
			data: { gender: 'male' },
		} as RowClassParams<User>);
		expect(femaleRow.borderLeft).toContain(COLORS.female.border);
		expect(maleRow.borderLeft).toContain(COLORS.male.border);
	});
});
