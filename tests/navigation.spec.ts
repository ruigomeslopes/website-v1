import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to football category', async ({ page }) => {
    await page.goto('/pt');

    // Click on football category
    await page.click('a[href*="/football"]');
    await page.waitForLoadState('networkidle');

    // Verify URL
    expect(page.url()).toContain('/football');

    // Verify page has articles or content
    await expect(page.locator('h1, h2')).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/pt');

    // Find and click about link
    const aboutLink = page.locator('a[href*="/about"]').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await page.waitForLoadState('networkidle');

      expect(page.url()).toContain('/about');
    }
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/pt');

    // Find and click contact link
    const contactLink = page.locator('a[href*="/contact"]').first();
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await page.waitForLoadState('networkidle');

      expect(page.url()).toContain('/contact');
    }
  });

  test('should navigate through dock navigation on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    await page.goto('/pt');

    // Check if mobile dock is visible
    const dock = page.locator('nav').first();
    await expect(dock).toBeVisible();

    // Click different category icons
    const categories = ['football', 'motogp', 'gaming'];

    for (const category of categories) {
      const link = page.locator(`a[href*="/${category}"]`).first();
      if (await link.isVisible()) {
        await link.click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toContain(`/${category}`);
        break; // Test one category navigation
      }
    }
  });
});
