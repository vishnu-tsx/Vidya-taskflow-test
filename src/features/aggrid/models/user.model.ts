export interface User {
	gender: string;
	name: { first: string; last: string };
	email: string;
	phone: string;
	dob: { date: string; age: number };
	location: { city: string };
	picture: { thumbnail: string };
}
