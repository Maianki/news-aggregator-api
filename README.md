
# NEWS AGGREGATOR API

These are APIs for news Aggregator


## Run Locally

Clone the project

```bash
  git clone https://github.com/Maianki/news-aggregator-api.git
```

Go to the project directory

```bash
  cd news-aggregator-api 
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon app.js
```


## API Reference

#### register user

```http
  POST /register
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `fulName`      | `string` | **Required**. fullName of registered user |
| `email`      | `string` | **Required**. email of user to be registered |
| `password`      | `string` | **Required**. password of user has to be atleast 8 character long |
| `preferences`      | `object` | An object with sources and categories as keys that takes array of news sources and categories|


#### login user
```http
  POST /login
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email of user to be registered |
| `password`      | `string` | **Required**. password of user has to be atleast 8 character long |


#### get user preferences
```http
  GET/preferences
```


#### update user preferences
```http
  PUT /preferences
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `preferences`      | `object` | An object with sources and categories as keys that takes array of news sources and categories|



#### get news for user based on preferences
```http
  GET /news
```
