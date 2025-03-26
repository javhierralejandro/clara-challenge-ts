Feature: Add Products To The Cart

  Scenario: User adds a single product to the cart

    Given the user is on the catalog page
    When the user selects product 1 in the catalog page
    When the user adds product to cart
    Then the cart should contain more than 0 products

  Scenario: User adds multiple products to the cart
    Given the user is on the catalog page
    When the user selects product 2 in the catalog page
    When the user adds product to cart
    When the user selects product 4 in the catalog page
    When the user adds product to cart
    When the user selects product 6 in the catalog page
    When the user adds product to cart
    Then the cart should contain more than 0 products