# Mavura Leadership Platform - Implementation Guide

## 🎯 Strategic Vision

**Platform Type**: Personal Leadership Brand (NOT SaaS)
**Feel**: California intellectual studio + Modern diplomatic archive + Premium thought-leadership journal
**Primary Goal**: Newsletter subscribers + Community engagement
**Secondary Goals**: Media inquiries, Speaking requests, Brand awareness

---

## EXECUTION ORDER: Phase 2 → Phase 1 → Phase 3

### PHASE 2 FIRST (Week 3-4): CORE SYSTEMS
**Why First?** Newsletter + video system needed before Phase 1 & 3

1. Newsletter system (subscribers, campaigns, rich text editor)
2. Video embedding everywhere (blog, newsletter, forms)
3. Instagram quote feed integration
4. Newsletter popup system (lightweight, elegant)

### PHASE 1 SECOND (Week 1-2): FOUNDATION
**Why Second?** Remove old components, set up pages using Phase 2 systems

1. Remove Pay-R components (Pricing, Features, Modules, Demo forms)
2. Simplify navigation (Home, Ideas, Quotes, Book, Community, About)
3. Create Mavura page templates
4. Adapt Convex schema (essays, newsletter, etc)

### PHASE 3 THIRD (Week 5-6): CONTENT & FEATURES
**Why Third?** Uses infrastructure from Phase 1 & 2

1. Press/Media page + inquiry form (different from contact)
2. Request a Greeting page/form
3. Community integration (WhatsApp + Circle)
4. Speaking invitation management

---

## PHASE 2: CORE SYSTEMS (Week 3-4)

### 2.1 Newsletter System - Backend

Create file: `convex/newsletter.ts`

**Collections Needed**:

```
newsletterSubscribers:
  - email (unique)
  - name (optional)
  - subscribedAt (timestamp)
  - source: "homepage" | "popup" | "direct"
  - interests: ["essays", "quotes", "events"]
  - status: "active" | "unsubscribed"
  - lastEmailSent (optional timestamp)

newsletterCampaigns:
  - title
  - subject (for email)
  - content (rich HTML text)
  - featuredEssayId (optional essay reference)
  - quotesIncluded (array of quote IDs)
  - videosIncluded (array of video URLs)
  - status: "draft" | "scheduled" | "sent"
  - scheduledFor (optional timestamp)
  - sentAt (optional timestamp)
  - openRate, clickRate (optional)
  - createdAt, updatedAt

unsubscribeLinks:
  - email
  - token (unique)
  - campaignId (optional)
```

**Key Functions**:
- Subscribe/unsubscribe from newsletter
- Create newsletter campaigns
- Schedule campaigns
- Send campaigns
- Track opens/clicks
- Get subscriber stats

### 2.2 Rich Text Newsletter Editor

Create file: `src/components/admin/NewsletterEditor.tsx`

**Features Required**:
- TipTap rich text editor (already in stack)
- **Video embedding**:
  - YouTube embeds
  - Vimeo embeds
  - Custom video URLs
  - Preview in editor
- Image upload
- Blockquote, code blocks, lists
- Link insertion
- Heading levels (h1-h3)
- Save as draft
- Preview mode
- Schedule sending
- Select featured essay
- Add quotes/videos easily

**Design**: 
- Sidebar with formatting tools
- Main editor area
- Preview panel
- Publication settings below

### 2.3 Newsletter Signup Popup

Create file: `src/components/NewsletterPopup.tsx`

**Design Principles**:
- Lightweight, non-intrusive
- Elegant animation (fade in)
- Easy dismiss (X button)
- Max 500px width
- Navy/gold color scheme
- Serif heading, sans-serif body

**Trigger Options**:
- Exit intent (user moving to leave)
- After 30 seconds on page
- Once per session only
- Remember dismissed state in localStorage

**Form Fields**:
- Email (required)
- First Name (optional)
- CTA: "Join The Mavura Letter"

### 2.4 Video Embedding System

Create file: `src/components/VideoEmbed.tsx`

