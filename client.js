"use strict";
exports.__esModule = true;
var grpc = require("@grpc/grpc-js");
var user_grpc_pb_1 = require("../generated/user_grpc_pb");
var user_pb_1 = require("../generated/user_pb");
var client = new user_grpc_pb_1.UserServiceClient('localhost:50051', grpc.credentials.createInsecure());
var createUser = function (name, email) {
    var request = new user_pb_1.CreateUserRequest();
    request.setName(name);
    request.setEmail(email);
    client.createUser(request, function (err, response) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("User created with id: ".concat(response.getId()));
    });
};
var getUser = function (id) {
    var request = new user_pb_1.GetUserRequest();
    request.setId(id);
    client.getUser(request, function (err, response) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("User name: ".concat(response.getName(), ", email: ").concat(response.getEmail()));
    });
};
createUser('Tuhin Banerjee', 'tuhinb@example.com');
getUser('123456');