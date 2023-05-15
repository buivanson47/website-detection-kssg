import React, { ReactNode } from 'react';

const TextTitle = ({ children }: { children: ReactNode }) => {
	return <p className="block text-lg font-medium leading-6 text-white">{children}</p>;
};

export { TextTitle };
