# Frame.

> A calm, visual-first social space for sharing the moments worth keeping.

Frame is an Instagram-inspired social media frontend built with React and Vite. It is currently a fully interactive demo: there is no database, authentication service, or API dependency required to explore the experience. Posts, likes, saves, comments, follows, and new posts are handled with local React state.

<p align="center">
  <a href="http://localhost:5174/"><strong>Open the app locally</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#getting-started">Getting started</a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#roadmap">Roadmap</a>
</p>

## Preview

### Home feed

The home view combines stories, a two-tab feed, social actions, comments, and a suggestions rail.

![Frame home feed preview](https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=85)

### Discover

The Discover route turns posts into an editorial grid for browsing visual content.

![Frame discover preview](https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85)

> The two supplied browser captures show these same product views: the home feed at `/` and the Discover gallery at `/discover`. To store those exact captures in the repository, add them as `docs/screenshots/home.png` and `docs/screenshots/discover.png`, then replace the image URLs above with local Markdown image links.

## What is included

- **Home feed** with stories, For you / Following tabs, post cards, captions, likes, saves, comments, and sharing controls.
- **Discover gallery** with searchable visual browsing UI and an editorial masonry-style layout.
- **Create post** flow with image preview, image URL input, caption counter, and publish action.
- **Profile** view with cover image, avatar, biography, profile statistics, and post grid.
- **Messages, Activity, and Saved** routes with polished empty states ready for future data.
- **Demo authentication** screen with sign in and account creation states. Any valid-looking form submission enters the demo.
- **Responsive navigation** with a desktop sidebar and mobile bottom tab bar.
- **Local interactions** for liking, saving, commenting, following, publishing, and signing out.

## Product map

```mermaid
mindmap
  root((Frame))
    Home
      Stories
      For you
      Following
      Like
      Comment
      Save
    Discover
      Search
      Visual grid
      Engagement counts
    Create
      Image preview
      Caption
      Publish
    Profile
      Cover
      Stats
      Post grid
    Community
      Messages
      Activity
      Saved
    Account
      Sign in
      Register
      Sign out
```

## Application architecture

The current implementation intentionally keeps the data layer in the browser. This makes the design easy to review and allows the interface to be demonstrated without MongoDB, environment variables, or a running API.

```mermaid
flowchart LR
  Browser[Browser] --> Router[React Router]
  Router --> Layout[Responsive app layout]
  Layout --> Pages[Home, Discover, Create, Profile]
  Layout --> Utility[Messages, Activity, Saved]
  Pages --> Context[AppContext local state]
  Utility --> Context
  Context --> Posts[Posts and comments]
  Context --> Social[Likes, saves, follows]
  Context --> Session[Demo session]
  Context --> Local[In-memory browser state]
```

## User flow

```mermaid
flowchart TD
  Start([Open Frame]) --> Session{Demo session active?}
  Session -- No --> Auth[Sign in or create account]
  Auth --> Feed[Home feed]
  Session -- Yes --> Feed
  Feed --> Explore[Discover]
  Feed --> NewPost[Create post]
  Feed --> Profile[Profile]
  Feed --> Community[Messages / Activity / Saved]
  Explore --> Feed
  NewPost --> Publish[Publish to local feed]
  Publish --> Feed
  Profile --> Feed
  Community --> Feed
```

## Route map

| Route | View | Purpose |
| --- | --- | --- |
| `/` | Home | Stories, feed posts, comments, likes, saves, and suggestions |
| `/discover` | Discover | Browse the visual post grid |
| `/create` | Create | Preview an image and publish a new local post |
| `/profile` | Profile | View profile details and the post grid |
| `/messages` | Messages | Conversation placeholder for the next product phase |
| `/activity` | Activity | Notification placeholder for likes, follows, and comments |
| `/saved` | Saved | Saved-content placeholder |

## Interaction model

```mermaid
sequenceDiagram
  participant User
  participant View as React view
  participant Store as AppContext
  participant UI as Updated UI

  User->>View: Click like, save, follow, or submit comment
  View->>Store: Dispatch local state update
  Store->>Store: Update posts or relationship list
  Store-->>View: Render new state
  View-->>UI: Refresh counts, icons, and content
```

## State model

```mermaid
classDiagram
  class AppContext {
    +posts
    +following
    +currentUser
    +isLoggedIn
    +toggleLike(id)
    +toggleSave(id)
    +addComment(id, text)
    +toggleFollow(id)
    +addPost(post)
    +setIsLoggedIn(value)
  }

  class Post {
    +id
    +author
    +caption
    +image
    +likes
    +comments
    +liked
    +saved
    +time
  }

  class Person {
    +id
    +name
    +username
    +avatar
    +bio
    +following
  }

  AppContext "1" o-- "many" Post
  Post "many" --> "1" Person : author
  Post "many" o-- "many" Person : comment authors
```

## Tech stack

| Layer | Technology |
| --- | --- |
| UI | React 18 |
| Build tool | Vite 6 |
| Routing | React Router |
| Icons | Lucide React |
| Styling | Responsive CSS with custom design tokens |
| Data | Local React state and mock content |
| Media | Unsplash and Pravatar demo URLs |

## Project structure

```text
Social_Media_app/
├── client/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── main.jsx       # Routes, pages, mock data, and interactions
│       └── styles.css     # Frame design system and responsive layouts
├── server/                # Optional legacy API, not required for the frontend demo
├── package.json           # Workspace scripts
└── README.md
```

## Getting started

### Requirements

- Node.js 18 or newer
- npm 9 or newer

### Install

```bash
npm install
npm install --prefix client
```

### Run the frontend

```bash
npm run dev --prefix client
```

Vite will print the local URL. In the current workspace, port `5173` was already occupied, so the client opened at:

```text
http://localhost:5174/
```

### Build for production

```bash
npm run build --prefix client
```

### Preview the production build

```bash
npm run preview --prefix client
```

## Demo notes

- No MongoDB setup is needed.
- No backend needs to be running.
- Refreshing the page resets the in-memory demo state.
- The image URLs require an internet connection. The layout and interactions still load without them.
- The existing `server/` folder is retained for future API work, but the current client does not call it.

## Design direction

Frame uses a restrained editorial visual language rather than a dense dashboard treatment:

- Warm paper background with quiet borders and charcoal typography.
- Coral used as a small interaction accent for likes, links, and calls to action.
- Playfair Display for expressive headings and DM Sans for readable interface text.
- Large, image-led content with generous whitespace.
- Desktop sidebar navigation that becomes a compact mobile tab bar.

## Roadmap

```mermaid
gantt
  title Frame product roadmap
  dateFormat  YYYY-MM-DD
  axisFormat  %b
  section Foundation
  Frontend demo and routing        :done, foundation, 2026-09-01, 2026-09-27
  Responsive visual system         :done, visual, 2026-09-10, 2026-09-27
  section Product data
  Persist posts and profiles        :data, 2026-09-28, 14d
  Real authentication               :auth, after data, 10d
  Image upload storage              :upload, after auth, 14d
  section Community
  Real comments and notifications   :community, after upload, 14d
  Direct messaging                  :messages, after community, 14d
```

## License

This project is a private learning and portfolio project. Add a license before distributing it publicly.
