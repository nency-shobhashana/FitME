import * as React from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { SafeAreaView, ScrollView, FlatList, useWindowDimensions, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button } from 'react-native';
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
              <TouchableOpacity style={styles.item} onPress={() => 
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
                {/* <Text style={styles.productCount}>{item.count}</Text> */}
                <AntDesign style={styles.rightIcon} name="caretright" size={24} color="black" />
              </TouchableOpacity>
          )}/>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    
  },
  item: {
    padding: 12,
    borderColor: '#000',
    // backgroundColor: '#e2ffd4',
    borderBottomWidth: 1,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    marginLeft: 10,
    marginTop: 3,
    flexGrow: 2,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageView: {
    display: 'flex',
    width: 80, 
    height: 80,
    padding: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'tomato',
    backgroundColor: '#FFF',
  },
  image: {
    flexGrow: 1,
    resizeMode: 'center'
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