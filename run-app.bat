@echo off
cd /d "%~dp0"
npm install --no-fund --no-audit
npm run dev
