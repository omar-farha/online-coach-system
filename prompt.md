Build a complete, production-ready web system for an online fitness coach.

This is a custom system for ONE coach/business, NOT a SaaS platform.

There is only one Owner/Coach account that manages all clients.

The project consists of:

1. A public marketing website for the Coach.
2. A private Coach Dashboard.
3. A private Client Portal accessed through a unique private link.

The most important requirement is the DESIGN.

Do NOT make this look like a generic admin dashboard, CRM, SaaS template, or AI-generated website.

The visual experience should feel like entering a premium modern gym digitally.

Use strong fitness visuals, real gym imagery, athletes, weights, dumbbells, barbells, plates, workout-related visual elements, powerful typography, depth, motion, scroll animations, and micro-interactions.

Use temporary high-quality gym/fitness images and a placeholder athlete/coach image if real client assets are not provided.

The design must be easy to customize later with the Coach's real branding, images and content.

==================================================
TECH STACK
==========

Use:

- Next.js
- App Router
- TypeScript
- Tailwind CSS
- Supabase
- Modern reusable component architecture
- Responsive design
- Mobile-first Client Portal

Use Supabase for:

- Authentication
- Database
- Storage where needed

Keep the architecture clean and scalable, but do NOT over-engineer the project.

==================================================
USERS
=====

There are only two user types:

1. Owner / Coach
2. Client

The Owner and Coach are the SAME person.

There is only ONE Coach account.

The Client does NOT need a normal account/login.

Each Client gets a unique private URL.

Example:

/client/ahmed-12345

The Coach can copy this link and send it to the Client.

The private Client URL must only expose that specific client's information.

Clients must never be able to access another client's data.

==================================================
PUBLIC WEBSITE
==============

Create a premium public website for the Coach.

Sections:

1. Hero
2. About Coach
3. Coaching / Services
4. Packages
5. How It Works
6. Results / Testimonials
7. Fitness Experience / Visual Section
8. FAQ
9. Contact
10. Footer

The website should immediately communicate:

- Professional online coaching
- Personalized workout plans
- Personalized nutrition plans
- Professional coaching
- Progress tracking
- Premium fitness experience

---

## PACKAGES

The Packages section displays the packages created by the Coach from the Dashboard.

Each package contains:

- Package name
- Price
- Duration
- Short description
- Features

Examples:

- 1 Month Coaching
- 3 Month Coaching
- 6 Month Coaching

IMPORTANT:

Packages DO NOT determine what content a Client receives.

EVERY active Client has:

- Workout Plan
- Nutrition Plan

regardless of the package they are assigned to.

There is NO online payment system in this version.

Packages are currently for:

- Public display
- Subscription management
- Assigning a package to a Client

==================================================
COACH DASHBOARD
===============

Create a premium Coach Dashboard.

The Dashboard contains exactly these 7 main sections:

1. Dashboard
2. Clients
3. Workout Plans
4. Nutrition Plans
5. Packages
6. Progress
7. Settings

Do NOT make the Dashboard look like a generic CRUD admin panel.

It can have a sidebar/navigation structure, but the actual content should feel like a premium fitness management platform.

Use fitness-inspired visuals and subtle motion while keeping it practical and easy to use.

==================================================

1. # DASHBOARD

Show:

- Total Clients
- Active Clients
- Expiring Subscriptions
- New Clients
- Quick Actions
- Recent Clients
- Upcoming subscription expirations

Quick Actions:

- Add Client
- Create Workout
- Create Nutrition Plan
- Create Package

Use attractive cards and strong visual hierarchy.

================================================== 2. CLIENTS
==========

Show all Clients.

Each Client should display:

- Name
- Profile image/avatar
- Phone
- Email if provided
- Package
- Subscription start date
- Subscription end date
- Status

The Coach can:

- Add Client
- Edit Client
- Delete Client
- Open Client
- Copy Private Client Link

---

## ADD CLIENT

The Coach should be able to create a Client using:

- Full name
- Phone
- Email (optional)
- Age
- Height
- Current weight
- Goal
- Package
- Subscription start date
- Subscription end date

Do NOT add unnecessary complicated fields.

After creating the Client, generate a unique private Client URL.

Example:

/client/ahmed-12345

