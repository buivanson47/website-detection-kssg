import { Inter } from 'next/font/google';
import MasterProvider from './MasterProvider';
import './globals.css';
import { Navbar, Sidebar } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Predict',
	description: 'Predict',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body className="dark:bg-slate-900 dark:text-slate-400 bg-white text-white">
				<MasterProvider>
					<Navbar />
					<Sidebar />
					<main className="mt-16 sm:mt-20 p-4 sm:ml-64 flex flex-1">{children}</main>
				</MasterProvider>
			</body>
		</html>
	);
}
