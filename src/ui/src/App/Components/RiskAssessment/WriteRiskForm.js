// EXTERNAL
import React, { Component }  from 'react';
// LOCAL
import TextEditor from './DraftWriteRisk'
// STYLE-CSS
import './RiskAssessment.css'

class WriteRiskFrom extends Component{

  constructor(props) {
    super(props);
    this.state = {
      'dim': this.props.dim,
      'clickHandlerSubmit': this.props.eHandleSubmit,
      'clickHandlerClear': this.props.eHanldeClear,
      'data': this.props.data,
      'value': this.props.value
    }

  }
  // // TODO: FIGURE OUT how the data from draft-js can be collected and shown,
  // // TODO: FIGURE OUT how can the data be exported via the export function
  render () {
    return(
      <div>
        <div className="riskAssessment-table-header">
          <div class="btn-group">
            <button className='raButton' type="button" onClick={this.state.clickHandlerSubmit}>Submit</button>
            <button className='raButton' type="button" onClick={this.state.clickHandlerClear}>Clear</button>
          </div>
        </div>
        <div className='riskContainer' style={{height: this.state.dim.height - 167, width: this.state.dim.width / 3}}>
          <h1>RiskAssesment</h1>
          <div>
            <form onSubmit={this.state.clickHandlerSubmit}>
              <TextEditor />
              {/* <textarea id="riskText" style={{height: this.state.dim.height - 280}}>
                 {this.state.value}
              </textarea> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default WriteRiskFrom;
