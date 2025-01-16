import type { Casing, ExtractTablesWithRelations, Logger } from 'drizzle-orm'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import type { Options, PostgresType, Sql } from 'postgres'

import { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

type TPgConnection = Sql<Record<string, unknown>>
type TOptions = {
  pg?: Options<Record<string, PostgresType>>
  connection?: {
    logger?: Logger
    casing?: Casing
  }
}
type TDrizzleConnectionProps = {
  ssl: 'disable' | 'allow' | 'prefer' | 'require'
  user: string
  password: string
  host: string
  port: number
  name: string
}

type TSchemaQueryTypes = {
  [K in keyof typeof schema]: PgDatabase<
    PgQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
  >['query'][K]
}

export class Connection {
  private readonly PGConnection: Sql<Record<string, unknown>>
  private readonly DrizzleConnection: PostgresJsDatabase<typeof schema> & { $client: TPgConnection }

  protected constructor(
    private readonly props: TDrizzleConnectionProps,
    options: TOptions,
  ) {
    this.PGConnection = postgres(this.connectionUrl, options.pg)
    this.DrizzleConnection = drizzle(this.PGConnection, { schema, ...options.connection })

    return new Proxy(this, {
      get: (target, prop: string) => {
        if (prop in target) {
          return target[prop as keyof this]
        }
        return this.query(prop as keyof typeof schema)
      },
    })
  }

  static create(props: TDrizzleConnectionProps, options: TOptions = {}) {
    return new Connection(props, options) as Connection & TSchemaQueryTypes
  }

  private query(table: keyof typeof schema) {
    return this.DrizzleConnection.query[table]
  }

  public get connectionUrl() {
    return `postgresql://${this.props.user}:${this.props.password}@${this.props.host}:${this.props.port}/${this.props.name}?sslmode=${this.props.ssl}`
  }

  public postgresConnection() {
    return this.PGConnection
  }

  public drizzleConnection() {
    return this.DrizzleConnection
  }
}
