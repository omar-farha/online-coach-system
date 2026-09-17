You are working on an existing, already-completed fitness coaching website and management system.

IMPORTANT:
The project is already built and functional. DO NOT rebuild it from scratch.
DO NOT redesign the existing system.
DO NOT remove or change existing functionality.
Your task is to ADD full bilingual support: Egyptian Arabic + English, while preserving everything that already works.

## Main Goal

Add complete multilingual support with:

1. Arabic — Egyptian Arabic (Masri)
2. English

Arabic should be the default language.

Add a visible language switcher:

- العربي
- English

The language switcher must work across the entire project and remember the user's selected language.

---

# 1. LANGUAGE SYSTEM

Implement a proper centralized i18n system.

Do not scatter hardcoded translated strings throughout components.

Create a clean translation structure with centralized translation keys/files.

For example:

- Arabic translations
- English translations

Use the existing project's architecture and i18n solution if one already exists and is suitable.

If there is no i18n system, add a lightweight and clean solution that fits the existing Next.js App Router project.

Do not add unnecessary dependencies.

The selected language should persist when navigating between pages and after refreshing the browser.

---

# 2. ARABIC MUST BE EGYPTIAN ARABIC

This is VERY IMPORTANT.

The Arabic version must use natural Egyptian Arabic (Masri), NOT Modern Standard Arabic (Fusha).

The wording should sound like a real Egyptian fitness coach's website/app.

Keep it:

- Natural
- Simple
- Modern
- Professional
- Friendly
- Fitness-oriented

Do NOT use robotic or literal machine translations.

Examples:

Clients
→ العملاء

Add Client
→ إضافة عميل

Client Name
→ اسم العميل

Current Weight
→ وزنك الحالي

Workout Plan
→ خطة التمرين

Nutrition Plan
→ نظام الأكل

Packages
→ الباقات

Subscription
→ الاشتراك

Active
→ مشترك

Expired
→ الاشتراك انتهى

Expiring Soon
→ الاشتراك قرب يخلص

Rest Day
→ يوم راحة

Training Day
→ يوم التمرين

Progress
→ التقدم

Measurements
→ القياسات

Settings
→ الإعدادات

Save
→ حفظ

Cancel
→ إلغاء

Edit
→ تعديل

Delete
→ حذف

Search
→ بحث

Add Exercise
→ إضافة تمرين

Sets
→ مجموعات

Reps
→ تكرارات

Rest Time
→ وقت الراحة

Calories
→ سعرات حرارية

Protein
→ بروتين

Carbs
→ كربوهيدرات

Fats
→ دهون

Avoid overly formal wording.

For example:

Do NOT use:
"قم بإضافة عميل جديد"

Use:
"إضافة عميل جديد"

Do NOT use:
"لقد انتهت مدة اشتراكك"

Use:
"اشتراكك انتهى"

Do NOT use:
"يرجى اختيار التمرين"

Use:
"اختار التمرين"

Do NOT use:
"جدولك التدريبي لهذا الأسبوع"

Use:
"جدول تمرينك الأسبوع ده"

The Arabic should feel natural to someone in Egypt.

---

# 3. RTL / LTR

Arabic must use RTL.

English must use LTR.

When Arabic is selected:

- Entire website should switch to RTL.
- Navigation should switch correctly.
- Dashboard sidebar should switch correctly.
- Forms should switch correctly.
- Tables should switch correctly.
- Cards and layouts should switch correctly.
- Modals should switch correctly.
- Dropdowns should switch correctly.
- Toasts/notifications should switch correctly.
- Text alignment should switch correctly.
- Icons that have directional meaning should switch where appropriate.
- Back/forward arrows should behave correctly.
- Charts and UI elements should remain visually correct.

When English is selected:

- Everything switches back to LTR correctly.

Do not simply change text direction on the body and leave broken layouts.

Test the actual UI in both directions.

---

# 4. TRANSLATE THE ENTIRE UI

Do not translate only the main navigation.

Translate ALL system-generated UI text.

This includes:

## Public Website

