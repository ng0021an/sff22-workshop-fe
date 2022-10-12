# sff-workshop-fe

Frontend codebase for SFF workshop

## Setup

### Prerequisites

1. Ensure `nvm` is [installed](https://github.com/nvm-sh/nvm#install--update-script).
2. Clone the repository (e.g., `git clone git@github.cbhq.net:intl/sff-workshop-fe.git`).
3. If `nvm` doesn't auto-load the Node.js environment when navigating to the repo directory, run `nvm use`.
4. Enable [Yarn](https://yarnpkg.com/) by running `corepack enable`
5. Copy `.env.example` config file to `.env.local` and update the values for the config variables accordingly.

### VSCode

If you are using VSCode for working with this project, it's recommended to install these VSCode extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Install project dependencies

```bash
# Install 3rd party packages
yarn
```

## Development

### Run app A (aka RockSolidFinance's App)

```bash
yarn dev-a
```

### Run app B (aka FirmlyFinance's App)

```bash
yarn dev-b
```

### Run both apps

```bash
yarn dev
```

### Lint

```bash
yarn lint
```

## Production

### Build app A (aka RockSolidFinance's App)

```bash
yarn build-a
```

### Preview app A (aka RockSolidFinance's App)

```bash
yarn preview-a
```

### Build app B (aka FirmlyFinance's App)

```bash
yarn build-b
```

### Preview app B (aka RockSolidFinance's App)

```bash
yarn preview-b
```
