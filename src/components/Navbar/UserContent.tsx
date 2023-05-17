'use client';
import { useToggle } from '@/hook';
import Link from 'next/link';
import React, { useMemo } from 'react';

const UserContent = () => {
	const [open, toggleOpen] = useToggle(false);

	const userMenu = useMemo(
		() => [
			{
				link: '#',
				title: 'Dashboard',
			},
			{
				link: '/user/settings',
				title: 'Settings',
			},
			{
				link: '#',
				title: 'Sign out',
			},
		],
		[],
	);

	return null;

	return (
		<div className="flex items-center">
			<div className="flex items-center ml-3">
				<div>
					<button
						onClick={toggleOpen}
						type="button"
						className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
						aria-expanded="false"
						data-dropdown-toggle="dropdown-user"
					>
						<span className="sr-only">Open user menu</span>
						<img
							className="w-8 h-8 rounded-full"
							src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
							alt="user photo"
						/>
					</button>
				</div>
				<div
					className={`z-50 m-0 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 absolute ${
						open ? 'block' : 'hidden'
					} top-[30px] right-[50px]`}
					id="dropdown-user"
				>
					{/* <div className="px-4 py-3" role="none">
						<p className="text-sm text-gray-900 dark:text-white" role="none">
							Neil Sims
						</p>
						<p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
							neil.sims@flowbite.com
						</p>
					</div> */}
					<ul className="py-1" role="none">
						{userMenu.map((item, index) => {
							return (
								<li key={index}>
									<Link
										href={item.link}
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
										role="menuitem"
									>
										{item.title}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export { UserContent };
