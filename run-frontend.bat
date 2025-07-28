@echo off
echo Starting Aqaraat Frontend...
echo.
echo Checking if we're in the right directory...
cd AqaraatFront
echo Current directory: %CD%
echo.
echo Installing dependencies if needed...
npm install
echo.
echo Starting development server...
npm run dev
echo.
echo Frontend should be running on http://localhost:8080
pause 