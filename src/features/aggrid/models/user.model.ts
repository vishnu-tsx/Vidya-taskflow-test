export type Gender = 'male' | 'female';

export interface User {
	gender: Gender;
	name: { first: string; last: string };
	email: string;
	phone: string;
	dob: { date: string; age: number };
	location: { city: string };
	picture: { thumbnail: string };
}
