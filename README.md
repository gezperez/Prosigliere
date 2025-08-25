# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

To build in a real device, run:

```bash
npx expo run:ios
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Code Quality Tools

This project uses several tools to maintain code quality:

### Prettier

Code formatting is handled by Prettier. Run the following commands:

- `yarn format` - Format all files
- `yarn format:check` - Check if files are properly formatted

### ESLint

Code linting is handled by ESLint with Expo configuration:

- `yarn lint` - Run linting checks
- `yarn lint:fix` - Run linting checks and auto-fix issues

### Git Hooks (Husky + lint-staged)

The project uses Husky to run pre-commit and pre-push hooks:

**Pre-commit hook:**

- Automatically formats staged files with Prettier
- Runs ESLint with auto-fix on staged files

**Pre-push hook:**

- Runs full linting check
- Verifies all files are properly formatted

These hooks ensure code quality is maintained before commits and pushes.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
