// External
import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// it uses material-ui but it doesn't use /core
import Pagination from 'material-ui-pagination';
import "./ResultTable.css"
/*
* @ Des:
*     Component which renders the filtered urls, returned by searchedUrls function from
*     localStore, in a table.
*/

@inject("localStore")
@inject('globalStore')
@inject('routing')
@observer
class ResultTable extends Component {

  constructor(props)
  {
    super(props);

    this.store = this.props.localStore;
    this.globalStore = this.props.globalStore;

    this.state=({
      pageLen: 2,
      onPage:1
    })

    // routing
    const { push } = this.props.routing;
    this.push = push;

  }

  // @Post: renders table using the serachedUrls in store
  renderUrlList() {

    let list = this.store.filteredUrls
    let list_length = list.length

    //-----> configure pages state
    //Find how many pages to render, 20 urls per page
    let remainder = list_length % 20;
    let numPages = ~~(list_length/20) //int value (no decimals)

    //if there is a remainder add an extra page
    if(remainder !== 0)
    {
       // eslint-disable-next-line
      this.state.pageLen = numPages + 1
    }
    else //no remainder
    {
       // eslint-disable-next-line
      this.state.pageLen = numPages
    }

    //-----> calculate start and end index of desired list (shows only 20)
    let end = this.state.onPage*20
    let start = (this.state.onPage*20)-20
    let filtered_list = list.slice(start,end);

    //-----> render the table
    if(list_length < 1) {
      return(<p><br/><br/>Opps, looks like this url does not exist!</p>)
    }
    else {
      if(this.store.filter==="tos"){
        // Start breadcrumb

        const tableData = filtered_list.map((s) =>
          <tr onClick = {() => {this.push('/tos/'+s['versions'][0]['_id']); this.globalStore.reset_breadcrumb()}} key={s['_id']}>
            <td>{s['date_created']}</td>
            <td>
              {s['url']}
            </td>
          </tr>
        );
        return(
          <table>
            <tbody>
              <tr className='table-header'>
                <th>Date Created</th>
                <th>URL</th>
              </tr>
              {tableData}
            </tbody>
          </table>
        )
      }
      else if(this.store.filter==="api"){
        const tableData = filtered_list.map((s) =>
          <tr onClick = {() => {this.push('/api/'+s["_id"]); this.globalStore.reset_breadcrumb()}} key={s['_id']}>
            <td>{s['date_created']}</td>
            <td>
              {s['api_name']}
            </td>
          </tr>
        );
        return(
          <table>
            <tbody>
              <tr className='table-header'>
                <th>Date Created</th>
                <th>Api Name</th>
              </tr>
              {tableData}
            </tbody>
          </table>
        )
      }
      else if(this.store.filter==="project"){
        const tableData = filtered_list.map((s) =>
          <tr onClick = {() => {this.push('/project/'+s["_id"]); this.globalStore.reset_breadcrumb()}} key={s['_id']}>
            <td>{s['date_created']}</td>
            <td>
              {s['project_name']}
            </td>
          </tr>
        );
        return(
          <table>
            <tbody>
              <tr className='table-header'>
                <th>Date Created</th>
                <th>Project Name</th>
              </tr>
              {tableData}
            </tbody>
          </table>
        )
      }
    }
  }

  render(){
    return(
      <div>
        <div className="ResultsTable">
          {this.renderUrlList()}
        </div>
        <div className='ResultTable-pageControls'>
          <MuiThemeProvider>
            <Pagination
              total = { this.state.pageLen }
              current = { this.state.onPage }
              display = { 5 }
              onChange = { (onPage)=>(this.setState({onPage:onPage})) }
            />
          </MuiThemeProvider>
        </div>
      </div>

    )
  }
}

export default ResultTable;
