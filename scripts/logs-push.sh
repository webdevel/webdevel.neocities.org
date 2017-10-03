#!/bin/sh
# Script file transfers on remote guest virtual machine with ssh port forwarding

echo "Working directory $PWD"

echo "Pushing logs..."

rsync -rlptDvzhe 'ssh -p 2222' logs/* root@localhost:/var/log/
