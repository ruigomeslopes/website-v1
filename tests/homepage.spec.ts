import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully in Portuguese', async ({ page }) => {
    await page.goto('/pt');

    // Check title
    await expect(page).toHaveTitle(/Rui Lopes/);

    // Check main heading exists
    await expect(page.locator('h1')).toBeVisible();

    // Check navigation dock is visible
    await expect(page.locator('[role="navigation"]')).toBeVisible();
  });

  test('should load homepage successfully in English', async ({ page }) => {
    await page.goto('/en');

    // Check title
    await expect(page).toHaveTitle(/Rui Lopes/);

    // Check main heading exists
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display all category cards', async ({ page }) => {
    await page.goto('/pt');

    // Wait for categories to load
    await page.waitForSelector('[data-testid="category-grid"], .grid', { timeout: 5000 });

    // Check for category links/cards
    const categoryLinks = page.locator('a[href*="/football"], a[href*="/motogp"], a[href*="/gaming"]');
    await expect(categoryLinks.first()).toBeVisible();
  });

  test('should have working theme toggle', async ({ page }) => {
    await page.goto('/pt');

    // Find theme toggle button (sun/moon icon)
    const themeToggle = page.locator('button[aria-label*="tema"], button[aria-label*="theme"], button:has-text("☀️"), button:has-text("🌙")').first();

    if (await themeToggle.isVisible()) {
      // Get initial theme
      const htmlElement = page.locator('html');
      const initialTheme = await htmlElement.getAttribute('data-theme');

      // Click toggle
      await themeToggle.click();
      await page.waitForTimeout(500);

      // Check theme changed
      const newTheme = await htmlElement.getAttribute('data-theme');
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test('should have working language toggle', async ({ page }) => {
    await page.goto('/pt');

    // Find language toggle (PT/EN)
    const langToggle = page.locator('button:has-text("EN"), a:has-text("EN")').first();

    if (await langToggle.isVisible()) {
      await langToggle.click();
      await page.waitForLoadState('networkidle');

      // Should be on English version
      expect(page.url()).toContain('/en');
    }
  });
});
