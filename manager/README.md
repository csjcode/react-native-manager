## React Native Manager

From the Udemy React Native class

-----------------------------------------------------------

### REDUX WORKFLOW:

Action Creator -> ACTION -> TYPE (pulled by both action/reducer) -> REDUCER -> COMBINE REDUCERS -> NEW COMPONENT/FORM -> mapStateToProps/Connect -> PROPS in COMPONENT

#### Pattern for new Actions

1. ACTION: Make Action Creator (actions/index or new file)
1. -- Export, Return a type:CONSTANT, payload:""
1. -- At the top of the file import the CONSTANT from types
1. TYPE: export CONSTANT = constant;
1. REDUCER: import CONSTANT from types
1. -- INITIAL_STATE
1. -- export, switch, default, return state
1. COMBINE REDUCERS: reducers/index - We will add the new reducer in the combined reducers file
1. NEW COMPONENT/FORM:
1. --- (a) Import new action from actions and
1. --- (b) connect from react-redux,
1. --- (c) connect and mapStateToProps at the bottom
1. --- (d) mapStateToProps constant
1. --- (e) on input tag value add this.prop.[values] to form/component
1. --- (f) if form on input tag make sure to add action creator `onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}`

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

```javascript
import { EMAIL_CHANGED } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

```


-------------------------------------------------

### 112. Immutable State

* Javascript references two states of the object to the same state, making it see like no change occurred even if it did.
* See images and diagrams.
* Therefore to compare different states we have to make the first state Immutable
* This can be seen in the redux/reducer.js code for the Redux library

-------------------------------------------------

### 113. Creating Immutable State

* To change state inside the reducer (AuthReducer) `return { ...state, email: action.payload};`
* This says: Take all the properties of my existing state object and then put email: action.payload on top of that.
* If email: action.payload exists it will be overwritten by that new property.
* Since we made a new object, then we can compare to see the state has changed.
* Every single key press will call the reducer, then we need to send this piece of state back into the LoginForm component
* mapStateToProps will help us get state back into Component
* First we have to define mapStateToProps function at the bottom of the LoginForm, called with global application state
```javascript
const mapStateToProps = state => {
  return {
    email: state.auth.email
  };
}
```
* Next, pass that into connect function `export default connect(mapStateToProps, { emailChanged })(LoginForm)`
* And then in the Input for email value={this.props.email}
* All of that was for the one input!!!
* Test in the emulator
* Working


-------------------------------------------------

### 114. More on Immutable State

* Let's do the Password part now
* LoginForm password input html `onChangeText={this.onPasswordChange.bind(this)}`
* New helper:
```javascript
onPasswordChange(text){
  this.props.passwordChanged(text);
}
```
* Add to password file `import { emailChanged, passwordChanged } from '../actions/';`
* Now we can go to actions/index.js and define our Action Creator for PASSWORD_CHANGED
* Next, we have to define this in the types.js file
* Add to types.js: `export const PASSWORD_CHANGED = 'password_changed';`
* Back to actions/index: `import { PASSWORD_CHANGED } from './types';`
* In AuthReducer we will import the PASSWORD_CHANGED `import { PASSWORD_CHANGED } from '../actions/types';`
* Add new case statement
```javascript
case PASSWORD_CHANGED:
  return { ...state, password: action.payload};
```
* Update INITIAL_STATE object to include password:''
* Update mapStateToProps function in LoginForm (both the function and connect export)
* In LoginForm form html value={this.props.password}

-------------------------------------------------

### 115. Synchronous and Asynchronous Action Creator

* Our application now has 2 pieces of state the email and password
* Next we have to Sign in the User
* We should add some more state properties for the sign in
* Proposed states: email, password, loading, error, user (Firebase model)
* See images
* On the login state (button press) we are going to have to wait for response
* During this time we can have a loading state.
* A new action creator pattern is necessary.
* We need an async action creator

-------------------------------------------------

### 116. Introduction to Redux Thunk

