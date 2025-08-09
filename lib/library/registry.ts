import type { LibraryDefinition, LibraryItem, LibraryType } from "./types"
import { sections as promptsSections, items as promptsItems } from "./prompts"

const sqlSections = [
  { id: "schema", title: "Schema & DDL" },
  { id: "introspection", title: "Introspection" },
  { id: "rls", title: "Row Level Security" },
  { id: "performance", title: "Performance" },
  { id: "permissions", title: "Permissions" },
  { id: "ops", title: "Operations" },
] as const

const sqlItems: LibraryItem[] = [
  {
    id: "add-column-to-table",
    title: "Add column to table",
    description: "Add a new text column called description to companies.",
    section: "schema",
    code: { language: "sql", value: "ALTER TABLE companies\nADD COLUMN description text;" },
    highlightLines: [1, 2],
    tags: ["ddl", "alter"],
  },
  {
    id: "describe-single-table",
    title: "Describe a single table (columns)",
    description:
      "List columns, types, nullability, and defaults for a table (contacts) via information_schema.",
    section: "introspection",
    code: {
      language: "sql",
      value:
        "SELECT\n  table_name,\n  column_name,\n  data_type,\n  is_nullable,\n  column_default\nFROM information_schema.columns\nWHERE table_schema = 'public'\n  AND table_name   = 'contacts'\nORDER BY ordinal_position;",
    },
    tags: ["introspection"],
  },
  {
    id: "get-all-foreign-keys",
    title: "Get all foreign keys in schema",
    description:
      "List all foreign keys across the public schema using information_schema.",
    section: "introspection",
    code: {
      language: "sql",
      value:
        "SELECT\n  tc.table_name AS table_name,\n  kcu.column_name AS column_name,\n  ccu.table_name AS foreign_table_name,\n  ccu.column_name AS foreign_column_name\nFROM information_schema.table_constraints AS tc\nJOIN information_schema.key_column_usage AS kcu\n  ON tc.constraint_name = kcu.constraint_name\nJOIN information_schema.constraint_column_usage AS ccu\n  ON ccu.constraint_name = tc.constraint_name\nWHERE tc.constraint_type = 'FOREIGN KEY'\n  AND tc.table_schema = 'public'\nORDER BY tc.table_name, kcu.column_name;",
    },
    tags: ["introspection", "constraints"],
  },
  {
    id: "describe-all-tables",
    title: "Describe all tables",
    description:
      "List every table and column in the public schema with types and defaults.",
    section: "introspection",
    code: {
      language: "sql",
      value:
        "SELECT table_name,\n       column_name,\n       data_type,\n       is_nullable,\n       column_default\nFROM information_schema.columns\nWHERE table_schema = 'public'\nORDER BY table_name, ordinal_position;",
    },
    tags: ["introspection"],
  },
  {
    id: "get-rls-policies",
    title: "Get all RLS policies for a table",
    description:
      "Inspect RLS policies on companies via pg_policies, showing mode, roles, and expressions.",
    section: "rls",
    code: {
      language: "sql",
      value:
        "SELECT\n  policyname,\n  cmd as command,\n  permissive,\n  roles,\n  qual as using_condition,\n  with_check\nFROM pg_policies\nWHERE tablename = 'companies';",
    },
    tags: ["rls", "security"],
  },
  {
    id: "list-tables",
    title: "List all tables in public schema",
    description: "Quickly list table names in the public schema.",
    section: "introspection",
    code: {
      language: "sql",
      value:
        "SELECT tablename\nFROM pg_catalog.pg_tables\nWHERE schemaname = 'public'\nORDER BY tablename;",
    },
    tags: ["introspection"],
  },
  {
    id: "create-index-concurrently",
    title: "Create index concurrently",
    description:
      "Create an index without blocking writes. Use in production to minimize lock time.",
    section: "performance",
    code: {
      language: "sql",
      value:
        "CREATE INDEX CONCURRENTLY IF NOT EXISTS contacts_email_idx\nON contacts (email);",
    },
    tags: ["index", "production"],
  },
  {
    id: "drop-not-null",
    title: "Drop NOT NULL constraint",
    description:
      "Allow null values in an existing column by dropping the NOT NULL constraint.",
    section: "schema",
    code: { language: "sql", value: "ALTER TABLE contacts\nALTER COLUMN phone DROP NOT NULL;" },
    tags: ["ddl"],
  },
  {
    id: "table-size",
    title: "Show table size (incl. indexes)",
    description: "Inspect relation size including indexes and toast data.",
    section: "performance",
    code: {
      language: "sql",
      value:
        "SELECT\n  relname as table,\n  pg_size_pretty(pg_total_relation_size(relid)) as total,\n  pg_size_pretty(pg_relation_size(relid)) as data,\n  pg_size_pretty(pg_indexes_size(relid)) as indexes\nFROM pg_catalog.pg_statio_user_tables\nORDER BY pg_total_relation_size(relid) DESC;",
    },
    tags: ["performance", "size"],
  },
  {
    id: "list-active-connections",
    title: "List active connections",
    description: "View active connections to diagnose connection pool usage.",
    section: "ops",
    code: {
      language: "sql",
      value:
        "SELECT pid, usename, datname, application_name, state, backend_start, query\nFROM pg_stat_activity\nWHERE state != 'idle'\nORDER BY backend_start DESC;",
    },
    tags: ["ops"],
  },
  {
    id: "grant-readonly",
    title: "Create and grant read-only role",
    description:
      "Create a role and grant SELECT on all current and future tables.",
    section: "permissions",
    code: {
      language: "sql",
      value:
        "DO $$ BEGIN\n  CREATE ROLE readonly;\nEXCEPTION WHEN duplicate_object THEN NULL;\nEND $$;\n\nGRANT CONNECT ON DATABASE current_database() TO readonly;\nGRANT USAGE ON SCHEMA public TO readonly;\nGRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;\nALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly;",
    },
    tags: ["roles", "permissions"],
  },
  {
    id: "enable-rls",
    title: "Enable RLS on a table",
    description: "Turn on RLS and add a permissive policy (example).",
    section: "rls",
    code: {
      language: "sql",
      value:
        "ALTER TABLE companies ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY companies_read_own\nON companies\nFOR SELECT\nUSING (auth.uid() = owner_id);",
    },
    tags: ["rls"],
  },
]

export const LIBRARY: Record<LibraryType, LibraryDefinition> = {
  sql: {
    type: "sql",
    title: "SQL Recipes",
    description:
      "Handy SQL snippets for Postgres: schema changes, introspection, RLS, performance, and more.",
    icon: "Database",
    sections: sqlSections as unknown as LibraryDefinition["sections"],
    items: sqlItems,
  },
  prompts: {
    type: "prompts",
    title: "Prompt Library",
    description:
      "Battle-tested prompt patterns and system messages for high-signal outputs.",
    icon: "MessageSquare",
    sections: promptsSections as unknown as LibraryDefinition["sections"],
    items: promptsItems,
  },
}
