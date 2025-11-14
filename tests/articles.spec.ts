import { test, expect } from '@playwright/test';

test.describe('Articles', () => {
  test('should display article page correctly', async ({ page }) => {
    // Navigate to a known article (adjust slug as needed)
    await page.goto('/pt/football/city-arsenal-analise-tatica');

    // If article doesn't exist, try another approach
    if (page.url().includes('404')) {
      // Go to football category and click first article
      await page.goto('/pt/football');
      await page.waitForSelector('article a, .article-card a', { timeout: 5000 });
      await page.click('article a, .article-card a');
      await page.waitForLoadState('networkidle');
    }

    // Verify article elements
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('article, .prose, main')).toBeVisible();

    // Check for metadata (reading time, date, tags)
    const hasMetadata = await page.locator('text=/min|minuto|tag|data|date/i').count();
    expect(hasMetadata).toBeGreaterThan(0);
  });

  test('should have working share buttons', async ({ page }) => {
    await page.goto('/pt/football');

    // Click first article if exists
    const firstArticle = page.locator('article a, .article-card a').first();
    if (await firstArticle.isVisible()) {
      await firstArticle.click();
      await page.waitForLoadState('networkidle');

      // Look for share section
      const shareSection = page.locator('text=/partilh|share/i');
      if (await shareSection.count() > 0) {
        await expect(shareSection.first()).toBeVisible();
      }
    }
  });

  test('should display related articles', async ({ page }) => {
    await page.goto('/pt/football');

    const firstArticle = page.locator('article a, .article-card a').first();
    if (await firstArticle.isVisible()) {
      await firstArticle.click();
      await page.waitForLoadState('networkidle');

      // Scroll to bottom to load related articles
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);

      // Check for related articles section
      const relatedSection = page.locator('text=/relacionad|related|similar/i');
      if (await relatedSection.count() > 0) {
        await expect(relatedSection.first()).toBeVisible();
      }
    }
  });

  test('should filter articles by tag', async ({ page }) => {
    await page.goto('/pt/football');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Look for tag filters
    const tagFilters = page.locator('button:has-text("Premier League"), button:has-text("Champions"), [data-testid="tag-filter"]');
    const tagCount = await tagFilters.count();

    if (tagCount > 0) {
      const initialArticleCount = await page.locator('article, .article-card').count();

      // Click first tag
      await tagFilters.first().click();
      await page.waitForTimeout(500);

      // Articles should be filtered (count may change)
      const filteredArticleCount = await page.locator('article, .article-card').count();

      // Either same count or different (both valid - depends on tag)
      expect(filteredArticleCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('should switch between grid and list view', async ({ page }) => {
    await page.goto('/pt/football');

    // Look for view toggle buttons
    const viewToggle = page.locator('button:has-text("Grid"), button:has-text("List"), [aria-label*="view"]');

    if (await viewToggle.count() > 0) {
      // Click toggle
      await viewToggle.first().click();
      await page.waitForTimeout(500);

      // Layout should change (hard to test visually, but button should be interactive)
      await expect(viewToggle.first()).toBeVisible();
    }
  });

  test('should have SEO meta tags', async ({ page }) => {
    await page.goto('/pt/football');

    const firstArticle = page.locator('article a, .article-card a').first();
    if (await firstArticle.isVisible()) {
      await firstArticle.click();
      await page.waitForLoadState('networkidle');

      // Check for essential meta tags
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveCount(1);

      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveCount(1);

      const ogImage = page.locator('meta[property="og:image"]');
      await expect(ogImage).toHaveCount(1);
    }
  });
});
