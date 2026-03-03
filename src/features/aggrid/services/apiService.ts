import axios from 'axios';
import type { User } from '../models/user.model';

interface RandomUserResponse {
	results?: unknown;
}

export const DEFAULT_USER_RESULT_COUNT = 50;

const isRecord = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null;
};

const isUser = (value: unknown): value is User => {
	if (!isRecord(value)) {
		return false;
	}

	const { gender, name, email, phone, dob, location, picture } = value;

	return (
		typeof gender === 'string' &&
		isRecord(name) &&
		typeof name.first === 'string' &&
		typeof name.last === 'string' &&
		typeof email === 'string' &&
		typeof phone === 'string' &&
		isRecord(dob) &&
		typeof dob.date === 'string' &&
		typeof dob.age === 'number' &&
		isRecord(location) &&
		typeof location.city === 'string' &&
		isRecord(picture) &&
		typeof picture.thumbnail === 'string'
	);
};

const parseUsers = (results: unknown): User[] => {
	if (!Array.isArray(results) || !results.every(isUser)) {
		throw new Error('Unexpected Random User API response');
	}

	return results;
};

export const fetchUsers = async (
	resultCount = DEFAULT_USER_RESULT_COUNT,
	signal?: AbortSignal
): Promise<User[]> => {
	const response = await axios.get<RandomUserResponse>(
		`https://randomuser.me/api/?results=${resultCount}`,
		{ signal }
	);

	return parseUsers(response.data.results);
};
