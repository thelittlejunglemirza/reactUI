// Refactored by Nader
// External Imprts
import { observer, inject } from "mobx-react";
import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
// Local
import RequestHandler from '../../Services/RequestHandler'
import OverViewTableContents from './OverviewTableContents'
import ComponentsTable from './ComponentsTable'
import './Overview.css'

/* #~#~#~#~# MOBX DECORATIONS #~#~#~#~#*/
@inject('localStore') // inject access to local store
@inject('globalStore') // inject access to global store
@observer //  class watches every update to stores

/* #~#~#~#~# REACT COMPONENT CLASS #~#~#~#~# */
class Overview extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.localStore;
    this.globalStore = this.props.globalStore;
  }

  render() {
    let storeName = this.store.$mobx.name;
    return(
      <div>
        {/* <div className="overview-table-header">
          <div className="overview"><strong>Overview</strong></div>
          <div className="ra"><strong>Risk Assessment</strong></div>
          <button onClick={()=>this.globalStore.pdf_export(this.store.data)}>export</button>
        </div> */}
        <OverViewTableContents store={this.store} storeName={storeName}/>
        {/* {
          !storeName.includes('TosDataStore') ?
          (
            <ComponentsTable localStore={this.store} getToSAssessmentPage={this.getToSAssessmentPage.bind(this)}/>
          ) : null
        } */}
      </div>
    );
  }
}
export default Overview;
