'use client';
import { useLocalization } from '@/localization';
import React from 'react';

const LanguagesChanger = () => {
	const { translations, setAppLanguage } = useLocalization();

	const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setAppLanguage(e.target.value);
	};

	return (
		<div className="w-full">
			<div className="mb-2">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					{translations.getString('config.language')}
				</label>
			</div>
			<div className="flex w-40 h-10">
				<select
					onChange={handleChangeLanguage}
					id="countries"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option value={'en'}>United States</option>
					<option value={'vi'}>Vietnam</option>
				</select>
			</div>
		</div>
	);
};

export { LanguagesChanger };
