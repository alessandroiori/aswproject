#!/bin/bash
#
# setup-mongodb.sh
#


source "/home/vagrant/shared/scripts/common.sh"

# set up mongodb constants 
MONGO_VERSION=3.0
# e.g., mongodb-org-3.0.list
MONGO_FILE_NAME=mongodb-org${MONGO_VERSION}
# e.g., node-v4.4.3-linux-x64.tar.xz
#NODE_ARCHIVE=${NODE_FILE_NAME}.tar.xz

echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" 
| sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list

GET_NODE_URL=https://nodejs.org/dist/
NODE_PATH=/usr/local/${NODE_FILE_NAME}
