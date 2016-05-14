
                        Campus Connection

  What is it?
  -----------

	Campus Connection is a Classied Ads Service for university students.
	Our goal is to create a safe and reliable service for students to buy
	and sell their objects. It is a web app that can be reached at
	campusconnection.parseapp.com


  Documentation
  -------------

  Documentation will be available on the github repo on the wiki.
  the github for this project is https://github.com/kshahbazk/Campus-Connection

  Set-Up
  ----------------------
  
 Linux
 •	Node.js - Download and Install Node.js
 •	MongoDB - Download and Install mongodb
 If you're using ubuntu, this is the preferred repository to use...
 $ curl -sL https://deb.nodesource.com/setup | sudo bash -
 $ sudo apt-get update
 $ sudo apt-get install nodejs
 •	Git - Get git using a package manager or download it.
 Windows
 •	Node.js - Download and Install Node.js
 •	MongoDB - "Install Mongodb On Windows" and Instal MongoDB
 •	Git - Git for Windows-Install Git
 OSX
 •	Node.js - Download and Install Node.js or use the packages within brew or macports.
 •	MongoDB - Follow the tutorial here - Install mongodb on OSX
 •	git - Install git from here.
 Prerequisite packages
 •	Mean currently uses gulp as a build tool and bower to manage frontend packages.
 $ npm install -g gulp
 // and bower
 $ npm install -g bower
 Installation
 To start with MEAN install the mean-cli package from NPM. This will add the mean command which lets you interact (install, manage, update ...) your Mean based application.
 Install the MEAN CLI
 $ npm install -g mean-cli
 $ mean init <myApp>
 $ cd <myApp> && npm install
 Invoke node with a task manager
 Mean supports the gulp task runner for various services which are applied on the code. To start your application run -
 $ gulp
 Alternatively, when not using gulp (and for production environments) you can run:
 $ node server
 Then, open a browser and go to:
 http://localhost:3000
 Running on a different port
 If you have a rails, node, or other mean project already running, you may need to use a different port. You can set the port and start your new mean project with one command:
 $ export PORT=3001 && gulp
 Then, open a browser and change the port number before you visit:
   http://localhost:3001
 Update NPM, Bower
 •	Updating NPM:
 $ npm update -g npm
 •	Updating Bower:
 $ npm update -g bower
 Cleaning NPM and Bower cache
 NPM and Bower has a caching system for holding packages that you already installed. We found that often cleaning the cache solves some troubles this system creates.
 •	NPM Clean Cache:
 $ npm cache clean
 •	Bower Clean Cache:
 $ bower cache clean
 Installation problems on Windows 8 / 8.1
 Some of Mean.io dependencies uses node-gyp with supported Python version 2.7.x. So if you see an error related to node-gyp rebuild follow next steps:
 1.	install Python 2.7.x
 2.	install Microsoft Visual Studio C++ 2012 Express
 3.	Run NPM update
 $ npm update -g
 Technologies
 The MEAN stack
 MEAN is an acronym for Mongo, Express.js , Angular.js and Node.js
 MongoDB
 Express
 AngularJS
 Node.js
 Run
 Once you have all of this set-up you need to traverse into the correct directory and run the command.
 $ node server.js

 Additional Tools
 •	Mongoose - The mongodb node.js driver in charge of providing elegant mongodb object modeling for node.js
 •	Passport - An authentication middleware for Node.js which supports authentication using a username and password, Facebook, Twitter, and more.
 •	Twitter Bootstrap - The most popular HTML, CSS, and JS framework for developing responsive, mobile first projects.
 •	UI Bootstrap - Bootstrap components written in pure AngularJS



  Authors
  --------

     o John Franklin
     o Atif Khan
     o Shahbaz Khan
     o Enrique Padilla
