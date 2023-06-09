'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { LocalizedStrings } from 'react-localization';
import translations from './translations';
import { useAppLanguages } from '@/store';

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
	const { savedLanguage, setSavedLanguage } = useAppLanguages();
	const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

	useEffect(() => {
		translations.setLanguage(savedLanguage);
		setAppLanguage(savedLanguage);
	}, [savedLanguage]);

	const setLanguage = (language: string) => {
		setSavedLanguage(language);
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
