// External
import React, { Component } from 'react';
import { inject, Provider, observer } from "mobx-react";
import { Grid, Row, Col, Tabs,Tab} from 'react-bootstrap';
// Components
import Loadbar from "../../Components/Loadbar/Loadbar"
import SideMenu from "../../Components/SideMenu/SideMenu"
import TopNav from "../../Components/TopNav/TopNav"
// stores
import ApiDataStore from '../../Stores/ApiDataStore'
// Local
import Overview from '../../Components/Overview/Overview'
import ComponentsTable from '../../Components/Overview/ComponentsTable'
import RiskAssessment from '../../Components/RiskAssessment/RiskAssessment'
import ReviewedTosList from '../../Components/ReviewedTosList/ReviewedTosList'
import RequestHandler from '../../Services/RequestHandler';
// Style
import './ApiData.css'

/*
* @ Des:
*     View of search results based on search url variable in the path
*     (ie: http://<someDomain>/search/<var url>).
*/
@inject('globalStore')
@inject('routing')
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

    // routing
    const { push } = this.props.routing;
    this.push = push;

    this.state={
      key:1
    }
  }

  componentWillMount() {
    // enable clicking on side menu
    this.globalStore.set_SideMenuIsClickable(true);
    this.globalStore.set_current_tab('Overview')

    // define tabs shown
    this.globalStore.set_tabs([
    ]);

    // reset tos.
    this.globalStore.reset_breadcrumb_below("api")
  }

  getToSAssessmentPage(unique_id, level) {
    if (level === "api") {
      RequestHandler.getVersionsForUrl(unique_id)
      .then((resp) => {
        var id = resp.data.versions[0]._id;
        this.push('/tos/' + id);
      })
      .catch((err) => {
        alert('error from getToSAssessmentPage()' + err);
      });
    }else if (level === "project") {
      RequestHandler.getFilteredApis(unique_id)
      .then((resp) => {
        var id = resp.data[0]._id;
        this.push('/api/' + id);
      })
      .catch((err) => {
        alert('error from getToSAssessmentPage()' + err);
      });
    }
  }

  handleSelect(key) {
    this.setState({ key });
  }

  renderMain() {

      if(this.state.key === 1) {
        return(
          <span>
            <Row className="noMargin">
              <Col xs={1}  md={1} className="noPadding">{/* Spacing */}</Col>
              <Col xs={10} md={10} className="noPadding-withMargin"><Overview/></Col>
              <Col xs={1} md={1} className="noPadding">{/* Spacing */}</Col>
            </Row>
            <Row className="noMargin grey-row">
              <Col xs={1}  md={1} className="noPadding">{/* Spacing */}</Col>
              <Col xs={10} md={10} className="noPadding"><ComponentsTable localStore={this.store} getToSAssessmentPage={this.getToSAssessmentPage.bind(this)}/></Col>
              <Col xs={1} md={1} className="noPadding">{/* Spacing */}</Col>
            </Row>
          </span>
        )
      }
      else{
        return(
          <Row className="noMargin">
            <Col xs={6}  md={8} className="noPadding"><ReviewedTosList/></Col>
            <Col xs={6} md={4} className="noPadding"><RiskAssessment/></Col>
          </Row>
        )
      }
  }


  render() {
      if(this.store.loading === true) {
        return(
            <div>
              Loading...
            </div>
        )
      }
      else {
        // set api breadcrumb
        this.globalStore.set_breadcrumb(this.store.data.api_name,"api")
        this.globalStore.set_idBreadcrumb(this.store.data._id,"api")


        // ~@~@~@~@~ FINAL RETURN ~@~@~@~@~ //
        return(
              <Grid fluid className="noPadding">
                <Provider globalStore={this.globalStore} localStore={this.store}>
                  <Row className="show-grid">
                    <Col xs={12} md={12} className="noMargin">
                      <Row className="noMargin" style={{backgroundColor: "var(--blue)",height:"100%"}}>
                        <Col xs={3} md={2} className="noPadding">
                          <p >&nbsp;</p>
                        </Col>
                        <Col xs={9} md={10} className="noPadding" >

                          <Tabs
                              className="topTab"
                              activeKey={this.state.key}
                              onSelect={(key) => this.handleSelect(key)}
                            >
                              <Tab eventKey={1} title="Summary"></Tab>
                              {/* <Tab eventKey={2} title="Priority Marker Tool"></Tab> */}
                              <Tab eventKey={3} title="Risk Assessment Tool"></Tab>
                            </Tabs>

                        </Col>
                      </Row>
                      <Row className="noMargin">
                        <Col xs={3} md={2} className="noPadding">
                          <SideMenu/>
                        </Col>
                        <Col xs={9} md={10} className="noPadding">

                          {this.renderMain()}

                        </Col>
                      </Row>

                    </Col>
                  </Row>
                </Provider>
              </Grid>
            )

      }

    }
  }


export default ApiData;
