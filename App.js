import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { f, auth, database } from './config/config.js';

export default class App extends React.Component {

  constructor(props)
  {
    super(props);
    //this.registerUser('testemailaddress@gmail.com', 'fakepassword');


    f.auth().onAuthStateChanged(function(user) {
        if(user){
          //Logged in
          console.log('Logged in', user);
        }else{
          //Logged out
          console.log('Logged out');
        }
    });
  }

  async loginWithFacebook (){
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '1974066366234894',
      { permissions: ['email', 'public_profile'] }
    );

    if(type === 'success'){
      const credentials = f.auth.FacebookAuthProvider.credential(token);
      f.auth().signInWithCredential(credentials).catch((error) => {
        console.log('Error...', error);
      })
    }
  }

  registerUser = (email, password) => {

      console.log(email, password);
      auth.createUserWithEmailAndPassword(email, password)
      .then((userObj) => console.log(email, password, userObj))
      .catch((error) => console.log('error logging in', error));
  }

  /*auth.signOut()
  .then(() => {
    console.log('Logged out...');
  }).catch((error) => {
    console.log('Error:', error);
  });*/

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>This is the start of something big!</Text>
        <TouchableHighlight
        onPress={() => this.loginWithFacebook()}
        style={{backgroundColor: 'green'}}>
        <Text style={{color: 'white'}}>Login With Facebook</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
