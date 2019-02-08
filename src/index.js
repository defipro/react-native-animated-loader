import React from 'react';
import { StyleSheet, View, Modal, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import LottieAnimation from 'lottie-react-native';

export default class AnimatedLoader extends React.PureComponent {
  static defaultProps = {
    visible: false,
    overlayColor: 'rgba(0, 0, 0, 0.25)',
    source: require('loading.json'),
    animationType: 'none',
    animationStyle: {},
  };

  static propTypes = {
    animation: PropTypes.object,
    visible: PropTypes.bool,
    overlayColor: PropTypes.string,
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
    source: PropTypes.object,
    animationStyle: ViewPropTypes.style,
  };

  animation = React.createRef();

  componentDidMount() {
    if (this.animation.current) {
      this.animation.current.play();
    }
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (visible !== prevProps.visible) {
      if (this.animation.current) {
        this.animation.current.play();
      }
    }
  }

  _renderLottie = () => {
    const { source, animationStyle } = this.props;
    return (
      <LottieAnimation
        {...this.props}
        ref={this.animation}
        source={source}
        loop
        style={[styles.animationStyle, animationStyle]}
      />
    );
  };

  render() {
    const { visible, overlayColor, animationType } = this.props;

    return (
      <Modal
        transparent
        visible={visible}
        animationType={animationType}
        supportedOrientations={['portrait']}
      >
        <View style={[styles.container, { backgroundColor: overlayColor }]}>
          <View>{this._renderLottie()}</View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationStyle: {
    height: '100%',
    width: '100%',
  },
});
