// Refactored by Nader
// EXTERNAL
import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx';
// LOCAL
import PriorityTable from './PriorityTable'
// STYLE-CSS
import './PriorityList.css'



@inject('localStore')
@inject('globalStore')
@observer
/**
 * this component renders a table of priority statements with respective comments and tags
 * @extends Component
 */
class PriorityList extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.localStore;
    this.globalStore = this.props.globalStore;
    this.state = {
      'parent': this.props.parent,
    }
  }

  render() {
    var heightFromParent = this.globalStore.dim.height;

    return(
      <div>
        {/* this component is being called from two parents
          if its from RiskAssesment we want header
          else we dont want header */}
        {this.state.parent === 'RA' &&
          <div className="riskAssessment-table-header">
            <h4>List of Priority Statements</h4>
          </div>
        }
        <PriorityTable
          localStore={this.store}
          statementInView={this.store.statementInView}
          height={heightFromParent}
          parent={this.state.parent}
        />
        </div>
    );
  }
}
export default PriorityList
