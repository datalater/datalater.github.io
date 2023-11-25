# tutorial-nextra-blog

- [Start from template](#start-from-template)
- [Use `nextra-theme-blog` package locally](#use-nextra-theme-blog-package-locally)
  - [Download](#download)
  - [Setup (only needs to be run once)](#setup-only-needs-to-be-run-once)
- [📚 See also](#-see-also)

> This documentation aligns with the Nextra and `nextra-theme-blog` version as of November 25, 2023.

## Start from template

Follow the documentation from https://nextra.site/docs/blog-theme/start.

## Use `nextra-theme-blog` package locally

> We will locally utilize `nextra-theme-blog` to manipulate and study the source code.

### Download

```sh
# add nextra repostiory as upstream
git remote add upstream https://github.com/shuding/nextra.git
git fetch upstream

# show all file names in upstream/main
git ls-tree -r upstream/main --name-only

# copy nextra-theme-blog package to local
git checkout upstream/main packages/nextra-theme-blog

# copy dependencies of nextra-theme-blog (nextra-theme-blog/tailwind.config.js depends on nextra-theme-docs/tailwind.config.js)
git checkout upstream/main packages/nextra-theme-docs/tailwind.config.js
```

### Setup (only needs to be run once)

You should specify workspace in `package.json`:

```json
{
  "workspaces": ["packages/*"]
}
```

Create `pnpm-workspace.yaml`:

> https://pnpm.io/ko/7.x/pnpm-workspace_yaml

```yaml
packages:
  # all packages in direct subdirs of packages/
  - 'packages/*'
  # all packages in subdirs of components/
  - 'components/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
```

Ensure that your `package.json` looks like this:

> We will use `nextra-theme-blog` from local.

```json
{
  "dependencies": {
    "next": "^14.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "nextra": "^2.13.2",
    "nextra-theme-blog": "workspace:*" // changed from `^2.13.2`
  }
}
```

`nextra-theme-blog/package.json`:

```json
{
  "devDependencies": {
    "@tailwindcss/nesting": "^0.0.0-insiders.565cd3e",
    "@tailwindcss/typography": "^0.5.9",
    "@types/react": "^18.2.21",
    "@types/react-dom": "^18.2.7",
    "concurrently": "^8.0.0",
    "next": "^13.5.6",
    "nextra": "^2.13.2", // changed from `workspace:*`
    "postcss": "^8.4.31",
    "postcss-cli": "^10.1.0",
    "postcss-import": "^15.1.0",
    "postcss-lightningcss": "^1.0.0",
    "react": "^18.2.0",
    "react-cusdis": "^2.1.3",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.3",
    "vitest": "^0.34.0"
  }
}
```

Install dependencies:

```sh
pnpm i
```

Install `tsup` and others to build the packages:

> `nextra` and `nextra-theme-blog` are to be built with `tsup`.
>
> - `tsup` is a TypeScript module bundler with treeshaking and minification support.
> - `--workspace-root` is required to build packages in the workspace root in pnpm.
>
> [Check the original `package.json` in the root repository of Nextra.](https://github.com/shuding/nextra/blob/66798f8e7f92cca80f2d62d19f9db5667bcc62ef/package.json#L23)

```sh
pnpm i -D tsup typescript --workspace-root
```

Build the packages:

```sh
pnpm --filter ./packages/nextra-theme-blog build:all
```

Change `next.config.js`:

> Use local `nextra-theme-blog`.

```js
const withNextra = require('nextra')({
  theme: './packages/nextra-theme-blog/src/index',
  themeConfig: './theme.config.jsx',
});

module.exports = withNextra();

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
```

Run the development server:

```sh
pnpm run dev
```

🚧 Get build file of `nextra-theme-blog/style.css`:

> There is an issue that `nextra-theme-blog/style.css` is not built properly.
> So the style will not be properly applied.
> For example, the heading font size will not be different from the body font size.
>
> Since `nextra-theme-blog/tailwind.config.js` depends on `nextra-theme-docs/tailwind.config.js`, and `nextra-theme-docs/tailwind.config.js` depends not only on its package and but also on `nextra` package, unless we have `nextra` and `nextra-theme-docs` packages locally, we cannot build `nextra-theme-blog/style.css` properly.
>
> So, we will copy the build file of `nextra/theme-blog/style.css`. (You can get the file by running `pnpm add nextra-theme-blog`.)
>
> This section will be removed when the issue is resolved.

## 📚 See also

- [pnpm - run commands for specific workspaces](https://pnpm.io/filtering#--filter-glob---filter-glob)
  - (example) https://stackoverflow.com/a/75903137
