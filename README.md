<p align="center">
	<img src="https://raw.githubusercontent.com/JannikHv/twigger/master/assets/twigger-logo.svg" width="200">
</p>

# Twigger

Twigger ist a simple static site generator using Twig and SCSS.

## Motivation

My problem building a simple static HTML website was that...

- ... I don't want to have redundant HTML
  - so Twigger uses Twig that can include Twig components.
- ... I don't want to write plain CSS
  - so Twigger used SCSS, that is compiled and compressed to CSS by default.
- ... I don't want to have bloated JavaScript files
  - so Twigger automatically minifies JavaScript by default.

## Commands

| Command / Arguments | Description                       |
| ------------------- | --------------------------------- |
| `-h, --help`        | Show help screen                  |
| `-v, --version`     | Show installed version            |
| `init`              | Init twigger in current directory |
| `build`             | Build current twigger application |
| `serve`             | Serve current twigger application |
| `clear`             | Clears the public directory       |

## Installation

Install globally from NPM:

`npm i -g twigger`

## Configuration

The following configuration is used by default:

```json
{
  "cssOutputStyle": "compressed",
  "minifyJs": true,
  "templateVariables": { }
}
```

#### cssOutputStyle

- Type: `String`
- Values: `"nested"`, `"expanded"`, `"compact"`, `"compressed"`
- Default: `compressed`

#### minifyJs

- Type: `Boolean`
- Default: `true`

### templateVariables

Template variables can be globally accessed in your project's Twig files.

- Type: `Object`
- Default: `{ }`

You can override it by editing the `twigger-config.json` in your project's root directory.

## Basic Structure

After initializing your twigger project, the following structure is built:

| Directory         | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `public/`         | Contains the built application. Can be cleared with `twigger clear`. |
| `src/assets/`     | Assets directory that is synced to the public directory.     |
| `src/js/`         | Each JavaScript file is optionally minified and written to the public directory. |
| `src/pages/`      | Twig pages that are each rendered to HTML files in the public directory. |
| `src/components/` | Twig components that are included by Twig pages.             |
| `src/styles/`     | SCSS styles that is optionally minified and written to the public directory as `style.css`. |

<p align="center">
  <img src="https://raw.githubusercontent.com/JannikHv/twigger/master/assets/twigger-overview.png">
</p>

## Get started

1. Install twigger globally

`npm i -g twigger`

2. Create a new project directory

`mkdir my-new-project && cd my-new-project`

3. Initialize project

`twigger init`

4. Serve the application on `localhost:8080`

`twigger serve`

5. Build the application

`twigger build`

## Author

Jannik Hauptvogel \<JannikHv@gmail.com\>