* We need an async action creator and action for login
* First we need an action creator that attempts to log the user in.
* In actions/index.js we're going to create a new Action Creator
* `import firebase from 'firebase';`
```javascript
export const loginUser = (email, password) => {
  return {
    firebase.auth().signInWithEmailAndPassword(email, password);
      .then(user => console.log(user))
  };
};
```
* REDUX THUNK: We are going to use a new library Redux Thunk to handle async action creators
* It's used to handle any type of async action creator
* `npm install --save redux-thunk`
* Default Action Creator rules: Action creators are functions, that return an action which must be an object with a "type" property.
* THUNK Action Creator rules (in addition to default): Action creators are functions, return a function and that function is called with "dispatch"
* Then we can manually dispatch to all the reducers.

-------------------------------------------------

### 117. Redux Thunk in Practice

* Wire up Thunk with Redux
* In App.js: `import ReduxThunk from 'redux-thunk';`
* Redux Thunk is middleware - to import the middleware we have to import a helper from redux called applyMiddleware
* `import { createStore, applyMiddleware } from 'redux';`
* Add Middleware and Refactor in App.js:
```javascript
render() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <LoginForm/>
    </Provider>
  );
}
```
* The second {} is for any initial state we want to pass to the middleware
* applyMiddleware(ReduxThunk) is a "store enhancer", adds additional functionality to store
* In actions/index.js:
```javascript
export const loginUser = (email, password) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
      .then(user => console.log(user))
  };
};
```

-------------------------------------------------

### 118. Redux Thunk in Practice continued

* In actions/index: We're going to dispatch a new action on login
```javascript
export const loginUser = ({email, password}) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
      .then(user => {
        dispatch({ type: 'LOGIN_USER_SUCCESS', payload: user})
      });
  };
};

```
* In AuthReducer add console.log(action)

```javascript
export default(state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type) {
```

* Now in Firebase web console we need to add a user to test - Authentication > Users https://console.firebase.google.com
* LoginForm.js - we need to wire this action creator up to the login form
* LoginForm add loginUser action creator- `import { emailChanged, passwordChanged, loginUser } from '../actions/';`
* Now, add to connect call
* Lastly add to the Button component tag
```javascript
<Button
  onPress={this.onButtonPress.bind(this)}
>Login</Button>
```
* Next, a helper function is added above the render:
```javascript
onButtonPress(){
  const { email, password } = this.props;
  this.props.loginUser({ email, password })
}
```

-------------------------------------------------

### TEST IN SIMULATOR - WORKING - BASIC LOGIN
* (note a few small errors in previous commits were modified)
* App is working for login to firebase
* check console log for output

-------------------------------------------------

### RECAP:
* By using Thunk we expanded the range of values we can use with an Action Creator
* The firebase.auth function use the dispatch method which allows us to manually send an action to all our reducers
* We can now use any async action we want
* We can fire off an async action and when complete dispatch another action (.then)

-------------------------------------------------

### 119. Making LoginUser More Robust

* In types: `export const LOGIN_USER_SUCCESS = 'login_user_success';`
* Import in action creator file add change down below from string to const LOGIN_USER_SUCCESS
* Now add case to reducer
```javascript
case LOGIN_USER_SUCCESS:
  return { ...state, user: action.payload };
```

* Add above in the file to initial state

```javascript
const INITIAL_STATE = {
  email: '',
  password: '',
  user:null
};
```
-------------------------------------------------

### 120. Creating User Accounts

* If login fails we need to try to creat an account also.
* In actions/index - If login fails we're goin to hit a catch case
* This is what we have so far, but it;s kind of a mess, we'll be cleaning it up

```javascript
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
      .catch(()=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
        });
      });
  };
};
```

* We need to make a helper function to refactor this
* Start with this:
```javascript
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
}
```

* Now delete the two original signin functions and replace with:

```javascript
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch,user))
      .catch(()=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch,user))
        .catch(() => loginUserFail(dispatch));
      });
  };
};
```

* Now we create another const called LoginUserFail

```javascript
const loginUserFail = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_FAIL });
}
```