- Navbar
- Hero
- About Coach
- Coaching / Services
- Packages
- How It Works
- Results / Testimonials
- Fitness Experience
- FAQ
- Contact
- Footer
- Buttons
- CTAs
- Form labels
- Form placeholders
- Validation messages
- Success messages
- Error messages
- Loading states
- Empty states
- Navigation
- Any other visible UI text

---

# 5. COACH DASHBOARD

The Coach Dashboard must fully support both languages.

Existing sections:

1. Dashboard
2. Clients
3. Workout Plans
4. Nutrition Plans
5. Packages
6. Progress
7. Settings

Translate everything inside these sections.

This includes:

- Sidebar
- Page titles
- Statistics
- Cards
- Buttons
- Search
- Filters
- Tables
- Forms
- Modals
- Dropdowns
- Tabs
- Status labels
- Empty states
- Loading states
- Error states
- Confirmation messages
- Toasts
- Validation messages
- Pagination
- Action menus

Do not leave random English strings inside the Arabic dashboard.

---

# 6. CLIENT PORTAL

The Client Portal must fully support Arabic and English.

Existing sections:

1. Home
2. Workout
3. Nutrition
4. Schedule
5. Progress

Translate everything.

The Client Portal should feel especially natural and friendly in Egyptian Arabic.

Examples:

Instead of formal medical/business wording, use natural fitness-app wording.

For example:

"وزنك الحالي"

"خطة تمرينك"

"نظام أكلك"

"يوم التمرين"

"يوم راحة"

"التقدم بتاعك"

"القياسات"

"الاشتراك قرب يخلص"

Keep the language encouraging but professional.

---

# 7. DO NOT TRANSLATE USER-GENERATED CONTENT

This is extremely important.

Only translate application/system UI.

Do NOT automatically translate data entered by the coach.

For example, if the coach enters:

- Client name
- Workout name
- Exercise custom name
- Food name
- Meal name
- Package name
- Package description
- Coach bio
- Client notes
- Workout instructions
- Nutrition instructions
- Testimonials

leave that content exactly as entered.

Do not modify or translate it.

The language system is for the application's interface, not for automatically translating database content.

---

# 8. DATABASE

Do not unnecessarily change the existing database structure.

The current database and functionality are already working.

Do NOT rebuild Supabase tables.

Do NOT delete existing data.

Do NOT change existing relationships.

Only make database changes if they are absolutely necessary for the language functionality.

The language preference can be stored using an appropriate lightweight method such as cookie/localStorage or the existing application's preferred i18n persistence mechanism.

---

# 9. EXISTING FITNESS SYSTEM — PRESERVE EVERYTHING

Do not break or remove any existing functionality.

The system already contains:

## Coach

- Dashboard
- Clients
- Workout Plans
- Nutrition Plans
- Packages
- Progress
- Settings

## Client

- Private client links
- Client-specific data
- Workout plans
- Nutrition plans
- Schedule
- Progress
- Measurements

## Workout Builder

- Workout days
- Exercises
- Exercise search
- Exercise filtering
- Add exercise
- Remove exercise
- Reorder exercises
- Sets
- Reps
- Rest time
- Exercise media/GIFs

## ExerciseDB Integration

The project uses ExerciseDB through RapidAPI.

Existing API configuration:

API:
https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb

Host:
exercisedb.p.rapidapi.com

Existing environment variable:

RAPIDAPI_KEY

Keep the existing integration working.

Do not expose the API key to the client.

Do not replace or remove the existing ExerciseDB integration.

## Nutrition

Keep:

- Meals
- Foods
- Quantities
- Calories
- Protein
- Carbs
- Fats
- Daily totals

working exactly as they currently do.

## Progress

Keep:

- Weight
- Measurements
- Dates
- Progress history
- Charts

working.

## Packages

Keep:

- Package name
- Price
- Duration
- Description
- Features
- Assignment to clients

working.

Packages should continue to manage subscription/package information only.

Do not change existing package logic.

---

# 10. PRIVATE CLIENT LINKS

Do not change the existing private client-link system.

Clients should continue accessing their own portal through their unique private link.

For example:

/client/ahmed-12345

A client must only see their own data.

Do not introduce normal client login if the current system does not use it.

