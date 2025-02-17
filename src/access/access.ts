import { User } from '@/payload-types';
import { Access } from 'payload';

export const anyone = () => true;

export const adminOnly = (): Access => {
    return async ({ req, data }) => {
        const { user } = req;
        if (user && user.roles && user.roles.includes('admin')) return true;
        return false;
    };
};
