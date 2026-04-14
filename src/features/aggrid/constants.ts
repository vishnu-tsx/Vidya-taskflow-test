export const API_RESULT_COUNT = 50;
export const API_TIMEOUT_MS = 10_000;

export const GRID_HEIGHT_PX = 550;
export const THUMBNAIL_SIZE_PX = 40;

export const PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50];

export const YOUNG_AGE_MAX = 30;
export const SENIOR_AGE_MIN = 60;

export const COLORS = {
	young: { bg: '#e8f5e9', fg: '#2e7d32' },
	senior: { bg: '#fff3e0', fg: '#e65100' },
	middle: { bg: '#e3f2fd', fg: '#1565c0' },
	female: { bg: '#fce4ec', fg: '#c2185b', border: '#ec4899' },
	male: { bg: '#e3f2fd', fg: '#1976d2', border: '#3b82f6' },
	cellText: '#374151',
} as const;
