import Page from "./page";

export class ProductPage extends Page {
    private ADD_TO_CART_BUTTON = "//android.view.ViewGroup[@content-desc='Add To Cart button']";

    async addProductToCart(): Promise<void> {
        await this.clickElement(this.ADD_TO_CART_BUTTON);
    }
}