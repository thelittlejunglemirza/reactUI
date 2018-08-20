// Refactored by Nader
// EXTERNAL
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Diff from 'react-stylable-diff';
import { action } from 'mobx';
// LOCAL
import RequestHandler from '../../Services/RequestHandler'

// STYLE-CSS
import './DiffTool.css';


// if not used to control the dimensions following line should be commented out
@inject('globalStore')
@inject('localStore')
@observer
/**
 * Compares two versions of a text together and illustrates the differences,
 * in form of insertations and deletetations
 * @extends Component
 */
class DiffTool extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.localStore;
    this.globalStore = this.props.globalStore;
    this.state =
    {
      currText: '',
      prevText: ''
    }
  }

  getVersionDom(id){
    return new Promise((fulfill, reject) => {
      RequestHandler.getIdData_tos(id)
        .then(
          action("success", resp => {
            fulfill(resp.data)
          }),
          action("fail", resp => {
            reject("fail")
          })
        )
    });
  }

  handleClickCurr = (event) => {
    var e = event.target;
    var selectedId = e.options[e.selectedIndex].value;
    if(selectedId === 'none'){
      this.setState({
        currText: ''
      })
    }else {
      this.getVersionDom(selectedId).then((resp) => {
        this.setState({
          currText: resp.dom
        });
      }).catch((err) => {
        alert('err from handleClickCurr DiffTool: ' + err);
      })
    }
  }

  handleClickPrev = (event) => {
    var e = event.target;
    var selectedId = e.options[e.selectedIndex].value;
    if(selectedId === 'none'){
      this.setState({
        prevText: ''
      })
    }else {
      this.getVersionDom(selectedId).then((resp) => {
        this.setState({
          prevText: resp.dom
        });
      }).catch((err) => {
        alert('err from handleClickPrev DiffTool: ' + err);
      })
    }
  }

  render() {
    if(this.store.diffToolLoading){
      return(
        <div>loading</div>
      )
    }else{
      return(
        <div className='diffContainer'>
          <div className='toolBar'>
            <div style={{marginLeft:15,marginRight:15}}><strong>Version Compare</strong></div>
            <form>
              <select onChange={this.handleClickCurr}>
                <option value='none'>A</option>
                {
                  this.store.versions.map((version, index) => {
                    return(
                      <option value={version._id}>{version.date_created}</option>
                    )
                  })
                }
              </select>
              <select onChange={this.handleClickPrev}>
                <option value='none'>B</option>
                {
                  this.store.versions.map((version, index) => {
                    return(
                      <option value={version._id}>{version.date_created}</option>
                    )
                  })
                }
              </select>
            </form>
          </div>
          <div className='diffText' id='scroll-2' style={{height: this.globalStore.dim.height / 2 - 17}}>
            <Diff inputA={this.state.currText} inputB={this.state.prevText} type='sentences'/>
          </div>
      </div>
      );
    }
  }
} export default DiffTool;
