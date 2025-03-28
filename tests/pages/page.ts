import { ChainablePromiseElement } from 'webdriverio';

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    // Locators for the elements on the global page
    private MENU_BUTTON = "//android.view.ViewGroup[@content-desc='open menu']";
    private CART_ITEM_BUTTON = "//android.view.ViewGroup[@content-desc='cart badge']//android.widget.TextView";

    // Method to find an element
    async findElement(locator: string): Promise<ChainablePromiseElement> {
        return $(locator);
    }

    // Method to find multiple elements
    async findElements(locator: string): Promise<ChainablePromiseArray> {
        return $$(locator);
    }

    // Method to click an element
    async clickElement(locator: string): Promise<void> {
        const element = await this.findElement(locator);
        await element.click();
    }

    // Method to enter text in an input field
    async enterText(locator: string, text: string): Promise<void> {
        const element = await this.findElement(locator);
        await element.setValue(text);
    }

    // Method to check if an element is visible
    async isElementVisible(locator: string): Promise<boolean> {
        try {
            const element = await this.findElement(locator);
            return await element.isDisplayed();
        } catch {
            return false;
        }
    }

    // Method to get the count of items in the cart
    async getCartCount(): Promise<number> {
        try {
            const cart = await this.findElement(this.CART_ITEM_BUTTON);
            let countText = await cart.getText();
            if (countText === '') {
                countText = '0';
            }
            return parseInt(countText.trim(), 10) || 0;
        } catch {
            return 0;
        }
    }

    // Method to open the cart
    async openCart(): Promise<void> {
        await this.clickElement(this.CART_ITEM_BUTTON);
    }

    // Method to open the menu
    async openMenu(): Promise<void> {
        await this.clickElement(this.MENU_BUTTON);
    }

}
