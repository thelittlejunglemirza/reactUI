// Refactored by Nader
// EXTERNAL
import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import Button from '@material-ui/core/Button';

// LOCAL
import './TosText.css'

const reactStringReplace = require('react-string-replace');

@inject('localStore')
@observer
class TosText extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.localStore
  }

  // @Des: Renders highlighted text for a terms of service
  renderHighlight() {
      let count = 0;
      let len = null;
      let start = null
      let wordToHighlight = null;
      let cleanDom = this.store.data.dom;
      let returnedDom = cleanDom;
      let style = {}

      //get rid of preformated bolded text.
      let temp_dom = cleanDom.replace(/\n/gi, ' ')

      for (let o of this.store.data.statements )
      {
        if(count === this.store.statementInView) {
          style = {backgroundColor:'red'}
        }else {
          style = {}
        }

        wordToHighlight = o.text
        len = wordToHighlight.length
        start = temp_dom.indexOf(o.text);

        if(start === -1)
        {
          let subString = cleanDom.indexOf(o.text, o.text+len)

          // eslint-disable-next-line
          returnedDom = reactStringReplace(returnedDom, subString, (match, i) =>
              (
                <mark style={style} key={count} id={'TosText-'+count}>{match}</mark>
              )
            );
        }else {
          let subString = cleanDom.substring([start],[start+len])

          // eslint-disable-next-line
          returnedDom = reactStringReplace(returnedDom, subString, (match, i) =>
              (
                <mark style={style} key={count} id={'TosText-'+count}>{match}</mark>
              )
            );
        }
        count++;
      }
      return(returnedDom)
  }

  render() {
    return(
      <div>
        <div  style={{width:this.props.dim.width * (1/2)}} className='TosText-header'>
          Terms of service for: <a href={this.store.data.url}>{this.store.data.url}</a>
          <div className='TosText-header-PScontroler'>
            <Button onClick={()=>this.store.set_statementInView('next')} size='small'><i className="material-icons">arrow_downward</i></Button>
            <Button onClick={()=>this.store.set_statementInView('previous')} size='small'><i className="material-icons">arrow_upward</i></Button>
          </div>
        </div>
        <div style={{maxHeight:this.props.dim.height*(4/5) - 37, width:this.props.dim.width * (1/2)}} className='textContainer' id='textContainer'>
          <pre style={{marginLeft: '6px'}}>{this.renderHighlight()}</pre>
        </div>
      </div>
    );
  }
}
export default TosText
