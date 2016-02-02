import React from 'react-native'
import ListView from 'react-native-imagefooter-listview'
const {
  AppRegistry,
  View,
  Text,
  StyleSheet
} = React

class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this._getData())
    }
  }

  render () {
    // headerImage support string and number
    return (
      <View style={styles.container}>
        <ListView
          title='Gank.io'
          renderFooter={this._renderFooter}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}/>
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

  _renderRow (content, sectionId, index) {
    return (<View style={{height: 45}}>
        <Text>{'\titem  '}{index}</Text>
      </View>)
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
