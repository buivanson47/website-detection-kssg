import { ApiDomain, LanguagesChanger } from '@/components/UserConfig';

const Settings = () => {
	return (
		<div className="w-full gap-4 flex-col flex">
			<ApiDomain />
			<LanguagesChanger />
		</div>
	);
};

export default Settings;
