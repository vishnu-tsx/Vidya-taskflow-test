import { useEffect, useState } from 'react';
import type { User } from '../models/user.model';
import { fetchUsers } from '../services/apiService';

export const useAgGridData = () => {
	const [rowData, setRowData] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isActive = true;
		const abortController = new AbortController();

		const loadUsers = async () => {
			try {
				const users = await fetchUsers(undefined, abortController.signal);
				if (isActive) {
					setRowData(users);
				}
			} catch (err) {
				if (!isActive || abortController.signal.aborted) {
					return;
				}

				setError(err instanceof Error ? err.message : 'Failed to load users');
			} finally {
				if (isActive) {
					setLoading(false);
				}
			}
		};

		void loadUsers();

		return () => {
			isActive = false;
			abortController.abort();
		};
	}, []);

	return { rowData, loading, error };
};
