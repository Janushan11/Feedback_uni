@echo off
echo ========================================
echo Java Enterprise Project Runner
echo Computer Spare Parts Management System
echo ========================================
echo.

echo Checking Java installation...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java JDK 11 from: https://adoptium.net/
    pause
    exit /b 1
)

echo Checking Maven installation...
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven from: https://maven.apache.org/download.cgi
    pause
    exit /b 1
)

echo.
echo Building project...
mvn clean package

if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo Build successful! Starting Tomcat...
echo Application will be available at: http://localhost:8080/ComputerSparePartsSystem
echo.

mvn tomcat7:run

pause
