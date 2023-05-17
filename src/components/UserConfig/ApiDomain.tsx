'use client';
import React, { useEffect, useState } from 'react';
import { useApiDomain } from '@/store';
import toast from 'react-hot-toast';
import { isEmpty } from 'lodash';
import { shallow } from 'zustand/shallow';

const ApiDomain = () => {
	const [apiDomain, setApiDomain] = useApiDomain((state) => [state.apiDomain, state.setApiDomain], shallow);
	const [domain, setDomain] = useState<string>('');

	useEffect(() => {
		setDomain(apiDomain);
	}, [apiDomain]);

	const onSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		if (isEmpty(domain)) {
			toast.error('API domain cannot blank');
			return;
		}
		setApiDomain(domain);
		toast.success('save success');
	};

	return (
		<div className="w-full">
			<div className="mb-2">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">API Domain</label>
			</div>
			<div className="flex w-full h-10">
				<div className="relative w-full">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-full"
						placeholder="API Domain"
						required
						// defaultValue={domain}
						value={domain}
						onChange={(e) => setDomain(e.target.value)}
					/>
				</div>

				<button
					type="submit"
					className="inline-flex items-center py-2.5 px-12 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					onClick={onSave}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export { ApiDomain };
