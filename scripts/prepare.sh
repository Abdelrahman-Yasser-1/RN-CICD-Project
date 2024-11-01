rm -rf node_modules
yarn install

rm -rf ios/Pods
npx pod-install

cd android
./gradlew clean
bundle install
bundle exec fastlane install_plugins
cd ..

# cd ios
# bundle install
# bundle exec fastlane install_plugins
# cd ..