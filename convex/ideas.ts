import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getPublished = query({
  args: {},
  handler: async (ctx) => {
    const ideas = await ctx.db
      .query("ideas")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();
    return Promise.all(
      ideas.map(async (idea) => ({
        ...idea,
        coverImageUrl: idea.coverImage ? await ctx.storage.getUrl(idea.coverImage) : undefined,
      }))
    );
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const idea = await ctx.db
      .query("ideas")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!idea) return null;
    return {
      ...idea,
      coverImageUrl: idea.coverImage ? await ctx.storage.getUrl(idea.coverImage) : undefined,
    };
  },
});

export const getFeatured = query({
  args: { count: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.count ?? 3;
    const featured = await ctx.db
      .query("ideas")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .order("desc")
      .take(limit);

    let results = featured;
    if (results.length === 0) {
        results = await ctx.db
          .query("ideas")
          .withIndex("by_status", (q) => q.eq("status", "published"))
          .order("desc")
          .take(limit);
    }
    
    return Promise.all(
      results.map(async (idea) => ({
        ...idea,
        coverImageUrl: idea.coverImage ? await ctx.storage.getUrl(idea.coverImage) : undefined,
      }))
    );
  },
});

export const getPosts = query({
  handler: async (ctx) => {
    const ideas = await ctx.db.query("ideas").order("desc").collect();
    return Promise.all(
      ideas.map(async (idea) => ({
        ...idea,
        coverImageUrl: idea.coverImage ? await ctx.storage.getUrl(idea.coverImage) : undefined,
      }))
    );
  },
});

export const createIdea = mutation({
  args: {
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.array(v.string()),
    isFeatured: v.optional(v.boolean()),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
  },
  handler: async (ctx, args) => {
    // Auto-create the canonical admin user if not yet seeded
    let user = await ctx.db.query("users").first();
    if (!user) {
      const userId = await ctx.db.insert("users", {
        name: "Togolani Mavura",
        email: "admin@togolanimavura.com",
        role: "super_admin",
      });
      user = await ctx.db.get(userId);
    }
    
    return await ctx.db.insert("ideas", {
      ...args,
      slug: args.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      authorId: user!._id,
      publishedAt: args.status === "published" ? Date.now() : undefined,
    });
  },
});

export const updateIdea = mutation({
  args: {
    id: v.id("ideas"),
    title: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isFeatured: v.optional(v.boolean()),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    
    const updates: any = { ...patch };
    if (patch.title) {
      updates.slug = patch.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }
    if (patch.status === "published") {
      updates.publishedAt = Date.now();
    }
    
    await ctx.db.patch(id, updates);
  },
});

export const deleteIdea = mutation({
  args: { id: v.id("ideas") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
