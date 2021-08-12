import * as React from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { SafeAreaView, ScrollView, FlatList, useWindowDimensions, StyleSheet, Text, TouchableOpacity, Dimensions, View, Image, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {HOST_URL} from '../commonConfig'
import axios from 'axios';
class Plan extends React.Component {
  
  state = { categories: ''}

  initCategory() {
    console.log("initCategory")
    
    axios.get(HOST_URL + 'category')
      .then(res => {
        this.setState({categories: res.data})
      });
  }

  componentDidMount(){
    this.initCategory()
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
          data={this.state.categories}
          extraData={this.state}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.recipeCardStyle} onPress={() => 
                this.props.navigation.navigate('ReceipeScreen', {categoryId: item._id})}>
                  <View style={styles.imageView}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.image,
                      }}
                    />
                  </View>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              
          )}/>
        </SafeAreaView>
      </View>
    );
  }
}


const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    
  },
  // item: {
  //   padding: 12,
  //   borderColor: '#000',
  //   // backgroundColor: '#e2ffd4',
  //   borderBottomWidth: 1,
  //   borderRadius: 5,
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center'
  // },
  recipeCardStyle:
  {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    margin: 15,
    marginTop: 5,
    padding: 15,
    backgroundColor: "#fff",
    height: 150,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.25,
    elevation: 9,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    marginTop: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageView: {
    display: 'flex',
    width: 155,
    height: 116,
    resizeMode: 'cover',
    backgroundColor: '#FFF',
  },
  image: {
    flexGrow: 1,
    resizeMode: 'center',
  },
  productCount: {
    flexShrink:1,
    marginRight: 20,
  },
  rightIcon:{
    flexShrink:1,
    color: '#75c34d',
  }

});

export default Plan;