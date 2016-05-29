# Exit with error if any command fails
set -e

# install grunt cli
npm install grunt-cli

# install grunt dependencies
npm install

# clear dist folder
rm -f -r dist
rm -f dist.zip

# run Grunt default task 
grunt

cd dist

# create version file
printf "Build key: %s\n\r" "${bamboo_buildResultKey}" > version.txt
printf "Build timestamp: %s\n\r" "${bamboo_buildTimeStamp}" >> version.txt
printf "Build URL: %s\n\r" "${bamboo_resultsUrl}" >> version.txt
printf "Stash revision: %s\n\r" "${bamboo_planRepository_revision}"  >> version.txt

# package application into dist.zip for deployment
zip -r ../dist.zip *