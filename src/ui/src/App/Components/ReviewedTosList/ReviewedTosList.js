// External
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
// LOCAL
import RequestHandler from '../../Services/RequestHandler'
// STYLE-CSS
import './ReviewedTosList.css'

@inject('localStore')
@observer
/**
 *
 */
class ReviewedTosList extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.localStore;
    this.state =
    {
      reviewedTos: []
    }
  }

  componentDidMount() {
    console.log(' ----- in componentWillMount of ReviewedTosList ------');
    var urlArr = toJS(this.store.data.tos);
    for(var url of urlArr) {
      let obj = {};
      obj.url = url;
      RequestHandler.getVersionsForUrl(url).then((resp) => {
        obj.date_created = resp.data.date_created;
        RequestHandler.getIdData_tos(resp.data.versions[0]._id).then((resp) => {
          obj.date_reviewed = resp.data.date_reviewed;
          obj.riskAssesment = resp.data.risk_assessment;
          this.setState({
            reviewedTos: [...this.state.reviewedTos, obj]
          });
        }).catch((err) => {
          alert('2. err in ReviewedTosList componentWillMount: ' + err);
        });
      }).catch((err) => {
        alert('1. err in ReviewedTosList componentWillMount: ' + err);
      });
    }
  }

  render() {
    return(
      <div className='tosRiskList' id='scroll-2'>
        <table>
          <tr>
            <th>URL</th>
            <th>Date Reviewed</th>
            <th>Reviewed By</th>
            <th>Assessment</th>
          </tr>
          <tbody>
            {
              this.state.reviewedTos.map((obj, index) => {
                return(
                  <tr key={index}>
                    <td className='tableItemUrl'><a href={obj.url}>{obj.url.slice(8)}</a></td>
                    <td>{obj.date_reviewed}</td>
                    <td>TODO</td>
                    <td>{obj.riskAssesment}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>

    );
  }
}
export default ReviewedTosList
