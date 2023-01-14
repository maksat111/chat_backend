# ADMIN ROUTES


## **Sending message**

**URL**: `api/admin/sendMessage`

**Method** : `POST`

### **Example**

**Body**: 
```json 
{
   "customer_id": 3,
   "message": "Your message",
   "meta": {} //not required
}
```

### Success response ###

**Code**: `201 Created`

**Result**: 
``` json
{
    "success": 1,
    "message": "Message sent!",
    "data": {
        "_id": "62fd7f5c5a5d4b5aca754847",
        "admin": {
            "id": 1,
            "firstname": "Mohamed",
            "lastname": "Hojaev"
        },
        "sender": {
            "id": 1,
            "type": "admin"
        },
        "message": "last",
        "room_id": 43,
        "read_at": null,
        "meta": {},
        "deleted_at": null,
        "updated_at": "2022-08-17T23:53:00.191Z",
        "created_at": "2022-08-17T23:53:00.191Z"
    }
}
```
### Error response ###

**Code**: `500` or `400`

**Result**: 
``` json
{
    "success": 0,
    "message": "Error message"
}
```


## **Getting the list of chats**

**URL**: `api/admin/getChats?page=1&limit=10`

**Method** : `GET`

**Body**: `none`

### **Example**

**URL**: `api/admin/getChats?page=1&limit=10`

### Success response ###

**Code**: `200 Success`

**Result**: 
``` json
{
    "success": 1,
    "data": [
        {
            "_id": 12,
            "customer": {
                "id": 12,
                "name": "customer12"
            },
            "last_message": "hey",
            "unread": 0,
            "room_id": 12,
            "updated_at": "2022-07-13T09:04:43.054Z"
        }
    ]
}
```
### Error response ###

**Code**: `500` or `400`

**Result**: 
``` json
{
    "success": 0,
    "message": "Error message",
    "data": null
}
```



## **Get messages of the customer**

**URL**: `api/admin/:customer_id ? page = 1 & limit = 10`

**Method** : `GET`

**Body**: `none`

### **Example**

**URL**: `api/admin/2`

### Success response ###

**Code**: `200 Success`

**Result**: 
``` json
{
    "success": 1,
    "data": [
        {
            "customer": {
                "id": 2,
                "name": "customer2"
            },
            "admin": {
                "id": 1,
                "name": "admin1"
            },
            "_id": "62c57bceab6312b654bf17bf",
            "message": "pusher test",
            "room_id": 2,
            "read_at": "2022-07-12T12:10:38.091Z",
            "created_at": "2022-07-06T12:09:35.853Z",
            "__v": 0
        }
    ]
}
```
### Error response ###

**Code**: `500` or `400`

**Result**: 
``` json
{
    "success": 0,
    "message": "Error message",
    "data": null
}
```



## **Chat searching**

**URL**: `api/admin/findChat?customer=John`

**Method** : `GET`

### **Example**

**URL**: `api/admin/findChat?customer=John`

**Body**: `none`

### Success response ###

**Code**: `200 Success`

**Result**: 
``` json
{
    "success": 1,
    "data": [
        {
            "_id": 12,
            "customer": {
                "id": 12,
                "name": "John"
            },
            "last_message": "hey",
            "unread": 0,
            "room_id": 12,
            "updated_at": "2022-07-13T09:04:43.054Z",
        }
    ]
}
```
### Error response ###

**Code**: `500` or `400`

**Result**: 
``` json
{
    "success": 0,
    "message": "Error message",
    "data": null
}
```

## **Login**

**URL**: `api/admin/login`

**Method** : `POST`

### **Example**

**URL**: `api/admin/login`

**Body**: 
``` json
{
    "email": "admin1@asmantiz.com",
    "password": "123123"
}
```

### Success response ###

**Code**: `200 Success`

**Result**: 
``` json
{
    "token": "55|CL6DRprVP3OuX0zHNWKsbXn2YKRFafVn5M7ul9SU",
    "user": {
        "id": 1,
        "role": "admin",
        "firstname": "Mohamed",
        "lastname": "Hojaev",
        "email": "admin1@asmantiz.com",
        "email_verified_at": null,
        "password": "$2y$10$mOd2z7XYtAaz7nzlIpXtl.6ObH7C3/2V.mD7fGGwoTTafgrkZ5egi",
        "locale": "tm",
        "remember_token": null,
        "created_at": "2022-07-06T10:44:38.000000Z",
        "updated_at": "2022-07-06T10:44:38.000000Z"
    }
}
```
### Error response ###

**Code**: `500` or `400`

**Result**: 
``` json
{
    "success": 0,
    "message": "Error message",
    "data": null
}
```

## **Get unread messages**

**URL**: `api/admin/messages/unread?room_id=5`

**Method** : `GET`

### **Example1**

**URL**: `api/admin/messages`

**NOTE**: `In this way admin will get all the unread messages`

**Body**: `none`

### Success response ###

**Code**: `200 Success`

**Result**: 
``` json
{
    "success": 1,
    "data": {
        "unread_messages": 5
    }
}
```
### Error response ###

**Code**: `500` or `400`

**Result**: 
``` json
{
    "success": 0,
    "message": "Error message",
}
```

### **Example2**

**URL**: `api/admin/messages?room_id=2`

**NOTE**: `In this way admin will get unread messages of room = 2`

**Body**: `none`

### Success response ###

**Code**: `200 Success`

**Result**: 
``` json
{
    "success": 1,
    "data": {
        "unread_messages": 5
    }
}
```
### Error response ###

**Code**: `500` or `400`

**Result**: 
``` json
{
    "success": 0,
    "message": "Error message",
}
```
## **Deleting a message**

**URL**: `api/admin/messages/delete/:message_id`

**Method** : `DELETE`

### **Example**

### Success response ###

**Code**: `200`

**Result**: 
``` json
{
    "success": 1,
    "message": "Message deleted successfully!"
}
```
### Error response ###

**Code**: `500` or `400`

**Result**: 
``` json
{
    "success": 0,
    "message": "Error message"
}
```