**Capability**:
- Detect video type (YouTube, Vimeo, custom URL)
- Responsive embed with proper aspect ratio
- Lazy loading
- Accessibility support

**Use Everywhere**:
- Newsletter campaigns
- Blog posts / Essays
- Admin forms
- Homepage featured video

**Support**:
- YouTube (youtube.com, youtu.be)
- Vimeo (vimeo.com)
- Custom video URLs

### 2.5 Instagram Quote Feed Integration

Create file: `src/components/InstagramQuoteFeed.tsx`

**Display**:
- Grid of 6 latest Instagram posts
- Click to open Instagram post
- Hover effect (overlay with "View on Instagram")
- Responsive grid (1 col mobile, 3 col desktop)

**Backend**: 
- Create API route: `/api/instagram/[username]`
- Use Instagram Graph API or embed.ly
- Cache results (refresh every 24 hours)

**Setup**:
- Instagram Business Account
- Graph API token
- Approve app access
- Token in environment variables

### 2.6 Convex Schema Additions

Update file: `convex/schema.ts`

Add these collections:

```
essays (new - replaces blog):
  - title, slug, content
  - category: "Leadership" | "Diplomacy" | "Global Reflections" | "Letters"
  - coverImage, videoEmbed (optional featured video!)
  - author, publishedAt, updatedAt
  - readingTime, viewCount
  - featured (boolean)
  - status: "published" | "draft" | "archived"

(Newsletter, quotes already covered in 2.1)
```

Remove these:
- blogPosts → replace with essays
- testimonials (corporate feature)
- companies (SaaS feature)
- leads (not needed)
- globalStats (not needed)

---

## PHASE 1: FOUNDATION (Week 1-2)

### 1.1 Remove Pay-R Components

**DELETE these files**:
```
src/components/home/Pricing.tsx
src/components/home/Features.tsx
src/components/home/Modules.tsx
src/components/home/ModuleSection.tsx
src/components/forms/DemoRequestForm.tsx
src/app/features/
src/app/get-quote/ (whole directory)
src/app/integrations/
src/app/mobile/
src/app/roi-calculator/
```

**MODIFY these files**:
- `src/app/page.tsx` - Remove pricing, features, modules sections
- `src/components/layout/Header.tsx` - Remove links to deleted pages
- `src/components/layout/Footer.tsx` - Simplify footer links
- `convex/schema.ts` - Remove companies, leads, testimonials, blogPosts

### 1.2 Update Navigation

File: `src/components/layout/Header.tsx`

**New Navigation**:
```
Home → Ideas → Quotes → Book → Community → About

(Contact page exists but not in main nav - link from footer/admin areas)
```

**Simplified header**:
- Logo left
- Nav items center
- Admin link right
- Mobile hamburger menu

### 1.3 Create Mavura Homepage

File: `src/app/page.tsx` (NEW)

**Sections**:
1. **Hero**
   - Serif heading (Cormorant Garamond)
   - Subtitle about leadership/ideas
   - Newsletter signup CTA
   - Scroll indicator

2. **Latest Essay**
   - Preview of most recent essay
   - Title, category, excerpt
   - "Read full essay" link
   - Featured image

3. **Instagram Quotes Feed**
   - "Recent Thoughts" section
   - 6 latest Instagram posts grid
   - "Follow on Instagram" link

4. **Newsletter Banner**
   - "The Mavura Letter" title
   - Description: "Monthly essays on leadership, diplomacy, global affairs"
   - Email signup form
   - Expected frequency

5. **Community Section**
   - WhatsApp community link
   - Circle.so membership link
   - Brief value prop

6. **Call-to-Action Section**
   - "Request a Greeting" button
   - "Media Inquiries" button
   - "Speaking Engagements" link

7. **Footer**
   - Contact info
   - Social media links
   - Copyright

### 1.4 Create New Pages

**Essays Page**: `src/app/ideas/page.tsx`
- List all published essays
- Filter by category
- Search functionality
- Most recent first

