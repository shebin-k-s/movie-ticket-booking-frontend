import React from 'react'
import FormField from './FormField';
import type { FormState } from './types';
import { useAppSelector } from '../../../hooks/reduxHooks';
import LoadingButton from '../../../components/ui/LoadingButton';

type Props = {
    isLogin: boolean;
    form: FormState;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const AuthForm = ({ isLogin, form, onChange, onSubmit }: Props) => {
    const loading = useAppSelector((state) => state.auth.loading);

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {!isLogin && (
                <FormField
                    id="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={onChange}
                    required
                />
            )}

            <FormField
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={onChange}
                required
            />

            <FormField
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={onChange}
                required
            />

            {!isLogin && (
                <FormField
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={onChange}
                    required
                />
            )}

            <LoadingButton
                loading={loading}
                text={isLogin ? "Login now" : "Create account"}
            />
        </form>
    );
}

export default AuthForm