import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const customers = sqliteTable("customers", {id:text("id").primaryKey(),email:text("email").notNull(),name:text("name").notNull(),phone:text("phone").notNull().default(""),address:text("address").notNull().default(""),city:text("city").notNull().default("Karachi")});
export const products = sqliteTable("products", {id:text("id").primaryKey(),name:text("name").notNull(),category:text("category").notNull(),color:text("color").notNull(),price:integer("price").notNull(),stock:integer("stock").notNull(),description:text("description").notNull(),active:integer("active").notNull().default(1)});
export const orders = sqliteTable("orders", {id:text("id").primaryKey(),userId:text("user_id").notNull(),customer:text("customer").notNull(),email:text("email").notNull(),phone:text("phone").notNull(),address:text("address").notNull(),city:text("city").notNull(),items:text("items").notNull(),total:integer("total").notNull(),discount:integer("discount").notNull(),status:text("status").notNull().default("Pending"),created:text("created").notNull()});

export const catalogDetails=sqliteTable('catalog_details',{id:text('id').primaryKey(),data:text('data').notNull()});
export const orderDetails=sqliteTable('order_details',{id:text('id').primaryKey(),data:text('data').notNull()});
export const storeSettings=sqliteTable('store_settings',{id:text('id').primaryKey(),data:text('data').notNull()});
export const auditLog=sqliteTable('audit_log',{id:text('id').primaryKey(),action:text('action').notNull(),target:text('target').notNull(),created:text('created').notNull()});

export const media=sqliteTable('media',{id:text('id').primaryKey(),type:text('type').notNull(),data:text('data').notNull()});
