import { chromium } from 'playwright';
import fs from 'fs';

async function scrapeManusApp() {
  console.log('Launching browser to inspect https://epnstudy-qnq55hby.manus.space/ ...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();

  try {
    await page.goto('https://epnstudy-qnq55hby.manus.space/', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log('Timeout waiting for networkidle, continuing...', e.message);
  }

  await page.waitForTimeout(2000);

  // Take screenshot of main page
  await page.screenshot({ path: 'tmp_epnstudy/manus_live_full.png', fullPage: true });
  console.log('Saved tmp_epnstudy/manus_live_full.png');

  // Extract full rendered HTML
  const html = await page.content();
  fs.writeFileSync('tmp_epnstudy/manus_live_rendered.html', html, 'utf8');
  console.log('Saved tmp_epnstudy/manus_live_rendered.html');

  // Let's inspect the React root and DOM structure
  const pageData = await page.evaluate(() => {
    // Collect all card elements and their exact texts, classes, and sub-elements
    const cards = Array.from(document.querySelectorAll('.notebook-card, [class*="notebook-page"] article, main article, article')).map(el => ({
      classes: el.className,
      html: el.innerHTML
    }));

    // Collect header, sidebar/navigation, progress indicators, buttons
    const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.innerText,
      className: b.className
    }));

    return {
      title: document.title,
      cardsCount: cards.length,
      buttons: buttons,
      bodyClasses: document.body.className
    };
  });

  console.log('Live page data:', JSON.stringify(pageData, null, 2));

  await browser.close();
}

scrapeManusApp().catch(err => {
  console.error('Scraping error:', err);
});
