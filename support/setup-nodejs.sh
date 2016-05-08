#!/bin/bash
#
# Author: Alessandro Iori 
#

source "/home/vagrant/shared/scripts/common.sh"

# set up node js constants 
NODE_VERSION=4.4.3
# e.g., node-v4.4.3-linux-x64
NODE_FILE_NAME=node-v${NODE_VERSION}-linux-x64
# e.g., node-v4.4.3-linux-x64.tar.xz
NODE_ARCHIVE=${NODE_FILE_NAME}.tar.xz

GET_NODE_URL=https://nodejs.org/dist/
NODE_PATH=/usr/local/${NODE_FILE_NAME}

function installLocalNode {
	echo "=================="
	echo "installing node js"
	echo "=================="
	FILE=${VAGRANT_RESOURCES}/$NODE_ARCHIVE
	tar -xpvf $FILE -C /usr/local
	# da unificare in setupNode
	#mv /usr/local/$NODE_FILE_NAME /usr/local/node
}

function installRemoteNode {
	echo "==================="
	echo "downloading node js"
	echo "==================="
	# e.g., https://nodejs.org/dist/v4.4.3/node-v4.4.3-linux-x64.tar.xz
	wget -q -P /tmp ${GET_NODE_URL}/v${NODE_VERSION}/${NODE_ARCHIVE} 
	echo "=================="
	echo "installing node js"
	echo "=================="
	FILE=/tmp/${NODE_ARCHIVE}
	if fileExists $FILE; then 
		tar -xpvf $FILE -C /usr/local
		#mv /usr/local/$NODE_FILE_NAME /usr/local/node
		rm $FILE 
	else 
		echo "impossibile installare node js" 
	fi
}

function setupNode {
	echo "setting up node js"
	if fileExists $NODE_PATH; then
		#e.g., sudo ln -s /usr/bin/nodejs /usr/bin/node
		#sudo ln -s $NODE_PATH /usr/local/node
		mv ${NODE_PATH} /usr/local/node
	fi
}

function setupEnvVars {
	echo "creating node js environment variables"
	echo export NODE_HOME=/usr/local/node >> /etc/profile.d/nodejs.sh
	echo export PATH=\${PATH}:\${NODE_HOME}/bin >> /etc/profile.d/nodejs.sh
}

function InstallFromJson {
	# deve essere presente il file package.jason configurato
	echo "===================="
	echo "installing from JSON"
	echo "===================="
	npm install
}

function installNode {
	if resourceExists $NODE_ARCHIVE; then
		installLocalNode
	else
		installRemoteNode
	fi
}

echo "setup node js"
installNode
setupNode
setupEnvVars
#InstallFromJson
