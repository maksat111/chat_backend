# CUSTOMER ROUTES

## **Sending message**
**URL**: `api/chat/message/send`

**Method** : `POST`

### **Example**

**Body**: 
```json 
{
    "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
        "_id": "62fd7e755a5d4b5aca754843",
        "sender": {
            "id": 43,
            "type": "customer"
        },
        "message": "message",
        "room_id": 43,
        "read_at": null,
        "updated_at": "2022-08-17T23:49:09.655Z",
        "created_at": "2022-08-17T23:49:09.655Z"
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

## **Get messages of the customer**
**URL**: `api/chat/message/list` || `api/chat/message/list?limit={number}` || `api/chat/message/list?id={_id}&limit={number<100}`

**Method** : `GET`

**Body**: `none`

### **Example_1**
**URL**: `api/chat/message/list`

**NOTE**: `In this way response will return 10 last messages` 

### Success response ###
**Code**: `200 Success`

**Result**: 
``` json
{
    "success": 1,
    "data": [
        {
            "sender": {
                "id": 125,
                "type": "customer"
            },
            "_id": "62fcee7aae893037db7931e0",
            "admin": null,
            "message": "message",
            "room_id": 125,
            "read_at": null,
            "deleted_at": "2022-08-17T13:37:25.696Z",
            "updated_at": "2022-08-17T13:34:50.165Z",
            "created_at": "2022-08-17T13:34:50.165Z"
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

### **Example_2**
**URL**: `api/chat/message/list?limit=22`

**NOTE**: `In this way response will return 22 last messages` 

### Success response ###
**Code**: `200 Success`

**Result**: 
``` json
{
    "success": 1,
    "data": [
        {
            "sender": {
                "id": 125,
                "type": "customer"
            },
            "_id": "62fcee7aae893037db7931e0",
            "admin": null,
            "message": "message",
            "room_id": 125,
            "read_at": null,
            "deleted_at": "2022-08-17T13:37:25.696Z",
            "updated_at": "2022-08-17T13:34:50.165Z",
            "created_at": "2022-08-17T13:34:50.165Z"
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

### **Example_3**
**URL**: `api/chat/message/list?id=62c57bceab6312b654bf17bf&limit=20`

**NOTE**: `In this way response will return 20 messages which is written before the message with id=62c57bceab6312b654bf17bf` 

### Success response ###

**Code**: `200 Success`
**Result**: 
``` json
{
    "success": 1,
    "data": [
       {
            "sender": {
                "id": 125,
                "type": "customer"
            },
            "_id": "62fcee7aae893037db7931e0",
            "admin": null,
            "message": "message",
            "room_id": 125,
            "read_at": null,
            "deleted_at": "2022-08-17T13:37:25.696Z",
            "updated_at": "2022-08-17T13:34:50.165Z",
            "created_at": "2022-08-17T13:34:50.165Z"
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

## **Getting the unread messages**

**URL**: `api/chat/message/unread`

**Method** : `GET`

### **Example**

### Success response ###
**Code**: `200`

**Result**: 
``` json
{
    "success": 1,
    "data": {
        "unread_messages": 3
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

## **Deleting a message**

**URL**: `api/chat/message/delete/:message_id`

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