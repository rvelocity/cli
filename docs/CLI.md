

## CLI

Use the `rvelocity-cli` to initialize new project or add components to your React or React Native project.

### init

Use the `init` command to initialize configuration and project setup.

The `init` command sets up the project structure, installs dependencies, and configures your React Native environment.

```bash
rc init
```

You will be prompted with a few options during initialization to customize your setup.

#### Options

```
Usage: rc init [options]
Initialize your project with a predefined structure
```

**Options:**

- `-rn`: Initializes a React Native project setup. [REACT NATIVE SETUP Documentation](./REACTNATIVE_INIT.md)

### g

Use the `g` command to generate components and their respective files for your project.

```bash
rc g <folderPathInsideSrc> <componentName>
```

You can specify the type of project (React or React Native) and the folder where the component should be created.

#### Options

```
Usage: rc g [options] <folderName> <componentName>
Generate a component for your project
```

**Options:**

- `-rn`: Generate a React Native component.


### Example

You can use `rvelocity-cli` to generate a new ReactJS or React Native component with a single command.

#### For ReactJS:

```bash
rc g <folderName> <componentName>
```

Example:

```bash
rc g components Button
```

This will create the following structure:

```
src/components/Button/
  ├── Button.tsx
  ├── styles.css
  └── index.ts
```

#### For React Native:

Use the `-rn` flag to generate React Native components.

```bash
rc g <folderName> <componentName> -rn
```

Example:

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

### Explanation of Files:

- **`Button.tsx`**: The main component file.
- **`styles.css`/`styles.ts`**: The style file for ReactJS (CSS) or React Native (StyleSheet).
- **`index.ts`**: Barrel file for easier imports.

## More Example

#### Generating a ReactJS Button component:

```bash
rc g components Button
```

#### Generating a React Native HomeScreen component:

```bash
rc g screens HomeScreen -rn
```