* That's a new type we are going to set up - go to top of actions/index and import LOGIN_USER_FAIL
* Update types file `export const LOGIN_USER_FAIL = 'login_user_fail';`
* After we attempt to create a new user if still a fail - add catch case (see above code in this section code already added/updated)


-------------------------------------------------

### 121. Showing Error Messages

* remove the console.log from AuthReducer
* AuthReducer: import LOGIN_USER_SUCCESS and LOGIN_USER_FAIL
* Add in case LOGIN_USER_FAIL
* We can add in a generic piece of state called error for an error message
```javascript
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed' };
```
* Add default value of error:''
* Clear out the password `return { ...state, error: 'Authentication Failed', password:'' };`
* Lastly lets go to the LoginForm and show the Error Msg.
* In LoginForm:
```javascript
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error
  };
};
```
* Let's refactor an destrucure this:
```javascript
const mapStateToProps = ({auth}) => {
  const { email, password, error} = auth;
  return { email, password,error };
};
```

* In form under Password input add: `<Text style={styles.errorTextStyle}>{this.props.error}</Text>`
* We now have to style it, add a const styles

* WORKING IN SIMULATOR - note: Error msg still has to be cleared out after showing
* COMMIT

-------------------------------------------------

### 122. A Firebase Gotcha

* Back to AuthReducer - we need to clear out the error msg on login success
* AuthReducer: `return { ...state, user: action.payload, error:'' };`

* FIREBASE GOTCHA: Careful if you have an JAVASCRIPT error, it might just end up showing the "Authentication Failed" error
* We are going to add an error console.log so we can catch these errors
```javascript
.catch((error)=>{
  console.log(error);
  firebase.auth().createUserWithEmailAndPassword(email, password)
```

-------------------------------------------------

### 123. Showing a Spinner on Loading

* As soon as our loginUser Action Creator is called we need to dispatch an action that releases a Spinner.
* Then when we see a success or failure, that means the process is complete and we should resolve the spinner
* Types: Let's create a new type in the types file LOGIN_USER `export const LOGIN_USER = 'login_user';`
* (you could also call it LOGIN_USER_START)
* Back in actions/index - we're going to immediately dispatch an action of LoginUser
* `dispatch({ type: LOGIN_USER })`
* Also import in at the top of the file
* Don't use the name START_SPINNER - LOGIN_USER is more helpful for knowing when it;s going to fire off
* In AuthReducer: import LOGIN_USER
* Add on case LOGIN_USER
```javascript
case LOGIN_USER:
  return { ...state, loading: true, error:'' };
```
* Put error in there to clear out errors
* Now at top of file add to INITIAL_STATE
* Next we have to clear out loading, change to loading: false when success/error  `loading: false `
* Now, into LoginForm:
```javascript
const mapStateToProps = ({auth}) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};
```
* Now at the top of LoginForm we'll import our Spinner
`import { Card, CardSection, Input, Button, Spinner } from './common';`
* Next, inside render method, we'll pull out Button into a helper method that decides whtehr to show the Button or the Spinner
* New helper renderButton:
```javascript
renderButton(){  
  if (this.props.loading){
    return (
      <Spinner size="large"/>
    );
  } else {
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }
}
```

### Test in EMULATOR - WORKING


* Empty out email and password on login success in AuthReducer:
`return { ...state, user: action.payload, error:'', loading: false, email:'', password:'' };`

* Actually we can re-factor this by adding in anoter spread operator - INITIAL_STATE

### Test in EMULATOR - WORKING - COMMIT

-------------------------------------------------

### 124. Dealing with Navigation

* At this point our login is in a usable position, now we need to address Navigation
* NAVIGATION is a bit tricky on React Native
* We are going to use:

`npm install --save react-native-router-flux@3.35.0`

* This has the concept of the "scene" which is the distinct page the user navigates to.
* A scene is a component, that we import from that library
* We have 3 scenes: (1) Login, (2) employeeList, (3) employeeCreate
* Each scene has a "key" property describing what the scene shows
* One of the most challenging parts of this is just understanding what all the props are that can be passed
* Scene has 4 main properties: (1) "key" how we navigate around not list building, (2) "component", (3) "title" builtin header, (4) "initial" first screen to show

