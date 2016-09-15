import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicatorIOS,
  StyleSheet
} from 'react-native';

import Article from './Article.js';
import api from './Api.js';

class Main extends Component {

  setToken(token) {
    this.setState({"token": token})
    AsyncStorage.setItem('@ReckoStore:token', token);
  }
  constructor(props) {
    super(props);
    this.state  = {"token": null}
  }
  async componentWillMount(){
    var self = this
    const token = await AsyncStorage.getItem("@ReckoStore:token")

    if (!token){
        api.authenticate().then((res) => self.setToken(res.token))
    }
    else {
        self.setToken(token)
    }
  }
  render(){

      if (this.state.token){
      return (<Article token={this.state.token}>
             </Article>
           )
         }
     return (<Text>Loading!</Text>)
   }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
})

export default Main;
