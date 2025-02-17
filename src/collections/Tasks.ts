// 1. Title 
// 2. Description (rich text, optional).
// 3. Due Date 
// 4. Assignee (relation to users).
// 5. Status (enum: “To Do”, “In Progress”, “Done”).


import { userLogged } from '@/access/access'
import type { CollectionConfig } from 'payload'


export const Tasks: CollectionConfig = {
  slug: 'tasks',
  access: {
    read: userLogged,
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
  ],
}
