// src/models/user.ts
import { Entity } from 'electrodb'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({
  endpoint: 'http://localhost:8000',
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
  },
})

export const UserEntity = new Entity({
  model: {
    entity: 'User',
    version: '1',
    service: 'app',
  },
  attributes: {
    id: {
      type: 'string',
      required: true,
      default: () => crypto.randomUUID(),
    },
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    type: {
      type: 'string',
      required: true,
      default: 'user',
    },
    createdAt: {
      type: 'string',
      required: true,
      default: () => new Date().toISOString(),
    },
  },
  indexes: {
    userById: {
      pk: { field: 'pk', composite: ['id'] },
    },
    userByCreatedAt: {
      index: 'gsi1',
      pk: { field: 'gsi1pk', composite: ['type'] },
      sk: { field: 'gsi1sk', composite: ['createdAt'] },
    },
  },
}, { client, table: 'UserTable' })
