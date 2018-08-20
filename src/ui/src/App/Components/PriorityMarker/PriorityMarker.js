// Refactored by Nader
// EXTERNAL
import React, { Component } from 'react';
import { observer, inject, Provider } from 'mobx-react'
// LOCAL
import PriorityList from '../PriorityList/PriorityList'
import PriorityTools from '../PriorityTools/PriorityTools'

import './PriorityMarker.css'


@inject('localStore')
@inject('globalStore')
@observer
class PriorityMarker extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.localStore;
    this.globalStore = this.props.globalStore;
  }

  render() {
    return (
      <div className='toolContainer' style={{maxHeight:this.globalStore.dim.height - 85}}>
        <PriorityTools/>
        <div className='priorityListContainer2'>
          <h2>Priority Statements:</h2>
          <div className='listContainer'>
            <PriorityList parent='PM' localStore={this.store}/>
          </div>
        </div>
      </div>
    );
  }
}

export default PriorityMarker;
