## React Native Manager

From the Udemy React Native class

### 104-106 SETUP

* `react-native init manager`
* `npm install --save react-redux redux`
* Setup root component folder/file src/app.js
* Delete most of what is in index.android.js except for AppRegistry
* Copy to index.ios.js
* Setup default reducer
* Create folder src\reducers
* Create file src\reducers\index.js
* Create reducer in that file that returns array
* Import reducers into App file
* Put reducers variable into createStore
* commit

### 106 FIREBASE SETUP
* Make sure App.js, the root, is a class component (change to class extends and add render)
* We are going to be using Firebase so we need Firebase setup config
* `npm install --save firebase`
* go to https://console.firebase.google.com/?pli=1
* create new project react-native-manager
* Auth > Setup signin method > enable Email authentication > enable - SAVE
* Top right screen > Web Setup
* Copy code without <script> tags
* Paste into App componentWillMount (can be in separate file too)
* import firebase library
*

```javascript
componentWillMount {
  const config = {
    apiKey: 'AIzaSyD6qF_57hsOn3UTCC4tN23gA9y64Ec3oE0',
    authDomain: 'react-native-manager-70a56.firebaseapp.com',
    databaseURL: 'https://react-native-manager-70a56.firebaseio.com',
    storageBucket: 'react-native-manager-70a56.appspot.com',
    messagingSenderId: '452030176681'
  };
  firebase.initializeApp(config);
}
```

###
