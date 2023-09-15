## Simple REST API for CRUD Operations on "Person" Resource

This is a simple REST API that allows you to perform CRUD (Create, Read, Update, Delete) operations on a "person" resource. The API is designed to be flexible, secure, and capable of dynamically handling parameters such as a person's name. It is built using NodeJs, Express (framework) and MongoDB (Database). 

## Requirements
Before you get started, make sure you have the following installed on your system:

- Node.js (version 14 or higher)
- MongoDB (Make sure MongoDB is up and running on your system)
- Postman (This is recommended for testing)

## Getting Started
1. Clone the repository to your local machine:

```git clone https://github.com/Abuka-Victor/hngx-backend.git```
```cd hngx-backend```

1. Install project dependencies:
   
- `npm install`
  
3. Create a .env file in the root of the project directory with the following content:

### MongoDB URI

- `DB_URI=your_mongodb_uri_here`

### Port
- `PORT=your_port_here`
- 
Replace your_mongodb_uri_here with the URI to your MongoDB instance. You can obtain this URI from your MongoDB hosting service or use a locally hosted MongoDB instance.

## UML Diagram 

![UML Diagram](https://github.com/ayobamy/hngx_projects/assets/59466195/c6ee9bc7-f59d-4a15-81c9-e42733cfdd42)

## Running the API
Now that you've set up the project and configured the environment variables, you can start the API server:

- `npm run dev`
The API will run on http://localhost:5000 by default. You can change the port by modifying the PORT variable in the .env file.

## Testing in Postman
This is the postman link for testing the API endpoints
<a href='https://www.postman.com/ahmedolawale/workspace/hgnx/collection/26466520-6b66656b-629d-414c-8544-b261e24ade13?action=share&creator=26466520'>Postman Link</a>


## API Endpoints
This API provides the following CRUD endpoints for managing resources:

- `Create: POST /api/`
- `Read (All): GET /api/`
- `Read (One by ID): GET /api/:id`
- `Read (One by Username): GET /api/:name`
- `Update (by ID): PATCH /api/:id`
- `Update (by Username): PATCH /api/:name`
- `Delete (by ID): DELETE /api/:id`
- `Delete (by Username): DELETE /api/:name`
  
