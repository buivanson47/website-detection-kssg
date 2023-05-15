'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const MasterProvider = ({ children, theme = 'light' }: { children: React.ReactNode; theme?: AppTheme }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}

			<div>
				<Toaster />
			</div>
		</QueryClientProvider>
	);
};

export default MasterProvider;
