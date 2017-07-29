# Chat Service

The chat service consist of two major entities - Server and Client. Following are the product features:-
1. A client register itself with the server on bootup.
2. A server has he list of all the rgistered Clients.
3. Client is running on a web port. User will access the client in a browser and writes messages to the user he wants.
4. The message is sent to the client server, which will relay it further to the intended receiver.
5. The message is recieved by the other client, which will use socket.io to pass it further to its UI
6. A user can chat with multple registered users in the same window.

## Design consideration
There were various ways to create a chat service. It could have been peer to peer using raw sockets, adding an intermediate chat server can provide us several benefits in the future releases:-
1. Server can store the messages in the DB, if the receiver is not online, and can thus play it back.
2. Server can keep track of the acknowldgements, if the receiver has actually seen the message and notify the sender accordingly.
3. Users can block each others, and this filtering will happen at the server.
4. Most importantly peer to peer could have required nC2 open sockets (star topology, instead of mesh)

Our chat as push based design, where server tries to push the message to receiver as soon as sender sends it, this is important to keep the chat real-time. Pull based designed would have let to the issues where sender has to wait for the receiver to pull and respond

Again, communication between Server and Client could have been done using raw sockets, however http sockets were used to simplify the problem and it made is easier to deploy UI on browsers.

## Execution instructions

1. The instructions are written for \*nix based systems, also node.js has to be installed
2. Git clone or downlaod the project in a new directory.
3. Execute `npm install` from the terminal in the directory
4. set correct permissions - `chmod a+x kill.sh run.sh`
6. *run.sh* is demo script which will start the server and two clients - Nina(port 8000) and Bob(9000).
7. Open http://localhost:8000 in any browser to send a message to Bob(running at http://localhost:9000).
8. Kill all the servers by executing `./kill.sh`
9. Note that server can be manually started at `node server.js` and clients as - `node client.js <client name> <client port>`
10. Server has to be started first, otherwise clients, being unable to register will exit.
11. Any number of clients can be started and can be messaged with together

## Limitations
As told earlier several add-ons can be added in the server's role. Currently it just relay messages between the clients. Also the UI is very basic and simply provides the proof of concept. Lastly, the chat service currently supports no multimedia, but just plain text.
