# event-reservation-system
 Laravel+React application to create events and reserve tickets

## How run it in Local environment?
We need to install the composer dependencies
```
composer install
```
And the npm dependencies
```
npm i
```
We create a schema in MySql with:
```
CREATE SCHEMA ers;
```
Copy `env.example` to create your own `.env` and configure it to have the MySQL connection like this:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ers
DB_USERNAME=root
DB_PASSWORD=your_password_here
```
Now we can run the migrations
```
php artisan migrate
```
Run the seeders
```
php artisan db:seed
```
And we are ready for run our backend (Laravel)
```
php artisan serve
```
And our frontend (React)
```
npm run dev
```
## Screenshots of application running
![Welcome](https://i.ibb.co/LpbDCTR/screenshot-1.png)
![Dashboard](https://i.ibb.co/qDmN5sp/screenshot-2.png)
![Create Event View](https://i.ibb.co/BgRbhMP/Captura-desde-2024-08-22-19-37-09.png)
