// scripts/createTable.ts
import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({
  endpoint: 'http://localhost:8000',
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
  },
})

async function createUserTable() {
  const command = new CreateTableCommand({
    TableName: 'UserTable',
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      { AttributeName: 'pk', AttributeType: 'S' },
      { AttributeName: 'gsi1pk', AttributeType: 'S' },
      { AttributeName: 'gsi1sk', AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'pk', KeyType: 'HASH' }, // Primary Key
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'gsi1',
        KeySchema: [
          { AttributeName: 'gsi1pk', KeyType: 'HASH' },
          { AttributeName: 'gsi1sk', KeyType: 'RANGE' },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
    ],
  })

  try {
    const result = await client.send(command)
    console.log('✅ Table created:', result.TableDescription?.TableName)
  } catch (err: unknown) {
    console.error('❌ Failed to create table:', (err as Error).message)
  }
}

console.log('Creating table...')
createUserTable()
