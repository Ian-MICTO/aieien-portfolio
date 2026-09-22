# 📚 Strapi Collections & Data Schema Guide

This guide consolidates all **Strapi Collection Types**, **Single Types**, **Components**, and their **JSON schema structures** used in the **Ai Eien Portfolio** project.

Use this reference when creating, updating, or maintaining entries in the Strapi Admin Panel (`/admin`), especially for content types that require specific **JSON properties**, **Rich Text Blocks**, **Media**, or **Section IDs**.

---

## 📑 Table of Contents

1. [Quick Reference Matrix](#-quick-reference-matrix)
2. [Publishing Workflow & Permissions](#-publishing-workflow--permissions)
3. [Collection & Single Type Specifications](#-collection--single-type-specifications)
   - [1. Infos (`infos`) — JSON Format Guide](#1-infos-infos--json-format-guide)
   - [2. About (`about`) — Single Type & Repeatable Component](#2-about-about--single-type--repeatable-component)
   - [3. Heroes (`heroes`) — Hero Artwork](#3-heroes-heroes--hero-artwork)
   - [4. Style Panels (`style-panels`) — Diagonal Slanted Panels](#4-style-panels-style-panels--diagonal-slanted-panels)
   - [5. Works (`works`) — Portfolio Grid](#5-works-works--portfolio-grid)
   - [6. Contacts (`contacts`) — Social Links](#6-contacts-contacts--social-links)
   - [7. Sections (`sections`) — Section Feature Flags](#7-sections-sections--section-feature-flags)
   - [8. Comments (`comments`) — Guestbook / Feedback](#8-comments-comments--guestbook--feedback)
4. [Ready-to-Copy JSON Templates](#-ready-to-copy-json-templates)
5. [TypeScript Types Reference](#-typescript-types-reference)

---

## 🧭 Quick Reference Matrix

| Content Type | Kind | Strapi API Endpoint | Special / Complex Fields | Consuming Frontend Section |
| :--- | :--- | :--- | :--- | :--- |
| **Infos** | Collection | `/api/infos` | `content` (**JSON**), `type` (Enum) | `Ch. 02 — Info` (`Info.astro`) |
| **About** | Single Type | `/api/about` | `contents` (**Repeatable Component** with **Blocks**) | `Ch. 01 — About` (`About.astro`) |
| **Heroes** | Collection | `/api/heroes` | `image` (**Media**), `sectionId` (String) | `Home` (`Hero.astro`), `About` cutout |
| **Style Panels** | Collection | `/api/style-panels` | `panelNumber` (String "01"-"04"), `image` (**Media**) | `Ch. 03 — Styles` (`Style.astro`) |
| **Works** | Collection | `/api/works` | `image` (**Media**), `title` (String) | `Ch. 04 — Works` (`Works.astro`) |
| **Contacts** | Collection | `/api/contacts` | `title` (String), `description` (String), `link` (URL) | `Ch. 05 — Connect` (`Connect.astro`) |
| **Sections** | Collection | `/api/sections` | `sectionId` (String), `isEnabled` (**Boolean**) | Page Routing & Navbar (`index.astro`) |
| **Comments** | Collection | `/api/comments` | `comment` (Long Text), `profileLink` (String) | Comments Section (`Comment.astro`) |

---

## ⚠️ Publishing Workflow & Permissions

### 1. Draft & Publish
All content types have **Draft & Publish** enabled (`draftAndPublish: true`).
- After filling in your data, clicking **Save** only creates a **Draft**.
- You **MUST click "Publish"** for the entry to appear on the public website.

### 2. API Token / Role Permissions
Ensure that the frontend has read access:
- **Public Role** (or your `STRAPI_API_TOKEN` custom token):
  - Go to **Settings** > **Users & Permissions Plugin** > **Roles** > **Public** (or **Settings** > **API Tokens**).
  - Enable `find` and `findOne` permissions for: `about`, `comment`, `contact`, `hero`, `info`, `section`, `style-panel`, `work`.

---

## 📦 Collection & Single Type Specifications

---

### 1. Infos (`infos`) — JSON Format Guide

The `infos` collection is used in **Chapter 02 (Info Section)** to render the **Greeting**, the **Manga Quote / Catchphrase**, the **Narrative Bio**, and the **Weekly Schedule Calendar**.

#### Attributes

| Field Name | Type | Options / Enum | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | `"greeting"`, `"quote"`, `"narrative"`, `"saturday"`, `"sunday"`, etc. | Target identifier used by the frontend matching logic. |
| `type` | `enumeration` | `["schedule", "information"]` | Tells the frontend how to parse the JSON `content`. |
| `content` | **`json`** | Valid JSON Object | Structured JSON payload (see details below). |

---

#### JSON Structure by `type`:

#### Case A: `type = "information"`

Used for text blocks (`greeting`, `quote`, `narrative`).

##### Schema:
```json
{
  "content": "Your text content here"
}
```

##### Standard Entries Needed:

1. **Greeting Panel (`LOG // 01`)**:
   - **`name`**: `greeting`
   - **`type`**: `information`
   - **`content`**:
     ```json
     {
       "content": "YAHO!"
     }
     ```

2. **Quote Statement Panel (`STATEMENT // 02`)**:
   - **`name`**: `quote`
   - **`type`**: `information`
   - **`content`**:
     ```json
     {
       "content": "I am Ai but definitely not AI (artificial intelligence)."
     }
     ```
     *(Note: The frontend highlights any occurrence of "Ai" in italics automatically).*

3. **Narrative Profile Panel (`Narrative // 04`)**:
   - **`name`**: `narrative`
   - **`type`**: `information`
   - **`content`**:
     ```json
     {
       "content": "A human, self-taught, passionate freelance illustrator based in Asia with a unique blend of Japanese aesthetics and modern trends. Specializing in dynamic character art and conceptual designs, I bring stories and visions to life with mono-style storytelling."
     }
     ```

---

#### Case B: `type = "schedule"`

Used for the **Calendar Timetable (`SCHEDULES // 03`)**.

##### Schema:
```json
{
  "day": "Day or Days name (e.g. Saturdays, Sundays, Weekdays)",
  "start_time": "Start time in HH:mm or 24-hr format (e.g. 14:00, 10:00)",
  "end_time": "End time in HH:mm (e.g. 18:00, 12:00) or leave empty",
  "note": "Optional helper text (e.g. Afternoon onwards, Morning 'till noon)"
}
```

##### Rendering Logic:
- If both `start_time` and `end_time` are provided: displays `~{start_time} - {end_time}`
- If only `start_time` is provided: displays `~{start_time} - —:—`
- If only `end_time` is provided: displays `—:— - {end_time}`
- If none: displays `Flexible`

##### Example Entries:

1. **Saturday Schedule**:
   - **`name`**: `saturday`
   - **`type`**: `schedule`
   - **`content`**:
     ```json
     {
       "day": "Saturdays",
       "start_time": "14:00",
       "end_time": "",
       "note": "Afternoon onwards"
     }
     ```

2. **Sunday Schedule**:
   - **`name`**: `sunday`
   - **`type`**: `schedule`
   - **`content`**:
     ```json
     {
       "day": "Sundays",
       "start_time": "10:00",
       "end_time": "12:00",
       "note": "Morning 'till noon"
     }
     ```

---

### 2. About (`about`) — Single Type & Repeatable Component

The `about` single type powers **Chapter 01 (About Section)** as a 5-panel manga layout.

#### Structure

- **Type**: `singleType`
- **Attribute**: `contents` (Repeatable Component: `layout.content-panel`)

#### Component `layout.content-panel` Fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `tag` | `string` | Identifies panel index: `"panel1"`, `"panel2"`, `"panel3"`, `"panel4"`, or `"panel5"`. |
| `title` | `string` | Panel header title (e.g., `BACKGROUND`, `EXPERIENCE`, `ACTIVE YEARS`, `LATEST WORK`, `TO BE CONTINUED...`). |
| `content` | **`blocks`** (Rich Text) | Rich text paragraphs, bold text, lists, quotes, code, or headings. |
| `image` | `media` (Single) | Optional panel artwork. |

#### Panel Grid Layout Mapping:

| `tag` | Panel Title | Desktop Grid Position | Mobile Grid Position |
| :--- | :--- | :--- | :--- |
| **`panel1`** | `BACKGROUND` | Top-Left wide panel (Cols 1-4, Rows 1-2) | Top full-width (Cols 1-2, Row 1) |
| **`panel2`** | `EXPERIENCE` | Right tall panel (Cols 5-6, Rows 1-4) | Right column (Col 2, Rows 2-3) |
| **`panel3`** | `ACTIVE YEARS` | Mid-Left box 1 (Cols 1-2, Rows 3-4) | Left column top (Col 1, Row 2) |
| **`panel4`** | `LATEST WORK` | Mid-Left box 2 (Cols 3-4, Rows 3-4) | Left column bottom (Col 1, Row 3) |
| **`panel5`** | `TO BE CONTINUED...`| Climax bottom banner (Cols 1-6, Rows 5-6) | Bottom full-width (Cols 1-2, Row 4) |

> 💡 **Tip for About Content**: If entering via the Strapi Admin UI, use the visual **Rich Text (Blocks)** editor. It supports paragraphs, bold/italic text, quotes, and bulleted lists.

---

### 3. Heroes (`heroes`) — Hero Artwork

The `heroes` collection provides full-screen or cutout artwork for specific sections.

#### Attributes

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `sectionId` | `string` | Target section tag (`"home"` or `"about"`). |
| `image` | `media` (Single Image) | Uploaded media file. |

#### Required Entries:

| `sectionId` | Purpose | Recommended Asset Format |
| :--- | :--- | :--- |
| **`home`** | Landing Page main cover artwork | High-res illustration (JPG/WebP/PNG), aspect ~16:9 or 4:3 |
| **`about`** | Pop-out character overlay in the About section | Transparent PNG / WebP character cutout |

---

### 4. Style Panels (`style-panels`) — Diagonal Slanted Panels

The `style-panels` collection powers **Chapter 03 (Styles Section)**, displaying 4 dynamically clipped polygon panels.

#### Attributes

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `panelNumber` | `string` | **Crucial**: Must be `"01"`, `"02"`, `"03"`, or `"04"`. Sets polygon angle and sort order. |
| `title` | `string` | Style category name (e.g. `CLOTHING STYLE`, `COLOR & CONTRAST`, `MANGA AESTHETICS`). |
| `description` | `string` | Style breakdown / technical description. |
| `image` | `media` (Single Image) | Illustration demonstrating this specific style. |

#### Clip-Path Mapping Matrix:

| `panelNumber` | Diagonal Width & Angle | Desktop Polygon Clip-Path |
| :--- | :--- | :--- |
| **`01`** | Leftmost panel (`30%` width, top overlap) | `polygon(0 0, 100% 0, 82% 100%, 0 100%)` |
| **`02`** | Second panel (`22%` width, bottom offset) | `polygon(18% 0, 100% 0, 80% 100%, 0% 100%)` |
| **`03`** | Third panel (`32%` width, top offset) | `polygon(20% 0, 100% 0, 74% 100%, 0% 100%)` |
| **`04`** | Rightmost panel (`24%` width, bottom offset) | `polygon(26% 0, 100% 0, 100% 100%, 0 100%)` |

---

### 5. Works (`works`) — Portfolio Grid

The `works` collection powers **Chapter 04 (Works Section)** product & illustration grid.

#### Attributes

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | Work title (e.g., `POSTCARD C`, `ACRYLIC STAND`, `ORANGE SUNSET ARTBOOK`). |
| `image` | `media` (Single Image) | Artwork / mock-up product photo. |

---

### 6. Contacts (`contacts`) — Social Links

The `contacts` collection supplies dynamic social media links in **Chapter 05 (Connect Section)**.

#### Attributes

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | Social network name (e.g., `Instagram`, `Facebook`, `X`, `Twitter`). |
| `description` | `string` | Display text / username handle (e.g., `@ueian_`, `Ai Eien`). |
| `link` | `string` | Direct URL (e.g., `https://instagram.com/ueian_`). |

> 🎨 **Icon Auto-Detection**: When `title` is `Instagram`, the frontend renders the Instagram icon; when `Facebook`, it renders the Facebook icon.

---

### 7. Sections (`sections`) — Section Feature Flags

The `sections` collection acts as a CMS-controlled **toggle switch** for enabling or disabling sections across the landing page and navigation menu.

#### Attributes

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `sectionId` | `string` | Unique identifier for the section (case-insensitive). |
| `isEnabled` | `boolean` | `true` to display the section; `false` to hide it. |

#### Recognized `sectionId` Values:

| `sectionId` | Supported Aliases | Component / Section Controlled |
| :--- | :--- | :--- |
| **`home`** | `hero` | Landing Hero Section (`Hero.astro`) |
| **`about`** | — | Chapter 01 About Section (`About.astro`) |
| **`info`** | — | Chapter 02 Info Section (`Info.astro`) |
| **`style`** | `styles` | Chapter 03 Styles Section (`Style.astro`) |
| **`works`** | `album`, `work` | Chapter 04 Works Section (`Works.astro`) |
| **`connect`** | `contact`, `contacts` | Chapter 05 Connect Section (`Connect.astro`) |
| **`comments`** | `comment` | Comments Section (`Comment.astro`) |
| **`panels1`** | `panels-1`, `panel-1`| Alternative Panel Section (`Panels-1.astro`) |

---

### 8. Comments (`comments`) — Guestbook / Feedback

The `comments` collection stores visitor comments or testimonials.

#### Attributes

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Author display name. |
| `profileLink` | `string` | Author profile or website URL. |
| `comment` | `text` (Long Text) | Comment text body. |

---

## 📋 Ready-to-Copy JSON Templates

When creating entries in Strapi, copy and paste these JSON blocks directly into the **`content`** field of the **`infos`** collection:

### 1. `greeting` (type: `information`)
```json
{
  "content": "YAHO!"
}
```

### 2. `quote` (type: `information`)
```json
{
  "content": "I am Ai but definitely not AI (artificial intelligence)."
}
```

### 3. `narrative` (type: `information`)
```json
{
  "content": "A human, self-taught, passionate freelance illustrator based in Asia with a unique blend of Japanese aesthetics and modern trends. Specializing in dynamic character art and conceptual designs, I bring stories and visions to life with mono-style storytelling."
}
```

### 4. `saturday` (type: `schedule`)
```json
{
  "day": "Saturdays",
  "start_time": "14:00",
  "end_time": "18:00",
  "note": "Afternoon onwards"
}
```

### 5. `sunday` (type: `schedule`)
```json
{
  "day": "Sundays",
  "start_time": "10:00",
  "end_time": "12:00",
  "note": "Morning 'till noon"
}
```

---

## 💻 TypeScript Types Reference

For frontend developers working on `apps/web/src/types/*`:

```typescript
// 1. Base Strapi metadata
export interface StrapiBase {
  id: number;
  documentId: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

// 2. Strapi Media Image
export interface StrapiImage {
  id?: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
}

// 3. Infos Collection (JSON Property)
export type InfoType = "information" | "schedule";

export interface InformationContent {
  content?: string;
}

export interface ScheduleContent {
  day?: string;
  start_time?: string;
  end_time?: string;
  note?: string;
}

export interface InfoData extends StrapiBase {
  name: string;
  type: InfoType;
  content: InformationContent | ScheduleContent | string;
}

// 4. About Single Type & Blocks Component
export interface ContentPanelData {
  id?: number;
  tag?: string;
  title?: string;
  content?: string | StrapiBlock[];
  image?: StrapiImage | null;
}

export interface AboutData extends StrapiBase {
  contents?: ContentPanelData[];
}

// 5. Hero Collection
export interface HeroData extends StrapiBase {
  sectionId?: string;
  image?: StrapiImage | null;
}

// 6. Style Panel Collection
export interface StylePanelData extends StrapiBase {
  title: string;
  description: string;
  panelNumber: string; // "01", "02", "03", "04"
  image?: StrapiImage | null;
}

// 7. Work Collection
export interface WorkData extends StrapiBase {
  title?: string;
  image?: StrapiImage | null;
}

// 8. Contact Collection
export interface ContactData extends StrapiBase {
  title: string;
  description?: string;
  link?: string;
}

// 9. Section Feature Flag
export interface SectionData extends StrapiBase {
  sectionId: string;
  isEnabled: boolean;
}
```

---

## 🛠️ Summary Checklist for Creating Content in Strapi

- [ ] **Infos**: Selected `type` (`information` vs `schedule`) and pasted valid JSON into `content`.
- [ ] **About**: Added panels 1 through 5 with corresponding `tag` (`panel1`, `panel2`, etc.) and filled in `content` blocks.
- [ ] **Heroes**: Provided `sectionId` (`"home"` or `"about"`) and uploaded an image.
- [ ] **Style Panels**: Assigned `panelNumber` (`"01"`, `"02"`, `"03"`, `"04"`).
- [ ] **Sections**: Set `isEnabled` to `true` for desired visible chapters (`home`, `about`, `info`, `style`, `works`, `connect`).
- [ ] **Publish**: Clicked **Publish** (not just Save) on every newly created or updated entry!
