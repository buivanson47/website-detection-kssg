'use client';
import React, { createContext, useState, useContext } from 'react';
import { LocalizedStrings } from 'react-localization';
import translations from './translations';

export const DEFAULT_LANGUAGE = 'en';

interface LocalizationContextType {
	translations: LocalizedStrings<object>;
	setAppLanguage: (language: string) => void;
	appLanguage: string;
}

export const LocalizationContext = createContext<LocalizationContextType>({
	translations,
	setAppLanguage: () => null,
	appLanguage: DEFAULT_LANGUAGE,
});

export const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
	const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

	const setLanguage = (language: string) => {
		translations.setLanguage(language);
		setAppLanguage(language);
	};

	return (
		<LocalizationContext.Provider
			value={{
				translations,
				appLanguage,
				setAppLanguage: setLanguage,
			}}
		>
			{children}
		</LocalizationContext.Provider>
	);
};

export const useLocalization = () => useContext(LocalizationContext);
