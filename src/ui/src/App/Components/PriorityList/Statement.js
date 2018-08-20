// EXTERNAL
import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
// LOCAL
import TosDataStore from '../../Stores/TosDataStore';
import Comment from './Comment';
import Tag from './Tag';
import './PriorityList.css';

class Statement extends Component{
  constructor(props) {
    super(props);
    this.store = TosDataStore;
    this.state = {
      'statement': this.props.statement,
      'index': this.props.index,
    }
  }

  render() {
    var statement = this.state.statement;
    var index = this.state.index;
    var content = <div></div>;

    if(this.store.statementInView === index){
      content = <td style={{color:'red'}}>
                  {statement.text.substring(0, 100) + '...'}
                </td>
    }else {
      content = <Collapsible trigger={statement.text.substring(0, 80) + "..."} triggerWhenOpen="Show less">
                 {statement.text}
                </Collapsible>
    }

    return (
      <tr id={'PriorityList-'+index} key={index}>
        <td><Comment text={statement.comment}/></td>
        {content}
        <td>
          {statement.tag.map((t) =>
            <Tag text={t}/>
          )}
        </td>
      </tr>
    );
  }
}
export default Statement;
