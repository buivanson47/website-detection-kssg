import { useMutation } from '@tanstack/react-query';
import API from '../API';
import { FileUpload } from '@/model';

export const useUploadFile = () => useMutation((params: FileUpload) => API.uploadFile(params));
