import { userLogged, userTasksAccess } from '@/access/access'
import type { CollectionConfig } from 'payload'

import type { CollectionAfterOperationHook, CollectionBeforeOperationHook } from 'payload'

const beforeOperationHook: CollectionBeforeOperationHook = async ({ args, operation, req }) => {
  if (operation === 'create')
    args.data.createdBy = req.user?.id;
  return args
}

export const Tasks: CollectionConfig = {
  slug: 'tasks',
  access: {
    read: userTasksAccess,
    create: userLogged,
    update: userLogged,
    delete: userLogged,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'dueDate',
      type: 'date',
      required: true,
    },
    {
      name: 'assignee',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'To Do',
          value: 'toDo',
        },
        {
          label: 'In Progress',
          value: 'inProgress',
        },
        {
          label: 'Done',
          value: 'done',
        },
      ],
      required: true,
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
    }
  ],
  hooks:
  {
    beforeOperation: [beforeOperationHook]
    // afterOperation: [afterOperationHook]
  }
}

