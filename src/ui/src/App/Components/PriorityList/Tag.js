// EXTERNAL
import React, {Component} from 'react';

class Tag extends Component{
  render(props) {
    return(
      <span key={this.props.text} className='label'>{this.props.text}</span>
    );
  }
}
export default Tag;
