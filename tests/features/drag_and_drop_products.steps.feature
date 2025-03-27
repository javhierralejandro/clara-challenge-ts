Feature: Drag and Drop Products to Cart

    Scenario: Drag products to the shopping cart
        Given the user is on the catalog page
        When the user drags a product to the cart
        Then the user swipes back to the product list