-------------------------------------------------

### 125. Navigation in the Router

```javascript
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="login" component={LoginForm} title="Please Log in"/>
    </Router>
  );
}

export default RouterComponent;
```

* Next in App component improt the Router `import Router from './Router';`
* Place inside Provider method, replace the LoginForm
* Remove LoginForm from import
* Check EMULATOR - WORKING - Almost working but there is a problem -- Please Login header is over  EMAIL field

-------------------------------------------------

### 126. Addressing Styling Issues

* We can make some global styling changes by passing a prop called "sceneStyle" to the Router tag
* In Router.js `<Router sceneStyle={{ paddingTop: 60 }} />`

-------------------------------------------------

### 127. Displaying Multiple Scenes

* Create new component: src\components\EmployeeList.js
* Complete boilerplate class based component
* In Router  `import EmployeeList from './components/EmployeeList';`
* We're creating a mutually exclusive scene
* Create another scene component: `<Scene key="employeeeLst" component={EmployeeList} title="List of Employees"/>`
* Check EMULATOR: still have login form up.
* We have to connect the scenes.
* However, first lets try the "initial" prop on the EmployeeList -- WORKING
* Flip EmployeeList to first Scene. It shows first. Change initial back to form
* Make Login screen first


-------------------------------------------------

### 128. Navigating Between Routes

* We need to navigate between scenes.
* After successful login when want to send user over to EmployeeList
* We can trigger this in our Action Creator file when LOGIN_USER_SUCCESS
* Open actions/index ad got to loginUserSuccess function
* `import { Actions } from 'react-native-router-flux';`
* In loginUserSuccess `Actions.employeeList();`
* EMULATOR - WORKING - moves to next screen
* Notice we get a back button for free.

-------------------------------------------------

### 129. Grouping Scenes with Buckets

* In some places it makes sense to have a Back button, in others it does not.
* We can nest Scene components
* First scene will be "auth"
* Second Scene will be "main"
* To move between main scnees you will have to change key to Scene
```javascript
<Scene key="auth">
  <Scene key="login" component={LoginForm} title="Please Log in" initial/>
</Scene>
<Scene key="main">
  <Scene key="employeeList" component={EmployeeList} title="List of Employees" />
</Scene>
```
* change `Actions.employeeList();` to `Actions.main();`

-------------------------------------------------

### 130. Navigation Bar Buttons

Docs for react native router flux
https://github.com/aksonov/react-native-router-flux

* The props in the docs such as for the navigation header can be added to the Scene tags
* Add "Add" link tot he right of the nav header
```javascript
<Scene
  onRight={() => console.log('right!!!')}
  rightTitle="Add"
  key="employeeList"
  component={EmployeeList}
  title="List of Employees"
/>
```
* EMULATOR WORKING! - "Add" link press with console.log

-------------------------------------------------

### 131. Navigating to the Employee Creation Form

* Create a new component EmployeeCreate
* Create a new scene in Router:
```javascript
<Scene
  component={EmployeeCreate}
  key="employeeCreate"
  title="Create Employee"
>
</Scene>
```
* In the employeeList Scene replace the console log (right!!!) with  `onRight={() => Actions.employeeCreate()}`
* Import Actions `import { Scene, Router, Actions } from 'react-native-router-flux';`
* EMULATOR - WORKING - COMMIT

-------------------------------------------------

### 132. Building the Employee Creation Form

* Now lets focus on the EmployeeCreate form
* in EmployeeCreate - replace the import of the Text. View with Card, CardSection, Input, Button
* Add Card, 3 CardSections and Button

-------------------------------------------------

### 133. Employee Form Actions - make new Action Creators and file

#### Pattern for new Actions

