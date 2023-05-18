'use client';
import { useUploadFile } from '@/network';
import { isEmpty, isNil } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { UploadInput } from './UploadInput';
import { FullScreenImage, TextTitle } from '@/components';
// import Image from 'next/image';
import toast from 'react-hot-toast';
import { Spinner } from '../Spinner';
import { FileUploadResponse } from '@/model';

const FileUpload = () => {
	const [currentImage, setCurrentImage] = useState<File>();
	const [resImage, setResImage] = useState<FileUploadResponse>();
	const [previewImage, setPreviewImage] = useState<string>('');
	const resImageRef = useRef<HTMLDivElement | null>(null);

	const { mutateAsync: uploadFile, isLoading } = useUploadFile();

	const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files as FileList;
		setCurrentImage(selectedFiles?.[0]);
		setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
		setResImage(undefined);
	};

	const onSubmit = () => {
		let data = new FormData();
		data.append('image', currentImage);

		uploadFile(data)
			.then((res) => {
				if (isEmpty(res.imagePath)) {
					toast.error('Error: imagePath is empty');
					return;
				}
				setResImage(res);
			})
			.catch((error) => {
				toast.error('Error: please try again');
				console.log('error', error);
			});
	};

	useEffect(() => {
		if (isNil(resImage)) return;
		resImageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, [resImage]);

	const onClear = () => {
		setResImage(undefined);
		setCurrentImage(undefined);
		setPreviewImage('');
	};

	return (
		<div className="flex flex-1 flex-col p-4 pb-24">
			{previewImage ? (
				<div className="max-w-[450px]">
					<TextTitle>Preview Image: </TextTitle>
					<FullScreenImage className="rounded-lg mt-2 ma" src={previewImage} alt="Preview" />
					<div className="flex-row flex justify-between gap-4">
						<button
							onClick={onSubmit}
							disabled={isLoading}
							className="flex w-full mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							{isLoading ? <Spinner /> : <p>Predict</p>}
						</button>
						<button
							onClick={onClear}
							disabled={isLoading}
							className="flex mt-4 justify-center rounded-md bg-red-700 hover:bg-red-800 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
						>
							<p>Clear</p>
						</button>
					</div>
				</div>
			) : (
				<UploadInput onChange={selectImage} />
			)}
			{!isEmpty(resImage?.imagePath) && (
				<div className="flex-col flex flex-1 divide-y divide-dashed">
					<div className="mt-8 max-w-lg" ref={resImageRef}>
						<TextTitle>Result Image: </TextTitle>
						<FullScreenImage className="rounded-lg mt-2" src={resImage?.imagePath ?? ''} alt="Preview" />
						<p className="mt-2 text-gray-900 dark:text-white">
							<p className="font-bold">NT: {resImage?.result?.toLocaleString('Vi') ?? 0} mm</p>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export { FileUpload };
