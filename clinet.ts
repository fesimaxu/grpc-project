import * as grpc from '@grpc/grpc-js';
import { UserServiceClient } from './user_grpc_pb';
import { CreateUserRequest, CreateUserResponse, GetUserRequest, GetUserResponse } from './user_pb';

const client = new UserServiceClient('localhost:50051', grpc.credentials.createInsecure());

const createUser = (name: string, email: string) => {
  const request = new CreateUserRequest();
  request.setName(name);
  request.setEmail(email);

  client.createUser(request, (err, response: CreateUserResponse) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`User created with id: ${response.getId()}`);
  });
};

const getUser = (id: string) => {
  const request = new GetUserRequest();
  request.setId(id);

  client.getUser(request, (err, response: GetUserResponse) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`User name: ${response.getName()}, email: ${response.getEmail()}`);
  });
};

createUser('Tuhin Banerjee', 'tuhinb@example.com');
getUser('123456');