# Contact API spec

## Create Contact

Endpoint : POST api/contacts

Request Header :

- Authorization : token

Request Body :

```json
{
  "first_name": "nama depan",
  "last_name": "nama belakang",
  "email": "user@gmail.com",
  "phone": "089763892281"
}
```

Response body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "nama depan",
    "last_name": "nama belakang",
    "email": "user@gmail.com",
    "phone": "089763892281"
  }
}
```

## Get Contact

Endpoint : GET api/contacts/{idContact}

Request Header :

- Authorization : token

Response body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "nama depan",
    "last_name": "nama belakang",
    "email": "user@gmail.com",
    "phone": "089763892281"
  }
}
```

## Update Contact

Endpoint : PUT api/contact

Request Header :

- Authorization : token

Request Body :

```json
{
  "first_name": "nama depan",
  "last_name": "nama belakang",
  "email": "user@gmail.com",
  "phone": "089763892281"
}
```

Response body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "nama depan",
    "last_name": "nama belakang",
    "email": "user@gmail.com",
    "phone": "089763892281"
  }
}
```

## Remove Contact

Endpoint : POST api/contacts/{idContact}

Request Header :

- Authorization : token

Response body (Success) :

```json
{
  "data": true
}
```

## Search Contact

Endpoint : GET api/contacts/

Request Header :

- Authorization : token

Query Parameter :

- name : string, search ke first_name atau last_name
- email : string, search ke email
- phone : string, search ke phone
- page : number, default 1
- size : number, default 10

Response body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "nama depan",
      "last_name": "nama belakang",
      "email": "user@gmail.com",
      "phone": "089763892281"
    },
    {
      "id": 2,
      "first_name": "nama depan",
      "last_name": "nama belakang",
      "email": "user@gmail.com",
      "phone": "089763892281"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
