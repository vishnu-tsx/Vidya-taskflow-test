import axios from 'axios';
import { useEffect, useState } from 'react';
import type { User } from '../models/user.model';
import { fetchUsers } from '../services/apiService';

interface UseAgGridDataResult {
	users: User[];
	isLoading: boolean;
	error: Error | null;
}

export const useAgGridData = (): UseAgGridDataResult => {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		const load = async () => {
			try {
				const result = await fetchUsers(controller.signal);
				if (controller.signal.aborted) return;
				setUsers(result);
				setError(null);
			} catch (err) {
				if (axios.isCancel(err) || controller.signal.aborted) return;
				setError(
					err instanceof Error ? err : new Error('Failed to load users')
				);
			} finally {
				if (!controller.signal.aborted) setIsLoading(false);
			}
		};

		void load();

		return () => controller.abort();
	}, []);

	return { users, isLoading, error };
};
