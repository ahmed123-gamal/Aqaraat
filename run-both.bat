@echo off
echo Starting Aqaraat Application...
echo.
echo Starting Backend...
start "Aqaraat Backend" cmd /k "cd AqaraatAPI && dotnet run --urls http://localhost:5257"
echo Backend started on http://localhost:5257
echo.
echo Starting Frontend...
start "Aqaraat Frontend" cmd /k "cd AqaraatFront && npm run dev"
echo Frontend starting on http://localhost:8080
echo.
echo Both servers are starting...
echo Backend API: http://localhost:5257
echo Frontend: http://localhost:8080
echo Swagger UI: http://localhost:5257/swagger
echo.
pause 