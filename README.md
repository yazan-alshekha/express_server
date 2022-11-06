
# Express server

## Technologies used :
- Nodejs with express freamwork 
- postgressql with sequelize ORM tool

## How to use this server :
1. download the repository
2. `npm install` to install all the dependencies
3. run your database server
4. create a database it's called "yazan-alshekha" 
5. create a `.env` file as a copy from `.env.sample` file
6. `nodemon` to run your nodejs server

## Third party API:
https://restcountries.com/v3.1/all

## API's :
to get the data from the api provided and save the response to our database.

**Note** : we should hit it only one time to avoid duplicate the data inside the database 

http://localhost:3000/seed


### Get all countries
Examples :

- http://localhost:3000/countries
- http://localhost:3000/countries?cca2=IO
- http://localhost:3000/countries?cca3=COG
- http://localhost:3000/countries?ccn3=296
- http://localhost:3000/countries?name=Romania



### Get country currencies by CCA2
Example :
- http://localhost:3000/country_currencies?cca2=BR


### Group countries API
Examples :
- http://localhost:3000/group_countries?language=english
- http://localhost:3000/group_countries?region=Americas

### Download_countries_file API :
- http://localhost:3000/download_countries_file 

**Note** : you need to add aheader (X-ADMIN=1) to be authorised admin