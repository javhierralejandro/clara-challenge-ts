import Page from "./page";
import { browser } from '@wdio/globals';

export class ProductPage extends Page {
    private ADD_TO_CART_BUTTON = "//android.view.ViewGroup[@content-desc='Add To Cart button']";
    private CART_BUTTON = "//android.view.ViewGroup[@content-desc='cart badge']//android.widget.TextView";
    private PRODUCT_ELELEMNT = "(//android.view.ViewGroup[@content-desc='products screen']//android.view.ViewGroup[@content-desc='store item'])[1]";

    async addProductToCart(): Promise<void> {
        await this.clickElement(this.ADD_TO_CART_BUTTON);
    }

    async dragProductToCart(): Promise<void> {
        const product = await this.findElement(this.PRODUCT_ELELEMNT);
        const cart = await this.findElement(this.CART_BUTTON);

        const start = await product.getLocation();
        const end = await cart.getLocation();

        await browser.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: start.x, y: start.y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 500 },
                    { type: 'pointerMove', duration: 1000, x: end.x, y: end.y },
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);

    }
}