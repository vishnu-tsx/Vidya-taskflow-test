import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockUsers } from '../testFixtures';
import {
	getAriaColumnCount,
	getGridElement,
	getRenderedRowCount,
	hasFloatingFilters,
} from '../testUtils';
import AgGridDemo from './AgGridDemo';

const fetchUsersMock = vi.fn();

vi.mock('../services/apiService', () => ({
	fetchUsers: (...args: unknown[]) => fetchUsersMock(...args),
}));

const renderGrid = async () => {
	render(<AgGridDemo />);
	const grid = getGridElement(await screen.findAllByRole('grid'));
	await waitFor(() => expect(getRenderedRowCount(grid)).toBeGreaterThan(0));
	return grid;
};

describe('AgGridDemo', () => {
	beforeEach(() => {
		fetchUsersMock.mockReset();
		fetchUsersMock.mockResolvedValue(mockUsers);
	});

	it('shows loading state initially', () => {
		fetchUsersMock.mockReturnValue(new Promise(() => {}));
		render(<AgGridDemo />);
		expect(screen.getByText(/loading ag grid data/i)).toBeInTheDocument();
	});

	it('renders user rows and expected columns after data loads', async () => {
		const grid = await renderGrid();
		expect(getAriaColumnCount(grid)).toBe(9);
		for (const header of ['First Name', 'Last Name', 'Age', 'DOB', 'City']) {
			expect(
				screen.getByRole('columnheader', { name: new RegExp(header, 'i') })
			).toBeInTheDocument();
		}
		expect(await screen.findByText('John')).toBeInTheDocument();
		expect(await screen.findByText('Jane')).toBeInTheDocument();
		expect(await screen.findByText('New York')).toBeInTheDocument();
	});

	it('toggles floating filters when clicking Remove/Show Filters', async () => {
		const user = userEvent.setup();
		const grid = await renderGrid();
		const toolbar = within(
			screen.getByRole('group', { name: 'Filter visibility' })
		);

		expect(hasFloatingFilters(grid)).toBe(true);
		const removeBtn = toolbar.getByRole('button', { name: 'Remove Filters' });
		const showBtn = toolbar.getByRole('button', { name: 'Show Filters' });
		expect(removeBtn).toHaveAttribute('aria-pressed', 'false');
		expect(showBtn).toHaveAttribute('aria-pressed', 'true');

		await user.click(removeBtn);
		await waitFor(() => expect(hasFloatingFilters(grid)).toBe(false));
		expect(removeBtn).toHaveAttribute('aria-pressed', 'true');
		expect(showBtn).toHaveAttribute('aria-pressed', 'false');

		await user.click(showBtn);
		await waitFor(() => expect(hasFloatingFilters(grid)).toBe(true));
		expect(showBtn).toHaveAttribute('aria-pressed', 'true');
	});

	it('renders an error state when fetchUsers rejects', async () => {
		fetchUsersMock.mockRejectedValue(new Error('network down'));
		render(<AgGridDemo />);
		const alert = await screen.findByRole('alert');
		expect(alert).toHaveTextContent(/network down/i);
	});
});
