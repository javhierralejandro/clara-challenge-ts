import { Given, When, Then } from '@cucumber/cucumber';
import { CatalogPage } from '../pages/catalog.page';

let catalogPage: CatalogPage;

// Step definition for navigating to the catalog page
Given('the user navigates to the catalog page', async () => {
    catalogPage = new CatalogPage();
});

// Step definition for clicking the sort button
When('the user clicks on the sort button', async () => {
    await catalogPage.clickSortCatalog();
});

// Step definition for sorting by name in ascending order
When('the user clicks on name ascending sort button', async () => {
    await catalogPage.sortByNameAscending();
});

// Step definition for sorting by name in descending order
When('the user clicks on name descending sort button', async () => {
    await catalogPage.sortByNameDescending();
});

// Step definition for sorting by price in ascending order
When('the user clicks on price ascending sort button', async () => {
    await catalogPage.sortByPriceAscending();
});

// Step definition for sorting by price in descending order
When('the user clicks on price descending sort button', async () => {
    await catalogPage.sortByPriceDescending();
});

// Step definition for verifying the catalog is sorted by name in ascending order
Then('the user should see the catalog sorted by name ascending', async () => {
    await catalogPage.verifyNameAscending();
});

// Step definition for verifying the catalog is sorted by name in descending order
Then('the user should see the catalog sorted by name descending', async () => {
    await catalogPage.verifyNameDescending();
});

// Step definition for verifying the catalog is sorted by price in ascending order
Then('the user should see the catalog sorted by price ascending', async () => {
    await catalogPage.verifyPriceAscending();
});

// Step definition for verifying the catalog is sorted by price in descending order
Then('the user should see the catalog sorted by price descending', async () => {
    await catalogPage.verifyPriceDescending();
});