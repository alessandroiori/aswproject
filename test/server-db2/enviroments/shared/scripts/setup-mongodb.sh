#!/bin/bash
#
#setup-mongodb.sh
#



#sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

yes '' | sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org

export LC_ALL=en_US.UTF-8

mongod --bind_ip 10.11.1.101


#if mongo -v == "command not found" then ./enable_mongo.sh

