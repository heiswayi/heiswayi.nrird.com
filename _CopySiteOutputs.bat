@echo off

set from="G:\GIT-REPOS\MyBitBucket\heiswayi.nrird.com\_site"
set to="G:\GIT-REPOS\MyGitHub\heiswayi.github.io"

for %%i in (%to%\*) do (
    del /S /Q %%i
)

for /d %%i in (%to%\*) do (
    if /i "%%i" NEQ ".git" rmdir /S /Q %%i
)

robocopy %from% %to% /E