Provide a clear "Copy Link" action.

================================================== 3. WORKOUT PLANS
================

The Coach can create Workout Plans and assign them to Clients.

A Workout Plan contains multiple Workout Days.

Example:

Workout Plan:
"Ahmed's 4 Day Program"

Day 1:
Chest + Triceps

Day 2:
Back + Biceps

Day 3:
Legs

Day 4:
Shoulders

Each exercise contains:

- Exercise name
- Exercise GIF/media
- Sets
- Reps
- Rest time

The Coach does NOT manually upload exercise GIFs.

Use the ExerciseDB API described below.

==================================================
EXERCISEDB API — RAPIDAPI
=========================

Use ExerciseDB as the exercise database.

RapidAPI URL:

https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb

API host:

exercisedb.p.rapidapi.com

The API provides exercise data and exercise media/GIFs.

Use the API for the Workout Builder.

Do NOT manually create a large exercise database.

Use environment variables for credentials.

Example:

RAPIDAPI_KEY

NEVER expose the RapidAPI key in client-side code.

All RapidAPI requests should go through a secure server-side API/service layer in Next.js.

==================================================
EXERCISE SEARCH
===============

The Coach should be able to search and browse ExerciseDB exercises.

Support:

- Search by exercise name
- Filter by body part
- Filter by target muscle
- Filter by equipment
- Pagination / Load More

The Exercise Picker should show:

- Exercise name
- Exercise GIF/media
- Body part
- Target muscle
- Equipment

When the Coach selects an exercise, show a clear preview.

Use the ExerciseDB returned media/GIF rather than manually uploading exercise GIFs.

Store the ExerciseDB exercise ID/reference with the workout exercise.

Also store enough exercise information to keep existing workouts functional if the API is temporarily unavailable.

==================================================
WORKOUT BUILDER UX
==================

When the Coach clicks:

"Add Exercise"

open a polished Exercise Selection interface.

It should contain:

- Search
- Filters
- Exercise cards
- GIF preview
- Exercise information
- Add button

Example:

CHEST DAY

1. Bench Press

GIF

4 Sets
10 Reps
90 sec Rest

2. Incline Dumbbell Press

GIF

3 Sets
12 Reps
60 sec Rest

The Coach can:

- Add exercise
- Remove exercise
- Reorder exercises
- Edit sets
- Edit reps
- Edit rest
- Replace exercise

Make the Workout Builder extremely easy to use.

The Coach should not need to understand technical API details.

==================================================
EXERCISEDB ERROR HANDLING
=========================

If ExerciseDB is unavailable:

- Do not crash the application
- Show a clear error state
- Preserve already selected exercises
- Preserve existing workout data
- Allow the Coach to continue editing existing workouts

Use loading skeletons while fetching exercises.

Avoid unnecessary API requests.

Cache or store necessary exercise information when appropriate.

Keep the ExerciseDB integration isolated in a reusable service so the API can be replaced later without rebuilding the Workout system.

==================================================
CLIENT WORKOUT VIEW
===================

The Client only views the assigned Workout Plan.

The Client does NOT:

- Add exercises
- Edit exercises
- Log completed workouts
- Enter weights
- Enter reps

The Workout is completely controlled by the Coach.

The Client should see:

- Workout Days
- Exercises
- Exercise GIFs
- Sets
- Reps
- Rest time

The exercise GIF should be large and visually prominent.

================================================== 4. NUTRITION PLANS
==================

Every Client has a Nutrition Plan.

The Coach can create and edit Nutrition Plans.

A Nutrition Plan supports:

- Meals
- Meal names
- Foods
- Quantity
- Calories
- Protein
- Carbohydrates
- Fats

Example:

BREAKFAST

3 Eggs
2 Toast
Fruit

LUNCH

Chicken
Rice
Vegetables

DINNER

etc.

Allow the Coach to add multiple meals and food items.

Show daily nutritional totals when appropriate.

The Client only views the Nutrition Plan.

The Client does NOT enter or edit nutrition information.

================================================== 5. PACKAGES
===========

The Coach can create and manage Packages.

Each Package contains:

- Name
- Price
- Duration
- Description
- Features

The Coach can:

- Create
- Edit
- Delete
- Activate / deactivate

Packages are used for:

