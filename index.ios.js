import React from 'react-native'
import ListView from './lib'
const {
  AppRegistry,
  View,
  Image,
  Text,
  PropTypes,
  StyleSheet
} = React

class ImageListView extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this._getData())
    }
  }

  render () {
    let imageSource = {uri: 'http://ww2.sinaimg.cn/large/7a8aed7bjw1f0cw7swd9tj20hy0qogoo.jpg'}
    return (
      <View style={styles.container}>
        <ListView
          headerImage={imageSource}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}/>
      </View>
    )
  }

  _getData(){
    let arr = []
    for(let i = 0; i < 100; i++){
      arr.push(i*1000)
    }
    return arr
  }

  _renderRow(content, sectionId, index){
    return(<View style={{height: 45}}>
        <Text>{'\titem  '}{index}</Text>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  titleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    marginLeft: 15,
    marginRight: 15
  },
  footerWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  headerImage: {//OFFSET_Y是顶部内容的坐标，应该是View顶部，所以还要加上View的height才等于图片高度
    flex: 1
  },
})

AppRegistry.registerComponent("ImageListView", () => ImageListView);
