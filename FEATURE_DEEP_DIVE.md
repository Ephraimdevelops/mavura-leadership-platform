# Pay-R Website - Feature Deep Dive & Code Examples

---

## 🎯 Feature 1: Interactive Pricing Calculator

### Location
`src/components/home/Pricing.tsx`

### How It Works
```tsx
const [isAnnual, setIsAnnual] = useState(true);
const [employees, setEmployees] = useState([50]);

const calculatePrice = (basePrice: number) => {
    const employeeMultiplier = Math.ceil(employees[0] / 50);
    const price = basePrice * employeeMultiplier;
    return isAnnual ? price * 0.8 : price; // 20% discount for annual
};
```

### User Interaction
1. **Slider**: Adjust employee count (10-500, step of 10)
2. **Toggle**: Switch between Monthly/Yearly billing
3. **Automatic Calculation**: Real-time price updates
4. **Display**: Shows current selected plan pricing

### Pricing Tiers
- **Starter**: $49/month base
- **Professional**: $99/month base  
- **Enterprise**: $199/month base

### Scaling Logic
- Price scales every 50 employees
- Annual billing = 20% discount
- Monthly billing = full price

---

## 🎯 Feature 2: ROI Calculator

### Location
`src/app/roi-calculator/page.tsx`

### Interactive Inputs
```tsx
const [employees, setEmployees] = useState([50]);
const [avgSalary, setAvgSalary] = useState(1500000); // TZS
const [processingHours, setProcessingHours] = useState([10]); // Hours/month
```

### Calculation Formula
```tsx
const savings = useMemo(() => {
    const hourlyRate = avgSalary / 160; // 160 working hours/month
    const manualCost = hourlyRate * processingHours[0] * 12; // Annual
    const errorCost = (avgSalary * employees[0] * 12) * 0.02; // 2% error rate
    const softwareCost = employees[0] * 5000 * 12; // Cost/month per employee
    
    return {
        total: Math.max(0, (manualCost + errorCost) - softwareCost),
        manualCost,
        errorCost,
        softwareCost
    };
}, [employees, avgSalary, processingHours]);
```

### Output Metrics
- 📊 Total Annual Manual Cost
- ⚠️ Estimated Error Costs (2%)
- 💻 Software Cost
- 💰 **Total Savings** (highlighted)

### Currency
- Tanzanian Shilling (TZS)
- Formatted with locale-specific number formatting

---

## 🎯 Feature 3: Demo Request Form

### Location
`src/components/forms/DemoRequestForm.tsx`

### Form Fields
```tsx
const [selectedModules, setSelectedModules] = useState<string[]>([]);

const EMPLOYEES_OPTIONS = [
    "1-10", "11-50", "51-200", "201-500", "500+"
];

const MODULES_OPTIONS = [
    "Employee Management",
    "Payroll",
    "Recruitment",
    "Performance Management"
];
```

### Form Data
```tsx
{
    name: string;
    email: string;
    company: string;
    position: string;
    phone: string;
    employees: string; // Range
    preferredDate: string;
    preferredTime: string;
    modules: string[]; // Selected module names
}
```

### Submission Handling
```tsx
const submitDemo = useMutation(api.submissions.submitDemoRequest);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
        await submitDemo({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            // ... other fields
        });
        setIsSuccess(true);
    } catch (error) {
        console.error("Failed to submit form:", error);
    } finally {
        setIsSubmitting(false);
    }
};
```

### User Experience
1. ✅ Form validation
2. ✅ Loading state with spinner
3. ✅ Success confirmation with checkmark
4. ✅ Error handling with retry
5. ✅ Modal dialog integration

---

## 🎯 Feature 4: Admin Dashboard Command Center

### Location
`src/app/admin/page.tsx`

### Dashboard Overview Stats

```tsx
const stats = useQuery(api.analytics.getDashboardStats);
const recentLeads = useQuery(api.submissions.getSubmissions);

// Displays:
// - Total Leads: 123
// - New Leads: 12
// - Active Users: 573
// - Revenue: $X,XXX
// - Recent submissions list
```