1. ACTION: Make Action Creator (actions/index or new file)
1. -- Export, Return a type:CONSTANT, payload:""
1. -- At the top of the file import the CONSTANT from types
1. TYPE: export CONSTANT = constant;
1. REDUCER: import CONSTANT from types
1. -- INITIAL_STATE
1. -- export, switch, default, return state
1. COMBINE REDUCERS: reducers/index - We will add the new reducer in the combined reducers file
1. NEW COMPONENT/FORM:
1. --- (a) Import new action from actions and
1. --- (b) connect from react-redux,
1. --- (c) connect and mapStateToProps at the bottom
1. --- (d) mapStateToProps constant
1. --- (e) on input tag value add this.prop.[values] to form/component
1. --- (f) if form on input tag make sure to add action creator `onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}`

-------------------------------------------------

* Make Action Creators to ahandle the input boxes.
* In action creator file (actions/index) our actions are all authentication related currently-- probably shouldn't mix in new ones.
* Let's make a new action creator file.
* Create new file: src\components\actions\EmployeeActions.js
```javascript
export const employeeUpdate = ({ prop,value }) => {
};
```

* The prop is going to be a key value like "name" and then there would be the new value of the name.
* So this one action creator can be used for different keys like "name","phone" etc.
* Inside we create our action

```javascript
export const employeeUpdate = ({ prop,value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};
```

* At the top import `import { EMPLOYEE_UPDATE } from './types';`
* Add to types `export const EMPLOYEE_UPDATE = 'employee_update';`
* Create new reducer: src\reducers\EmployeeFormReducer.js

```javascript
import { EMPLOYEE_UPDATE } from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) = > {
  switch (action.type) {
    default:
      return state;
  }
};

```

-------------------------------------------------

### 134. Handling Form Updates at the Reducer Level

*
* EmployeeFormReducer: Normal action.payload inside switch-case will look like `action.payload === { prop:'name', value: 'jane'}`
* We're going to do some ES6 though to handle all cases
* new ES6: `return { ...state, [action.payload.prop]: action.payload.value };`
* Spread operator for spread, the square brackets are NOT an ARRAY-- it is key interpolation-- ie. if action.payload.prop is "name" then that si the key being used.
* NEW FILE: AuthActions.js - COPY AND PASTE everything from the actions/index into this FILE!!!!
* Now our actions/index is empty - We are going to use it liek the commons/index file (to iclude a bunch of files)
* Inside actions/index.js
```javascript
export * from './AuthActions';
export * from './EmployeeActions';
```

-------------------------------------------------

### 135. Dynamic Property Updates

* In reducers/index - `import EmployeeFormReducer from './EmployeeFormReducer';`
* And to combine reducers `employeeForm: EmployeeFormReducer`
* In the EmployeeCreate form we have to import connect:
```javascript
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
```
* Add export below: `export default connect(mapStateToProps, { employeeUpdate })(EmployeeCreate);`
* Add mapStateToProps constant (see file)
* Add input tage value ie. `value={this.props.name}`
* Add Action Creator to input tag `onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}`


* EMULATOR - WORKING! - COMMIT


-------------------------------------------------

### 136. The Picker Component

* We're going to make a Picker component - Picker is like a React Native Select Input component
* `import { Picker, Text } from 'react-native';`
* We're going to put the new Picker Component in the unused CardSection we had
* In here we're going to have a list of shifts and we'll need a onst style alo
* `<Text style={styles.pickerTextStyle}>Shift</Text>`
* `<Picker.Item label="Monday" value="Monday" />`
* In Picker main tag ` selectedValue={this.props.shift}`
* Add Action Creator to input tag `onChangeText={value => this.props.employeeUpdate({ prop: 'shift', value })}`
* **IMPORTANT**: MUST HAVE STYLES, FLEX:1 OR PICKER WONT SHOW UP `<Picker style={{ flex: 1 }}` (note: later we will be removing)
```javascript
const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

```

#### EMULATOR - WORKING - COMMIT

-------------------------------------------------

### 137. Pickers and Style Overrides

Just a quick segment to get the styles ready

* `<CardSection style={{ flexDirection: 'column' }}>`
* We need to override th CardSection style
* OVERRIDE STYLE-- WRAP STYLE IN ARRAY: in the CardSection component file, we are going to wrap the style in an array
* CardSection.js - `<View style={[styles.containerStyle, props.style]}>`
* NOW, we have ot REMOVE the  `<Picker style={{ flex: 1 }}`
* WARNING: must remove the flex 1 or Picker will not show.
#### EMULATOR - WORKING - COMMIT



