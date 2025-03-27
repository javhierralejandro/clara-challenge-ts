import { Given, When, Then } from '@cucumber/cucumber';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { CatalogPage } from '../pages/catalog.page';

let catalogPage: CatalogPage;
let productPage: ProductPage;
let cartPage: CartPage;

Given('the user is on the catalog page', async function () {
    catalogPage = new CatalogPage();
    await browser.takeScreenshot();
});

When(/^the user drags a product to the cart$/, async () => {
    productPage = new ProductPage();
    await productPage.dragProductToCart();
});

Then(/^the user swipes back to the product list$/, async () => {
    cartPage = new CartPage();
    await cartPage.swipeBackToProducts();
});