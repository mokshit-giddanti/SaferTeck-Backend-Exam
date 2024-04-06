TASK
------
id:2100030166

Use NodeJS to implement web-server which hosts and serves files.

• Requirements:

• Use standard http module or express framework to implement simple web- server;

• Use fs module to create/modify/read files in file system;

• Write every request info to logs;

• Application should support log, txt, json, yaml, xml, js file extensions ( consider filename may contain '.' symbol);

• Please check that your app can be launched with 'npm install' and 'npm start' commands just after git pull;

• Application should work at port 8080

createFiles
------------------
http://localhost:8080/createFile
{
    "filename":"moksh1.js",
    "content":"const test='hello this is moksh 2100030166'; console.log(test);"
}
a file will be created  along with the content

getFile
----------

http://localhost:8080/getFile?filename=moksh.txt
you will get the content of the file passed

getFiles
----------
http://localhost:8080/getFiles
you will get output of all the files stored 

modifyFile
--------------
http://localhost:8080/modifyFile
{"filename": "moksh.txt","content":"pro valorant player lol"}


deleteFile
------------
http://localhost:8080/deleteFile?filename=moksh.json

