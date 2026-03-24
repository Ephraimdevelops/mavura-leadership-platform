# Phase 2 Quick Start - Newsletter & Video System

## 🎯 Phase 2 Goals
Build the core foundation that everything else depends on:
1. Newsletter system with rich text editor
2. Video embedding (YouTube, Vimeo, custom)
3. Instagram quote feed integration
4. Lightweight newsletter signup popup

**Execution**: Start here, before Phase 1 & 3

---

## 📋 Task Checklist

### Step 1: Newsletter Backend (Convex)
**File**: `convex/newsletter.ts` (NEW)

- [ ] Create newsletterSubscribers collection
  - email (indexed)
  - name, subscribedAt, source
  - interests array, status
  - lastEmailSent
  
- [ ] Create newsletterCampaigns collection
  - title, subject, content (HTML)
  - featuredEssayId, quotesIncluded[], videosIncluded[]
  - status (draft/scheduled/sent)
  - scheduledFor, sentAt, openRate, clickRate
  
- [ ] Create unsubscribeLinks collection
  - email, token (indexed), campaignId

- [ ] Create backend functions:
  - `subscribeToNewsletter(email, name, source)`
  - `unsubscribeFromNewsletter(token)`
  - `createNewsletter(data)`
  - `publishNewsletter(campaignId)`
  - `getSubscribers(filter)`
  - `getCampaigns(status)`

### Step 2: Video Embed Component
**File**: `src/components/VideoEmbed.tsx` (NEW)

- [ ] Create VideoEmbed component
  - Detect YouTube URLs
  - Detect Vimeo URLs
  - Support custom video URLs
  - Responsive aspect ratio (16:9)
  - Lazy loading
  - Accessibility (alt text, title)

```typescript
// Usage:
<VideoEmbed url="https://youtube.com/watch?v=..." />
<VideoEmbed url="https://vimeo.com/123456" />
```

### Step 3: Newsletter Rich Text Editor
**File**: `src/components/admin/NewsletterEditor.tsx` (NEW)

- [ ] Use TipTap editor (already in stack)
- [ ] Add extensions:
  - StarterKit (basic formatting)
  - Heading (h1-h3)
  - BulletList, OrderedList
  - Blockquote
  - CodeBlock
  - Link
  - Image
  - **Video (YouTube/Vimeo)**
  
- [ ] Create editor UI:
  - Rich text formatting toolbar
  - Video embed button
  - Image upload button
  - Preview panel
  - Save as draft button
  - Schedule picker
  - Featured essay selector
  
- [ ] Add custom menu items:
  - Insert YouTube video
  - Insert Vimeo video
  - Insert custom video URL
  - Insert quote
  - Select featured essay

### Step 4: Newsletter Signup Popup
**File**: `src/components/NewsletterPopup.tsx` (NEW)

- [ ] Create popup component
  - Fade in animation (Framer Motion)
  - Centered modal (max-width 500px)
  - Navy/gold color scheme
  - Serif heading (Cormorant Garamond)
  - Sans-serif body (Inter)
  
- [ ] Trigger logic:
  - Show after 30 seconds on page
  - Only once per session
  - Remember dismissed state (localStorage)
  - Exit intent detection (optional)
  
- [ ] Form fields:
  - Email input (required)
  - First name input (optional)
  - "Join The Mavura Letter" button
  - Easy close (X button)

- [ ] Form submission:
  - Call subscribeToNewsletter function
  - Show success message
  - Close popup after 2 seconds
  - Handle errors gracefully

### Step 5: Instagram Feed Integration
**File**: `src/components/InstagramQuoteFeed.tsx` (NEW)

- [ ] Create API route: `pages/api/instagram/[username].ts`
  - Use Instagram Graph API (requires Business account + token)
  - Cache results (24 hour TTL)
  - Return: id, imageUrl, caption, url, timestamp
  - Handle errors gracefully
  
- [ ] Alternative: embed.ly or simple Instagram embed
  - If Graph API too complex, use simpler approach
  
- [ ] Create InstagramQuoteFeed component:
  - Grid display (1 col mobile, 3 col desktop)
  - 6 latest posts
  - Click to open Instagram
  - Hover effect (overlay with arrow)
  - Loading state
  - Error state

### Step 6: Update Convex Schema
**File**: `convex/schema.ts` (MODIFY)

- [ ] Add essays collection:
  ```
  - title, slug, content
  - category: Leadership | Diplomacy | Global Reflections | Letters
  - coverImage, videoEmbed (optional)
  - author, publishedAt, updatedAt
  - readingTime, viewCount, featured
  - status: published | draft | archived
  ```

- [ ] Update users collection (if needed):
  - roles: admin, editor, community_manager

- [ ] Note: Don't delete anything yet (wait for Phase 1)

### Step 7: Newsletter Form Component
**File**: `src/components/forms/NewsletterForm.tsx` (NEW)

- [ ] Reusable form component
  - Email input
  - Optional name input
  - Submit button
  - Loading state
  - Error handling
  - Success state
  
