import React from 'react-native'
const {
  AppRegistry,
  ListView,
  View,
  Image,
  Text,
  StyleSheet
} = React

const COVER_URL = 'http://ww2.sinaimg.cn/large/7a8aed7bjw1f0cw7swd9tj20hy0qogoo.jpg'
const OFFSET_TEXT_Y = 90
const OFFSET_Y = 190

class ImageListView extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      marginTop: OFFSET_Y,
      textMarginTop: OFFSET_TEXT_Y,
      offsetTextY: OFFSET_TEXT_Y,
      opacity: 1,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this._getData())
    }
  }

  _getData(){
    let arr = []
    for(let i = 0; i < 100; i++){
      arr.push(i)
    }
    return arr
  }
  
  onScroll(event) {
    const MAX = OFFSET_Y - 24

    let y = event.nativeEvent.contentOffset.y // 获取当前纵向移动高度
    let offsetY = y > MAX ? MAX : y // 设置y的最大跟踪高度为 190 － 24
    let marginTop = OFFSET_Y - offsetY
    let marginRight = offsetY * 1.9
    let textMarginTop = OFFSET_TEXT_Y - offsetY * ((OFFSET_TEXT_Y - 24)/MAX)
    let opacity = offsetY / MAX
    this.setState({
      marginTop: marginTop,
      marginRight: marginRight,
      textMarginTop: textMarginTop,
      opacity: 1 - opacity,
    })
  }

  render () {
    const opacityStyle = {opacity: this.state.opacity}
    const imageSource = {uri: COVER_URL}
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          bounces={false}
          renderHeader={this._renderHeader}
          renderRow={this._renderRow.bind(this)}
          onScroll={this.onScroll.bind(this)}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={5}/>

        <View style={[styles.headerWrapper, {height: this.state.marginTop + 55}]}>
          <Image source={imageSource} style={styles.headerImage}/>
          <View style={[styles.indicatorWrapper, {top: this.state.textMarginTop}]}>
            <Text style={[styles.indicator, {marginRight: this.state.marginRight}]}>听演讲</Text>
          </View>
          <View style={[styles.topWrapper, {top: this.state.marginTop}]}>
            <Text style={[styles.indicator,{fontSize: 16, marginLeft: 18, opacity: this.state.opacity}]}>以下是内容</Text>
          </View>
        </View>
        
      </View>
    )
  }

  _renderRow(content, sectionId, index){
    return(<View style={{height: 45}}>
        <Text>{'\t\titem  '}{index}</Text>
      </View>)
  }

  _renderHeader(){
    return(<View style={{height: OFFSET_Y + 55}}/>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerWrapper: {
    height: OFFSET_Y+55,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  indicatorWrapper: {
    height: 55,
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  indicator: {
    fontSize: 20,
    color: 'white',
  },
  topWrapper: {
    height: 55,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  headerImage: {//OFFSET_Y是顶部内容的坐标，应该是View顶部，所以还要加上View的height才等于图片高度
    flex: 1
  },
  text: {
    fontSize: 16,
    lineHeight: 24
  }
})

AppRegistry.registerComponent("ImageListView", () => ImageListView);