# User API spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "rizqofathur",
  "password": "mypassword",
  "name": "Fathurrizqo"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "rizqofathur",
    "name": "Fathurrizqo"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "username must not blank, .."
}
```

## Login User

Endpoint : POST /api/users/login

```json
{
  "username": "rizqofathur",
  "name": "Fathurrizqo",
  "token": "token"
}
```

## Get User

Endpoint : /api/users/current

Request Header :

- Authotization : token

Response body (Success) :

```json
{
  "data": {
    "username": "rizqofathur",
    "name": "Fathurrizqo"
  }
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Body :

```json
{
  "name": "rizqofathur",
  "password": "mypassword"
}
```

Response body (Success) :

```json
{
  "data": {
    "username": "rizqofathur",
    "name": "Fathurrizqo"
  }
}
```

## Logout User

Endpoint : DELETE api/users/current

Request Header :

- Authorization : token

Response body (Success) :

```json
{
  "data": true
}
```
