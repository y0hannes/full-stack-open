const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    // clear db
    await page.goto('http://localhost:5173/api/testing/reset')
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173')
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('gavin')
      await page.getByLabel('password').fill('1234')
      await page.getByRole('button', { name: 'login' }).click()

      const locator = page.getByText('welcome back')
      await expect(locator).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('wronguser')
      await page.getByLabel('password').fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()

      const errorLocator = page.getByText('wrong credentials')
      await expect(errorLocator).toBeVisible()
    })
  })
})