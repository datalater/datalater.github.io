import Link from 'next/link'
import type { ReactElement } from 'react'
import { useBlogContext } from './blog-context'
import ThemeSwitch from './theme-switch'
import { collectPostsAndNavs } from './utils/collect'

export default function Nav(): ReactElement {
  const { opts, config } = useBlogContext()
  const { navPages } = collectPostsAndNavs({ opts, config })

  return (
    <div className="nx-mb-8 nx-flex nx-items-center nx-gap-3">
      <div className="nx-flex nx-grow nx-flex-wrap nx-items-center nx-justify-end nx-gap-3">
        {navPages.map(page => {
          const name = page.frontMatter?.title || page.name
          if (page.active) {
            return (
              <span
                key={page.route}
                className="nx-cursor-default dark:nx-text-gray-400 nx-text-gray-600"
              >
                {name}
              </span>
            )
          }
          return (
            <Link key={page.route} href={page.route} passHref legacyBehavior>
              <a>{name}</a>
            </Link>
          )
        })}
        {config.navs?.map(nav => (
          <Link key={nav.url} href={nav.url} passHref legacyBehavior>
            <a target={nav.newTab ? '_blank' : '_self'}>
              {nav.name}
              {nav.newTab && (
                <span className="nx-inline-flex">
                  <svg
                    data-testid="geist-icon"
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    className="nx-text-current"
                    style={{ width: 14, height: 14 }}
                  >
                    <path d="M7 17L17 7"></path>
                    <path d="M7 7h10v10"></path>
                  </svg>
                </span>
              )}
            </a>
          </Link>
        ))}
      </div>
      {config.darkMode && <ThemeSwitch />}
    </div>
  )
}
