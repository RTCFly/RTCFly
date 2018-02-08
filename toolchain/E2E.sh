
cp -a dist E2E/testproject/src/scripts
cd E2E/testproject 
npm install 
npm run build 
cd ../.. 
./node_modules/cucumber/bin/cucumber.js E2E/features/RTCFly_V1.feature