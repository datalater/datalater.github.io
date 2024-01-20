# How to organize layouts

- [Navigation order](#navigation-order)
  - [Q. How to change the order of navigation?](#q-how-to-change-the-order-of-navigation)
- [Layout types](#layout-types)
  - [Q. How is the layout of the file determined?](#q-how-is-the-layout-of-the-file-determined)

## Navigation order

### Q. How to change the order of navigation?

```sh
# as-is
[Snippets] [About] [Posts] [Github↗]
```

```sh
# to-be
[About] [Snippets] [Posts] [Github↗]
```

> A. You should set the order of `[About]` page to be the latest in the frontmatter.
>
> For example, the frontmatter of `About` and `Posts` pages should be like this:

<!-- prettier-ignore-start -->

```mdx
---
type: page
title: About
date: 2023-11-21 {/* latter than the date of Posts */}
---

# Min
```

```
---
type: posts
title: Posts
date: 2021-03-18
---

# Posts

```

<!-- prettier-ignore-end -->

> The page whose date is the latest will be the first in the navigation.
>
> 🔍 Find more details on `packages/nextra-theme-blog/src/utils/collect.ts`:

```ts
posts.sort(sortDate)
navPages.sort(sortDate)
```

## Layout types

### Q. How is the layout of the file determined?

> A. The layout of the file is determined by the `type` field of the frontmatter.
>
> 🔍 Find more details in the `packages/nextra-theme-blog/src/index.tsx`:

```tsx
// packages/nextra-theme-blog/src/index.tsx

const layoutMap = {
  post: ArticleLayout,
  page: PageLayout,
  posts: PostsLayout,
  tag: PostsLayout
}

const BlogLayout = ({
  config,
  children,
  opts
}: LayoutProps & { children: ReactNode }): ReactElement => {
  const type = opts.frontMatter.type || 'post'
  const Layout = layoutMap[type]
  if (!Layout) {
    throw new Error(
      `nextra-theme-blog does not support the layout type "${type}" It only supports "post", "page", "posts" and "tag"`
    )
  }
  return (
    <BlogProvider opts={opts} config={config}>
      {/* debug */}
      <div>frontMatter.type: {opts.frontMatter.type}</div>
      {/* debug */}
      <div>type: {type}</div>
      <Layout>{children}</Layout>
    </BlogProvider>
  )
}
```
