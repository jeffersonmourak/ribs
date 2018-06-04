
import { default as React } from 'react';
import { default as Component } from './Component.jsx';
export default class Component extends React.Component {
  render() {
    return (
      <div  > {this.props.list.map((item) => (<input key={ item } />))} </div>
    );
  }
}