// EXTERNAL
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'
// LOCAL
import Statement from './Statement'
import './PriorityList.css';

@inject('localStore')
@observer
class PriorityTable extends Component{
  constructor(props) {
    super(props);
    this.store = this.props.localStore;
    this.state = {
      'parent': this.props.parent,
      'maxHeight': this.props.height,
    }
  }

  render() {
    var height;
    if(this.state.parent === 'RA'){
      height = this.state.maxHeight * (4 / 5) - 37;
    }else{
      height = this.state.maxHeight * (3 / 5) - 97 ;
    }

    return(
      <div className='priorityListContainer' style={{height: height}}>
        <div className='overflowList'>
          <table>
            <tbody>
              <tr>
                <th> </th>
                <th>Statement</th>
                <th>Tags</th>
              </tr>
              {
                this.store.statements.map((statement, index) =>
                  <Statement
                    statement={statement}
                    index={index}
                  />
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default PriorityTable;