### Tabs Interface

#### 1. **Overview Tab**
- Quick stat cards
- Recent leads table
- Conversion metrics
- Activity timeline

#### 2. **Ticker Tab (Announcements)**
```tsx
// Manages header notification
- Create new announcement
- Edit existing
- Delete announcements
- Toggle active/inactive
- Set type (Info/Alert/Feature)
- Shows in header: 🌟 NEW: [Announcement Text]
```

#### 3. **Testimonials Tab**
```tsx
// Manage client testimonials
- Add testimonial
  ├─ Client name
  ├─ Company logo (upload)
  ├─ Quote text
  ├─ Role/title
  └─ Active toggle
- Edit existing
- Delete with confirmation
- Appears on homepage
```

#### 4. **Blog Tab**
```tsx
// Full blog management
- Create post
  ├─ Title
  ├─ Slug (URL)
  ├─ Content (Rich text editor - TipTap)
  ├─ Cover image (upload)
  ├─ Tags
  ├─ Category
  ├─ Status (Draft/Published/Archived)
  └─ Publish date
- Edit existing posts
- Delete posts
- View published at /blog/[slug]
```

#### 5. **Leads Tab**
```tsx
// CRM-style lead management
- View all leads/demo requests
- Filter by status:
  ├─ New
  ├─ Contacted
  ├─ Qualified
  ├─ Proposal
  ├─ Closed
  └─ Lost
- Assign to sales team member
- Add notes
- Track interested modules
- Update status
```

---

## 🎯 Feature 5: Blog System

### Location
`src/app/blog/` and `src/app/blog/[slug]/`

### Database Schema
```typescript
blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(), // HTML from TipTap
    excerpt: v.string(),
    coverImage: v.optional(v.string()), // Storage ID
    authorId: v.id("users"),
    publishedAt: v.optional(v.number()),
    status: v.union(
        v.literal("draft"),
        v.literal("published"),
        v.literal("archived")
    ),
    tags: v.array(v.string()),
    category: v.optional(v.string()),
})
```

### Features
- ✅ Rich text editing with TipTap
- ✅ Cover image uploads
- ✅ Tagging system
- ✅ Categories
- ✅ Draft/Published/Archived states
- ✅ Dynamic routing with slugs
- ✅ Author tracking
- ✅ Publish date scheduling

### Public Display
- `/blog` - List of published posts
- `/blog/[slug]` - Individual post view
- Shows on homepage as "Latest Articles"
- Optimized for SEO

---

## 🎯 Feature 6: Form Submission Tracking

### Location
`convex/submissions.ts`

### Submission Types
```typescript
// Contact Form Submission
{
    type: "contact",
    name: string,
    email: string,
    company?: string,
    message: string,
    status: "new",
    createdAt: timestamp
}

// Demo Request Submission
{
    type: "demo",
    name: string,
    email: string,
    company: string,
    position: string,
    phone: string,
    employees: string,
    preferredDate: string,
    preferredTime: string,
    modules: string[],
    status: "new",
    createdAt: timestamp
}
```

### Database Storage
All submissions stored in single `submissions` collection with type field for filtering.

### Admin Access
Visible in Admin Dashboard → Leads Tab
- Filter and search
- Update status
- Add notes
- Assign to team

---

## 🎯 Feature 7: Module Sections

### Location
`src/components/home/ModuleSection.tsx`

### 4 Main Modules Showcased

#### Module 1: **Employee Management** (Blue Theme)
```
Features:
- Personal Information
- Allowances & Deductions
- Attendance
- Contracts
- Disciplinary Records

Visual: Dashboard card showing:
- Total Employees count
- Employee list cards
- Status indicators
```

#### Module 2: **Payroll Management** (Green Theme)
```
Features:
- Automated calculations
- Multiple pay periods
- Tax handling
- Multi-currency support
- Deductions & benefits

Visual: Payment dashboard showing:
- Salary breakdown
- Charts & graphs
- Payment history
```

