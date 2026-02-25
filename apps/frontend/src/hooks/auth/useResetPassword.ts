import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/api'; // Corregido con llaves

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async ({ token, password }: any) => {
            const { data } = await api.post(`/auth/reset-password/${token}`, { password });
            return data;
        },
    });
};