**Essay Detail**: `src/app/ideas/[slug]/page.tsx`
- Full essay content
- Video embeds supported
- Reading time
- Share buttons
- Related essays (same category)
- Newsletter signup CTA

**Quotes Page**: `src/app/quotes/page.tsx`
- Instagram feed displayed
- "Follow on Instagram" CTA
- Quote categories (if not using Instagram)

**Book Page**: `src/app/book/page.tsx`
- If Togolani has written a book
- Book cover image
- Description
- Purchase links (Amazon, etc)
- Reviews

**Community Page**: `src/app/community/page.tsx`
- WhatsApp community embed/link
- Circle.so member info
- Community guidelines
- Upcoming community events

**About Page**: `src/app/about/page.tsx`
- Togolani's bio
- Photo
- Philosophy/mission
- Credentials
- Social media links

### 1.5 Simplify Admin Dashboard

File: `src/app/admin/page.tsx` (MODIFY)

**Admin Tabs**:
1. **Overview**
   - Newsletter subscriber count
   - New media inquiries count
   - Recent greeting requests count
   - Recent essay views

2. **Newsletter** (uses Phase 2 work)
   - Campaign creation
   - Subscriber management
   - Campaign performance

3. **Essays**
   - Create/edit essays
   - Upload cover images
   - Embed videos
   - Publish/draft/archive
   - Category management

4. **Inbox**
   - Contact form submissions
   - Media inquiries
   - Greeting requests
   - Speaking invitations
   - Filter by status

### 1.6 Update Convex Schema

File: `convex/schema.ts` (MODIFY)

**Add**:
- essays collection
- newsletter collections (from Phase 2)

**Remove**:
- companies
- leads
- testimonials
- blogPosts
- globalStats

**Keep & simplify**:
- users (but simplify roles)
- analytics (basic page views + newsletter events)

### 1.7 Design System File

Create file: `src/lib/design-tokens.ts`

**Colors**:
```
Primary Navy: #0F1419
Gold Accent: #D4AF37
Cream Background: #FAF7F2
Dark Gray: #2D3436
Light Gray: #F5F5F5
```

**Typography**:
```
Headings: Cormorant Garamond (serif)
Body: Inter (sans-serif)
Code: JetBrains Mono

H1: 48px (web), 36px (mobile)
H2: 36px (web), 28px (mobile)
H3: 28px (web), 24px (mobile)
Body: 16px
Small: 14px
Line-height: 1.8 (essays), 1.6 (body)
```

**Spacing**:
```
Section vertical: 80px
Section horizontal: 20px (mobile), 40px (desktop)
Max content width: 720px (essays), 1200px (layout)
```

---

## PHASE 3: CONTENT & FEATURES (Week 5-6)

### 3.1 Press/Media Page

File: `src/app/press/page.tsx` (NEW)

**Page Sections**:
1. Header
   - "Press Center"
   - Subtitle

2. Featured Coverage
   - Recent media mentions
   - Publication logo + link

3. Media Kit
   - Download PDF button
   - Headshots gallery
   - Bio/credentials

4. Media Inquiry Form
   - **Different from contact form!**
   - Fields:
     * Publication name (required)
     * Your name (required)
     * Email (required)
     * Phone (optional)
     * Story pitch/subject (required)
     * Deadline (optional)
     * Exclusive/non-exclusive (dropdown)
     * Preferred contact (email/phone)

5. Quotes for Media
   - 3-5 pre-approved quotes
   - Copy-to-clipboard button

6. Link to speaking inquiries

### 3.2 Media Inquiries Backend

File: `convex/media.ts` (NEW)

```
mediaInquiries collection:
  - publicationName
  - inquirerName, email, phone (optional)
  - storyPitch (required)
  - deadline (optional timestamp)
  - exclusiveStatus: "exclusive" | "non-exclusive"
  - preferredContact: "email" | "phone"
  - status: "new" | "acknowledged" | "in-progress" | "completed" | "declined"
  - response (optional)
  - respondedAt (optional)
  - createdAt
```

### 3.3 Request a Greeting Page

File: `src/app/greeting/page.tsx` (NEW)

