import { AuthRequest } from '@/model';
import { useMutation } from '@tanstack/react-query';
import API from '../API';

export const useLogin = () => useMutation((params: AuthRequest) => API.login(params));
