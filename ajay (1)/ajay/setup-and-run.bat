@echo off
title Java Enterprise Project - Complete Setup
color 0A

echo.
echo ================================================================
echo    JAVA ENTERPRISE PROJECT - COMPLETE SETUP
echo    Computer Spare Parts Management System
echo ================================================================
echo.

echo This script will help you install Java and Maven, then run your project.
echo.

:menu
echo Choose an option:
echo.
echo 1. Install Java JDK 11
echo 2. Install Apache Maven
echo 3. Check if Java is installed
echo 4. Check if Maven is installed
echo 5. Run the Java project
echo 6. Open project in browser (Frontend)
echo 7. Exit
echo.
set /p choice="Enter your choice (1-7): "

if "%choice%"=="1" goto install-java
if "%choice%"=="2" goto install-maven
if "%choice%"=="3" goto check-java
if "%choice%"=="4" goto check-maven
if "%choice%"=="5" goto run-project
if "%choice%"=="6" goto open-frontend
if "%choice%"=="7" goto exit
goto menu

:install-java
echo.
echo ========================================
echo INSTALLING JAVA JDK 11
echo ========================================
echo.
echo Please follow these steps:
echo 1. Your browser will open to download Java
echo 2. Download "Temurin 11 (LTS)" for Windows x64
echo 3. Run the installer
echo 4. IMPORTANT: Check "Set JAVA_HOME variable"
echo 5. Complete installation and restart command prompt
echo.
start https://adoptium.net/
echo Press any key after installing Java...
pause >nul
goto menu

:install-maven
echo.
echo ========================================
echo INSTALLING APACHE MAVEN
echo ========================================
echo.
echo Please follow these steps:
echo 1. Your browser will open to download Maven
echo 2. Download "apache-maven-3.9.5-bin.zip"
echo 3. Extract to C:\apache-maven-3.9.5
echo 4. Add C:\apache-maven-3.9.5\bin to PATH
echo.
start https://maven.apache.org/download.cgi
echo Press any key after installing Maven...
pause >nul
goto menu

:check-java
echo.
echo ========================================
echo CHECKING JAVA INSTALLATION
echo ========================================
echo.
java -version >nul 2>&1
if %errorlevel% equ 0 (
    echo  Java is installed!
    java -version
) else (
    echo  Java is NOT installed
    echo Please install Java JDK 11 first
)
echo.
pause
goto menu

:check-maven
echo.
echo ========================================
echo CHECKING MAVEN INSTALLATION
echo ========================================
echo.
mvn -version >nul 2>&1
if %errorlevel% equ 0 (
    echo  Maven is installed!
    mvn -version
) else (
    echo  Maven is NOT installed
    echo Please install Apache Maven first
)
echo.
pause
goto menu

:run-project
echo.
echo ========================================
echo RUNNING JAVA PROJECT
echo ========================================
echo.
cd ComputerSparePartsSystem
echo Building project...
mvn clean package
if %errorlevel% neq 0 (
    echo  Build failed! Please check Java and Maven installation
    pause
    goto menu
)
echo.
echo  Build successful! Starting Tomcat...
echo Your application will be available at:
echo http://localhost:8080/ComputerSparePartsSystem
echo.
mvn tomcat7:run
goto menu

:open-frontend
echo.
echo ========================================
echo OPENING FRONTEND WEBSITE
echo ========================================
echo.
cd ComputerSparePartsSystem-Frontend
start html-version/index.html
echo  Frontend website opened in browser!
echo.
pause
goto menu

:exit
echo.
echo Thank you for using the setup script!
echo Your Java Enterprise project is ready to run.
echo.
pause
exit