- Public website display
- Subscription management
- Assigning a Client to a package

IMPORTANT:

A Package does NOT control whether a Client receives Workout or Nutrition.

Every Client receives both.

================================================== 6. PROGRESS
===========

The Coach can record Client progress.

Track:

- Weight
- Body measurements
- Date

Show progress visually using charts.

The Coach enters all progress data.

The Client can view their progress through their private portal.

The Client does NOT enter progress data.

Make the Progress section visually motivating and fitness-oriented.

================================================== 7. SETTINGS
===========

Allow the Coach to manage:

- Coach name
- Profile photo
- Bio
- Phone
- Email
- Social media links
- Website information

Keep Settings simple.

==================================================
CLIENT PORTAL
=============

The Client Portal is extremely important.

It should NOT look like an admin dashboard.

It should feel like a premium personal fitness application.

The Client accesses it through a private link.

No traditional Client login is required.

The Client Portal contains exactly 5 main sections:

1. Home
2. Workout
3. Nutrition
4. Schedule
5. Progress

==================================================
CLIENT HOME
===========

Create an impressive fitness-focused welcome experience.

Show:

- Client name
- Coach name
- Current package
- Subscription status
- Current weight
- Goal
- Quick access to Workout
- Quick access to Nutrition
- Quick access to Progress

The Home screen should feel like:

"Your personal digital gym."

Use strong photography, motion and fitness visuals.

==================================================
CLIENT WORKOUT
==============

Display the assigned Workout Plan.

Show Workout Days.

Example:

MONDAY

CHEST + TRICEPS

Exercise cards show:

- Exercise name
- Exercise GIF
- Sets
- Reps
- Rest

Make the exercise cards visually engaging.

The GIF should be prominent.

The Client does NOT log workout completion.

The Client does NOT enter weights or reps.

This is view-only.

==================================================
CLIENT NUTRITION
================

Display the Client's Nutrition Plan beautifully.

Show:

- Meals
- Foods
- Quantities
- Calories
- Macros when available

Make it feel like a premium nutrition application, not a plain table.

==================================================
CLIENT SCHEDULE
===============

Display the weekly training schedule.

Keep it simple and visual.

Show:

- Training days
- Workout names
- Rest days

==================================================
CLIENT PROGRESS
===============

Show:

- Current weight
- Previous measurements
- Progress history
- Charts

The Client can only view the information.

==================================================
NO MESSAGING
============

There is NO chat.

There are NO messages.

There is NO internal communication system.

Do NOT build messaging functionality.

==================================================
NO ONLINE PAYMENTS
==================

There is NO online payment integration in this version.

==================================================
DESIGN DIRECTION
================

THIS IS THE MOST IMPORTANT REQUIREMENT.

Do NOT create:

- Generic SaaS UI
- Generic admin dashboard
- Generic Bootstrap dashboard
- Boring white cards everywhere
- Typical AI-generated landing page
- Excessive glassmorphism
- Random gradients
- Generic purple/blue startup colors
- Huge unnecessary text blocks
- Template-looking sections

The product should feel completely fitness-focused.

The design concept is:

"ENTER YOUR DIGITAL GYM"

When the Client opens their private link, they should feel like they have entered a premium gym environment.

Use:

- Premium gym photography
- Athletes
- Dumbbells
- Barbells
- Weight plates
- Gym equipment
- Training environments
- Strong typography
- Dark backgrounds
- High contrast
- Large visual compositions
- Depth
- Motion
- Scroll animations
- Micro-interactions
- Dynamic counters
- Animated progress indicators
- Smooth transitions
- Parallax where appropriate
- Interactive cards

Do not simply place a random gym image inside a card.

Make the imagery part of the actual design composition.

For example:

- Large athlete image overlapping a section
- Weight plates used as decorative visual elements
- Gym equipment integrated into backgrounds
- Large statistics
- Strong typography
- Dynamic section transitions
- Animated workout cards
- Fitness-inspired loading animations
- Subtle movement while scrolling

Use animations intentionally.

Do not animate everything.

The website must remain professional, fast and easy to use.

==================================================
VISUAL STYLE
============

Use a premium dark fitness identity.

Base:

- Black
- Near-black
- Dark charcoal
- White

Use ONE strong accent color.

