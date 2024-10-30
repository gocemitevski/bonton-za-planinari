#!/bin/bash

echo "🔔 Copying required Font file assets from node_modules..."

fontAssets=(
	"node_modules/@fontsource-variable/montserrat/files/."
)

for asset in ${fontAssets[@]}
do
	echo ✅ $asset
	cp -r $asset fonts/Montserrat
done
