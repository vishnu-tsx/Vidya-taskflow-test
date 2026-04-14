import axios from 'axios';
import { API_RESULT_COUNT, API_TIMEOUT_MS } from '../constants';
import type { User } from '../models/user.model';

const API_URL = `https://randomuser.me/api/?results=${API_RESULT_COUNT}`;

const isUser = (value: unknown): value is User => {
	if (!value || typeof value !== 'object') return false;
	const v = value as Record<string, unknown>;
	const name = v.name as Record<string, unknown> | undefined;
	const dob = v.dob as Record<string, unknown> | undefined;
	const location = v.location as Record<string, unknown> | undefined;
	const picture = v.picture as Record<string, unknown> | undefined;
	return (
		(v.gender === 'male' || v.gender === 'female') &&
		typeof v.email === 'string' &&
		typeof v.phone === 'string' &&
		typeof name?.first === 'string' &&
		typeof name?.last === 'string' &&
		typeof dob?.date === 'string' &&
		typeof dob?.age === 'number' &&
		typeof location?.city === 'string' &&
		typeof picture?.thumbnail === 'string'
	);
};

export const fetchUsers = async (signal?: AbortSignal): Promise<User[]> => {
	const { data } = await axios.get<{ results: unknown }>(API_URL, {
		signal,
		timeout: API_TIMEOUT_MS,
	});
	const results = data?.results;
	if (!Array.isArray(results)) {
		throw new Error('Invalid API response: "results" is not an array');
	}
	return results.filter(isUser);
};
