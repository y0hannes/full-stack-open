const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    // clear db
    await page.request.post('http://localhost:5173/api/testing/reset')
    await page.goto('http://localhost:5173')
    await page.request.post('http://localhost:3000/api/users', {
      data: {
        username: 'gavin',
        name: 'Gavin Tester',
        password: '1234'
      }
    })

    test('Login form is shown', async ({ page }) => {
      await page.goto('http://localhost:5173')
      const locator = page.getByText('log in to application')
      await expect(locator).toBeVisible()
    })

    describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
        const username = 'gavin'
        const password = '1234'
        await loginWith(page, username, password)

        const locator = page.getByText('welcome back')
        await expect(locator).toBeVisible()
      })

      test('fails with wrong credentials', async ({ page }) => {
        const username = 'wronguser'
        const password = 'wrongpassword'
        await loginWith(page, username, password)

        const errorLocator = page.getByText('wrong credentials')
        await expect(errorLocator).toBeVisible()
      })
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'gavin', '1234')
        await page.getByText('welcome back').waitFor()
      })

      test('a new blog can be created', async ({ page }) => {
        const title = 'a blog created by playwright'
        const author = 'peter'
        const url = 'www.fake-blog.com'
        await createBlog(page, title, author, url)
        const locator = page.getByText('a new blog')
        await expect(locator).toBeVisible()

      })

      test('a blog can be liked', async ({ page }) => {
        const title = 'a blog created by playwright'
        const author = 'peter'
        const url = 'www.fake-blog.com'
        await createBlog(page, title, author, url)

        await likeBlog(page)

        await expect(page.getByText('Likes 1')).toBeVisible()
      })

      test('a blog can be deleted', async ({ page }) => {
        const title = 'a blog created by playwright'
        const author = 'peter'
        const url = 'www.fake-blog.com'
        await createBlog(page, title, author, url)

        await page.getByRole('button', { name: 'view' }).click()

        await page.getByRole('button', { name: 'remove' }).click()
        page.once('dialog', dialog => dialog.accept())

        const locator = page.getByText(`blog ${title} was successfully deleted`)
        await expect(locator).toBeVisible()
      })

      test('blogs are sorted by likes', async ({ page }) => {
        await createBlog(page, 'Blog A', 'Author A', 'url-a')
        await createBlog(page, 'Blog B', 'Author B', 'url-b')
        await createBlog(page, 'Blog C', 'Author C', 'url-c')

        await likeBlog(page, 'blog 1', 'author 1')
        await likeBlog(page, 'blog 1', 'author 1')
        await likeBlog(page, 'blog 2', 'author 2')

        const blogElements = await page.locator('.blog-header').all()

        let previousLikes = Infinity
        for (const blog of blogElements) {
          const viewButton = blog.getByRole('button', { name: /view/i })
          if (await viewButton.isVisible()) {
            await viewButton.click()
          }

          const likesText = await blog.getByText(/Likes \d+/).innerText()
          const currentLikes = parseInt(likesText.split(' ')[1])
          expect(currentLikes).toBeLessThanOrEqual(previousLikes)
          previousLikes = currentLikes
        }
      })

    })
  })
})