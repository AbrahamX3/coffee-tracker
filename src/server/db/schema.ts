import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const roastTypes = [
  "LIGHT",
  "LIGHT_MEDIUM",
  "MEDIUM",
  "MEDIUM_DARK",
  "DARK",
] as const;

export const roast = pgEnum("roast", roastTypes);

export const note = pgTable("note", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const coffeeOnNote = pgTable(
  "coffeeOnNote",
  {
    coffeeId: integer("coffeeId")
      .notNull()
      .references(() => coffee.id, { onDelete: "cascade" }),
    noteId: integer("notesId")
      .notNull()
      .references(() => note.id, { onDelete: "cascade" }),
  },
  (coffeeOnNote) => ({
    primaryKey: primaryKey({
      columns: [coffeeOnNote.coffeeId, coffeeOnNote.noteId],
    }),
  }),
);

export const noteRelations = relations(note, ({ many }) => ({
  coffees: many(coffeeOnNote),
}));

export const varietal = pgTable("varietal", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const coffeeOnVarietal = pgTable(
  "coffeeOnVarietal",
  {
    coffeeId: integer("coffeeId")
      .notNull()
      .references(() => coffee.id, { onDelete: "cascade" }),
    varietalId: integer("varietalId")
      .notNull()
      .references(() => varietal.id, { onDelete: "cascade" }),
  },
  (coffeeOnVarietal) => ({
    primaryKey: primaryKey({
      columns: [coffeeOnVarietal.coffeeId, coffeeOnVarietal.varietalId],
    }),
  }),
);

export const varietalRelations = relations(varietal, ({ many }) => ({
  coffees: many(coffeeOnVarietal),
}));

export const roaster = pgTable("roaster", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().notNull().unique(),
  instagram: text("instagram"),
  website: text("website"),
});

export const process = pgTable("process", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().notNull().unique(),
});

export const coffee = pgTable(
  "coffee",
  {
    id: serial("id").primaryKey(),
    name: text("name").unique(),
    roasterId: integer("roasterId")
      .references(() => roaster.id)
      .notNull(),
    processId: integer("processId")
      .references(() => process.id)
      .notNull(),
    region: text("region").notNull(),
    estate: text("estate"),
    altitude: integer("altitude"),
    producer: text("producer"),
    sca: real("sca"),
    personal_sca: real("personal_sca"),
    roast: roast("roast").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt"),
    active: boolean("active").default(true),
  },
  (columns) => ({
    activeIdx: index("active_idx").on(columns.active),
    scaIdx: index("sca_idx").on(columns.sca),
    personalScaIdx: index("personal_sca_idx").on(columns.personal_sca),
    nameIdx: index("name_idx").on(columns.name),
  }),
);

export const coffeeRelations = relations(coffee, ({ one, many }) => ({
  roaster: one(roaster, {
    references: [roaster.id],
    fields: [coffee.roasterId],
  }),
  process: one(process, {
    references: [process.id],
    fields: [coffee.processId],
  }),
  varietals: many(coffeeOnVarietal),
  notes: many(coffeeOnNote),
}));

export const coffeeOnNoteRelations = relations(coffeeOnNote, ({ one }) => ({
  note: one(note, {
    fields: [coffeeOnNote.noteId],
    references: [note.id],
  }),
  coffee: one(coffee, {
    fields: [coffeeOnNote.coffeeId],
    references: [coffee.id],
  }),
}));

export const coffeeOnVarietalRelations = relations(
  coffeeOnVarietal,
  ({ one }) => ({
    varietal: one(varietal, {
      fields: [coffeeOnVarietal.varietalId],
      references: [varietal.id],
    }),
    coffee: one(coffee, {
      fields: [coffeeOnVarietal.coffeeId],
      references: [coffee.id],
    }),
  }),
);

export const log = pgTable(
  "log",
  {
    id: serial("id").primaryKey(),
    date: date("date").notNull(),
    coffeeId: integer("coffeeId")
      .notNull()
      .references(() => coffee.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (columns) => ({
    dateIdx: index("date_idx").on(columns.date),
  }),
);

export const logRelations = relations(log, ({ one }) => ({
  coffee: one(coffee, {
    references: [coffee.id],
    fields: [log.coffeeId],
  }),
}));

export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    primaryKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    primaryKey: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);
