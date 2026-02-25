import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/api'; // Corregido con llaves

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            const { data } = await api.post('/auth/forgot-password', { email });
            return data;
        },
    });
};