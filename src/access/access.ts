// import { User } from '@/payload-types';
import { Access, AccessResult } from 'payload';


export const anyone = () => true;

export const adminOnly = (): Access => {
    return async ({ req, data }) => {
        const { user } = req;
        if (user && user.roles && user.roles.includes('admin')) return true;
        return false;
    };
};

//users can access only their own tasks
export const userOnlyAccess = (): Access => {
    return async ({ req, data }) => {
        const { user } = req;
        if (!user || !user.roles) return false;
        if (user.roles.includes('admin')) return true;
        if (user.roles.includes('user')) {
            return {
                user: {
                    equals: user.id,
                },
            };
        }

        return false;
    };
}