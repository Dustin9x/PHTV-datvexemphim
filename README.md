
<p align="center"><a href="#" target="_blank"><img src="https://github.com/Dustin9x/PHTV-datvexemphim/assets/116355841/4225e5a6-f857-4e71-be60-88e067c85eeb" width="180" alt="Laravel Logo"></a></p>

# Project PHTV

A movie tickets booking and management application using ReactJS and PHP Laravel.

PHTV is a website to provide the customers facility to book tickets for a movie online and to gather information about the movies and theaters. Customer needs to register at the site to book tickets to the movie. After selecting the show, the user is presented a seating layout so that he can select seats of his choice.

If you found this project useful, then please consider giving it a ⭐ on Github and follow me on GitHub.

## Components:
-   Carousel
-   Search Bar
-   Slider movie selection
-   Movie news
-   Movie detail pages with showtimes
-   Seat selection
-   Payment and get e-ticket
-   Login and Register
-   User profile
-   Admin CRUD
-   Many other components...

## How To Run
-   Backend ()
       -   Installation Laragon
            ```bash
            Install PHP server Laragon
            Run it
            Clone this repo into www folder of Laragon
            Download cinema_choodu.sql file in this repo and import to phpmyadmin or mysql and simple run it
            ```
       -   Setup backend database
            ```bash
            $ Create a .env file in your server and backend folder
            $ See the .env sample
            $ create a myphpadmin database and add your connection string into .env file
            ```
       -   Installation dependencies
            ```bash
            $ composer install
            $ php artisan migrate
            $ php artisan passport:install
            $ php artisan serve
            ```                       
-   Frontend ()
       -   Installation NodeJS
       -   Installation dependencies
            ```bash
            $ npm i
            $ npm start
            ```
            
## Features:
       -   Login to System
       -   Select Movie that is Avaliable
       -   Purchase a Ticket
       -   Summary of Ticket
       -   Cancel a Ticket
       -   Logout
       
## Techs:
       -   phpMyAdmin - A free software tool written in PHP, intended to handle the administration of MySQL over the Web.
       -   Laravel - A web application framework with expressive, elegant syntax.
       -   ReactJS - A JavaScript library for building user interfaces.
       -   Redux - A predictable state container for JavaScript apps.
       -   NodeJS - A JavaScript runtime built on Chrome's V8 JavaScript engine
       
## Screenshots:
-   Home Page ()
<img src="https://github.com/Dustin9x/PHTV-datvexemphim/assets/116355841/56f970e5-8131-4f49-b7f6-fde6db922f04" width="100%" alt="Homepage">

-   Admin Page ()
<img src="https://github.com/Dustin9x/PHTV-datvexemphim/assets/116355841/1751e471-92f1-49f9-8add-f1135cbacaa7" width="100%" alt="Adminpage">

-   Movie Detail Page ()
<img src="https://github.com/Dustin9x/PHTV-datvexemphim/assets/116355841/86337f50-6656-4b25-9b5f-f8d94d5a97ee" width="100%" alt="Moviedetailpage">

-   Seats Selecting Page ()
<img src="https://github.com/Dustin9x/PHTV-datvexemphim/assets/116355841/0c394db0-eb7c-45ea-9f66-77e496a88088" width="100%" alt="Seatsselect">


