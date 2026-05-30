@echo off
title Audit Justice - Server
color 0A

echo ===================================================
echo        MEMULAI SISTEM AUDIT JUSTICE...
echo ===================================================
echo/

:: Pindah ke direktori proyek (lokasi file .bat ini berada)
cd /d "%~dp0"

:: 1. Cek apakah Node.js sudah ter-install
where node >nul 2>&1
if not errorlevel 1 goto check_modules

echo [PERINGATAN] Node.js belum ter-install di laptop ini!
echo Sistem akan mencoba meng-install Node.js menggunakan Winget...
echo Mohon tunggu dan pastikan laptop terkoneksi ke internet.
echo/
winget install OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements

echo/
echo ======================================================================
echo INSTALASI SELESAI!
echo Karena Node.js baru saja di-install, Windows perlu me-refresh sistem.
echo SILAKAN TUTUP JENDELA HITAM INI, LALU KLIK 2X LAGI FILE BAT INI.
echo ======================================================================
pause
exit /b

:check_modules
:: 2. Cek apakah folder node_modules ada (jika hanya copy file tanpa node_modules)
if exist "node_modules\" goto run_server

echo [INFO] Dependensi belum ada. Meng-install yang diperlukan...
echo Mohon tunggu beberapa saat (memerlukan koneksi internet).
call npm install
echo/

:run_server
:: 3. Jalankan server Next.js
echo [INFO] Menyiapkan server lokal...
echo Server akan terbuka otomatis di browser Anda.
echo Jangan tutup jendela hitam ini selama aplikasi sedang digunakan!
echo/
start http://localhost:3000
call npm run dev

pause
