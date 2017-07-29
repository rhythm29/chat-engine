#!/bin/bash
node server.js > /dev/null 2>1 &
node client.js Bob 9000 > /dev/null 2>1 &
node client.js Nina 8000  > /dev/null 2>1 &
