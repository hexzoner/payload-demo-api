import type { CollectionConfig } from 'payload'
import { adminOnly, anyone, userCollectionAccess } from '../access/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 3600 * 24,
  },
  access: {
    read: anyone,
    create: anyone,
    update: userCollectionAccess,
    delete: adminOnly,
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
      validate: (value: any) => Boolean(value) || 'The email address is required!'
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['user'],
      saveToJWT: true,
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
