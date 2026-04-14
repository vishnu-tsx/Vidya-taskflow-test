import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: (error: Error) => ReactNode;
}

interface ErrorBoundaryState {
	error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = { error: null };

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { error };
	}

	componentDidCatch(error: Error): void {
		console.error('ErrorBoundary caught:', error);
	}

	render() {
		const { error } = this.state;
		if (error) {
			if (this.props.fallback) return this.props.fallback(error);
			return (
				<div
					role="alert"
					className="flex items-center justify-center h-96 text-red-600"
				>
					Something went wrong: {error.message}
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
