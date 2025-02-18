import { userAuthenticated, tasksCollectionAccess, editAccess } from '@/access/access'
import type { CollectionConfig } from 'payload'
import beforeTaskOperationHook from '@/hooks/beforeOperation'

export const Tasks: CollectionConfig = {
  slug: 'tasks',
  access: {
    read: tasksCollectionAccess,
    create: userAuthenticated,
    update: editAccess,
    delete: editAccess,
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
    beforeOperation: [beforeTaskOperationHook]
  }
}

