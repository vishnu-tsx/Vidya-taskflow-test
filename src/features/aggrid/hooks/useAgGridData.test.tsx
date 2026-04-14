import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockUsers } from '../testFixtures';
import { useAgGridData } from './useAgGridData';

const fetchUsersMock = vi.fn();

vi.mock('../services/apiService', () => ({
	fetchUsers: (...args: unknown[]) => fetchUsersMock(...args),
}));

describe('useAgGridData', () => {
	afterEach(() => {
		fetchUsersMock.mockReset();
	});

	it('exposes users once the fetch resolves', async () => {
		fetchUsersMock.mockImplementation(async () => mockUsers);
		const { result } = renderHook(() => useAgGridData());

		await waitFor(() => expect(result.current.isLoading).toBe(false));
		expect(result.current.users).toEqual(mockUsers);
		expect(result.current.error).toBeNull();
	});

	it('exposes an error when fetch rejects', async () => {
		fetchUsersMock.mockImplementation(async () => {
			throw new Error('boom');
		});
		const { result } = renderHook(() => useAgGridData());

		await waitFor(() => expect(result.current.isLoading).toBe(false));
		expect(result.current.error?.message).toBe('boom');
		expect(result.current.users).toEqual([]);
	});

	it('aborts the request on unmount', async () => {
		let capturedSignal: AbortSignal | undefined;
		fetchUsersMock.mockImplementation(
			async (signal: AbortSignal) =>
				new Promise<never>((_, reject) => {
					capturedSignal = signal;
					signal.addEventListener('abort', () => reject(new Error('aborted')));
				})
		);

		const { unmount } = renderHook(() => useAgGridData());
		await waitFor(() => expect(capturedSignal).toBeDefined());
		unmount();
		expect(capturedSignal?.aborted).toBe(true);
	});
});
