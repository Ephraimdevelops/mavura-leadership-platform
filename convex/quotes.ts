import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getFeatured = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("quotes")
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .first();
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("quotes").order("desc").collect();
  },
});

export const addQuote = mutation({
  args: {
    text: v.string(),
    author: v.optional(v.string()),
    source: v.optional(v.string()),
    category: v.optional(v.string()),
    isFeatured: v.boolean(),
    publishedAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("quotes", {
      ...args,
      author: args.author || "Togolani Mavura",
    });
  },
});

export const updateQuote = mutation({
  args: {
    id: v.id("quotes"),
    text: v.optional(v.string()),
    author: v.optional(v.string()),
    source: v.optional(v.string()),
    category: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    await ctx.db.patch(id, patch);
  },
});

export const deleteQuote = mutation({
  args: { id: v.id("quotes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
