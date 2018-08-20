// EXTERNAL
import React, {Component} from 'react';
import Tooltip from '@material-ui/core/Tooltip';

class Comment extends Component{
  constructor(props){
    super(props);
    this.state = {
      'text': this.props.text
    }
  }
  render() {
    if (this.state.text !=='' && this.state.text !== null && this.state.text !== undefined){
      return(
        <Tooltip title={this.state.text}>
          <div>
            <img id='commentImg' src={require('../../../img/commenticon.png')}/>
          </div>
        </Tooltip>
      );
    } else {
      return <div className='emptyComment'></div>;
    }
  }
}
export default Comment;