-------------------------------------------------

### 138. Firebase JSON Schema

* We're going to be saving using the Employee model, and object with name, phone and shift.
* In Firebase console, go to Database table-
* Think of the database as a data object like in Javascript.
* The schema we are using is commonly used with Firebase and can be reused on other projects
* We'll have a collection users, and then each user will have a collection of employees with name, phone and shift.
* We're going to need some SECURITY segmenting the Users


-------------------------------------------------

### 139. Data Security in Firebase

* In the Firebase Console click the Rules tab - this changes the security rules about what users can read or write
* Delete what is in the Rules object
* New Rules object in Firebase Console

```
{
  "rules": {
		"users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

* This tells firebase to set up read/write for a user only if the object $uid is equal to the currently logged in user
* If not equal they will not have read/write alert-success
* PUBLISH: Next we have to publish the ruleset by clicking the PUBLISH button
* PUBLISHED.

-------------------------------------------------

### 140. Creating Records with Firebase

* Now we need to take the data input in the app and save in Firebase
* On the Create button (to create an employee) we're going to make a handler that calls an Action Creator which sends to data to Firebase
* If successful it will move us back to Employee List History
* EmployeeCreate.js: Add helper function onButtonPress
```javascript
onButtonPress() {
  const { name, phone, shift } = this.props;

  this.props.employeeCreate({ name, phone, shift });
}
```
* Next, in Button tag `<Button onPress={this.onButtonPress.bind(this)}>`
* Open up EmployeeActions in actions folder
* Add the following:

```javascript
export const employeeCreate = ({ name, phone, shift }) => {
  console.log(name, phone, shift);
};
```

* Back to EmployeeCreate.js: `import { employeeUpdate, employeeCreate } from '../actions';`
* Finally add to connect helper: `export default connect(mapStateToProps, {employeeUpdate, employeeCreate})(EmployeeCreate);`
* Input data except for shift
* EMULATOR - NOT WORKING - error Actions Must Be Plain Objects - use custom middleware
* Reason: shift is undefined (we didn't set it)
* We have to fix this in the Picker

-------------------------------------------------

### 141. Default Form Values

* STATE: The state of our form is being held by the EmployeeFormReducer
* By default the EmployeeFormReducer does not have a starting or initial Values
* There are a couple ways to handle this, here is one:
* (1) Could just set shift to Monday in EmployeeFormReducer
* (2) However, another way to do it is to add a componentWillMount
* On mounting we can call the action creator
* (3) The way we are going to do it is when we call the employeeCreate action creator in the onButtonPress helper:
* `this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });`
* Next thing we'll do is send this out to Firebase

-------------------------------------------------

### 142. Successful Data Save to Firebase

* In employeeCreate Action Creator EmployeeActions
* Import Firebase library `import firebase from 'firebase';`
* change code for the employeeCreate action:
```javascript
export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
};
```
* `firebase.database().ref(`/users/${currentUser.uid}/employees`)` - sets up our data in our schema
* `${currentUser.uid}` is from line above `const { currentUser } = firebase.auth();`
* `.push({ name, phone, shift })` allows us to push the data into the database


#### EMULATOR - Red Screen but adds data to Firebase

-------------------------------------------------

### 143. Resetting Form Properties

* We're going to use Redux Thunk - we don't really have to use it but this is useful to update data in the background
* Update the action
```javascript
firebase.database().ref(`/users/${currentUser.uid}/employees`)
  .push({ name, phone, shift })
  .then(() => {
    Actions.employeeList();
  });
