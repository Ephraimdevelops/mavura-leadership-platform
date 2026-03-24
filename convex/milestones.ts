import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("milestones")
      .withIndex("by_order")
      .collect();
  },
});

export const create = mutation({
  args: {
    year: v.string(),
    role: v.string(),
    organization: v.string(),
    description: v.string(),
    highlights: v.array(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("milestones", args);
  },
});

export const deleteMilestone = mutation({
  args: { id: v.id("milestones") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateMilestone = mutation({
  args: {
    id: v.id("milestones"),
    year: v.optional(v.string()),
    role: v.optional(v.string()),
    organization: v.optional(v.string()),
    description: v.optional(v.string()),
    highlights: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    await ctx.db.patch(id, patch);
  },
});

// Seed the 4 canonical diplomatic milestones — idempotent, only runs if table is empty
export const seedMilestones = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("milestones").first();
    if (existing) return { seeded: false, reason: "Milestones already exist" };

    const entries = [
      {
        year: "2026—Present",
        role: "Permanent Representative to the United Nations",
        organization: "United Republic of Tanzania | New York",
        description: "Leading Tanzania's multilateral engagements at the UN Headquarters. Focusing on global peace, sustainable development, and amplifying Africa's strategic voice.",
        highlights: ["Multilateral Governance", "Global Peace & Security"],
        order: 1,
      },
      {
        year: "2021—2026",
        role: "Ambassador to the Republic of Korea",
        organization: "United Republic of Tanzania | Seoul",
        description: "Diplomatic mission centered on the Blue Economy, Energy Transition, and deepening technical cooperation with the Indo-Pacific.",
        highlights: ["Blue Economy Champion", "Industrial Cooperation"],
        order: 2,
      },
      {
        year: "2015—2021",
        role: "Private Secretary & Special Assistant",
        organization: "H.E. Jakaya Kikwete",
        description: "Coordinative leadership for UN High-Level Panels and African Union missions in global health and peace security.",
        highlights: ["Global Health Resource", "AU Peace Security"],
        order: 3,
      },
      {
        year: "2014—2015",
        role: "Personal Assistant (Speechwriter)",
        organization: "The Presidency, Tanzania",
        description: "Architecting national discourse and presidential narratives at the highest levels of governance.",
        highlights: ["Speechwriting", "Policy Alignment"],
        order: 4,
      },
    ];

    for (const entry of entries) {
      await ctx.db.insert("milestones", entry);
    }
    return { seeded: true, count: entries.length };
  },
});

