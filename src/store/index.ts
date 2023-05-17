import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ApiDomain {
	apiDomain: string;
	setApiDomain: (domain: string) => void;
}

export const useApiDomain = create<ApiDomain>()(
	persist(
		(set) => ({
			apiDomain: process.env.DEFAULT_API_DOMAIN ?? 'https://2192-123-29-67-2.ap.ngrok.io',
			setApiDomain(domain) {
				set({ apiDomain: domain });
			},
		}),
		{
			name: 'api-domain',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
