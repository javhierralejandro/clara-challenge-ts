import { expect } from '@wdio/globals';
import { Given, When, Then } from '@cucumber/cucumber';
import { CatalogPage } from '../pages/catalog.page';
import { ProductPage } from '../pages/product.page';
import Page from '../pages/page';
import { MenuPage } from '../pages/menu.page';
import { browser } from '@wdio/globals';

let catalogPage: CatalogPage;
let productPage: ProductPage;
let globalPage: Page;
let menuPage: MenuPage;

// Step definition for navigating to the catalog page
Given('the user is on the catalog page', async function () {
    catalogPage = new CatalogPage();
    await browser.takeScreenshot();
});

// Step definition for selecting a product in the catalog page by index
When('the user selects product {int} in the catalog page', async function (index: number) {
    await catalogPage.selectProduct(index);
    productPage = new ProductPage();
    await browser.takeScreenshot();
});

// Step definition for adding product to the cart
When('the user adds product to cart', async function () {
    await productPage.addProductToCart();
    globalPage = new Page();
    await globalPage.openMenu();
    menuPage = new MenuPage();
    await menuPage.openCatalog();
    await browser.takeScreenshot();
});

// Step definition for verifying the number of products in the cart
Then('the cart should contain more than 0 products', async function () {
    const actualCartCount = await globalPage.getCartCount(); 

    if (actualCartCount == 0) {
        throw new Error(`Expected 1 or more products, but found ${actualCartCount}`);
    }
    expect(actualCartCount).toBeGreaterThan(0);
    await browser.takeScreenshot();
});
