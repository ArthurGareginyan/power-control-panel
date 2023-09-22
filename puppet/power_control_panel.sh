#!/bin/bash

# Argument for the action (poweroff or status)
action="$1"

if [ "$action" == "poweroff" ]; then
    # Power off the server
    sudo poweroff
    echo "Powering off"
elif [ "$action" == "restart" ]; then
    systemctl reboot
    echo "Restarting"
elif [ "$action" == "status" ]; then
    # Check server status (Always running if this script can be executed)
    echo "Running"
else
    echo "Invalid argument. Use 'poweroff' or 'restart' or 'status'."
fi
