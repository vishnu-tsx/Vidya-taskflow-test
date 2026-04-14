import { Suspense, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';

const AgGridDemo = lazy(
	() => import('../features/aggrid/components/AgGridDemo')
);

function App() {
	return (
		<div className="min-h-screen bg-white p-6">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">User Data</h1>
			<ErrorBoundary>
				<Suspense
					fallback={
						<div className="flex items-center justify-center h-96 text-gray-600">
							Loading grid...
						</div>
					}
				>
					<AgGridDemo />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}

export default App;
