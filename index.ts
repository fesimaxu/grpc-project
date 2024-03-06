import * as grpc from '@grpc/grpc-js';
import { GetUserRequest, GetUserResponse, CreateUserRequest, CreateUserResponse } from './user_pb';
import { UserServiceService, IUserServiceService } from './user_grpc_pb';

function getUser(_call: grpc.ServerUnaryCall<GetUserRequest,GetUserResponse >, callback: grpc.sendUnaryData<GetUserResponse>): void {
  const userResponse = new GetUserResponse();
  userResponse.setName('John');
  userResponse.setEmail('john@example.com');

  callback(null, userResponse);
}

function createUser(_call: grpc.ServerUnaryCall<CreateUserRequest, CreateUserResponse>, callback: grpc.sendUnaryData<CreateUserResponse>): void {
  const userResponse = new CreateUserResponse();
  userResponse.setId('123');

  callback(null, userResponse);
}

const server = new grpc.Server();

server.addService(UserServiceService, { getUser, createUser });

const port = process.env.PORT || '50051';

server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Server running on port ${port}`);
  server.start();
});