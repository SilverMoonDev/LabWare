#!/bin/bash

cleanup() {
    kill $(jobs -p) &>/dev/null
}

trap cleanup INT

php artisan serve &

cmd.exe /C "start chrome http://127.0.0.1:8000" 2>/dev/null

npm run dev

cleanup
