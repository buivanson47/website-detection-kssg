import { useUploadFile } from '@/network';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { UploadInput } from './UploadInput';
import { TextTitle } from '@/components';
import Image from 'next/image';

const FileUpload = () => {
	const [currentImage, setCurrentImage] = useState<File>();
	const [previewImage, setPreviewImage] = useState<string>('');

	const { mutateAsync: uploadFile, isLoading } = useUploadFile();

	const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files as FileList;
		setCurrentImage(selectedFiles?.[0]);
		setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
	};

	const onSubmit = () => {
		console.log('run');

		let data = new FormData();
		// data.append(
		// 	'data',
		// 	'{"auth":{"api_key": "b67e4cf9a2a58360392187502a57572f", "api_secret": "ce1ad26c99c2cbb93a8742268aea8b46960467c2"}, "wait":true}',
		// );
		data.append('image', currentImage);

		uploadFile(data)
			.then((res) => {
				console.log('res', res);
			})
			.catch((error) => {
				console.log('error', error);
			});
	};

	return (
		<div className="flex flex-1 md:flex-row flex-col p-4">
			<div className="w-1/2 justify-center flex">
				<UploadInput onChange={selectImage} />
			</div>
			<div className="w-1/2 justify-center flex md:pt-0 pt-4">
				{!isEmpty(previewImage) && (
					<div className="max-w-[450px]">
						<div>
							<TextTitle>Preview Image: </TextTitle>
							<img className="rounded-lg mt-2" src={previewImage} alt="Preview" />
						</div>
						{/* <div className="mt-8">
							<TextTitle>Preview Image: </TextTitle>
							<img className="rounded-lg mt-2" src={previewImage} alt="Preview" />
						</div> */}
					</div>
				)}
				<button onClick={onSubmit}>Submit</button>
			</div>
		</div>
	);
};

export { FileUpload };
