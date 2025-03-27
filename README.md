<h1 align="center">Welcome to Clara Challenge - Appium / TypeScript / WebdriverIO 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> A mobile automation framework built with Appium, TypeScript, WebdriverIO, and Cucumber. It supports testing on Android devices using the Page Object Model (POM). The framework allows seamless execution on emulators and real devices, with detailed test reporting using Allure Reports.

### 🏠 [Homepage](https://github.com/javhierralejandro/clara-challenge-ts)

## Project Structure
> .gitignore package.json README.md tsconfig.json wdio.conf.ts allure-report/ ├── app.js ├── favicon.ico ├── index.html ├── styles.css ├── data/ ├── export/ ├── history/ ├── plugin/ └── widgets/ allure-results/ ├── *.png ├── *.json tests/ ├── features/ ├── pages/ └── steps/



## Install
To install this project dependencies, run:

1.- Install **NVM** (Node Version Manager) LTS to manage Node.js versions
```sh
nvm install --lts
```

2.- Install project package.json dependencies
```sh
npm install
```

## Run tests
To execute specific tests, use the following commands:

1.- Sort catalog products by NAME (Ascending / Descending) and PRICE (Ascending / Descending)
```sh
npx wdio run wdio.conf.ts --spec ./tests/features/sort_products.steps.feature
```

2.- Add catalog products to shopping cart
```sh
npx wdio run wdio.conf.ts --spec ./tests/features/add_products_to_cart.steps.feature
```

3.- Remove products from shopping cart
```sh
npx wdio run wdio.conf.ts --spec ./tests/features/remove_products_from_cart.steps.feature
```

4.- Checkout the shopping cart
```sh
npx wdio run wdio.conf.ts --spec ./tests/features/checkout_cart.steps.feature
```

## Reporting
Test results are generated in the allure-results directory. To view the allure report run:

1.- Install the Allure command-line tool if you haven't already:
```sh
npm install --save-dev @wdio/allure-reporter allure-commandline
```

2.- Generate and open the report:
```sh
npx allure generate allure-results --clean
npx allure open
```

## Author

👤 **Javier Alejandro Espinoza Castillo**

* Github: [@javhierralejandro](https://github.com/javhierralejandro)
* LinkedIn: [@ing-jaec \(Javier Alejandro Espinoza Castillo\)](https://linkedin.com/in/ing-jaec \(Javier Alejandro Espinoza Castillo\))

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_