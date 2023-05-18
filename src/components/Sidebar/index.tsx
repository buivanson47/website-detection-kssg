'use client';
import { Dashboard, User } from '@/assets/icons';
import { useLocalization } from '@/localization';
import Link from 'next/link';
import React, { useMemo } from 'react';

const Sidebar = () => {
	const { translations, appLanguage } = useLocalization();

	const dashboardMenu = useMemo(
		() => [
			{
				link: '#',
				icon: Dashboard,
				title: translations.getString('sidebar.home'),
			},
			{
				link: '/user/settings',
				icon: User,
				title: translations.getString('sidebar.config'),
			},
		],
		[appLanguage],
	);

	return (
		<aside
			id="logo-sidebar"
			className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
			aria-label="Sidebar"
		>
			<div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
				<ul className="space-y-2 font-medium">
					{dashboardMenu.map((item, index) => {
						const Icon = item.icon;
						return (
							<li key={index}>
								<Link
									href={item.link}
									className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<Icon />
									<span className="ml-3">{item.title}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</aside>
	);
};

export { Sidebar };
