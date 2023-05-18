'use client';
import { useUploadFile } from '@/network';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { UploadInput } from './UploadInput';
import { FullScreenImage, TextTitle } from '@/components';
// import Image from 'next/image';
import toast from 'react-hot-toast';
import { Spinner } from '../Spinner';
import { FileUploadResponse } from '@/model';

const FileUpload = () => {
	const [currentImage, setCurrentImage] = useState<File>();
	const [previewImage, setPreviewImage] = useState<string>('');
	const [resImage, setResImage] = useState<FileUploadResponse | null>();

	const { mutateAsync: uploadFile, isLoading } = useUploadFile();

	const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files as FileList;
		setCurrentImage(selectedFiles?.[0]);
		setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
		setResImage(null);
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

	return (
		<div className="flex flex-1 md:flex-row flex-col p-4">
			<div className="w-full justify-center flex">
				<UploadInput onChange={selectImage} />
			</div>
			<div className="w-full justify-center flex md:pt-0 pt-4">
				<div className="flex-col flex flex-1 items-center">
					{!isEmpty(previewImage) && (
						<div className="max-w-[450px]">
							<div>
								<TextTitle>Preview Image: </TextTitle>
								<FullScreenImage className="rounded-lg mt-2" src={previewImage} alt="Preview" />
							</div>
							<button
								onClick={onSubmit}
								disabled={isLoading}
								className="flex w-full mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{isLoading ? <Spinner /> : <p>Submit</p>}
							</button>

							{!isEmpty(resImage?.imagePath) && (
								<div className="mt-8">
									<TextTitle>Response Image: </TextTitle>
									<FullScreenImage
										className="rounded-lg mt-2"
										src={resImage?.imagePath ?? ''}
										alt="Preview"
									/>
									<p className="mt-2 text-gray-900 dark:text-white">
										Độ rộng NT: {resImage?.result?.toLocaleString('Vi')} mm
									</p>

									{/* <img className="rounded-lg mt-2" src={previewImage} alt="Preview" /> */}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export { FileUpload };
