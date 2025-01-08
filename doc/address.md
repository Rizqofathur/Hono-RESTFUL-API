# Address API Spec

## Create Address

Endpoint : POST api/contacts/{idContact}/addresses

Request Header :

- Authorization : token

Request Body :

```json
{
  "street": "jalan",
  "city": "kota",
  "province": "provinsi",
  "country": "negara",
  "postal_code": "kode pos"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "provinsi",
    "country": "negara",
    "postal_code": "kode pos"
  }
}
```

## Get Address

Endpoint : POST api/contacts/{idContact}/addresses/{idAddresses}

Request Header :

- Authorization : token

Response Body :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "provinsi",
    "country": "negara",
    "postal_code": "kode pos"
  }
}
```

## Update Address

Endpoint : PUT api/contacts/{idcontact}/addresses/{idAddress}

Request Header :

- Authorization : token

Request Body :

```json
{
  "street": "jalan",
  "city": "kota",
  "province": "provinsi",
  "country": "negara",
  "postal_code": "kode pos"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "provinsi",
    "country": "negara",
    "postal_code": "kode pos"
  }
}
```

## Remove Address

Endpoint : DELETE api/contacts/{idcontact}/addresses/{idAdress}

Request Header :

- Authorization : token

Response Body :

```json
{
  "data": true
}
```

## List Address

Endpoint : POST api/contacts/{idcontact}/addresses

Request Header :

- Authorization : token

Response Body :

```json
{
  "data": [
    {
      "id": 1,
      "street": "jalan",
      "city": "kota",
      "province": "provinsi",
      "country": "negara",
      "postal_code": "kode pos"
    },
    {
      "id": 1,
      "street": "jalan",
      "city": "kota",
      "province": "provinsi",
      "country": "negara",
      "postal_code": "kode pos"
    }
  ]
}
```
