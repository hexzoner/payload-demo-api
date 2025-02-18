import { APIError, type CollectionBeforeOperationHook } from 'payload'

const beforeTaskOperationHook: CollectionBeforeOperationHook = async ({ args, operation, req }) => {

    if (operation === 'create') args.data.createdBy = req.user?.id;

    if ((operation === 'update' || operation == 'delete') && !req.user?.roles?.includes('admin')) {
        const id = args.id;
        const result = await req.payload.find({
            collection: 'tasks',
            where: {
                id: {
                    equals: id,
                },
            },
        });

        if (result.totalDocs == 0) throw new APIError(`Task ${id} not found`, 404)

        const createdBy = result.docs[0].createdBy;
        const createdById = typeof createdBy === 'object' ? createdBy?.id : createdBy;

        if (createdById === req.user?.id) return args;
        else throw new APIError('You are not authorized to update this task', 403)
    }

    return args
}

export default beforeTaskOperationHook;