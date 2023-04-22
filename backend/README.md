## API Reference

### User Authentication

#### User Registration

```http
  POST /api/v1/auth/register
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `name`     | `string` | **Required**. Your name     |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

#### User Login

```http
  POST /api/v1/auth/login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

#### User Logout

```http
  GET /api/v1/auth/logout
```

| Parameter | Type | Description |

#### Get Logged In User

```http
  GET /api/v1/auth/profile
```

| Parameter | Type | Description |

### Users

#### Get All Users

```http
  GET /api/v1/users
```

| Parameter | Type | Description |

#### Get User

```http
  GET /api/v1/users/:id
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. User id |

| Query     | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `limit`   | `number` | **Optional**. limit          |
| `skip`    | `number` | **Optional**. skip           |
| `keyword` | `string` | **Optional**. search keyword |
| `sort`    | `string` | **Optional**. sort           |

### Chats

#### Get All Chats of Logged In User

```http
  GET /api/v1/chats
```

| Parameter | Type | Description |

#### Get Chat

```http
  GET /api/v1/chats/:id
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. Chat id |

#### Create Private Chat

```http
  POST /api/v1/chats/private
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `userId`  | `string` | **Required**. User id |

#### Create Group Chat

```http
  POST /api/v1/chats/group
```

| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `chatName`  | `string` | **Required**. Group name        |
| `chatImage` | `string` | **Required**. Group image       |
| `userIds`   | `array`  | **Required**. Array of user ids |

### Messages

#### Get All Messages of Chat

```http
  GET /api/v1/messages/chat/:chatId
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `chatId`  | `string` | **Required**. Chat id |

#### Create Message

```http
  POST /api/v1/messages
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `chatId`  | `string` | **Required**. Chat id |
| `text`    | `string` | **Required**. Message |