#### Module 3: **Recruitment** (Purple Theme)
```
Features:
- Job application capture
- Candidate filtering
- Interview scheduling
- Application pipeline
- Offer management

Visual: Recruitment pipeline showing:
- Open positions
- Candidate status
- Application stages
```

#### Module 4: **Analytics** (Orange Theme)
```
Features:
- Real-time dashboards
- Workforce insights
- Cost analysis
- Compliance reports
- Custom reporting

Visual: Analytics dashboard showing:
- Charts & metrics
- Trend indicators
- Key statistics
```

### Component Structure
```tsx
<ModuleSection
    label="Core HR"
    title="Employee Management"
    description="..."
    features={[...]}
    theme="blue"
    imagePosition="right"
>
    {/* Demo card content */}
</ModuleSection>
```

---

## 🎯 Feature 8: Testimonials & Social Proof

### Location
`src/components/home/Testimonials.tsx`

### Client Logos
```tsx
const clients = [
    { name: "Grumeti Expeditions", logo: "/images/clients/grumeti.png" },
    { name: "University of Arusha", logo: "/images/clients/uoa.png" },
    { name: "Bumaco Insurance", logo: "/images/clients/bumaco.png" },
    { name: "Epyvate & Fortune", logo: "/images/clients/epyvate.png" },
    { name: "Maendeleo Bank", logo: "/images/clients/maendeleo.jpg" },
];
```

### Testimonial Cards
```tsx
{
    quote: "...",
    author: "Sarah Chen",
    role: "VP of People",
    company: "TechFlow",
    image: "avatar-url"
}
```

### Features
- ✅ Client logo strip (grayscale → color on hover)
- ✅ 3-column testimonial cards
- ✅ Hover animations (lift effect)
- ✅ Author avatars
- ✅ Quote styling with quotes

---

## 🎯 Feature 9: Mobile App Preview

### Location
`src/components/home/MobileAppPreview.tsx`

### Content
- Mockup image of mobile app
- Feature highlights
- Download buttons
- Platform availability (iOS/Android)

---

## 🎯 Feature 10: Header with Smart Navigation

### Location
`src/components/layout/Header.tsx`

### Components
```tsx
┌─────────────────────────────────────────────┐
│ 🌟 NEW: AI-Powered Payroll | Learn more → │
├─────────────────────────────────────────────┤
│ Logo    Features    Resources v    Demo CTA │
└─────────────────────────────────────────────┘
```

### Features
1. **Notification Ticker** - Always at top
   - Announcement text
   - New feature badge
   - Link to feature page

2. **Logo** - Responsive sizing
   - Light/Dark mode variants
   - Hover scale animation
   - Links to homepage

3. **Navigation Links**
   - Features
   - Company
   - Integrations

4. **Resources Dropdown**
   - Blog (with icon)
   - ROI Calculator (with icon)
   - Integrations (with icon)

5. **Mobile Menu**
   - Hamburger icon on mobile
   - Full-screen dropdown
   - Same links as desktop

6. **CTA Buttons**
   - "Book Demo" (prominent)
   - "Get Quote"
   - Links open modals

### Smart Behavior
- Sticky positioning (stays at top)
- Blur effect on scroll
- Shadow appears on scroll
- Background color updates
- Smooth transitions

---

## 🎯 Feature 11: Theme System (Dark/Light Mode)

### Implementation
`src/components/theme-provider.tsx`
`src/app/globals.css`

### Tech Stack
- **next-themes** - Theme switching
- **Tailwind CSS** - Dark mode utilities
- **System preference** - Auto-detect user preference

### Features
- ✅ Auto dark/light based on OS
- ✅ Manual toggle in UI
- ✅ Persistent preference
- ✅ No flash of wrong theme
- ✅ Smooth transitions

### Usage
```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
</ThemeProvider>
```

---

## 🎯 Feature 12: Animations & Interactions

