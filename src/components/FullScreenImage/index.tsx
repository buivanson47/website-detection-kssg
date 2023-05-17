'use client';
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-awesome-lightbox/build/style.css';
import Image, { ImageProps } from 'next/image';
import { useToggle } from '@/hook';

interface FullScreenImage extends ImageProps {}

const FullScreenImage = (props: FullScreenImage) => {
	const { src } = props;
	const [isOpen, toggleOpen] = useToggle(false);
	return (
		<>
			<img {...props} onClick={toggleOpen}></img>
			{/* {isOpen && <Lightbox images={src} onClose={() => toggleOpen} />} */}
		</>
	);
};

export { FullScreenImage };
