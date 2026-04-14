import axios from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchUsers } from './apiService';

vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

describe('fetchUsers', () => {
	afterEach(() => vi.resetAllMocks());

	it('returns only records matching the User shape', async () => {
		mockedAxios.get.mockResolvedValue({
			data: {
				results: [
					{
						gender: 'male',
						name: { first: 'A', last: 'B' },
						email: 'a@b.com',
						phone: '1',
						dob: { date: '1990', age: 30 },
						location: { city: 'NY' },
						picture: { thumbnail: 'u' },
					},
					{ gender: 'invalid' },
				],
			},
		});

		const result = await fetchUsers();
		expect(result).toHaveLength(1);
		expect(result[0]?.email).toBe('a@b.com');
	});

	it('throws when the API response has no results array', async () => {
		mockedAxios.get.mockResolvedValue({ data: {} });
		await expect(fetchUsers()).rejects.toThrow(/results/);
	});
});
