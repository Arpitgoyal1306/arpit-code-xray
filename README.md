# Arpit Code X-Ray

A simple CLI tool that analyzes a Node.js project and generates a quick codebase report.

## Features

- Counts JavaScript, JSON, Markdown, and other files
- Detects basic technologies from package.json
- Checks TODO and FIXME comments
- Generates a simple Code Weather report

## Installation

```bash
npm install -g arpit-code-xray
```

## Usage

Go to the project you want to analyze:

```bash
cd /path/to/your/project
```

Then run:

```bash
arpit-code-xray
```

## Example

```text
🔬 ARPIT CODE X-RAY

FILES
  JavaScript : 12
  JSON       : 3
  Markdown   : 2
  Other      : 5

TECHNOLOGIES
  ✓ Express
  ✓ Prisma

🌦️ CODE WEATHER
  🌤️ Mild

  TODOs  : 3
  FIXMEs : 1
```

## How It Works

The tool scans the project directory recursively.

It ignores node_modules and .git.

The Code Weather is based on the number of TODO and FIXME comments found in JavaScript files.

## License

MIT
