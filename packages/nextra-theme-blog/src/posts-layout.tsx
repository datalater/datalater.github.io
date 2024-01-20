import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactElement, ReactNode } from 'react'
import { BasicLayout } from './basic-layout'
import { useBlogContext } from './blog-context'
import { MDXTheme } from './mdx-theme'
import Nav from './nav'
import { collectPostsAndNavs } from './utils/collect'
import getTags from './utils/get-tags'
import { MdxFile } from 'nextra'

type UseBlogContextType = ReturnType<typeof useBlogContext>
type OptsType = UseBlogContextType['opts']
type FrontMatterType = OptsType['frontMatter']
type TagName = string | string[] | null | undefined

const hasSameRouteWith = (currentRoute: string) => (post: MdxFile) =>
  post.route.startsWith(currentRoute)

const hasValidTagWith =
  (tagName: TagName, type: FrontMatterType['type']) => (post: MdxFile) => {
    // tagName이 주어진 경우, 해당 tagName이 포스트의 태그 배열에 포함되어야 합니다.
    if (tagName) {
      const tags = getTags(post)
      // tagName이 배열이 아니고, tags에 포함되지 않는 경우, 이 포스트를 제외합니다.
      return Array.isArray(tagName) || tags.includes(tagName)
    }
    // type이 'tag'인 경우에는 포스트를 제외합니다.
    return type !== 'tag'
  }

export function PostsLayout({
  children
}: {
  children: ReactNode
}): ReactElement {
  const { config, opts } = useBlogContext()
  const { posts } = collectPostsAndNavs({ config, opts })
  const router = useRouter()
  const { type } = opts.frontMatter
  const tagName = type === 'tag' ? router.query.tag : null

  const postList = posts
    .filter(hasSameRouteWith(router.route))
    .filter(hasValidTagWith(tagName, type))
    .map((post) => {
      const postTitle = post.frontMatter?.title || post.name
      const date: Date | null = post.frontMatter?.date
        ? new Date(post.frontMatter.date)
        : null
      const description = post.frontMatter?.description

      return (
        <div key={post.route} className="post-item">
          <h3>
            <Link href={post.route} passHref legacyBehavior>
              <a className="!nx-no-underline">{postTitle}</a>
            </Link>
          </h3>
          {description && (
            <p className="nx-mb-2 dark:nx-text-gray-400 nx-text-gray-600">
              {description}
              {config.readMore && (
                <Link href={post.route} passHref legacyBehavior>
                  <a className="post-item-more nx-ml-2">{config.readMore}</a>
                </Link>
              )}
            </p>
          )}
          {date && (
            <time
              className="nx-text-sm dark:nx-text-gray-400 nx-text-gray-600"
              dateTime={date.toISOString()}
            >
              {date.toDateString()}
            </time>
          )}
        </div>
      )
    })
  return (
    <BasicLayout>
      <Nav />
      <MDXTheme>{children}</MDXTheme>
      {postList}
    </BasicLayout>
  )
}
