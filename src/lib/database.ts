import {
    integer,
    pgTable,
    primaryKey,
    text,
    timestamp,
  } from 'drizzle-orm/pg-core'
  import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
  import postgres from 'postgres'
  
  const queryClient = postgres(process.env.POSTGRES_URL as string)
  export const db: PostgresJsDatabase = drizzle(queryClient)
  
  export const users = pgTable('user', {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    publicId: text('publicId').unique().notNull(),
    name: text('name'),
    email: text('email').notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
  })
  
  export const accounts = pgTable(
    'account',
    {
      userId: text('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
      type: text('type').notNull(),
      provider: text('provider').notNull(),
      providerAccountId: text('providerAccountId').notNull(),
      refresh_token: text('refresh_token'),
      access_token: text('access_token'),
      expires_at: integer('expires_at'),
      token_type: text('token_type'),
      scope: text('scope'),
      id_token: text('id_token'),
      session_state: text('session_state'),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    }),
  )
  
  export const sessions = pgTable('session', {
    id: text('id').notNull(),
    sessionToken: text('sessionToken').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  })

  export const posts = pgTable('post', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull().references(() => users.id),
    title: text('title').notNull(),
    description: text('description'),
    mediaUrl: text('media_url'), // Untuk menyimpan URL gambar atau video
    mediaType: text('media_type'), // 'image' atau 'video'
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  })
  
  export const verificationTokens = pgTable(
    'verificationToken',
    {
      identifier: text('identifier').notNull(),
      token: text('token').notNull(),
      expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => ({
      compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    }),

    
  )