# Pay-R Website - Quick Reference Guide

## 📌 Essential Information at a Glance

### 🌐 Website Overview
**Pay-R** is an HR & Payroll management platform with a beautiful marketing website built on Next.js.

| Aspect | Details |
|--------|---------|
| **Purpose** | B2B SaaS marketing + lead generation |
| **Technology** | Next.js 16 + React 19 + Convex + TailwindCSS |
| **Users** | HR Professionals, CFOs, Business Owners |
| **Key Metric** | Lead generation & demo bookings |

---

## 🎯 Top 5 Most Important Features

### 1. **Demo Request Form** 🎤
- **Where**: Hero section, CTA section, Header button
- **Captures**: Name, email, company, phone, employee count, module interests
- **Impact**: Main lead generation tool
- **Status**: Forms submit to admin dashboard

### 2. **Admin Dashboard** 📊
- **Where**: `/admin` (protected route)
- **Manages**: Leads, blog posts, testimonials, announcements
- **Impact**: Content & lead management hub
- **Tabs**: Overview, Ticker, Testimonials, Blog, Leads

### 3. **Pricing Calculator** 💰
- **Where**: Homepage pricing section
- **Interactive**: Employee slider, monthly/yearly toggle
- **Calculation**: Real-time price updates based on team size
- **Impact**: Helps prospects understand costs

### 4. **ROI Calculator** 📈
- **Where**: `/roi-calculator` (standalone page)
- **Shows**: Annual savings from using Pay-R
- **Inputs**: Employee count, salary, processing hours
- **Impact**: Justifies ROI to finance teams

### 5. **Blog System** 📝
- **Where**: `/blog` (public), `/admin` (manage)
- **Features**: Rich text editor, cover images, tags, publishing
- **Impact**: SEO, thought leadership, traffic driving

---

## 🚀 Quick Navigation by Role

### For **Marketing Manager**
```
Homepage Layout
├─ Update hero messaging → Edit Hero.tsx
├─ Change CTA buttons → Edit CTA.tsx
├─ Update testimonials → Admin → Testimonials tab
├─ Create blog post → Admin → Blog tab
└─ Set announcements → Admin → Ticker tab
```

### For **Sales Team**
```
Lead Management
├─ View new leads → Admin → Overview/Leads tabs
├─ Update lead status → Click in Leads tab
├─ Assign to team → Select person in Leads tab
├─ Add notes → Notes field in Leads tab
└─ Track module interests → See in lead details
```

### For **Product Manager**
```
Feature Updates
├─ Update feature descriptions → Edit Features.tsx
├─ Add/edit modules → Edit Modules.tsx
├─ Update pricing tiers → Edit Pricing.tsx
├─ Create case studies → Add blog posts
└─ Manage integrations page → Edit /integrations
```

### For **Developer**
```
Key Files to Know
├─ Pages: src/app/[route]/page.tsx
├─ Components: src/components/[section]/
├─ Backend: convex/[feature].ts
├─ Styling: src/app/globals.css
└─ Config: package.json, next.config.ts
```

---

## 💾 Data Flow Cheat Sheet

### Form → Database → Admin View
```
1. User fills Demo Form (DemoRequestForm.tsx)
2. Form submits via useMutation (api.submissions.submitDemoRequest)
3. Data stored in Convex DB (submissions collection)
4. Admin views in Dashboard (Admin page → Leads tab)
5. Admin can update status, notes, assignment
```

### Content → Published
```
1. Admin creates blog post (Admin → Blog tab)
2. Uploads cover image → Stored in Convex storage
3. Sets status to "Published"
4. Appears at /blog/[slug] automatically
5. Listed on /blog main page
```

### Announcement → Homepage
```
1. Admin creates announcement (Admin → Ticker tab)
2. Sets as active
3. Appears in header ticker immediately
4. Updates all pages via Convex real-time sync
```

---

## 🎨 Styling Quick Tips

### Colors
```
Brand Blue: #41A1E1
Success Green: #22c55e
Gradients: from-[#41A1E1] via-purple-600 to-[#41A1E1]
Accent: Use Tailwind color names (red, blue, green, etc)
```

### Common Classes
```
Container: container mx-auto px-4 md:px-6
Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
Section: py-20 md:py-28
Card: bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8
Button: Button component (see src/components/ui/button.tsx)
```

### Dark Mode
```
Always add dark: variants for dark mode
Examples:
- dark:bg-slate-900
- dark:text-white
- dark:hidden / hidden dark:block (for images)
```

---

## 🔑 Key Files & Their Purpose

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Homepage layout |
| `src/components/layout/Header.tsx` | Navigation header |
| `src/components/forms/DemoRequestForm.tsx` | Lead capture form |
| `src/app/admin/page.tsx` | Admin dashboard |
| `src/components/home/Pricing.tsx` | Pricing calculator |
| `src/app/roi-calculator/page.tsx` | ROI tool |
| `convex/submissions.ts` | Form handling backend |
| `convex/blog.ts` | Blog management |
| `convex/cms.ts` | Content management |
| `convex/analytics.ts` | Dashboard stats |
| `convex/schema.ts` | Database schema |

---

## 🔧 Common Tasks & How-To

### Add a New Page
1. Create folder: `src/app/new-page/`
2. Create file: `src/app/new-page/page.tsx`
3. Import Header, Footer components
4. Add to Header navigation if needed
5. Deploy

### Add a Feature Card
1. Go to `Features.tsx`
2. Add to `features` array:
```tsx
{
    title: "Feature Name",
    description: "Description",
    icon: IconComponent,
    color: "text-color-500",
    bg: "bg-color-50",
}
```

### Create Blog Post
1. Go to Admin Dashboard (`/admin`)
2. Click Blog tab
3. Click "Create Post"
4. Fill: Title, Slug, Content (rich text), Cover image
5. Set status to "Published"
6. Live immediately at `/blog/[slug]`

