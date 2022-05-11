<p align="center">
	<img src="https://raw.githubusercontent.com/JannikHv/twigger/master/assets/twigger-logo.svg" width="200">
</p>

# Twigger

Twigger ist a simple static site generator using Twig and SCSS.

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
  "minifyJs": true
}
```

#### cssOutputStyle

- Type: `String`
- Values: `"nested"`, `"expanded"`, `"compact"`, `"compressed"`

#### minifyJs

- Type: `Boolean`

You can override it by creating your own `twigger-config.json` in your project's root.
