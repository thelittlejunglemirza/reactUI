// Refactored by Nader
// EXTERNAl
import React, { Component } from 'react';
import { observer, inject} from 'mobx-react';
// LOCAL
import ReadRiskFrom from './ReadRiskForm'
import WriteRiskFrom from './WriteRiskForm'
// STYLE-CSS
import './RiskAssessment.css'

@inject('localStore')
@inject('globalStore')
@observer
class RiskAssessment extends Component {
  constructor(props) {
    super(props)
    this.globalStore = this.props.globalStore;
    this.store = this.props.localStore;
    this.state =
    {
      'assessed': false,
      'value': this.store.data.risk_assessment
    }
  }

  componentDidMount() {
    if(this.store.data.risk_assessment !== ""){
      this.setState({
        'assessed': true,
      });
    }else {
      this.setState({
        'assessed': false
      })
    }
  }

  formSubmit = (event) => {
    var el = event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[2];
    var val = el.outerHTML;
    // var val =
    // var el = event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0].childNodes[0];
    // let val = el.value;
    this.store.submitAssessment(val).then((resp) => {
      this.setState({
        'assessed': true,
        'value': val
      })
      this.store.data.risk_assessment = val;
    }).catch((err) => {
      console.log('err from FormSubmit RA: ' + err);
    })
  }

  formEdit = (event) => {
    this.setState({
      'assessed': false
    })
  }

  render() {
    var content = <div>
                      Empty
                  </div>
    // Can also Extract functions and variablse from store like such
    let storeName = this.store.$mobx.name;

    // ~@~@~@~@~@~ PROJECT VIEW ~@~@~@~@~
    if (storeName.includes('ProjectDataStore') === true) {
      content = <div className='overview-table'>
                  Project Risk
                </div>
    // ~@~@~@~@~@~ API VIEW and TOS VIEW ~@~@~@~@~
  } else if (storeName.includes('ApiDataStore') === true || storeName.includes('TosDataStore') === true) {
      if(this.state.assessed){
        content = <ReadRiskFrom
                    dim={this.globalStore.dim}
                    eHandle={this.formEdit}
                    data={this.store.data}
                  />;
      }else {
        content = <WriteRiskFrom
                    dim={this.globalStore.dim}
                    eHandleSubmit={this.formSubmit}
                    eHandleClear={this.formClear}
                    data={this.store.data}
                    value={this.state.value}
                  />;
      }
    }
    return content;
  }
}
export default RiskAssessment
