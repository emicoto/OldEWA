@echo off

:: Set working directory
pushd %~dp0
@set TWEEGO_PATH="%~dp0devTools\tweego\StoryFormats"

:: Run the appropriate compiler for the user's CPU architecture.
if %PROCESSOR_ARCHITECTURE% == AMD64 (
	CALL "%~dp0devTools\tweego\tweego_win64.exe" -o "%~dp0\dist\index.html" --head "%~dp0devTools\head.html" "%~dp0src" -w
) else (
	CALL "%~dp0devTools\tweego\tweego_win86.exe" -o "%~dp0\dist\index.html" --head "%~dp0devTools\head.html" "%~dp0src" -w
)