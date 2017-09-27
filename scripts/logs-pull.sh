#!/bin/sh
# Script file transfers on remote guest virtual machine with ssh port forwarding

echo "Working directory $PWD"

echo "Pulling logs..."

rsync -rlptDvzhe 'ssh -p 2222' root@localhost:/var/log/* logs/
