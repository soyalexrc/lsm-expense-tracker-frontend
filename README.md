# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
# lsm-expense-tracker-frontend

## build image

`docker build --platform linux/amd64 -t pruebacontainerluighi2693/lsm-expense-tracker-frontend:latest .`
## push dockerhub

1. `docker push pruebacontainerluighi2693/lsm-expense-tracker-frontend:latest`
# deploy on mac machine
2. `docker stop $(docker ps | grep 'lsm-expense-tracker-frontend:latest' | awk '{print $1}')`

3. `docker rm $(docker ps -a | grep 'lsm-expense-tracker-frontend:latest' | awk '{print $1}')`

4. `docker image rm $(docker image ls | grep 'pruebacontainerluighi2693/lsm-expense-tracker-frontend' | grep -v 'site' | awk '{print $3}')`

5. `docker run -d -p 5473:80 pruebacontainerluighi2693/lsm-expense-tracker-frontend:latest`
