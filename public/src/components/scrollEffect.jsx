import React, { Component } from 'react';

const WithScrollingEffect = WrappedComponent => {
  class WithScrollingEffectComponent extends Component {
    constructor(props) {
      super(props);
      this.handleScroll = this.handleScroll.bind(this);
      this.state = { scrollY: 0 };
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
      this.setState({ scrollY: window.scrollY });
    }

    render() {
      return <WrappedComponent scrollY={this.state.scrollY} {...this.props} />;
    }
  }
  return WithScrollingEffectComponent;
};

export default WithScrollingEffect;