'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from '@/localization';

const queryClient = new QueryClient();

const MasterProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<LocalizationProvider>
			<QueryClientProvider client={queryClient}>
				{children}

				<div>
					<Toaster />
				</div>
			</QueryClientProvider>
		</LocalizationProvider>
	);
};

export default MasterProvider;
