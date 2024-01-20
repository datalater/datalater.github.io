# How to customize Nextra theme

- [Customize Nextra theme](#customize-nextra-theme)
  - [Follow the documentation](#follow-the-documentation)
  - [Download](#download)
  - [Setup (only needs to be run once)](#setup-only-needs-to-be-run-once)
  - [Alert](#alert)
- [See also](#see-also)

## Customize Nextra theme

1. Follow the documentation from https://nextra.site/docs/blog-theme/start.
2. Download [`nextra-theme-blog`](https://github.com/shuding/nextra/tree/main/packages/nextra-theme-blog) package and customize it.

### Follow the documentation

Do as [the documentation](https://nextra.site/docs/blog-theme/start) says:

- Install
- Add Next.js Config
- Create Blog Theme Config

### Download

```sh
# add nextra repostiory as upstream
git remote add upstream https://github.com/shuding/nextra.git
git fetch upstream

# show all file names in upstream/main
git ls-tree -r upstream/main --name-only

# download nextra-theme-blog package to local
git checkout upstream/main packages/nextra-theme-blog

# download dependencies of nextra-theme-blog
# (nextra-theme-blog/tailwind.config.js depends on nextra-theme-docs/tailwind.config.js)
git checkout upstream/main packages/nextra-theme-docs/tailwind.config.js
```

### Setup (only needs to be run once)

You should specify workspaces in `package.json`:

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

### Alert

🚧 Get the build file of `nextra-theme-blog/style.css`:

```sh
# install nextra-theme-blog
pnpm add nextra-theme-blog

# copy the build file of nextra-theme-blog/style.css to ./packages/nextra-theme-blog/style.css
```

> Or you can copy the file from [this repository](https://raw.githubusercontent.com/datalater/tutorial-nextra-blog/9dd0bde9f02b05a3bb678a4f436f6c3f3a2d3380/packages/nextra-theme-blog/style.css?token=GHSAT0AAAAAACJDSYCTNEWSW2OBS5FJARJAZNLKDQA).

> **Why?**
>
> There is an issue that `nextra-theme-blog/style.css` is not built properly.
> So the style will not be properly applied.
> For example, the heading font size will not be different from the body font size.
>
> Since `nextra-theme-blog/tailwind.config.js` depends on `nextra-theme-docs/tailwind.config.js`, and `nextra-theme-docs/tailwind.config.js` depends not only on its package and but also on `nextra` package, unless we have `nextra` and `nextra-theme-docs` packages locally, we cannot build `nextra-theme-blog/style.css` properly.
>
> So, we should copy the build file of `nextra/theme-blog/style.css`.
>
> This section will be removed when the issue is resolved.

## See also

- [README.md](../README.md)
