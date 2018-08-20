// EXTERNAL
import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Table } from "react-bootstrap";
// LOCAL
import './Overview.css'

@inject("localStore")
@observer
class ComponentsTable extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.localStore;
  }

  render() {
    let storeName = this.store.$mobx.name;
    return(


          storeName.includes('ProjectDataStore') ?
          (
            <div className='overview-tosList'>
              <div className="componentHeader">API LIST</div>
              <Table responsive hover >
                <thead>
                  <tr>
                    <th><strong>Name</strong></th>
                    <th><strong>Status</strong></th>
                    <th><strong>Risk Level</strong></th>
                  </tr>
                </thead>
                <tbody>
                  {
                      this.store.data.api_list.map((d ) => {
                      // TODO: change d to d.url and d.id
                      return(
                        <tr className='pointerOnHover' onClick={(d) => this.props.getToSAssessmentPage(d, "project")}>
                          <td>{d}</td>
                          <td>TODO</td>
                          <td>{this.store.data.risk_level}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </div>
          ) :
          (
            <div className='overview-componentList'>
              <div className="componentHeader">TERMS OF SERVICES</div>
              <Table responsive hover >
                <thead>
                  <tr>
                    <th><strong>Url</strong></th>
                    <th><strong>Status</strong></th>
                    <th><strong>Risk Level</strong></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.store.data.tos.map((d) => {
                      // TODO: change d to d.url and d.id
                      return(
                        <tr className='pointerOnHover' onClick={() => this.props.getToSAssessmentPage(d, "api")}>
                          <td>{d}</td>
                          <td>TODO</td>
                          <td>{this.store.data.risk_level}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </div>
          )


    );
  }
}
export default ComponentsTable;
