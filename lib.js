import React from 'react-native'

const {
  ListView,
  View,
  Image,
  Text,
  ScrollView,
  PropTypes,
  StyleSheet
} = React

class Lib extends React.Component {

  static propTypes = {
    ...ListView.propTypes,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleSize: PropTypes.number,
    headerStartHeight: PropTypes.number,
    headerEndHeight: PropTypes.number,
    headerImages: PropTypes.oneOfType([PropTypes.string ,PropTypes.number]),
    titleMarginTop: PropTypes.number,
    showsVerticalScrollIndicator: PropTypes.bool
  };

  static defaultProps = {
    title: 'title',
    titleColor: 'white',
    titleSize: 18,
    headerStartHeight: 180,
    headerEndHeight: 64,
    titleMarginTop: 80,
    headerImages: 'http://ww2.sinaimg.cn/large/7a8aed7bjw1f0cw7swd9tj20hy0qogoo.jpg',
    renderScrollComponent: props => <ScrollView {...props} />,
    renderRow: this._renderRow,
    showsVerticalScrollIndicator: false
  };

  constructor(props) {
    super(props)
    
    this.state = {
      headerHeight: this.props.headerStartHeight,
      titleMarginTop: this.props.titleMarginTop,
      opacity: 1,
      leftFlex: 1,
    }
  }
  
  onScroll(event) {
    const MAX = this.props.headerStartHeight - this.props.headerEndHeight
    let y = event.nativeEvent.contentOffset.y // 获取当前纵向移动高度 //pixel
    let offsetY = y > MAX ? MAX : y // 设置y的最大跟踪高度为 起始高度－最终高度
    let headerHeight = this.props.headerStartHeight - offsetY
    let leftFlex = 1 - offsetY/MAX
    let titleMarginTop = this.props.titleMarginTop - offsetY * ((this.props.titleMarginTop - 24)/MAX)
    let opacity = offsetY / MAX

    this.setState({
      headerHeight,
      leftFlex,
      titleMarginTop,
      opacity: 1 - opacity,
    })
  }

  render () {
    const opacityStyle = {opacity: this.state.opacity}
    let imageSource = this.props.headerImages
    if (typeof this.props.headerImages == 'string') {
      imageSource = {uri: this.props.headerImages}
    }

    return (
      <View style={styles.container}>
        <ListView
          {...this.props}
          renderHeader={this._renderHeader.bind(this)}
          onScroll={this.onScroll.bind(this)}
          bounces={false}/>

        <View style={[styles.headerWrapper, {height: this.state.headerHeight}]}>
          <Image source={imageSource} style={{flex: 1}}/>
          <View style={[styles.titleWrapper, {top: this.state.titleMarginTop, height: this.props.headerEndHeight - 24}]}>
            <View style={{flex: this.state.leftFlex}}/>
            <Text style={[styles.title, {fontSize: this.props.titleSize, color: this.props.titleColor}]}>{this.props.title}</Text>
            <View style={{flex: 1}}/>
          </View>
          <View style={[styles.footerWrapper, {top: this.state.headerHeight-(this.props.headerEndHeight - 24), height: this.props.headerEndHeight - 24}]}>
            <Text style={{fontSize: 16, marginLeft: 15, opacity: this.state.opacity}}>以下是内容</Text>
          </View>
        </View>
        
      </View>
    )
  }

  _renderHeader(){
    return(<View style={{marginTop: this.props.headerStartHeight}}>
        {this.props.renderHeader ? this.props.renderHeader(): null}
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
})

Lib.DataSource = ListView.DataSource
export default Lib
