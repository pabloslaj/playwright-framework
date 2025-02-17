import { test, expect } from "@playwright/test";
import { Env } from "../../../frameworkConfig/env";
import { HomePage } from "../../pages/homePage";
import {
  getOrderDetailsRandomData,
  getUserRandomData,
} from "../../testData/randomDataUtils";

test("test", async ({ page }) => {
  // Open Home page
  await page.goto(Env.URL);
  const homePage = new HomePage(page);

  // Perform sign up and login
  const user = getUserRandomData();
  await homePage.performSignUp(user);
  await homePage.performLogin(user);

  // Add product to cart
  await homePage.addProductToCart("Samsung galaxy s6");
  const cartPage = await homePage.clickOnCart();

  // Place order
  await cartPage.clickOnPlaceOrder();
  await cartPage.completeOrderDetails(getOrderDetailsRandomData());
  await cartPage.clickOnPurchase();
  await expect(cartPage.successPurchaseTitle).toBeVisible();
  await cartPage.clickOnOk();
});
