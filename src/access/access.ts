import { User, Task } from '@/payload-types';
import { Access, Where } from 'payload';

export const anyone = () => true;

export const userCollectionAccess: Access = ({ req: { user }, id, data }) => {
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

export const userAuthenticated: Access = ({ req: { user } }) => {
    if (user) return true;
    return false;
}

export const tasksCollectionAccess: Access = ({ req: { user } }) => {
    if (!user) return false;
    if (user.roles.includes('admin')) return true;

    const query: Where = {
        or: [
            {
                assignee: {
                    equals: user.id,
                },
            },
            {
                createdBy: {
                    equals: user.id,
                },
            },
        ],
    }
    return query
};


export const editAccess: Access = async ({ req, id }) => {

    const user = req.user;
    if (!user || !id) return false;
    if (user.roles && user.roles.some((role) => role === 'admin')) return true

    // const task = await req.payload.find({
    //     collection: 'tasks',
    //     where: {
    //         id: {
    //             equals: id,
    //         },
    //     },
    // });

    return true;
}
