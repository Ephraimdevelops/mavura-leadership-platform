import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { Resend } from "resend";
import { api } from "./_generated/api";

export const subscribe = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    source: v.optional(v.union(v.literal("homepage"), v.literal("popup"), v.literal("direct"))),
    interests: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existing) {
      if (existing.status === "active") {
        return { success: true, message: "Already subscribed" };
      }
      await ctx.db.patch(existing._id, {
        status: "active",
        joinedAt: Date.now(),
        name: args.name ?? existing.name,
      });
      return { success: true, message: "Re-subscribed" };
    }

    await ctx.db.insert("newsletterSubscribers", {
      email: args.email,
      name: args.name,
      status: "active",
      joinedAt: Date.now(),
      source: args.source ?? "direct",
      interests: args.interests,
    });

    // Trigger email action
    await ctx.scheduler.runAfter(0, api.newsletter.sendWelcomeEmail, {
        email: args.email,
        name: args.name || "Global Citizen",
    });

    return { success: true, message: "Subscribed successfully" };
  },
});

export const sendWelcomeEmail = action({
    args: { email: v.string(), name: v.string() },
    handler: async (ctx, args) => {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey || apiKey === "re_123" || apiKey.trim() === "") {
            console.log("[Newsletter] RESEND_API_KEY not configured — skipping welcome email to:", args.email);
            return { success: false, reason: "API key not configured" };
        }
        const resend = new Resend(apiKey);
        
        await resend.emails.send({
            from: "Togolani Mavura <newsletter@togolanimavura.com>",
            to: args.email,
            subject: "Welcome to The Mavura Letter",
            html: `
                <div style="font-family: serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
                    <h1 style="border-bottom: 2px solid #94a3b8; padding-bottom: 20px;">The Mavura Letter</h1>
                    <p>Dear ${args.name},</p>
                    <p>Thank you for joining our community of thinkers, leaders, and diplomats.</p>
                    <p>Welcome to a space of intellectual discourse on leadership, integrity, and the future of African diplomacy.</p>
                    <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                        <p style="font-style: italic;">In service,</p>
                        <p><strong>The Office of Ambassador Togolani Mavura</strong></p>
                    </div>
                </div>
            `,
        });
    },
});

export const unsubscribe = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const link = await ctx.db
      .query("unsubscribeLinks")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();

    if (!link || link.expiresAt < Date.now()) {
      throw new Error("Invalid or expired unsubscribe link");
    }

    const subscriber = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", link.email))
      .unique();

    if (subscriber) {
      await ctx.db.patch(subscriber._id, {
        status: "unsubscribed",
      });
    }

    await ctx.db.delete(link._id);

    return { success: true };
  },
});

export const getCampaigns = query({
  args: {
    status: v.optional(v.union(v.literal("draft"), v.literal("scheduled"), v.literal("sent"))),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("newsletterCampaigns");
    if (args.status) {
      q = q.filter((f) => f.eq(f.field("status"), args.status));
    }
    return await q.order("desc").collect();
  },
});

export const createCampaign = mutation({
  args: {
    title: v.string(),
    subject: v.string(),
    content: v.string(),
    targetAudience: v.optional(v.string()),
    featuredEssayId: v.optional(v.id("ideas")),
    quotesIncluded: v.optional(v.array(v.id("quotes"))),
    videosIncluded: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("newsletterCampaigns", {
      ...args,
      status: "draft",
    });
    return id;
  },
});

export const updateCampaign = mutation({
  args: {
    id: v.id("newsletterCampaigns"),
    title: v.optional(v.string()),
    subject: v.optional(v.string()),
    content: v.optional(v.string()),
    targetAudience: v.optional(v.string()),
    featuredEssayId: v.optional(v.id("ideas")),
    quotesIncluded: v.optional(v.array(v.id("quotes"))),
    videosIncluded: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    await ctx.db.patch(id, patch);
  },
});

export const getSubscriberStats = query({
  handler: async (ctx) => {
    const active = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email")
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();
    
    const unsubscribed = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email")
      .filter((q) => q.eq(q.field("status"), "unsubscribed"))
      .collect();

    return {
      active: active.length,
      unsubscribed: unsubscribed.length,
      total: active.length + unsubscribed.length,
    };
  },
});

export const getRecentSubscribers = query({
  args: { count: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("newsletterSubscribers")
      .order("desc")
      .take(args.count ?? 10);
  },
});

export const markCampaignSent = mutation({
  args: { campaignId: v.id("newsletterCampaigns") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.campaignId, { status: "sent", sentAt: Date.now() });
  },
});

export const sendCampaign = action({
  args: { campaignId: v.id("newsletterCampaigns") },
  handler: async (ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === "re_123" || apiKey.trim() === "") {
      throw new Error("RESEND_API_KEY is not configured. Please set it in the Convex Dashboard under Settings → Environment Variables.");
    }

    // 1. Fetch campaign details
    const campaign: any = await ctx.runQuery(api.newsletter.getCampaignById, { id: args.campaignId });
    if (!campaign) throw new Error("Campaign not found");
    if (campaign.status === "sent") throw new Error("Campaign already sent!");

    // 2. Fetch all active subscribers
    const subscribers: any[] = await ctx.runQuery(api.newsletter.getAllActiveSubscribers);
    if (subscribers.length === 0) throw new Error("No active subscribers to send to.");
    
    // 3. Send emails via Resend
    const resend = new Resend(apiKey);
    
    for (const sub of subscribers) {
        await resend.emails.send({
            from: "Togolani Mavura <newsletter@togolanimavura.com>",
            to: sub.email,
            subject: campaign.subject,
            html: `
                <div style="font-family: serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
                    <h1 style="border-bottom: 2px solid #94a3b8; padding-bottom: 20px;">The Mavura Letter</h1>
                    <h2>${campaign.title}</h2>
                    <div>${campaign.content}</div>
                    <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 12px; color: #64748b;">
                        <p>You are receiving this because you subscribed to The Mavura Letter as ${sub.email}.</p>
                    </div>
                </div>
            `,
        });
    }

    // 4. Mark as sent
    await ctx.runMutation(api.newsletter.markCampaignSent, { campaignId: args.campaignId });
    return { success: true, sentCount: subscribers.length };
  },
});

export const getCampaignById = query({
  args: { id: v.id("newsletterCampaigns") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getAllActiveSubscribers = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email")
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();
  },
});
