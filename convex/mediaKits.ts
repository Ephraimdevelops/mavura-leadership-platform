import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getAll = query({
  handler: async (ctx) => {
    const kits = await ctx.db.query("mediaKits").order("desc").collect();
    return Promise.all(
      kits.map(async (kit) => ({
        ...kit,
        resolvedUrl: kit.fileUrl.startsWith("http") ? kit.fileUrl : (await ctx.storage.getUrl(kit.fileUrl)),
      }))
    );
  },
});

export const getPublic = query({
  handler: async (ctx) => {
    const kits = await ctx.db
      .query("mediaKits")
      .filter((q) => q.eq(q.field("isPublic"), true))
      .order("desc")
      .collect();
    return Promise.all(
      kits.map(async (kit) => ({
        ...kit,
        resolvedUrl: kit.fileUrl.startsWith("http") ? kit.fileUrl : (await ctx.storage.getUrl(kit.fileUrl)),
      }))
    );
  },
});

export const addKit = mutation({
  args: {
    label: v.string(),
    type: v.union(
      v.literal("portrait"),
      v.literal("biography"),
      v.literal("speaker_profile"),
      v.literal("press_assets"),
      v.literal("other")
    ),
    format: v.string(),
    fileUrl: v.string(),
    description: v.optional(v.string()),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("mediaKits", {
      ...args,
      uploadedAt: Date.now(),
    });
  },
});

export const updateKit = mutation({
  args: {
    id: v.id("mediaKits"),
    label: v.optional(v.string()),
    type: v.optional(v.union(
      v.literal("portrait"),
      v.literal("biography"),
      v.literal("speaker_profile"),
      v.literal("press_assets"),
      v.literal("other")
    )),
    format: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    await ctx.db.patch(id, patch);
  },
});

export const deleteKit = mutation({
  args: { id: v.id("mediaKits") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
