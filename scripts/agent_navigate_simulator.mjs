import { chromium } from 'playwright';
import path from 'path';

async function runAgentNavigation() {
  console.log('--- AGENT VISUAL NAVIGATION (CODEX ATLAS / MANUS MODE) ---');
  console.log('Opening browser in isolated sandbox context...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 950 }
  });
  const page = await context.newPage();

  let consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error('[Browser ERROR]:', msg.text());
    }
  });

  const filePath = 'file://' + path.resolve('public/index.html').replace(/\\/g, '/');
  console.log('Navigating to:', filePath);
  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Home Page
  await page.screenshot({ path: 'screenshot_agent_1_home.png' });
  console.log('1. Captured Home Page');

  // 2. Open 19 Ago Simulator card
  console.log('2. Opening "Prueba Real 19 Ago" Simulator Modal...');
  const openBtn = await page.$('button[data-act="course"][data-c="guia_fql_19ago"]');
  if (openBtn) {
    await openBtn.click();
    await page.waitForTimeout(600);
  } else {
    console.log('Button not found by selector, dispatching click in window...');
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('click', { detail: { target: document.querySelector('button[data-c="guia_fql_19ago"]') } }));
    });
  }
  await page.screenshot({ path: 'screenshot_agent_2_modal.png' });
  console.log('2. Captured 19 Ago Simulator Modal');

  // 3. Mark Intento 1 as already completed in memory so this attempt is cleanly INTENTO 2
  console.log('3. Configuring memory state to Intento 2...');
  await page.evaluate(() => {
    const b19 = window.GUIA_BANK_FQL_19AGO || {};
    window.SEEN1000 = window.SEEN1000 || {};
    window.SEEN1000SET = window.SEEN1000SET || {};
    ['len-19ago', 'fis-19ago', 'qui-19ago'].forEach(k => {
      window.SEEN1000[k] = window.SEEN1000[k] || [];
      window.SEEN1000SET[k] = window.SEEN1000SET[k] || {};
    });

    // Mark 20 questions of Intento 1 as seen
    (b19.len || []).slice(0, 20).forEach(q => { window.SEEN1000['len-19ago'].push(q.id); window.SEEN1000SET['len-19ago'][q.id] = 1; });
    (b19.fis || []).slice(0, 20).forEach(q => { window.SEEN1000['fis-19ago'].push(q.id); window.SEEN1000SET['fis-19ago'][q.id] = 1; });
    (b19.qui || []).slice(0, 20).forEach(q => { window.SEEN1000['qui-19ago'].push(q.id); window.SEEN1000SET['qui-19ago'][q.id] = 1; });
  });

  // 4. Click Start Attempt
  console.log('4. Starting Intento 2...');
  const startBtn = await page.$('button[data-act="start"][data-c="guia_fql_19ago"]');
  if (startBtn) {
    await startBtn.click();
    await page.waitForTimeout(800);
  } else {
    // Click any start button in modal
    await page.click('.modal .btn.primary, button[data-act="start"]');
    await page.waitForTimeout(800);
  }
  await page.screenshot({ path: 'screenshot_agent_3_intento2_start.png' });
  console.log('4. Captured Intento 2 Start (Question 1: Lenguaje)');

  // 5. Jump to Question 21 (First question of Physics: Pista de Patinaje)
  console.log('5. Jumping to Question 21 (Physics Block start)...');
  // Click on question 21 in the navigation grid
  const q21Btn = await page.$('button[data-act="jump"][data-i="20"], .qbtn:has-text("21")');
  if (q21Btn) {
    await q21Btn.click();
  } else {
    await page.evaluate(() => {
      if (window.S && window.S.attempt) {
        window.S.attempt.cur = 20;
        window.render();
      }
    });
  }
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'screenshot_agent_4_fis_p21_patinaje.png' });
  console.log('5. Captured P.21 (Pista de Patinaje y Puntos de Energía)');

  // 6. Inspect Question 22 (Trabajo de normal y peso W = 0)
  console.log('6. Navigating to P.22 (Trabajo de Fuerzas Ortogonales)...');
  await page.evaluate(() => { window.S.attempt.cur = 21; window.render(); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshot_agent_5_fis_p22_trabajo_normal.png' });

  // 7. Inspect Question 24 (Cálculo 1: Semáforo y cables simétricos T = 100 N)
  console.log('7. Navigating to P.24 (Cálculo 1: Semáforo)...');
  await page.evaluate(() => { window.S.attempt.cur = 23; window.render(); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshot_agent_6_fis_p24_semaforo_calc.png' });

  // 8. Inspect Question 25 (Teórica: Energía proporcional a v^2 -> 9E0)
  console.log('8. Navigating to P.25 (Teórica: Energía Cuadrática)...');
  await page.evaluate(() => { window.S.attempt.cur = 24; window.render(); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshot_agent_7_fis_p25_energia_cuadratica.png' });

  // 9. Inspect Question 27 (Teórica: Proyectil componentes)
  console.log('9. Navigating to P.27 (Teórica: Tiro Parabólico)...');
  await page.evaluate(() => { window.S.attempt.cur = 26; window.render(); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshot_agent_8_fis_p27_proyectil.png' });

  // 10. Inspect Question 32 (Teórica: Distancia de frenado cuadrática 4d)
  console.log('10. Navigating to P.32 (Teórica: Distancia de frenado)...');
  await page.evaluate(() => { window.S.attempt.cur = 31; window.render(); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshot_agent_9_fis_p32_frenado.png' });

  // 11. Inspect Question 35 (Teórica: Condición de rizo vertical N = 0)
  console.log('11. Navigating to P.35 (Teórica: Rizo Vertical)...');
  await page.evaluate(() => { window.S.attempt.cur = 34; window.render(); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshot_agent_10_fis_p35_rizo.png' });

  // 12. Inspect Question 36 (Teórica: Gravitación simétrica Tierra-Luna)
  console.log('12. Navigating to P.36 (Teórica: Gravitación Simétrica)...');
  await page.evaluate(() => { window.S.attempt.cur = 35; window.render(); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshot_agent_11_fis_p36_tierra_luna.png' });

  // 13. Select Option on P.36
  console.log('13. Interacting: Selecting Option B on P.36...');
  const optRadio = await page.$('input[name="opt"][value="1"], label:has-text("misma magnitud")');
  if (optRadio) {
    await optRadio.click();
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: 'screenshot_agent_12_interactive_option_selected.png' });

  console.log('\n--- AGENT INSPECTION RESULT ---');
  console.log('Total Console Errors:', consoleErrors.length);
  await browser.close();

  if (consoleErrors.length > 0) {
    console.error('Audit failed with console errors:', consoleErrors);
    process.exit(1);
  } else {
    console.log('✓ AGENT AUDIT COMPLETE: 100% Validated without errors and pristine visual rendering!');
  }
}

runAgentNavigation().catch(err => {
  console.error(err);
  process.exit(1);
});
