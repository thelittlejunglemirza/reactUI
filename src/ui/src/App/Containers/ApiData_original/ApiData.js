// External
import React, { Component } from 'react';
import { inject, Provider, observer } from "mobx-react";
// Components
import Loadbar from "../../Components/Loadbar/Loadbar"
import SideMenu from "../../Components/SideMenu/SideMenu"
import TopNav from "../../Components/TopNav/TopNav"
// stores
import ApiDataStore from '../../Stores/ApiDataStore'
// Local
import Overview from '../../Components/Overview/Overview'
import RiskAssessment from '../../Components/RiskAssessment/RiskAssessment'
import ReviewedTosList from '../../Components/ReviewedTosList/ReviewedTosList'
// Style
import './ApiData.css'

/*
* @ Des:
*     View of search results based on search url variable in the path
*     (ie: http://<someDomain>/search/<var url>).
*/
@inject('globalStore')
@observer
class ApiData extends Component {
  constructor(props) {
    super(props)
    this.store = ApiDataStore
    this.globalStore = this.props.globalStore

    // set the id based on url
    this.store.set_id(this.props.match.params.id)
    // get data for that id
    this.store.getIdData()
  }

  componentWillMount() {
    // enable clicking on side menu
    this.globalStore.set_SideMenuIsClickable(true);
    this.globalStore.set_current_tab('Overview')

    // define tabs shown
    this.globalStore.set_tabs([
      "Overview",
      'Risk Assessment'
    ]);

    // reset tos.
    this.globalStore.reset_breadcrumb_below("api")
  }


  render() {
    if(this.store.loading === true) {
      return(
          <div>
            <Loadbar/>
          </div>
      )
    } else {
      let content = <div>err</div>
      // set api breadcrumb
      this.globalStore.set_breadcrumb(this.store.data.api_name,"api")
      this.globalStore.set_idBreadcrumb(this.store.data._id,"api")

      // TODO: use this data to show in overview and risk Assesment components
      let apiData = this.store.data

      // TODO: Add overview and risk assesment views

      // ~@~@~@~@~ CONDITIONAL RENDERS FOR TABS ~@~@~@~@~ //
      // overview tab
      if (this.globalStore.current_tab === "Overview") {
        content =   <div className="ApiData-content-components-overview" >
                      <Overview/>
                    </div>
      }
      // overview tab
      if (this.globalStore.current_tab === "Risk Assessment") {
        content =   <div className="ApiData-content-components-riskAssesment">
                          <ReviewedTosList/>
                          <RiskAssessment/>
                    </div>
      }

      // ~@~@~@~@~ FINAL RETURN ~@~@~@~@~ //
      return(
        <div>
          <Provider globalStore={this.globalStore} localStore={this.store} className="ApiData-container">
            <div className='Api-Window'>
              <div className='ApiData-SideMenu-cont'>
                <SideMenu/>
              </div>
              <div className='Api-Data-and-TopNav'>
                <TopNav/>
                <div style={{maxHeight:this.globalStore.dim.height}} className="ApiData-components">
                  {content}
                </div>
              </div>
            </div>
          </Provider>
        </div>
      )
    }
  }

}


export default ApiData;
