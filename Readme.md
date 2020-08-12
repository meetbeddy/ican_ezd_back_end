# ICAN EASTERN ZONAL CONFERENCE


## Requirements
    - HAVE A GOOD INTERNER ACCESS

## Base URL
    -  https://icansoutheast.herokuapp.com/



## Login
1. ### Login Route
```json
Method: POST
Route: https://icansoutheast.herokuapp.com/api/user/auth/signin
Request:
    {
        "email":"youremail@mail.com",
        "password":"xxxxxx"
    }
Response:
    {
        "success": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTgzYjAxMTVlMzMxMDFkMDY5YzIwYSIsImlhdCI6MTU3NTUwMDk5Nn0.3plm-T7lHn475Nxb4F_rYAFD5xiHDGaPsJAXUZpQlvU"
    }
```
Filed | Value | Required
------------ | ------------- | -------------
email |youremail@mail.com| true
password |xxxxxx| true

2.  ### Register Route
```json
Method: POST
Route: https://icansoutheast.herokuapp.com/api/user/auth/signup
Request:
    {
        "name":"yourname",
        "email":"yourname@gmail.com",
        "password":"xxxxx",
        "bankName":"Your Bank",
        "tellerNumber":"78754",
        "phone":"08176765364",
        "gender":"female",
        "tshirtSize":"XL",
        "memberStatus":"Non Member",
        "confirm_password":"xxxxxx",
        "icanCode":"",
        "memberCategory":"",
        "memberAcronym":"",
        "nameOfSociety":""
    }
Response:
    {
        "success": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTgzYjAxMTVlMzMxMDFkMDY5YzIwYSIsImlhdCI6MTU3NTUwMDk5Nn0.3plm-T7lHn475Nxb4F_rYAFD5xiHDGaPsJAXUZpQlvU"
    }
```
Filed | Value | Required
------------ | ------------- | -------------
email |youremail@mail.com| true
password |xxxxxx| true
confirm_password| xxxxxx|true
bankName| Your Bank | true
tellerNumber| 879783 | true
phone| xxxxxxxxxxx | true
gender| male or female | true
tshirtSize| S, M, L. XL | true
memberStatus| Ican Member or Non Member | ture
icanCode | MBXXXXXX | true if memberStatus = Ican Member eles false
memberCategory | Full Paying or Half Paying | true if memberStatus = Ican Member eles false 
memberAcronym | ACA or FCA | true if memberStatus = Ican Member eles false
nameOfSociety | ABA | true if memberStatus = Ican Member eles false

## Get User
3. ### Login Route
```json
Method: GET
Route: https://icansoutheast.herokuapp.com/api/user/auth/current/:id
Request:
    https://icansoutheast.herokuapp.com/api/user/auth/current/5de83b0115e33101d069c20a
Response:
    {
        {
        "admin": false,
        "_id": "5de83b0115e33101d069c20a",
        "email": "arinzeogbo@gmail.com",
        "bankName": "Diamond Access",
        "tellerNumber": "78754",
        "name": "Arinze",
        "phone": "08176765364",
        "gender": "female",
        "tshirtSize": "XL",
        "memberStatus": "Non",
        "icanCode": "",
        "memberCategory": "",
        "memberAcronym": "",
        "nameOfSociety": "",
        "createdAt": "2019-12-04T23:02:25.537Z",
        "updatedAt": "2019-12-04T23:02:25.537Z",
        "__v": 0
    }
    }
```
Filed | Value | Required
------------ | ------------- | -------------
id |5de83b0115e33101d069c20a| true

## Todod
- [ ] Admin Confirm User Payment
- [ ] Admin View Users 

## Done
- [x] Login Route
- [x] Register Route 
