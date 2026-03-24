import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getFeatured = query({
  handler: async (ctx) => {
    const featured = await ctx.db
      .query("books")
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .collect();
      
    let results = featured;
    if (results.length === 0) {
      results = await ctx.db.query("books").order("desc").take(1);
    }
    
    return Promise.all(
      results.map(async (book) => ({
        ...book,
        coverImageUrl: book.coverImage ? await ctx.storage.getUrl(book.coverImage) : undefined,
      }))
    );
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const books = await ctx.db.query("books").order("desc").collect();
    return Promise.all(
      books.map(async (book) => ({
        ...book,
        coverImageUrl: book.coverImage ? await ctx.storage.getUrl(book.coverImage) : undefined,
      }))
    );
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("books")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    purchaseLinks: v.optional(v.array(v.object({ label: v.string(), url: v.string() }))),
    isFeatured: v.optional(v.boolean()),
    author: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("books", {
      ...args,
      publishedAt: Date.now(),
    });
  },
});

export const updateBook = mutation({
  args: {
    id: v.id("books"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    purchaseLinks: v.optional(v.array(v.object({ label: v.string(), url: v.string() }))),
    isFeatured: v.optional(v.boolean()),
    author: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    await ctx.db.patch(id, patch);
  },
});

export const deleteBook = mutation({
  args: { id: v.id("books") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
