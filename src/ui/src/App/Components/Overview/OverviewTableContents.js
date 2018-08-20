// EXTERNAL
import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
// LOCAL
import './Overview.css'

class OverViewTableContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'storeName': this.props.storeName,
      'store': this.props.store
    }
  }

  render() {
    var doc = ReactHtmlParser(this.state.store.data.risk_assessment)
    return(
      <div className="overview-table">
        <div className="componentHeader">SUMMARY</div>
        <table align="left">
          <tbody>
            <tr id='margin-bottom'>
              <td>
                {
                  this.state.storeName.includes('ProjectDataStore') ?
                  (
                    <tr>
                      <td className="overview-table-key-rightAligned">Project Name</td>
                      <td className="overview-table-key-leftAligned">{this.state.store.data.project_name}</td>
                    </tr>

                  ) : this.state.storeName.includes('ApiDataStore') ?
                  (
                    <tr>
                      <td className="overview-table-key-rightAligned">Provider</td>
                      <td className="overview-table-key-leftAligned">{this.state.store.data.provider}</td>
                    </tr>
                  ) :
                  (
                    <tr>
                      <td className="overview-table-key-rightAligned">Terms of Service</td>
                      <td className="overview-table-key-leftAligned">{this.state.store.data.url}</td>
                    </tr>
                  )
                }
                <tr>
                  <td  className="overview-table-key-rightAligned">Date Created</td>
                  <td className="overview-table-key-leftAligned">{this.state.store.data.date_created}</td>
                </tr>
                <tr>
                  <td  className="overview-table-key-rightAligned">Reviewed By</td>
                  <td className="overview-table-key-leftAligned">EX: John Doe</td>
                </tr>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default OverViewTableContents;
