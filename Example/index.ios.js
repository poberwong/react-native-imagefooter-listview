import React from 'react'
import ImageHeaderScroller from './ListView'
import {
  AppRegistry,
  View,
  Text,
  StyleSheet
} from 'react-native'

class Example extends React.Component {
  render () {
    // headerImage support string and number
    return (
      <View style={styles.container}>
        <ImageHeaderScroller
          title='Gank.io'
          renderFooter={this._renderFooter}>
          {this._getData().map(this._renderRow)}
        </ImageHeaderScroller>
      </View>
    )
  }

  _getData () {
    let arr = []
    for (let i = 0; i < 100; i++) {
      arr.push(i)
    }
    return arr
  }

  _renderRow (item, index) {
    return (
      <View
        key={index}
        style={{height: 45}}>
        <Text>{'\titem  '}{index}</Text>
      </View>
    )
  }

  _renderFooter () {
    return (<Text style={{textAlign: 'center'}}>You can put any View you like here</Text>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('Example', () => Example)
