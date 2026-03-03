import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
	checkColumnCount,
	checkFiltersEnabled,
	checkGridLoaded,
	renderComponent,
} from '../../../utils/testUtils';
import type { User } from '../models/user.model';
import { fetchUsers } from '../services/apiService';
import AgGridDemo from './AgGridDemo';

const mockUsers: User[] = [
	{
		gender: 'male',
		name: { first: 'John', last: 'Doe' },
		email: 'john@example.com',
		phone: '123-456-7890',
		dob: { date: '1990-01-01', age: 34 },
		location: { city: 'New York' },
		picture: { thumbnail: 'https://example.com/pic.jpg' },
	},
	{
		gender: 'female',
		name: { first: 'Jane', last: 'Smith' },
		email: 'jane@example.com',
		phone: '098-765-4321',
		dob: { date: '1985-05-15', age: 39 },
		location: { city: 'Los Angeles' },
		picture: { thumbnail: 'https://example.com/pic2.jpg' },
	},
];

vi.mock('../services/apiService', () => ({
	fetchUsers: vi.fn(),
}));

const mockedFetchUsers = vi.mocked(fetchUsers);

describe('AgGridDemo', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockedFetchUsers.mockResolvedValue(mockUsers);
	});

	it('renders AG Grid', async () => {
		renderComponent(<AgGridDemo />);

		const grid = await screen.findByRole('grid');
		expect(grid).toBeInTheDocument();
	});

	it('loads data into the grid', async () => {
		renderComponent(<AgGridDemo />);

		const grid = await screen.findByRole('grid');

		await waitFor(() => {
			expect(checkGridLoaded(grid)).toBe(true);
		});
	});

	it('shows loading state initially', () => {
		renderComponent(<AgGridDemo />);

		expect(screen.getByText(/loading ag grid data/i)).toBeInTheDocument();
	});

	it('renders correct number of columns', async () => {
		renderComponent(<AgGridDemo />);

		const grid = await screen.findByRole('grid');

		expect(checkColumnCount(grid, 9)).toBe(true);
	});

	it('enables column filters by default', async () => {
		renderComponent(<AgGridDemo />);

		const grid = await screen.findByRole('grid');

		await waitFor(() => {
			expect(checkFiltersEnabled(grid)).toBe(true);
		});
	});

	it('toggles filters when buttons are clicked', async () => {
		renderComponent(<AgGridDemo />);

		const grid = await screen.findByRole('grid');
		const removeFiltersButton = screen.getByRole('button', {
			name: /remove filters/i,
		});
		const showFiltersButton = screen.getByRole('button', {
			name: /show filters/i,
		});

		await waitFor(() => {
			expect(checkFiltersEnabled(grid)).toBe(true);
		});

		fireEvent.click(removeFiltersButton);

		await waitFor(() => {
			expect(checkFiltersEnabled(grid)).toBe(false);
		});

		fireEvent.click(showFiltersButton);

		await waitFor(() => {
			expect(checkFiltersEnabled(grid)).toBe(true);
		});
	});
});
