interface FilterToggleProps {
	isActive: boolean;
	onToggle: (next: boolean) => void;
}

const FilterToggle = ({ isActive, onToggle }: FilterToggleProps) => (
	<fieldset className="flex justify-end gap-2 border-0 p-0 m-0">
		<legend className="sr-only">Filter visibility</legend>
		<button
			onClick={() => onToggle(true)}
			type="button"
			aria-pressed={isActive}
			className={`px-4 py-2 rounded-lg font-medium transition-colors ${
				isActive
					? 'bg-blue-600 text-white'
					: 'bg-gray-300 text-gray-700 hover:bg-gray-400'
			}`}
		>
			Show Filters
		</button>
		<button
			onClick={() => onToggle(false)}
			type="button"
			aria-pressed={!isActive}
			className={`px-4 py-2 rounded-lg font-medium transition-colors ${
				!isActive
					? 'bg-blue-600 text-white'
					: 'bg-gray-300 text-gray-700 hover:bg-gray-400'
			}`}
		>
			Remove Filters
		</button>
	</fieldset>
);

export default FilterToggle;
