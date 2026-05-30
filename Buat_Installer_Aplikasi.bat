@echo off
title Build Installer - Audit Justice
color 0B

echo ===================================================
echo     MEMBUAT INSTALLER (.EXE) AUDIT JUSTICE
echo ===================================================
echo.
echo PERINGATAN: Proses ini membutuhkan waktu beberapa menit 
echo dan koneksi internet yang stabil.
echo.
echo Pastikan Anda sudah mematikan server lokal yang sedang berjalan!
echo.
pause

cd /d "c:\Audit Pengadilan\audit-justice"

echo.
echo Menjalankan proses kompilasi...
call npm run electron:build

echo.
echo Selesai!
echo Jika tidak ada error merah di atas, file .exe Anda
echo telah berhasil dibuat dan berada di dalam folder:
echo c:\Audit Pengadilan\audit-justice\dist
echo.
pause
