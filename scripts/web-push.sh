#!/bin/sh
# Script file transfers on remote guest virtual machine with ssh port forwarding

echo "Working directory $PWD"

echo "Pushing web..."

rsync -rlptDvzhe 'ssh -p 2222' web root@localhost:/var/www/webdevel.neocities/
