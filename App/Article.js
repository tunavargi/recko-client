import React, {Component} from 'react';
import {
  View,
  Text,
  WebView,
  ActivityIndicatorIOS,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';

import api from './Api.js';


class Article extends Component {
  constructor(props){
    super(props)
    this.token = props.token
    if (!props.article){
      this.state = {article: {}, loaded: false}
    }
  }

  setArticle(article) {
    this.setState({article: {content: article.content,
                             url: article.url,
                             id: article.id,
                             title: article.title},
                   loaded: true})
  }
  componentDidMount(){
    if (Object.keys(this.state.article).length === 0) {
      api.getNext(this.token).then((res) => this.setArticle(res.article))
    }

  }

  getNext(){
    api.getNext(this.token).then((res) => this.setArticle(res.article))
  }
  getLike(){
    api.likeUrl(this.state.article.id, this.token);
    api.getNext(this.token).then((res) => this.setArticle(res.article))


  }
  render() {
    if (!this.state.loaded){
        return (<View/>)
    }
    return (
       <View style={styles.mainContainer}>
         <Text style={styles.titleText}>
         {this.state.article.title}
         </Text>
         <Text style={styles.urlText}>
         {this.state.article.url}
         </Text>
         <WebView
           style={styles.webView}
           source={{html: this.state.article.content}}>
         </WebView>
         <TouchableHighlight style={styles.nope} onPress={this.getNext.bind(this)}>
         <Text style={styles.nopeText}>Next!</Text>
        </TouchableHighlight>

         <TouchableHighlight style={styles.yup} onPress={this.getLike.bind(this)}>
         <Text style={styles.yupText}>Like!</Text>
        </TouchableHighlight>
         </View>

     )
  }
}

const styles = StyleSheet.create({
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 0,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'red',
  },
  titleText: {
  marginTop: 65,
  marginBottom: 10,
  fontSize: 18,
  color: "black",
  fontWeight: 'bold',
  },
  urlText: {
  fontSize: 14,
  color: "red",
  fontWeight: 'bold',
  marginBottom: 15,
  },
  mainContainer: {
    margin: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  webView: {
    height: 480,
    bottom: 50,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'white',
  },


})

export default Article;
