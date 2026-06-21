@echo off
set JAVA="C:\Program Files\Java\jdk-25\bin\java.exe"
set JAVAC="C:\Program Files\Java\jdk-25\bin\javac.exe"
set JAR=lib\alloy.jar
set SRC=src\main\java\Relation.java src\main\java\AlloyResult.java src\main\java\AlloyRunner.java src\main\java\AlloyAPI.java
set OUT=target\classes

if not exist %OUT% mkdir %OUT%

%JAVAC% -cp %JAR% -d %OUT% %SRC%
if errorlevel 1 ( echo Compile failed & pause & exit /b 1 )

%JAVA% -cp "%OUT%;%JAR%" AlloyAPI
pause
