docker start wdsmysql || docker run --name wdsmysql --ip 127.10.1.1 -p 3306:3306 -v "%cd%/mysql":/var/lib/mysql -e MYSQL_USER=user -e MYSQL_PASSWORD=pass -e MYSQL_DATABASE=wds -e MYSQL_ROOT_PASSWORD=pass -d mysql
@IF NOT %1.==. GOTO :END
@echo Waiting for container to start. Press any key to skip waiting.
@timeout 15
@call "%~dp0mysqlcli.bat"

:END
exit %errorlevel%