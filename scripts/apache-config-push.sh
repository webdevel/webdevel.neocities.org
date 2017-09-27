#!/bin/sh
# Script file transfers on remote guest virtual machine with ssh port forwarding

echo "Working directory $PWD"

echo "Pushing Apache configuration..."

rsync -rlptDvzhe 'ssh -p 2222' config/webdevel.neocities.conf root@localhost:/etc/apache2/sites-available/webdevel.neocities.conf
