import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../utils/api/auth.api';

export const useResetPassword = () => {
    return useMutation({
        mutationFn: ({ password, token }: { password: string; token: string }) =>
            resetPassword(password, token),
    });
};