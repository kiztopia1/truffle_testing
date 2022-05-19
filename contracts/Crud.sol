//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Crud{
    struct User {
        uint id;
        string name;
    }

    User[] public users;
    uint internal nextId = 1;

    function create(string memory _name) public {
        users.push(User(nextId, _name));
        nextId++;
    }
    function find(uint _num) view internal returns(uint) {
        for(uint i = 0; i < users.length; i++) {
            if(users[i].id == _num){
                return i;
            }
        }
        revert('User does not exist!');
    }

    function read(uint _id) view public returns(uint, string memory) {
        uint i = find(_id);
        return(users[i].id, users[i].name);
    }

    function update(uint _id, string memory _name) public{
        uint i = find(_id);
        users[i].name = _name;
    }

    function destroy(uint _id) public {
        uint i = find(_id);
        delete users[i];
    }


}