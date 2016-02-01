import React from 'react-native'

const {
  AppRegistry,
  ListView,
  View,
  Image,
  Text,
  PropTypes,
  StyleSheet
} = React

const COVER_URL = 'http://ww2.sinaimg.cn/large/7a8aed7bjw1f0cw7swd9tj20hy0qogoo.jpg'

class ImageListView extends React.ListView {

  static propTypes = {
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleSize: PropTypes.number,
    headerStartHeight: PropTypes.number,
    headerEndHeight: PropTypes.number,
    headerImage: PropTypes.string,
    titleMarginTop: PropTypes.number,
  };

  static defaultProps = {
    title: 'title',
    titleColor: 'white',
    titleSize: 18,
    headerStartHeight: 180,
    headerEndHeight: 64,
    titleMarginTop: 80,
    headerImage: 'http://ww2.sinaimg.cn/large/7a8aed7bjw1f0cw7swd9tj20hy0qogoo.jpg'
  };

  constructor(props) {
    super(props)
    
    this.state = {
      headerHeight: this.props.headerStartHeight,
      titleMarginTop: this.props.titleMarginTop,
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
    const MAX = this.props.headerStartHeight - this.props.headerEndHeight

    let y = event.nativeEvent.contentOffset.y // 获取当前纵向移动高度
    let offsetY = y > MAX ? MAX : y // 设置y的最大跟踪高度为 起始高度－最终高度
    let headerHeight = this.props.headerStartHeight - offsetY
    let marginRight = offsetY * 2.5
    let titleMarginTop = this.props.titleMarginTop - offsetY * ((this.props.titleMarginTop - 24)/MAX)
    let opacity = offsetY / MAX

    this.setState({
      headerHeight: headerHeight,
      marginRight: marginRight,
      titleMarginTop: titleMarginTop,
      opacity: 1 - opacity,
    })
  }

  render () {
    const opacityStyle = {opacity: this.state.opacity}
    const imageSource = {uri: this.props.headerImage}
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          bounces={false}
          renderHeader={this._renderHeader.bind(this)}
          renderRow={this._renderRow.bind(this)}
          onScroll={this.onScroll.bind(this)}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={10}/>

        <View style={[styles.headerWrapper, {height: this.state.headerHeight}]}>
          <Image source={imageSource} style={styles.headerImage}/>
          <View style={[styles.titleWrapper, {top: this.state.titleMarginTop, height: this.props.headerEndHeight - 24}]}>
            <Text style={{marginRight: this.state.marginRight, fontSize: this.props.titleSize, color: this.props.titleColor}}>听演讲</Text>
          </View>
          <View style={[styles.footerWrapper, {top: this.state.headerHeight-(this.props.headerEndHeight - 24), height: this.props.headerEndHeight - 24}]}>
            <Text style={[styles.indicator,{fontSize: 16, marginLeft: 18, opacity: this.state.opacity}]}>以下是内容</Text>
          </View>
        </View>
        
      </View>
    )
  }

  _renderRow(content, sectionId, index){
    return(<View style={{height: 45}}>
        <Text>{'\titem  '}{index}</Text>
      </View>)
  }

  _renderHeader(){
    return(<View style={{height: this.props.headerStartHeight}}/>)
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red'
  },
  footerWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red'
  },
  headerImage: {//OFFSET_Y是顶部内容的坐标，应该是View顶部，所以还要加上View的height才等于图片高度
    flex: 1
  },
})

AppRegistry.registerComponent("ImageListView", () => ImageListView);