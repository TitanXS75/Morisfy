import { test as base, expect } from '@playwright/test';

// Extend base test with custom fixtures if needed
export const test = base.extend({
  // Add custom fixtures here
  // Example: page: async ({ page }, use) => { await use(page); }
});

export { expect };
