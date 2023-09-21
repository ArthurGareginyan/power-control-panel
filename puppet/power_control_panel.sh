#!/bin/bash

# Argument for the action (poweroff or status)
action="$1"

if [ "$action" == "poweroff" ]; then
    # Power off the server
    sudo poweroff
    echo "Server is powering off."
elif [ "$action" == "restart" ]; then
    systemctl reboot
    echo "Server is restarting."
elif [ "$action" == "status" ]; then
    # Check server status (Always running if this script can be executed)
    echo "Server is running."
else
    echo "Invalid argument. Use 'poweroff' or 'status'."
fi
