import React from 'react';

class Component extends React.Component {
  render() {
    return <div>
      {this.props.children}
    </div>
  }
}