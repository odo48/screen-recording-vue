# screen-recorder-vue-2
Vue & TypeScript Browser Extension for
Screen/Webcam Recording.

## Technologies used
 - Vue2;
 - Typescript;
 - IndexedDB;
 - SASS;


## Chrome permissions 
For this chrome extension when you are using it, it will get access by default to Desktop preview and Browser Storage. For Webcam recording to work, it will need manually access to Camera (because it's manifest V2)

## Using application
You can use this extension by compiling it, going to chrome://extensions, activate developer mode (top right) and then click on Load Unpacked and select Dist folder created with yarn build or yarn build-watch

## Future changes
Change manifest.json to V3 for requesting permissions for camera, storage and desktop recording.

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn build-watch for live testing
```

### Compiles and minifies for production
```
yarn build
```
