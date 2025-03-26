import { Given, When, Then } from '@cucumber/cucumber';
import Page from '../pages/page';
import { CartPage } from '../pages/cart.page';
import { LoginPage } from '../pages/login.page';
import { CheckoutAddressPage } from '../pages/checkout_address.page';
import { CheckoutPaymentPage } from '../pages/checkout_payment.page';
import { CheckoutPlaceOrderPage } from '../pages/checkout_place_order.page';
import { CheckoutCompletePage } from '../pages/checkout_complete.page';
import { MenuPage } from '../pages/menu.page';

let globalPage: Page;
let cartPage: CartPage;
let loginPage: LoginPage;
let checkoutAddressPage: CheckoutAddressPage;
let checkoutPaymentPage: CheckoutPaymentPage;
let checkoutPlaceOrderPage: CheckoutPlaceOrderPage;
let checkoutCompletePage: CheckoutCompletePage;
let menuPage: MenuPage;

// Step definition for validating that the user has at least one product in the cart
Given('the user has at least one product in cart', async function () {
    globalPage = new Page();

    // Get the current cart count
    const actualCartCount = await globalPage.getCartCount();
    
    // Validate that the cart count is greater than 0
    if (actualCartCount == 0) {
        throw new Error(`Expected at least 1 product in the cart, but found ${actualCartCount}`);
    }
    expect(actualCartCount).toBeGreaterThan(0);

    // Open the cart page
    await globalPage.openCart();
    cartPage = new CartPage();
});

// Step definition for proceeding to checkout
When('the user proceeds to checkout', async function () {
    await cartPage.proceedToCheckout();
    loginPage = new LoginPage();
});

// Step definition for logging in to proceed to checkout
When('the user logs in to proceed to checkout', async function () {
    await loginPage.enterUsername('bob@example.com');
    await loginPage.enterPassword('10203040');
    await loginPage.clickLogin();
    checkoutAddressPage = new CheckoutAddressPage();
});

// Step definition for entering shipping address
When('the user enters a shipping address', async function () {
    await checkoutAddressPage.enterFullName('Rebecca Winter');
    await checkoutAddressPage.enterAddress1('Mandorley 112');
    await checkoutAddressPage.enterAddress2('Entrance 1');
    await checkoutAddressPage.enterCity('Truro');
    await checkoutAddressPage.enterState('Cornwall');
    await checkoutAddressPage.enterZipcode('89750');
    await checkoutAddressPage.enterCountry('United Kingdom');

    await checkoutAddressPage.proceedToPayment();
    checkoutPaymentPage = new CheckoutPaymentPage();
});

// Step definition for entering payment method
When('the user enters a payment method', async function () {
    try {
        await checkoutPaymentPage.enterCardFullName('Rebecca Winter');
    } catch (error) {
        await checkoutPaymentPage.enterCardFullName('Rebecca Winter'); // Retry in case of StaleElementReferenceException
    }

    await checkoutPaymentPage.enterCardNumber('325812657568789');
    await checkoutPaymentPage.enterExpirationDate('03/25');
    await checkoutPaymentPage.enterSecurityCode('123');

    // Verify if billing address checkbox is checked
    const billingAddressChecked = await checkoutPaymentPage.verifyCheckbox();

    if (billingAddressChecked) {
        await checkoutPaymentPage.reviewOrder();
    } else {
        // If not checked, proceed to fill billing information (optional step if needed)
        await checkoutPaymentPage.reviewOrder();
    }

    checkoutPlaceOrderPage = new CheckoutPlaceOrderPage();
});

// Step definition for placing the order
When('the user places the order', async function () {
    await checkoutPlaceOrderPage.placeOrder();
    checkoutCompletePage = new CheckoutCompletePage();
});

// Step definition for verifying that the checkout is completed
Then('the products checkout should be completed', async function () {
    const checkoutCompletionText = await checkoutCompletePage.validateCheckoutCompletion();
    if (checkoutCompletionText !== 'Checkout Complete') {
        throw new Error(`Checkout completion failed. Expected "Checkout Complete", but found "${checkoutCompletionText}"`);
    }

    // Continue shopping
    await checkoutCompletePage.continueShopping();

    // Logging out
    globalPage = new Page();
    try {
        await globalPage.openMenu();
        menuPage = new MenuPage();
        await menuPage.clickLogout();
    } catch (error) {
        // Retry in case of StaleElementReferenceException
        await globalPage.openMenu(); 
        menuPage = new MenuPage();
        await menuPage.clickLogout();
    }
    

    // Handle logout request alert
    if (await driver.getAlertText()!= null) {
        console.log(`Alert detected: ${await driver.getAlertText()}`);
        await driver.acceptAlert();
    }

    // Terminate the app
    await driver.terminateApp('com.saucelabs.mydemoapp.rn');
});
