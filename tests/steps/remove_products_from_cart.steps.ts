import { Given, When, Then } from '@cucumber/cucumber';
import Page from '../pages/page';
import { CartPage } from '../pages/cart.page';

let globalPage: Page;
let cartPage: CartPage;
let initialCartCount: number;

// Step definition for validating that the user has at least one product in the cart
Given('the user has at least one product in the cart', async function () {
    globalPage = new Page();

    // Get the current cart count
    initialCartCount = await globalPage.getCartCount();

    // Validate that the cart count is greater than 0
    if (initialCartCount <= 0) {
        throw new Error(`Expected at least 1 product in the cart, but found ${initialCartCount}`);
    }
    expect(initialCartCount).toBeGreaterThan(0);

    // Open the cart page
    await globalPage.openCart();
    cartPage = new CartPage();
});

// Step definition for removing a product from the cart
When('the user clicks on Remove Item', async function () {
    // Remove the product from the cart
    await cartPage.removeItem();
    globalPage = new Page();
});

// Step definition for verifying that the product was removed from the cart
Then('the product should be removed from cart', async function () {
    // Wait for UI update
    await driver.pause(1000);

    // Get the final cart count
    const finalCartCount = await globalPage.getCartCount();

    // Validate that the final cart count is equal to the initial cart count minus 1
    if (finalCartCount == initialCartCount) {
        throw new Error(`Error: the product was not removed correctly. Expected ${initialCartCount - 1}, but found ${finalCartCount}`);
    }
    
    expect(finalCartCount).toBeLessThan(initialCartCount);
});