- [ ] Use in:
  - NewsletterPopup
  - Homepage section
  - Footer
  - Blog sidebar
  - Anywhere you want newsletter signup

### Step 8: Admin Newsletter Manager
**File**: `src/components/admin/NewsletterManager.tsx` (NEW)

- [ ] Create campaign creation UI
  - Title, subject inputs
  - Rich text editor (use NewsletterEditor)
  - Featured essay dropdown
  - Add quotes button
  - Add videos button
  - Save draft / Schedule / Send buttons
  
- [ ] Create campaign list
  - List all campaigns
  - Filter by status (draft, scheduled, sent)
  - Edit draft campaigns
  - View campaign stats (open rate, click rate)
  - Delete campaigns
  
- [ ] Subscriber management
  - List all subscribers
  - Filter by status
  - Export subscriber list
  - Manual unsubscribe
  - View subscriber activity

### Step 9: Email Template System
**File**: `convex/email.ts` (NEW - Optional)

- [ ] Create email templates
  - Newsletter welcome email
  - Newsletter campaign template
  - Confirm unsubscribe email
  
- [ ] Setup email service
  - Use SendGrid, Mailgun, or Convex email
  - Create environment variables
  - Test email sending

### Step 10: Testing
- [ ] Test newsletter subscription flow
  - Homepage signup
  - Popup signup
  - Footer signup
  - Verify data in Convex database
  
- [ ] Test video embedding
  - YouTube videos in newsletter
  - Vimeo videos in newsletter
  - Custom video URLs
  - Responsive on mobile
  
- [ ] Test Instagram feed
  - Verify API token setup
  - Check feed loads correctly
  - Test hover effects
  - Verify links to Instagram
  
- [ ] Test popup
  - Shows after 30 seconds
  - Can dismiss
  - Doesn't show again in same session
  - Form submits correctly

---

## 🎨 Design Tokens to Use

```typescript
// Colors
navy: '#0F1419'
gold: '#D4AF37'
cream: '#FAF7F2'
darkGray: '#2D3436'
lightGray: '#F5F5F5'

// Typography
headings: 'Cormorant Garamond' (serif)
body: 'Inter' (sans-serif)

// Spacing
sectionVertical: '80px'
sectionHorizontal: '20px'
maxWidth: '720px' (content), '1200px' (layout)

// Shadow
subtle: '0 1px 2px rgba(0,0,0,0.05)'
medium: '0 4px 6px rgba(0,0,0,0.1)'
```

---

## �� Dependencies (Check if needed)

Already in stack:
- ✅ TipTap (rich text editor)
- ✅ Framer Motion (animations)
- ✅ Convex (backend)
- ✅ React Hook Form (forms)
- ✅ Next.js (routing)

Might need to add:
- `@tiptap/extension-youtube` - YouTube embed in editor
- `@tiptap/extension-vimeo` - Vimeo embed in editor
- `react-player` - Alternative video player
- `date-fns` - Date formatting for scheduling

---

## 🚀 Priority Order

1. **First**: Newsletter backend (convex/newsletter.ts)
   - Most critical, blocks everything else
   
2. **Second**: VideoEmbed component
   - Simple reusable component
   - Used everywhere
   
3. **Third**: NewsletterEditor with video support
   - Complex but self-contained
   - Most important for campaign creation
   
4. **Fourth**: NewsletterPopup
   - Simple, standalone
   - Nice UX improvement
   
5. **Fifth**: Instagram integration
   - Can work with or without (fallback)
   - Least critical
   
6. **Last**: Admin UI and email templates
   - Polish and optional features

---

## ✅ Phase 2 Success Criteria

- [ ] Newsletter subscribers saving to database
- [ ] Videos embedding in newsletter editor
- [ ] Popup triggering and collecting emails
- [ ] Instagram feed displaying correctly
- [ ] Admin can create and schedule campaigns
- [ ] All forms submitting without errors
- [ ] Mobile responsive everywhere
- [ ] Performance good (< 2s load)

---

## 💡 Tips & Gotchas

1. **Instagram Graph API**:
   - Requires Business Instagram account (not personal)
   - Takes time to get approved
   - Token must be refreshed periodically
   - Fallback: Use simple Instagram embed or hardcode posts

2. **Video Embedding**:
   - Always use `nocookie` option for YouTube (privacy)
   - Test on mobile (aspect ratio important)
   - Use lazy loading for performance

3. **Email Sending**:
   - Set up transactional email service early
   - Test with your own email first
   - Monitor deliverability

4. **Newsletter UI**:
   - Make editor intuitive
   - Preview should match email output
   - Scheduling should be clear (timezone)

---

## 📞 Next Steps

Ready to start Phase 2?

1. Start with `convex/newsletter.ts`
2. Then `src/components/VideoEmbed.tsx`
3. Then `src/components/admin/NewsletterEditor.tsx`
4. Then remaining components

Let's build! 🚀

