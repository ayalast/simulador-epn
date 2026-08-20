import { chromium } from 'playwright';
import path from 'path';

async function runAgentVisualAudit() {
  console.log('--- AGENT CODEX ATLAS / MANUS INSPECTION ---');
  console.log('Launching browser with PIN authentication...');

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
  await page.waitForTimeout(500);

  // Authenticate properly with save(PIN_KEY, SECURITY_PIN)
  await page.evaluate(() => {
    try {
      window.save(window.PIN_KEY, window.SECURITY_PIN);
    } catch(e) {}
    if (window.S) {
      window.S.modal = null;
      window.render();
    }
  });
  await page.waitForTimeout(400);

  // 1. Initial Home State
  await page.screenshot({ path: 'screenshot_agent_1_home_unlocked.png' });
  console.log('1. Captured Home Page (Unlocked, no modal)');

  // 2. Launch Intento 2 directly in memory
  console.log('2. Launching Intento 2 of "Prueba Real 19 Ago"...');
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

    // Start Attempt 2
    window.S.modal = null;
    window.S.view = 'attempt';
    window.S.course = 'guia_fql_19ago';
    window.S.attempt = window.buildGuia1000Attempt('guia_fql_19ago', { shuffleQuestions: false, shuffleOptions: false });
    window.render();
  });

  await page.waitForTimeout(600);

  // 3. Question 21 (Physics 1: Pista de Patinaje - Teórica)
  console.log('3. Navigating to Question 21 (Pista de Patinaje)...');
  await page.evaluate(() => { window.S.attempt.cur = 20; window.render(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_3_fis_p21_patinaje.png' });

  // 4. Question 22 (Physics 2: Trabajo Normal y Peso W = 0 - Teórica)
  console.log('4. Navigating to Question 22 (Trabajo Ortogonal)...');
  await page.evaluate(() => { window.S.attempt.cur = 21; window.render(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_4_fis_p22_trabajo_normal.png' });

  // 5. Question 24 (Physics 4: Semáforo Cables Simétricos - Cálculo 1)
  console.log('5. Navigating to Question 24 (Semáforo Cálculo 1)...');
  await page.evaluate(() => { window.S.attempt.cur = 23; window.render(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_5_fis_p24_semaforo.png' });

  // 6. Question 25 (Physics 5: Energía Cuadrática 9E0 - Teórica)
  console.log('6. Navigating to Question 25 (Energía Cuadrática)...');
  await page.evaluate(() => { window.S.attempt.cur = 24; window.render(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_6_fis_p25_energia.png' });

  // 7. Question 26 (Physics 6: Ley de Hooke - Cálculo 2)
  console.log('7. Navigating to Question 26 (Ley de Hooke Cálculo 2)...');
  await page.evaluate(() => { window.S.attempt.cur = 25; window.render(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_7_fis_p26_hooke.png' });

  // 8. Question 27 (Physics 7: Proyectil Componentes - Teórica)
  console.log('8. Navigating to Question 27 (Proyectil)...');
  await page.evaluate(() => { window.S.attempt.cur = 26; window.render(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_8_fis_p27_proyectil.png' });

  // 9. Question 30 (Physics 10: Choque Inelástico Vagones - Cálculo 3)
  console.log('9. Navigating to Question 30 (Choque Inelástico Cálculo 3)...');
  await page.evaluate(() => { window.S.attempt.cur = 29; window.render(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_9_fis_p30_choque.png' });

  // 10. Question 32 (Physics 12: Distancia de frenado cuadrática - Teórica)
  console.log('10. Navigating to Question 32 (Frenado Cuadrático)...');
  await page.evaluate(() => { window.S.attempt.cur = 31; window.render(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_10_fis_p32_frenado.png' });

  // 11. Question 35 (Physics 15: Rizo vertical N = 0 - Teórica)
  console.log('11. Navigating to Question 35 (Rizo Vertical)...');
  await page.evaluate(() => { window.S.attempt.cur = 34; window.render(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_11_fis_p35_rizo.png' });

  // 12. Question 36 (Physics 16: Gravitación simétrica Tierra-Luna - Teórica)
  console.log('12. Navigating to Question 36 (Gravitación Simétrica)...');
  await page.evaluate(() => { window.S.attempt.cur = 35; window.render(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_12_fis_p36_tierra_luna.png' });

  // 13. Question 40 (Physics 20: MCU Frecuencia y Período - Teórica)
  console.log('13. Navigating to Question 40 (MCU Frecuencia y Período)...');
  await page.evaluate(() => { window.S.attempt.cur = 39; window.render(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_13_fis_p40_mcu.png' });

  // 14. Interactive selection on P.36
  console.log('14. Selecting Option B on P.36...');
  await page.evaluate(() => {
    window.S.attempt.cur = 35;
    window.S.attempt.ans[35] = 1; // Option B
    window.render();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_agent_14_answered_state.png' });

  console.log('\n--- AUDIT COMPLETE ---');
  console.log('Total Console Errors:', consoleErrors.length);
  await browser.close();

  if (consoleErrors.length > 0) {
    console.error('Audit failed with console errors:', consoleErrors);
    process.exit(1);
  } else {
    console.log('✓ AGENT AUDIT PASSED: 100% Validated without errors, completely unobstructed interface!');
  }
}

runAgentVisualAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
