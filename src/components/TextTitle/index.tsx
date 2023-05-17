import React, { ReactNode } from 'react';

const TextTitle = ({ children }: { children: ReactNode }) => {
	return <p className="block text-lg font-medium leading-6 dark:text-white text-black">{children}</p>;
};

export { TextTitle };
