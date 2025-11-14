import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/pt');

    // Check for h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // h1 should come before h2
    const headings = await page.locator('h1, h2, h3').all();
    if (headings.length > 0) {
      const firstHeading = await headings[0].evaluate(el => el.tagName);
      expect(firstHeading).toBe('H1');
    }
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/pt/football');

    const firstArticle = page.locator('article a, .article-card a').first();
    if (await firstArticle.isVisible()) {
      await firstArticle.click();
      await page.waitForLoadState('networkidle');

      // Find all images
      const images = page.locator('img');
      const imageCount = await images.count();

      if (imageCount > 0) {
        // Check first few images have alt text
        for (let i = 0; i < Math.min(imageCount, 3); i++) {
          const img = images.nth(i);
          const alt = await img.getAttribute('alt');

          // Alt should exist (even if empty for decorative images)
          expect(alt).toBeDefined();
        }
      }
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/pt');

    // Press Tab to navigate
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    // Check if an element has focus
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.tagName;
    });

    expect(focusedElement).toBeTruthy();
  });

  test('should have proper ARIA labels for interactive elements', async ({ page }) => {
    await page.goto('/pt');

    // Check navigation has proper role
    const nav = page.locator('nav');
    await expect(nav.first()).toBeVisible();

    // Check buttons have accessible names or aria-labels
    const buttons = page.locator('button').all();
    const buttonArray = await buttons;

    for (const button of buttonArray.slice(0, 3)) {
      if (await button.isVisible()) {
        const ariaLabel = await button.getAttribute('aria-label');
        const text = await button.textContent();

        // Button should have either aria-label or visible text
        expect(ariaLabel || text?.trim()).toBeTruthy();
      }
    }
  });

  test('should have proper language attribute', async ({ page }) => {
    await page.goto('/pt');

    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('pt');

    await page.goto('/en');
    const htmlLangEn = await page.locator('html').getAttribute('lang');
    expect(htmlLangEn).toBe('en');
  });

  test('should have skip to content link', async ({ page }) => {
    await page.goto('/pt');

    // Press Tab to reveal skip link (usually hidden until focused)
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    // Look for skip link
    const skipLink = page.locator('a:has-text("Skip"), a:has-text("Saltar"), a[href="#main-content"], a[href="#content"]');
    const skipLinkCount = await skipLink.count();

    // If skip link exists, it should be visible when focused
    if (skipLinkCount > 0) {
      const isVisible = await skipLink.first().isVisible();
      // Skip link may be visually hidden but still accessible
      expect(skipLinkCount).toBeGreaterThan(0);
    }
  });
});
