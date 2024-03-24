# Technical Guide

**Step 1 - Database Setup**
1. Download and install MySQL from here: https://dev.mysql.com/downloads/mysql/
2. Follow the installation process to setup MySQL
3. Install a database management tool such as MySQL Workbench from here: https://dev.mysql.com/downloads/workbench/ or Valentina studio from here: https://valentina-db.com/en/studio/download
4. Run the table creation scripts from TableCreationScripts.txt in the git repo: https://github.com/alexmair13/CarAuctionSite

**Step 2 - Install Node.js**
1. Download and install Node.js from here: https://nodejs.org/en/download

**Step 3 - Clone GitHub Repo**
1. Open terminal and navigate to the directory you want to clone the repo into
2. Clone the repo: ``` git clone https://github.com/alexmair13/CarAuctionSite```

Step 4 - Install Dependencies
1. To install the required dependencies use: ```npm install```

Step 5 - Configure Environment Variables
1. Make a .env file in the project's root directory
2. Edit the .env file to include: ```DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=auction ```
where your_mysql_passsord is the password for your mysql user.

Step 6 - Run the Site
1. In the terminal to run the server and front end app at the same time use: ```npm run dev```