Do not change authorization/RLS behavior.

---

# 11. DESIGN

The current design is already built.

PRESERVE THE CURRENT DESIGN.

Do not redesign the entire project just because you are adding i18n.

The existing visual direction should remain intact:

- Premium fitness feel
- Modern typography
- Strong visual hierarchy
- High-quality fitness imagery
- Premium dark/fitness aesthetic where already used
- Smooth animations
- Micro-interactions
- Responsive layouts
- Modern cards
- Strong CTA sections
- Professional Coach Dashboard
- Premium Client Portal

Do NOT turn the project into:

- A generic SaaS dashboard
- A boring CRUD interface
- A generic AI-looking website
- A template-looking admin panel
- A purple/blue startup dashboard

Only make small layout adjustments where necessary to properly support RTL/LTR.

---

# 12. RESPONSIVE DESIGN

Make sure both languages work correctly on:

- Desktop
- Laptop
- Tablet
- Mobile

Pay special attention to Arabic on mobile.

Check:

- Sidebar
- Navbar
- Forms
- Tables
- Cards
- Buttons
- Modals
- Long Arabic text
- Navigation
- Workout pages
- Nutrition pages
- Client portal

Nothing should overflow or break because of RTL or longer translated text.

---

# 13. DATES AND NUMBERS

Use appropriate formatting for the selected language where practical.

Arabic should display dates/numbers naturally for an Egyptian user.

English should use normal English formatting.

Do not break existing date/database behavior.

---

# 14. LANGUAGE SWITCHER

Add a clean language switcher to the appropriate global navigation.

It should clearly show:

العربي | English

The current language should be visually obvious.

Switching language should:

- Immediately update the UI
- Preserve the current page
- Preserve the current route
- Preserve the user's current state where possible
- Persist after refresh
- Work on public pages
- Work in the Coach Dashboard
- Work in the Client Portal

Do not force the user back to the homepage after switching language.

---

# 15. TRANSLATION QUALITY

Before finishing, search the project for visible hardcoded UI strings.

Make sure system-generated text is translated.

Look especially for:

- Buttons
- Alerts
- Errors
- Loading text
- Empty states
- Form validation
- Modal titles
- Tooltips
- Dropdown options
- Status labels
- Table headings
- Navigation labels
- Dashboard statistics
- Exercise UI
- Nutrition UI
- Progress UI

There should not be random untranslated UI text in Arabic mode.

---

# 16. IMPORTANT IMPLEMENTATION RULES

The project is already completed.

Do NOT:

- Rebuild the application
- Replace the architecture
- Rewrite working features
- Remove features
- Replace Supabase
- Replace the existing API
- Replace ExerciseDB
- Change authentication
- Change private client links
- Redesign the website
- Create a new unrelated UI
- Add unnecessary dependencies
- Delete existing database data

Instead:

Inspect the existing project first, understand how the current pages/components are structured, then implement the bilingual system directly into the existing codebase.

Keep changes focused on multilingual support and the small RTL/LTR adjustments required for it.

---

# 17. IMPORTANT — DO NOT WASTE TIME

Do not spend most of the task explaining what you are going to do.

Do not give me a long planning document.

Do not stop after creating a basic language toggle.

Actually implement the feature across the entire existing project.

Do not spend excessive time running unnecessary Playwright screenshots, massive verification workflows, database seeding, or unrelated tests.

Use practical verification where needed, but prioritize actually implementing the feature.

If you encounter a minor issue, fix it directly instead of stopping and asking me what to do.

---

# 18. FINAL RESULT

When you finish, I should have:

### Arabic

- Egyptian Arabic / Masri
- RTL
- Complete UI translation
- Natural wording
- Proper mobile RTL layout

### English

- English
- LTR
- Complete UI translation
- Proper mobile LTR layout

### Both languages

- Same functionality
- Same database
- Same API integrations
- Same private client links
- Same workout system
- Same nutrition system
- Same progress system
- Same package system
- Same design
- Same animations
- Same responsive behavior

The language system should feel like it was part of the project from the beginning, not something added afterward.

Start by inspecting the existing project and then implement the complete bilingual support directly.
