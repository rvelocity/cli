# rvelocity-cli
![npm version](https://img.shields.io/npm/v/rvelocity-cli)

A CLI for generating and managing React and React Native components with ease.

`rvelocity-cli` simplifies the development process by offering quick commands to initialize new React/React Native projects and create components. It helps developers focus on building features rather than dealing with repetitive tasks.

### Features
- **Initialize Project Setup**: Set up a React/React Native project with the required structure and configuration in one command.
- **Create Components**: Generate React or React Native components using a single command to speed up development.


### Installation
To install `rvelocity-cli` globally, run:

```bash
npm install -g rvelocity-cli
```

### Usage

#### init
Use the init command to initialize setup for a new project.
The init command installs dependencies, adds basic folder setup and installs required packages.

```bash
rc init -[options]
```

#### g
Use the g command to generate components to your project.
The g command generate a component file includes tsx, styles and barrel file to your project.

```bash
rc g [path] [name] -[options]
```

##### Example

```bash
rc g components Button -rn
```

This will create the following structure:

```
src/components/Button/
  ├── Button.tsx
  ├── styles.ts
  └── index.ts
```

### Documentation
For detailed usage and command options, refer to the [CLI Documentation](./docs/CLI.md).

### Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.
For any issues or feature requests, feel free to open an issue on [GitHub](https://github.com/AdityaTarale/rvelocity-cli).