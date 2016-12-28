import React, { PropTypes, Component } from 'react'
import {
  ScrollView,
  ListView,
  View,
  Image,
  Animated,
  Text,
  StyleSheet
} from 'react-native'

export default class extends Component {
  static propTypes = {
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleSize: PropTypes.number,
    maxHeaderHeight: PropTypes.number,
    minHeaderHeight: PropTypes.number,
    headerImages: Image.propTypes.source,
    titlePosition: PropTypes.number,
    renderFooter: PropTypes.func,
    ScrollComponent: PropTypes.oneOf([ScrollView, ListView])
  }

  static defaultProps = {
    title: 'title',
    titleColor: 'white',
    titleSize: 18,
    maxHeaderHeight: 180,
    minHeaderHeight: 64,
    titlePosition: 80,
    ScrollComponent: ScrollView,
    headerImages: {uri: 'http://ww2.sinaimg.cn/large/7a8aed7bjw1f0cw7swd9tj20hy0qogoo.jpg'}
  }

  constructor (props) {
    super(props)

    this.state = {
      titlePosition: props.titlePosition,
      scrollY: new Animated.Value(0)
    }
  }

  render () {
    const {
      titleSize,
      titleColor,
      headerImages,
      renderFooter,
      titlePosition,
      maxHeaderHeight,
      minHeaderHeight,
      ScrollComponent,
      ...rest
    } = this.props
    const scrollDistance = maxHeaderHeight - minHeaderHeight

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, scrollDistance],
      outputRange: [maxHeaderHeight, minHeaderHeight],
      extrapolate: 'clamp'
    })
    const titleY = this.state.scrollY.interpolate({
      inputRange: [0, scrollDistance],
      outputRange: [titlePosition, 24],
      extrapolate: 'clamp'
    })
    const leftFlex = this.state.scrollY.interpolate({
      inputRange: [0, scrollDistance],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    const header = (
      <Animated.Image
        source={headerImages}
        style={[styles.headerWrapper, {height: headerHeight}]}>
        <View style={{flex: 1}} />
        {renderFooter &&
          <Animated.View style={[styles.footerWrapper, {opacity: leftFlex}]}>
            {this.props.renderFooter()}
          </Animated.View>
        }
        <Animated.View style={[styles.titleWrapper, {top: titleY, height: minHeaderHeight - 24}]}>
          <Animated.View style={{flex: leftFlex}} />
          <Text style={[styles.title, {fontSize: titleSize, color: titleColor}]}>
            {this.props.title}
          </Text>
          <View style={{flex: 1}} />
        </Animated.View>
      </Animated.Image>
    )

    return (
      <View style={styles.container}>
        <ScrollComponent
          style={{paddingTop: maxHeaderHeight}}
          scrollEventThrottle={16}
          {...rest}
          onScroll={
            Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
            )
          }
        />
        {header}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  titleWrapper: {
    position: 'absolute',
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    marginHorizontal: 15
  },
  footerWrapper: {
    backgroundColor: 'transparent'
  }
})