### Framer Motion
- Scroll-based parallax effects
- Entrance animations on scroll
- Hover state animations
- Smooth page transitions

### CSS Animations
- Ping effect on new badge
- Gradient animations
- Blur effects
- Opacity transitions

### Interactions
- Button hover scale
- Card lift on hover
- Icon animations
- Loading spinners

---

## 📊 Database Queries & Mutations

### Key Queries
```typescript
// Get dashboard stats
api.analytics.getDashboardStats()

// Get recent submissions
api.submissions.getSubmissions()

// Get blog posts
api.blog.getPublishedPosts()

// Get single blog post
api.blog.getPostBySlug(slug: string)

// Get testimonials
api.cms.getTestimonials()

// Get announcements
api.cms.getActiveAnnouncements()
```

### Key Mutations
```typescript
// Submit demo request
api.submissions.submitDemoRequest(demoData)

// Submit contact form
api.submissions.submitContactForm(contactData)

// Create blog post
api.blog.createPost(postData)

// Create testimonial
api.cms.createTestimonial(testimonialData)

// Update announcement
api.cms.updateAnnouncement(id, text)

// Upload image
api.storage.upload(file)
```

---

## 🔗 Navigation Routes Reference

| Route | Purpose | Auth Required |
|-------|---------|:---:|
| / | Homepage | ❌ |
| /features | Features listing | ❌ |
| /blog | Blog posts list | ❌ |
| /blog/[slug] | Individual blog post | ❌ |
| /contact | Contact form | ❌ |
| /roi-calculator | ROI calculator tool | ❌ |
| /company | Company information | ❌ |
| /integrations | Integration partners | ❌ |
| /get-quote | Quote request form | ❌ |
| /mobile | Mobile app info | ❌ |
| /admin | Admin dashboard | ✅ |
| /admin/layout | Admin page layout | ✅ |

---

## 🎨 Design System & Theming

### Colors
```css
Primary: #41A1E1 (Brand Blue)
Success: #22c55e (Green)
Warning: #f59e0b (Orange)
Error: #ef4444 (Red)
Secondary: #8b5cf6 (Purple)
```

### Typography
- **Font Family**: Raleway (Google Font)
- **Headings**: Medium to Bold weight
- **Body**: Light to Regular weight
- **Sizes**: 12px to 60px+ (responsive)

### Spacing
- Container max-width: 1280px
- Padding: 4px grid system (Tailwind)
- Gap between sections: 80px-120px

### Border Radius
- Small: 8px
- Medium: 12px
- Large: 20px+
- Full: 999px (pills)

---

## 🚀 Performance Features

### Image Optimization
- Next/Image component
- Responsive images
- WebP format
- Lazy loading
- Blur placeholders

### Code Splitting
- Route-based splitting
- Component lazy loading
- Conditional rendering

### CSS Optimization
- Tailwind CSS tree-shaking
- Unused style removal
- Critical CSS inline

### Runtime Performance
- Framer Motion GPU acceleration
- Debounced scroll listeners
- Efficient state management
- Memoized computations

---

## 📱 Responsive Breakpoints

```css
Mobile: 0px - 640px (default)
Tablet: 641px - 1024px (md)
Desktop: 1025px+ (lg, xl)
```

### Mobile-First Approach
- Design for mobile first
- Progressive enhancement
- Touch-friendly targets (44x44px minimum)
- Full-width on small screens

---

## 🔐 Security & Validation

### Form Validation
- Client-side validation
- Server-side validation (Convex)
- Required field checks
- Email format validation
- Data type validation

### Database Security
- Row-level permissions (Convex)
- User role verification
- Authenticated mutations
- Protected queries

### Environment Variables
- API keys stored in `.env.local`
- Never exposed to client
- Secret rotation capability

---

## 📞 Support & Resources

For implementation questions:
- Check `convex/` folder for backend logic
- Review `src/components/` for UI patterns
- See `src/app/` for page implementations
- Consult Convex documentation for queries/mutations

