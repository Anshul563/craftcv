import { pgTable, text, timestamp, boolean, jsonb, integer, serial } from "drizzle-orm/pg-core";

// =========================================
// 🔐 AUTHENTICATION TABLES (Better Auth)
// =========================================

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  
  // Custom Field: Track User Plan
  plan: text("plan").default("free").notNull(), // 'free' or 'pro'
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  token: text("token").notNull(),
  userAgent: text("userAgent"),
  userId: text("userId").notNull().references(() => users.id),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const accounts = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId").notNull().references(() => users.id),
  scope: text("scope"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: timestamp("expiresAt"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const verifications = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

// =========================================
// 📝 APP DATA TABLES (Resumes & Payments)
// =========================================

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text("title").notNull().default('Untitled Resume'),
  
  // We'll store the entire resume structure (personal info, education, etc.) as JSON
  content: jsonb("content").notNull().default({}), 
  
  template: text("template").notNull().default('modern'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull().references(() => users.id),
  razorpayOrderId: text("razorpay_order_id").notNull(),
  razorpayPaymentId: text("razorpay_payment_id"),
  status: text("status").notNull(), // 'created', 'paid', 'failed'
  amount: integer("amount").notNull(), // Amount in paise (e.g. 99900 = 999 INR)
  createdAt: timestamp("created_at").defaultNow(),
});