// Users collection should be able to authenticate via JWT (which is built in Payload).
// Two user roles: admins and regular users, 
// in which admin can access all tasks and users can access only their own ones, 
// leveraging on collection and field access from Payload.


import type { CollectionConfig } from 'payload'

import { adminOnly, anyone } from '../access/access'


export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: anyone,
    create: anyone,
    update: anyone,
    delete: adminOnly(),
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'password',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
    },
  ],
}
