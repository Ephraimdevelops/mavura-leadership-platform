import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        role: v.union(
            v.literal("super_admin"),
            v.literal("admin"),
            v.literal("editor"),
            v.literal("viewer")
        ),
    }).index("by_email", ["email"]),

    // The core of the platform: Reflections & Essays
    ideas: defineTable({
        title: v.string(),
        slug: v.string(),
        content: v.string(), // HTML/JSON from Tiptap
        excerpt: v.string(),
        coverImage: v.optional(v.string()), // Storage ID
        authorId: v.id("users"),
        publishedAt: v.optional(v.number()),
        status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
        tags: v.array(v.string()),
        category: v.optional(v.string()), // Leadership, Diplomacy, Global Reflections, Letters
        seoTitle: v.optional(v.string()),
        seoDescription: v.optional(v.string()),
        isFeatured: v.optional(v.boolean()),
    })
        .index("by_slug", ["slug"])
        .index("by_status", ["status"]),

    // Handpicked wisdom and powerful excerpts
    quotes: defineTable({
        text: v.string(),
        source: v.optional(v.string()), // Book title, Speech, Event
        category: v.optional(v.string()), 
        publishedAt: v.number(),
        isFeatured: v.boolean(),
        author: v.optional(v.string()), // Usually Togolani Mavura, but could be others
    }).index("by_featured", ["isFeatured"]),

    // Sophisticated Newsletter System (The Mavura Letter)
    newsletterCampaigns: defineTable({
        title: v.string(),
        subject: v.string(),
        content: v.string(), // Rich HTML text
        featuredEssayId: v.optional(v.id("ideas")),
        quotesIncluded: v.optional(v.array(v.id("quotes"))),
        videosIncluded: v.optional(v.array(v.string())), // URLs
        sentAt: v.optional(v.number()),
        scheduledFor: v.optional(v.number()),
        status: v.union(v.literal("draft"), v.literal("scheduled"), v.literal("sent")),
        targetAudience: v.optional(v.string()), // e.g. "all", "leadership_forum"
        openRate: v.optional(v.number()),
        clickRate: v.optional(v.number()),
    }),

    newsletterSubscribers: defineTable({
        email: v.string(),
        name: v.optional(v.string()),
        status: v.union(v.literal("active"), v.literal("unsubscribed")),
        joinedAt: v.number(),
        source: v.optional(v.union(v.literal("homepage"), v.literal("popup"), v.literal("direct"))),
        interests: v.optional(v.array(v.string())),
        lastEmailSent: v.optional(v.number()),
    }).index("by_email", ["email"]),

    unsubscribeLinks: defineTable({
        email: v.string(),
        token: v.string(),
        campaignId: v.optional(v.id("newsletterCampaigns")),
        expiresAt: v.number(),
    }).index("by_token", ["token"]),

    // Media files tracking
    mediaFiles: defineTable({
        storageId: v.string(),
        type: v.string(), // 'image', 'video', 'document'
        fileName: v.string(),
        size: v.number(),
        uploadedBy: v.optional(v.id("users")),
    }),

    // Community & Global Leadership Forum
    community_members: defineTable({
        name: v.string(),
        email: v.string(),
        organization: v.optional(v.string()),
        roleAtOrg: v.optional(v.string()),
        interestReason: v.optional(v.string()),
        status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
        joinedAt: v.number(),
    }).index("by_email", ["email"]),
    
    // Official Correspondence Registry
    inquiries: defineTable({
        name: v.string(),
        email: v.string(),
        organization: v.optional(v.string()),
        subject: v.string(), // Speaking Role, Diplomatic Consultation, Media Inquiry, etc.
        details: v.string(),
        status: v.union(v.literal("new"), v.literal("read"), v.literal("archived")),
        createdAt: v.number(),
    }).index("by_status", ["status"]),

    // Media Archive & Documentation
    mediaEntries: defineTable({
        title: v.string(),
        slug: v.string(),
        type: v.union(v.literal("academic"), v.literal("press"), v.literal("interview"), v.literal("other")),
        outlet: v.string(),
        date: v.string(),
        description: v.string(),
        content: v.optional(v.string()), // Detail page content
        coverImage: v.optional(v.string()), // Storage ID
        thumbnailUrl: v.optional(v.string()),
        mediaUrl: v.optional(v.string()),
        externalLink: v.optional(v.string()),
        isFeatured: v.optional(v.boolean()),
        author: v.optional(v.string()), // Added for variety
    }).index("by_slug", ["slug"]),

    // Books & Publications
    books: defineTable({
        title: v.string(),
        slug: v.string(),
        description: v.string(),
        content: v.optional(v.string()), // Rich text for detail page
        coverImage: v.optional(v.string()), // Storage ID
        thumbnailUrl: v.optional(v.string()),
        purchaseLinks: v.optional(v.array(v.object({
            label: v.string(),
            url: v.string(),
        }))),
        publishedAt: v.optional(v.number()),
        isFeatured: v.optional(v.boolean()),
        author: v.optional(v.string()), // Added for variety
    }).index("by_slug", ["slug"]),

    siteSettings: defineTable({
        key: v.string(),
        value: v.any(),
    }).index("by_key", ["key"]),

    milestones: defineTable({
        year: v.string(),
        role: v.string(),
        organization: v.string(),
        description: v.string(),
        highlights: v.array(v.string()),
        order: v.number(),
    }).index("by_order", ["order"]),

    // Official Press Assets & Media Kits
    mediaKits: defineTable({
        label: v.string(), // e.g. "Official Portrait (Format A)"
        type: v.union(
            v.literal("portrait"),      // JPG image
            v.literal("biography"),     // PDF
            v.literal("speaker_profile"), // PDF
            v.literal("press_assets"),  // ZIP
            v.literal("other")
        ),
        format: v.string(),             // "JPG", "PDF", "ZIP", "PNG", etc.
        fileUrl: v.string(),            // Convex Storage or external URL
        description: v.optional(v.string()),
        isPublic: v.boolean(),          // Show on press/media download page
        uploadedAt: v.number(),
    }),
});
