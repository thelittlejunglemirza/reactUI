// EXTERNAL
import React, { Component }  from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
// LOCAL
import './RiskAssessment.css';
// import './RichEditor.css';

class ReadRiskFrom extends Component{

  constructor(props) {
    super(props);
    this.state = {
      'dim': this.props.dim,
      'clickHandler': this.props.eHandle,
      'data': this.props.data
    }

  }
  render () {
    var doc = ReactHtmlParser(this.state.data.risk_assessment)
    return(
      <div>
        <div className="riskAssessment-table-header">
          <div class="btn-group">
            <button className='raButton' type='button' onClick={this.state.clickHandler}>Edit</button>
          </div>
        </div>
        <div className='assessedContainer' style={{height: this.state.dim.height - 130}}>
          <h1>Risk Assessment (Done)</h1>
          <table>
            <tbody>
              <tr>
                <td>Assessed By:</td>
                <td>todo</td>
              </tr>
              <tr>
                <td>Date Assessed: </td>
                <td>{this.state.data.date_reviewed}</td>
              </tr>
            </tbody>
          </table>
          {doc}
        </div>
      </div>
    );
  }
}
export default ReadRiskFrom;
