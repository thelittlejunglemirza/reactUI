// External
import React, { Component } from 'react';
import { inject, Provider, observer } from "mobx-react";
// Components
import Loadbar from "../../Components/Loadbar/Loadbar"
import SideMenu from "../../Components/SideMenu/SideMenu"
// stores
import ProjectDataStore from '../../Stores/ProjectDataStore'
// Local
import Overview from '../../Components/Overview/Overview'
import RiskAssessment from '../../Components/RiskAssessment/RiskAssessment'
import ReviewedTosList from '../../Components/ReviewedTosList/ReviewedTosList'
import TopNav from "../../Components/TopNav/TopNav"
// Style
import './ProjectData.css'

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
    this.store = ProjectDataStore
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
      'Overview',
      // 'Risk Assessment'
    ])
    // reset api and tos.
    this.globalStore.reset_breadcrumb_below("project")
  }


  render() {

    if(this.store.loading === true) {
      return(
          <div>
            <Loadbar/>
          </div>
      )
    }
    else{
      let content = <div>err</div>
      let apiData = this.store.data

      // set project breadcrumb
      this.globalStore.set_breadcrumb(this.store.data.project_name,"project")
      this.globalStore.set_idBreadcrumb(this.store.data._id,"project")

      // ~@~@~@~@~ CONDITIONAL RENDERS FOR TABS ~@~@~@~@~ //
      // overview tab
      if (this.globalStore.current_tab === "Overview") {
        content =   <div className="ProjectData-content-components-overview" >
                      <Overview/>
                    </div>
      }


      // ~@~@~@~@~ FINAL RETURN ~@~@~@~@~ //
      return(
        <div>
          <Provider globalStore={this.globalStore} localStore={this.store} className="ProjectData-container">
            <div className='Project-Window'>
              <div className="ProjectData-SideMenu-cont">
                <SideMenu/>
              </div>
              <div className='Project-Data-and-TopNav'>
                <TopNav/>
                <div style={{maxHeight:this.globalStore.dim.height}} className="ProjectData-components">
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
