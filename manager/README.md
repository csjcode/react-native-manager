## React Native Manager

From the Udemy React Native class

-----------------------------------------------------------

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

-----------------------------------------------------------

### 106 FIREBASE SETUP
* Make sure App.js, the root, is a class component (change to class extends and add render)
* We are going to be using Firebase so we need Firebase setup config
* `npm install --save firebase`
* go to https://console.firebase.google.com/?pli=1
* create new project react-native-manager
* Auth > Setup signin method > enable Email authentication > enable - SAVE
* Top right screen > Web Setup
* Copy code without `<script>` tags
* Paste into App componentWillMount (can be in separate file too)
* import firebase library
*

```javascript
componentWillMount() {
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

-----------------------------------------------------------

### 107 Login Form Redux explanation/flow

* Redux is not necessary for forms, but as it gets more complex can be helpul.
* 4 states: email, password, loading, error
* see images

-----------------------------------------------------------

### 108. Rebuilding the Login Form

* Create new components and components/common directory (copy form boilerplate)
* In this example I alos copied the actions folder in case we need it later (it;s not being used yet)
* Add login boilerplate in LoginForm.js


-----------------------------------------------------------

### 109. Handling Form Updates with Action Creators

* See diagram
* This is a lot of work for a simple form, but the idea is to set it up for more complex forms.
* User types something and when they do call an Action Creator
* Pass onChangeText handler to get text being typed. {this.onEmailChange.bind(this)} (bind is for the callback)
* Create an Action Creator `manager\src\actions\index.js`
```javascript
export const emailChanged = (text) => {
  return (
    type: 'email_changed',
    payload: text
  );
};
```

-----------------------------------------------------------

### 110. Wiring up Action Creators

* We need to wire up our Action Creator
* Import connect and action

```javascript
import { connect } from 'react-redux';
import { emailChanged } from '../actions/';
```

* At bottom of file: `export default connect(null, { emailChanged })(LoginForm)`

* We now have acces in emailchangedText helper to this.props.emailChanged(text)

#### Auth Reducer

* Next we make a new reducer file: AuthReducer.js
* We're going to use this to handle all our authentication
* In reducer/index.js Import AuthReducer
* Setup reducer boilerplate with inital object value
```javascript
const INITIAL_STATE = { email: ''}
export default(state = INITIAL_STATE, action) => {
  switch(action.type){
    default:
      return state;
  }
}
```

-------------------------------------------------

### 111. Typed Actions

* TYPES: The convention in Redux is to make variables in the reducer to tightly hold to actions (make them the same name)
* To do this we'll make a separate types.js file, put the variabels in there and import it into both Reducer and Action files
* Make a new file in the ACTIONS folder called types.js
* example in types.js: `export const EMAIL_CHANGED = 'email_changed';` -- note: this is a named export since we plan to many (not default)
* now in actions/index `import { EMAIL_CHANGED } from './types';` -- curly braces because we expect to pull out other things
* replace `type: 'email_changed',` with `type: 'EMAIL_CHANGED',`
* now in AuthReducer `import { EMAIL_CHANGED } from './types';`
* Then inside the AuthReducer switch `case EMAIL_CHANGED:`
* CAREFUL of common bug: wrong variable name in import as that will trigger undefined in the console

-------------------------------------------------

### 112. Immutable State

* Javascript references two states of the object to the same state, making it see like no change occurred even if it did.
* See images and diagrams.
* Therefore to compare different states we have to make the first state Immutable
* This can be seen in the redux/reducer.js code for the Redux library

-------------------------------------------------

### 113. Creating Immutable State





















.
