// import { User } from '@/payload-types';
import { Access, AccessResult } from 'payload';

export const anyone = () => true;

export const userAccess: Access = ({ req: { user }, id, data }) => {
    // console.log('----user----', user);
    // console.log('----data----', data);
    // console.log('----id----', id);
    if (!user || !user.roles) return false;
    if (user.roles.includes('admin')) return true
    if (user.roles.includes('user')) return user.id === id;
    return false;
};

export const adminOnly: Access = ({ req: { user } }) => {
    if (user && user.roles && user.roles.includes('admin')) return true;
    return false;
}

export const userLogged: Access = ({ req: { user } }) => {
    if (user) return true;
    return false;
}