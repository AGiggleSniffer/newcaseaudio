# New Case Audio

Plays audio when a new case comes in to the unassigned queue.

## How to use?

1. Install Tampermonkey: [Tampermonkey](https://www.tampermonkey.net/index.php)
    - If using Chrome / Edge you will also need to enable permissions for Tampermonkey to run [Permission Guide](https://www.tampermonkey.net/faq.php#Q209)
2. Visit the raw script JS and tamper monkey will prompt you to install it: [Download](https://raw.githubusercontent.com/AGiggleSniffer/newcaseaudio/refs/heads/main/dist/index.user.js)
3. Favoriting the unassigned cases view in Service Now
4. After visiting the new favorited view and reloading the page you should see the "Start Timer" button the the left menu bar.

## How to develop

1. Clone repo to private server as you will need to install dependencies.
    - Please message me if youd like access to my developer VPS

2. Install Dependencies using [pnpm](https://pnpm.io/installation)

```
# bash
pnpm install
```

3. Compile changes
    - This will run the linter and formatter as well.

```
# bash
pnpm build
```

4. Push and merge to main to auto trigger updates for anyone with the script installed.

### Dependencies:

- Tailwind CSS
    - CSS classes that can be compiled in JS without CSS files.
    - Helps to not have to inject CSS files with tampermonkey and lets us use CSS easier in JS

- Vite
    - Compiler that turns project into raw JS.
    - Builds one file to not have to worry about imports within Tampermonkey so we can keep clean code to develop. (also needed for Tailwind)

- ESLint
    - Linter to find and catch runtime issues before running.
    - Run with `pnpm lint` or by running the build `pnpm build`

- Prettier
    - Code formatter to enforce consistent styles.
    - Run with `pnpm format` or by running the build `pnpm build`