```
* `import { Actions } from 'react-native-router-flux';`

* NOTE: THERE WAS A PROBLEM MOVING TO Actions.employeeList(); SO I CHANGED TO:

`.then(() => Actions.main().employeeList(type: 'reset'));};`

#### EMULATOR WORKING - COMMIT

* Only problem is the input data has not ben cleared
* We can solve this by putting in an action

```javascript
export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.main().employeeList({ type: 'reset' });
      });
  };
};
```

* Add into types: `export const EMPLOYEE_CREATE = 'employee_create';`
* Now in reducers `case EMPLOYEE_CREATE: return INITIAL_STATE;`

#### EMULATOR WORKING - DATA CLEARED



-------------------------------------------------

144. Fetching Data from Firebase

* Now we will get the list of Employees from Firebase
* EmployeeList.js

1. We will make an action creator to fetch new employes.
1. Add a new reducer to store that list
1. Come back to the EmployeeList component to display it.


* In EmployeeActions:

```javascript
export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

```

* Import `EMPLOYEES_FETCH_SUCCESS`
* We created a ref in our original Firebase insert, we will use that to get data back out.
* `snapshot.val() ` is how we actually get the data out
* Snapshot is not the actual data is an object that describes the data, so to get actual data `snapshot.val()`
* The snapshot function will now be called anytme new data comes across. Firebase and Redux work together well
* Add in types.js `export const EMPLOYEES_FETCH_SUCCESS = 'employees_fetch_success';`


-------------------------------------------------
### 145. Storing Data by ID

* Call action creator and receive data in the reducer
* Import connect `import { connect } from 'react-redux';`
* Import employeesFetch `import { employeesFetch } from '../actions';`
* At bottom: `export default connect(null, {employeesFetch})(EmployeeList);`
* Add lifecycle method componentWillMount
```javascript
componentWillMount() {
  this.props.employeesFetch();
}
```
* Make new REDUCER EmployeeReducer.js:

```javascript
import {
  EMPLOYEES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      console.log(action);
      return action.payload;
    default:
      return state;
  }
};

```

* Add reducer to the combined reducer file index.js:

```javascript
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer
});
```

#### EMULATOR - for console.log show payload is a list of employee objects - COMMIT

* The employee list returned is an OBJECT and NOT and array, to help with the Redux requirement of always returning a reducer
* This syntax helps bcause if we want to to edit emplyees later we can do something like  `{ ...state, [id]: action.payload } `
* Put action.payload in place of console.log
```javascript
case EMPLOYEES_FETCH_SUCCESS:
// console.log(action);
  return action.payload;
default:
```

-------------------------------------------------
### 146. Dynamic DataSource Building

* We're going to be using a ListView primitive
* `import { ListView, View, Text } from 'react-native';`
* Now normally we would be making the ds - datasource
* However, problem is the fetch to get the data is async so wemight not have the data yet on componentWillMount
* So how to remedy? We'll do some refactoring in a new lifecylce method called: componentWillReceiveProps
* componentWillReceiveProps can be used if we expect to have our props updated
* nextProps will load the next props update
* We want to get our data source both (1) when mounting (2) and on updates.
* So let's keep both mounting but create a thrid data method called createDataSource
* createDataSource is called in both componentWillMount and componentWillReceiveProps


-------------------------------------------------
### 147. Transforming Objects to Arrays

* CONVERT to ARRAY: There is another problem... the employees are objects, not an array and this.dataSource needs an ARRAY..
* mapStateToProps: Also we have to do mapStateToProps
* First install lodash `npm install --save lodash`
* `import _ from 'lodash';`
* mapStateToProps:

```javascript
const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });

  return { employees };
};
```

* What this says is `state.employees` is an object with many key-value pairs.
* For each key-value pair run the fat arrow function.  Each pair will be called with the value (user model with name, state, shift) and key
* Return `...val,` all the employees of the object model and  `uid` user id
* This will look like this for each object in the array: `{ shift:'Monday', name:'Steve', phone:'555-5555', id:'ase42wrr324uduga87' }`
* Collect all those object and put in the "employees" array
* Last step of this code is to just return this array: `return { employees };`

* Last part of the Component is to add mapStateToProps in the Connect helper

`export default connect(mapStateToProps, {employeesFetch})(EmployeeList);`

* Add console.log to verify it actually works in render method `console.log(this.props)`

#### EMULATOR - WORKING - COMMIT







-------------------------------------------------

```javascript

```



























.
