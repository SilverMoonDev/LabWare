#!/bin/bash

cleanup() {
    kill $(jobs -p) &>/dev/null
}

trap cleanup INT

php artisan serve &

npm run dev

cleanup
