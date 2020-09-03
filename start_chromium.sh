#!/usr/bin/env bash

xset -dpms; 
xset s off; 
xset s noblank; unclutter &; 
chromium-browser ./dist/index.html --window-size=1920,1080 --start-fullscreen --kiosk --incognito --noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars --disable-features=TranslateUI --disk-cache-dir=/dev/null --password-store=basic
