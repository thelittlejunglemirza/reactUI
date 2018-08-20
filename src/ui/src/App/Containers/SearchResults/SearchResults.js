// External
import React, { Component } from 'react';
import { inject, Provider, observer } from "mobx-react";
// Components
import Loadbar from "../../Components/Loadbar/Loadbar"
import ResultTable from "../../Components/ResultTable/ResultTable"
import SideMenu from "../../Components/SideMenu/SideMenu"

// stores
import SearchResultsStore from '../../Stores/SearchResultsStore'
// Style
import './SearchResults.css'

/*
* @ Des:
*     View of search results based on search url variable in the path
*     (ie: http://<someDomain>/search/<var url>).
*/

@inject('globalStore')
@observer
class SearchResults extends Component {
  constructor(props) {
    super(props)

    // grab searched url from path, and map to store
    this.store = SearchResultsStore;
    this.globalStore = this.props.globalStore;


    //  set the search result submited
    this.store.set_submitSearch(this.props.match.params.value)
    // fetch all the urls in db then filter based on query
    this.store.get_filtered_data()


    // disable clicking on side menu
    this.globalStore.set_SideMenuIsClickable(false);
  }

  // @Des: update submited url everytime there are new props passed down
  shouldComponentUpdate(newProps) {
    this.store.set_submitSearch(newProps.match.params.value)
    return(true)
  }

  render() {
    // Loading view
    if(this.store.loading === true) {
      return(
          <div className="SearchResults">
            <Loadbar/>
          </div>
      )
    }
    // table view
    else {
      let checked = [false, false, true]

      if(this.store.filter === "project"){
        checked = [true, false, false]
      }
      if(this.store.filter === "api"){
        checked = [false,true,false]
      }
      if(this.store.filter === "tos"){
        checked = [false,false,true]
      }
      //  define tabs for side menue
      this.globalStore.set_tabs([
        <div style={{textAlign:'left', margin:10}}>
          <h4 style={{borderBottom:'solid', borderWidth:'thin'}}>Filter</h4>
          <form >
            <input onClick={(e) => this.store.set_filter(e)} type="radio" name="sideMenue" value="project" checked={checked[0]}/>Projects
            <br/>
            <input onClick={(e) => this.store.set_filter(e)} type="radio" name="sideMenue" value="api" checked={checked[1]}/>APIs
            <br/>
            <input onClick={(e) => this.store.set_filter(e)} type="radio" name="sideMenue" value="tos" checked={checked[2]}/>ToS
          </form>
        </div>
      ])
      return (
        <Provider localStore={SearchResultsStore}>
          <div className="SearchResults">
            <div className='App-SideMenu-cont'><SideMenu/></div>
            <div className="ResultTable-cont">
              <ResultTable/>
            </div>
          </div>
          </Provider>
      );
    }
  }
}

export default SearchResults;
