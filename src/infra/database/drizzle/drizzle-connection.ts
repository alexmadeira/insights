import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import type { Options, PostgresType, Sql } from 'postgres'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

type TConnectionUrl = string
type TPgConnection = Sql<Record<string, unknown>>
type TOptions = Options<Record<string, PostgresType>>

export class DrizzleConnection {
  private readonly _postgres: Sql<Record<string, unknown>>
  private readonly _drizzle: PostgresJsDatabase<typeof schema> & { $client: TPgConnection }

  constructor(connectionUrl: TConnectionUrl, options?: TOptions) {
    this._postgres = postgres(connectionUrl, options)
    this._drizzle = drizzle(this._postgres, { schema })
  }

  static create(connectionUrl: TConnectionUrl, options?: TOptions) {
    return new DrizzleConnection(connectionUrl, options)._drizzle
  }

  public get postgres() {
    return this._postgres
  }

  public get drizzle() {
    return this._drizzle
  }
}