**Page Content**:
1. Header
   - "Request a Greeting"
   - Explanation (video message from Togolani)

2. Request Form
   - Recipient name (required)
   - Occasion (dropdown: birthday, anniversary, celebration, other)
   - Recipient email (required)
   - Your name (required)
   - Your relationship to recipient (optional)
   - Special details/message (textarea)
   - Date needed by (date picker)
   - Public/private (checkbox - OK to share on social?)

3. Info Section
   - Expected turnaround time
   - What to expect
   - Previous examples (short videos or testimonials)

### 3.4 Greeting Requests Backend

File: `convex/greetings.ts` (NEW)

```
greetingRequests collection:
  - recipientName, occasion
  - recipientEmail, senderName, senderEmail
  - specialDetails
  - dateNeededBy (timestamp)
  - isPublic (boolean)
  - status: "pending" | "recording" | "processing" | "delivered" | "published"
  - videoUrl (optional - added when ready)
  - createdAt
```

### 3.5 Speaking Invitations

File: `convex/speaking.ts` (NEW)

**Invitation Form**:
```
greetingRequests collection:
  - eventName
  - organizerName, organizerEmail, organizerPhone
  - eventDate (timestamp)
  - eventLocation
  - eventFormat: "in-person" | "virtual" | "hybrid"
  - expectedAttendees (number)
  - topic (required)
  - timeSlot
  - honorarium (optional)
  - additionalDetails
  - status: "pending" | "accepted" | "declined" | "confirmed"
  - createdAt
```

### 3.6 Community Integration

File: `src/app/community/page.tsx` (ENHANCED)

**Additions**:
- WhatsApp community link (button)
- Circle.so embed or button
- Community event calendar
- Community guidelines
- Member testimonials

---

## 📋 Summary of Collections

**DELETE**:
- companies
- leads
- testimonials
- blogPosts
- globalStats

**CREATE NEW**:
- essays (replace blog)
- newsletterSubscribers
- newsletterCampaigns
- unsubscribeLinks
- mediaInquiries
- greetingRequests
- speakingInvitations

**KEEP**:
- users (adapt roles)
- analytics (simplify)

---

## 🎨 Design Philosophy

Platform should FEEL LIKE:
✓ California intellectual studio (minimal, focused)
✓ Diplomatic archive (authoritative, organized)
✓ Premium thought-leadership journal (elegant, profound)

NOT LIKE:
✗ Corporate website
✗ Product sales funnel
✗ Flashy marketing site

**Key Design Principles**:
- Minimal navigation (5-6 pages)
- Elegant typography (serif + sans-serif)
- Ample whitespace
- Deep content focus
- Fast, minimal animations

---

## 🚀 Implementation Steps

**Phase 2 First** (Newsletter & video foundation):
- [ ] Create convex/newsletter.ts with collections
- [ ] Build NewsletterEditor.tsx (rich text + video)
- [ ] Build NewsletterPopup.tsx (lightweight)
- [ ] Create VideoEmbed.tsx component
- [ ] Set up Instagram API/feed
- [ ] Test video embedding in newsletter

**Then Phase 1** (Foundation & pages):
- [ ] Delete old Pay-R components
- [ ] Update header/nav
- [ ] Create new page structure
- [ ] Build Mavura homepage
- [ ] Update admin dashboard
- [ ] Test all pages responsive

**Then Phase 3** (Content & engagement):
- [ ] Build Press/Media page + form
- [ ] Build Greeting request page + form
- [ ] Create Speaking invitation form
- [ ] Integrate community platforms
- [ ] Set up form notifications
- [ ] Admin UI for all inquiries

---

## Ready to START Phase 2! 🚀

Confirm you want to begin with:
1. Newsletter system (convex/newsletter.ts)
2. Rich text editor (NewsletterEditor.tsx)
3. Video embedding (VideoEmbed.tsx)
4. Newsletter popup (NewsletterPopup.tsx)
5. Instagram feed (InstagramQuoteFeed.tsx)

Let's build the foundation that everything else depends on!