### Update Pricing
1. Go to `Pricing.tsx`
2. Update base prices:
```tsx
Starter: $49 → change to $X
Professional: $99 → change to $X
Enterprise: $199 → change to $X
```
3. Formulas adjust automatically

### Add Testimonial
1. Go to Admin Dashboard
2. Click Testimonials tab
3. Fill: Client name, quote, role, company
4. Upload logo image
5. Save - appears on homepage immediately

### Change Header Announcement
1. Go to Admin Dashboard
2. Click Ticker tab
3. Edit existing or create new
4. Updates on all pages in real-time

---

## 📊 Form Types & Storage

| Form Type | Stores in | Admin Access | Purpose |
|-----------|-----------|:---:|---------|
| Demo Request | submissions (type: "demo") | Leads tab | Schedule call |
| Contact Form | submissions (type: "contact") | Leads tab | General inquiry |
| Blog Comment | (future) | (future) | Engagement |
| Newsletter | (planned) | (planned) | Email list |

---

## 🎬 Current Funnel Metrics

```
What gets tracked:
✅ Demo requests (complete with data)
✅ Contact form submissions
✅ Lead source (page they came from)
✅ Module interests
✅ Company & employee count
✅ Preferred demo date/time

What could be tracked:
⚠️ Page views
⚠️ Scroll depth
⚠️ Time on page
⚠️ Form abandonment
⚠️ Button clicks
```

---

## 🔐 Admin Access Control

### Role-Based Permissions
```
super_admin: Full access to everything
admin: Full access to everything
editor: Can manage blog posts, testimonials, content
marketing: Can manage announcements, promotions
sales: Can view and manage leads
viewer: Read-only access
```

### Protected Route
```tsx
// /admin requires authentication middleware
// Defined in src/middleware.ts
// Checks user role before allowing access
```

---

## 📱 Mobile Considerations

### Responsive Points
- Mobile: 0-640px (single column, full-width buttons)
- Tablet: 641-1024px (2-column grids)
- Desktop: 1025px+ (3+ column grids, sidebars)

### Common Issues & Fixes
```
Form too small on mobile?
→ Use full-width buttons, flex-col for mobile

Images not showing properly?
→ Use next/image with responsive sizes

Navigation too crowded?
→ Use mobile menu with hamburger toggle

Text too small?
→ Use md: prefixed sizes for tablet/desktop
```

---

## 🚀 Performance Optimization Checklist

- ✅ Images optimized with next/image
- ✅ Code splitting by route
- ✅ Lazy loading components
- ✅ TailwindCSS tree-shaking
- ✅ Dark mode theme switching
- ✅ Framer Motion GPU acceleration
- ⚠️ Could add: Image compression
- ⚠️ Could add: API caching strategy
- ⚠️ Could add: Database query optimization

---

## 🐛 Debugging Common Issues

### Form Not Submitting
```
Check:
1. Browser console for errors
2. Network tab - does request go out?
3. Convex console - is mutation running?
4. Database - is record created?
```

### Page Not Showing Data
```
Check:
1. useQuery hook is called
2. Data is loading - see spinner?
3. Error state - any error messages?
4. Database has data - check Convex dashboard
```

### Styling Not Applied
```
Check:
1. Class names spelled correctly
2. Dark mode variant needed? Add dark:
3. Responsive variant needed? Add md:, lg:
4. Z-index conflict? Adjust z- value
5. CSS specificity issue? Use !important as last resort
```

### Admin Dashboard Empty
```
Check:
1. User authenticated?
2. User has correct role?
3. Database has records?
4. Query is correct? Check Convex
5. Component mounted? Check React dev tools
```

---

## 📚 Documentation Files

Created for this project:

1. **WEBSITE_FUNCTIONALITY_OVERVIEW.md** - Complete feature breakdown
2. **WEBSITE_FLOWS_AND_STRUCTURE.md** - User flows & page structure  
3. **FEATURE_DEEP_DIVE.md** - Code examples & detailed features
4. **QUICK_REFERENCE.md** - This file!

---

## 📞 Need Help?

### For Design/Styling
- Check Tailwind docs: https://tailwindcss.com
- Check Radix UI: https://radix-ui.com

### For React/Next.js
- Next.js docs: https://nextjs.org/docs
- React docs: https://react.dev

### For Backend/Database
- Convex docs: https://docs.convex.dev
- Check convex/_generated/api.d.ts for types

### For This Project
- Check src/components/ for examples
- Check convex/ for database logic
- Check src/app/ for page structures

---

## ✅ Pre-Launch Checklist

- [ ] All forms submitting correctly
- [ ] Admin dashboard accessible
- [ ] Blog posts publishing
- [ ] Pricing calculator working
- [ ] ROI calculator calculating
- [ ] Mobile responsive on all pages
- [ ] Dark mode working
- [ ] All links working
- [ ] Analytics tracking events
- [ ] Error handling in place
- [ ] Meta tags for SEO
- [ ] Contact information correct
- [ ] Demo form email notifications
- [ ] Lead CRM integration (if using)
- [ ] Backup & disaster recovery plan

---

## 📊 Key Metrics to Monitor

```
Daily:
- New leads/demo requests
- Form conversion rate
- Mobile vs desktop traffic

Weekly:
- Demo attendance rate
- Lead to customer conversion
- Blog traffic & engagement
- Top performing pages

Monthly:
- MRR (Monthly Recurring Revenue)
- CAC (Customer Acquisition Cost)
- Churn rate
- Feature usage analytics
```

---

**Last Updated**: March 17, 2026
**Maintained By**: Development Team
**Questions?** Check documentation files or contact tech lead.
