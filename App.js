import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { f, auth, database } from './config/config.js';

export default class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      loggedin: false
    };
    //this.registerUser('testemailaddress@gmail.com', 'fakepassword');

    var that = this;
    f.auth().onAuthStateChanged(function(user) {
        if(user){
          //Logged in
          that.setState({
            loggedin: true
          });
          console.log('Logged in', user);
        }else{
          //Logged out
          that.setState({
            loggedin: false
          });
          console.log('Logged out');
        }
    });
  }

  logInUser = async(email, pass) => {

    if(email != '' && pass != ''){
      //
      try{
        let user = await auth.signInWithEmailAndPassword(email, pass);
        console.log(user);
      } catch(error){
          console.log(error);
      }
    }else{
      //if they are empty
      alert('Missing email or password');
    }

  }

  async loginWithFacebook (){
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '1974066366234894',
      { permissions: ['email', 'public_profile'] }
    );

    if(type === 'success'){
      const credentials = f.auth.FacebookAuthProvider.credential(token);
      f.auth().signInAndRetrieveDataWithCredential(credentials).catch((error) => {
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


  signUserOut= () => {
    auth.signOut()
    .then(() => {
      console.log('Logged out...');
    }).catch((error) => {
      console.log('Error:', error);
    });
  }



  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>This is the start of something big!</Text>
        { this.state.loggedin == true ? (
          <View>
            <TouchableHighlight
              onPress={ () => this.signUserOut() }
              style={{backgroundColor: 'red'}}>
                <Text>Log Out</Text>
              </TouchableHighlight>
            <Text>Logged in...</Text>
          </View>
        ) : (
          <View>

            { this.state.emailloginView == true ? (

              <View>
                <Text>Email:</Text>
                <TextInput
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                />

                <Text>Password:</Text>
                <TextInput
                  onChangeText={(text) => this.setState({pass: text})}
                  secureTextEntry={true}
                  value={this.state.pass}
                />

                <TouchableHighlight
                  onPress={ () => this.logInUser(this.state.email, this.state.pass) }
                  style={{backgroundColor: 'red'}}>
                    <Text>Login</Text>
                  </TouchableHighlight>

              </View>

            ) : (
              <View></View>
            )}

            <TouchableHighlight
            onPress={() => this.setState({emailloginView: true})}
            style={{backgroundColor: 'green'}}>
            <Text style={{color: 'white'}}>Login With Email</Text>
            </TouchableHighlight>

            <TouchableHighlight
            onPress={() => this.loginWithFacebook()}
            style={{backgroundColor: 'green'}}>
            <Text style={{color: 'white'}}>Login With Facebook</Text>
            </TouchableHighlight>
        </View>

      )}
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
