#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(process.argv[2]);
const pdfPath = path.resolve(process.argv[3]);
const projectName = process.argv[4] || 'Project';

if (!process.argv[2] || !process.argv[3]) {
  console.error('Usage: generate-pdf.js <input.html> <output.pdf> [project-name]');
  process.exit(1);
}

// Detect Chrome
if (!process.env.PUPPETEER_EXECUTABLE_PATH) {
  const chromePaths = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.LOCALAPPDATA + '/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser'
  ];
  for (const p of chromePaths) {
    if (fs.existsSync(p)) {
      process.env.PUPPETEER_EXECUTABLE_PATH = p;
      break;
    }
  }
}

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.pdf({
    path: pdfPath,
    width: '900px',
    height: '1270px',
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: '0', bottom: '0', left: '0', right: '0' }
  });
  await browser.close();
  console.log('PDF generated: ' + pdfPath);
})().catch(err => {
  console.error('PDF generation failed:', err.message);
  process.exit(1);
});