Possible accent direction:

- Red
  OR
- Orange
  OR
- Lime

Choose ONE accent color and use it consistently.

Do not use many unrelated colors.

==================================================
PUBLIC WEBSITE EXPERIENCE
=========================

The public website should feel like a premium fitness brand.

The Hero should have:

- Strong headline
- Coach/athlete visual
- Gym imagery
- Clear CTA
- Motion

The page should transition naturally between sections.

Use visual storytelling rather than just stacking cards.

==================================================
CLIENT PORTAL EXPERIENCE
========================

The Client Portal should feel even more immersive.

The Client should immediately see:

- Their name
- Their goal
- Their current plan
- Their workout
- Their nutrition

Use fitness imagery and subtle gym-inspired elements.

The Client Portal should feel closer to a premium fitness app than a website.

==================================================
RESPONSIVENESS
==============

The entire project must be fully responsive.

Desktop:

- Premium full-width compositions
- Large visuals
- Immersive sections

Tablet:

- Proper responsive layouts

Mobile:

The Client Portal should feel like a mobile fitness app.

Use:

- Large exercise GIFs
- Touch-friendly controls
- Easy navigation
- Clear typography
- Sticky/mobile navigation where appropriate

The Coach Dashboard should also work well on mobile, although desktop is the primary environment.

==================================================
DATABASE
========

Use Supabase.

Create a proper relational structure.

At minimum consider:

- coach/profile
- clients
- packages
- workout_plans
- workout_days
- workout_exercises
- nutrition_plans
- nutrition_meals
- nutrition_foods
- progress_records

Relationships:

One Coach
→ Many Clients

One Client
→ One active Package

One Client
→ One Workout Plan

One Client
→ One Nutrition Plan

One Client
→ Many Progress Records

One Workout Plan
→ Many Workout Days

One Workout Day
→ Many Workout Exercises

One Nutrition Plan
→ Many Nutrition Meals

One Nutrition Meal
→ Many Nutrition Foods

Store ExerciseDB exercise references for Workout Exercises.

==================================================
SECURITY
========

Client private links must only expose that specific Client's information.

Do NOT expose all Clients through the Client Portal.

Use proper authorization and Supabase Row Level Security where appropriate.

The Coach has full access.

Client data should be read-only through the Client Portal.

Do not rely only on hiding UI elements for security.

Make sure a Client cannot manipulate the URL to access another Client's information.

==================================================
UX
==

The Coach workflow should be extremely simple:

Add Client
→ Assign Package
→ Create Workout
→ Create Nutrition Plan
→ Generate Private Link
→ Send Link to Client

Avoid unnecessary steps.

Use:

- Confirmation dialogs
- Toast notifications
- Loading states
- Empty states
- Error states
- Success states
- Form validation
- Search
- Filters where useful

==================================================
CODE QUALITY
============

Use:

- TypeScript
- Reusable components
- Clean folder structure
- Reusable forms
- Reusable cards
- Service/API abstraction
- Environment variables
- No hardcoded API keys
- No unnecessary duplicated code

Keep the implementation practical.

Do not over-engineer.

==================================================
DEVELOPMENT INSTRUCTION
=======================

Build the project directly.

Do NOT spend a long time explaining a plan before implementation.

Do NOT stop after creating a skeleton.

Implement the actual:

- Pages
- Components
- Navigation
- Database structure
- Supabase integration
- ExerciseDB integration
- Workout Builder
- Nutrition Builder
- Client Portal
- Public Website
- Responsive layouts
- Animations
- Loading states
- Error states

If API credentials are not available during development, create the integration correctly and use realistic mock exercise data as a temporary fallback so the UI remains functional.

Use high-quality temporary fitness images where necessary.

Make the website look complete even before the real Coach branding and images are added.

Do not leave major sections as placeholders.

==================================================
FINAL QUALITY BAR
=================

The final product should feel like a real premium fitness coaching product.

It should NOT feel like:

"an admin panel that manages gym clients."

It should feel like:

"a premium digital personal training experience."

Prioritize:

1. Design quality
2. Client experience
3. Workout management
4. ExerciseDB integration
5. Nutrition management
6. Simple Coach workflow
7. Responsive behavior
8. Clean implementation

Build the complete experience accordingly.
