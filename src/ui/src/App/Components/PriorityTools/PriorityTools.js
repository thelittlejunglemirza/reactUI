// Refactored by Nader
// EXTERNAL
import React, {Component} from 'react';
import { observer, inject} from 'mobx-react';
import { action } from "mobx"
// LOCAL
import RequestHandler from '../../Services/RequestHandler'
// STYLE-CSS
import './PriorityTools.css'

/* #~#~#~#~# DESCRIPTION/SIGNATURE #~#~#~#~#*/
/*
* @ Name: insert name here.
* @ Date: insert date created here
* @ Des:
*     Add a breif description of this class here
*/
@inject('globalStore')
@inject('localStore')
@observer
class PriorityTools extends Component {
  constructor(props){
    super(props);
    this.state =
    {
      text: '',
      isSelected: false,
      isAccepted: false,
      isTagged: false,
      tags: ['use/modification of sap content', 'Publication Risk', 'Attribution', 'Pass-Thru Terms/Customer Account'],
      selected: [],
    };
    this.store = this.props.globalStore;
    this.localStore = this.props.localStore
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClick);
  }

  handleClick = (event) => {
    var xPosition = event.clientX;
    var validAfter = window.innerWidth * 0.4;
    var txt = window.getSelection().toString();
    if(xPosition > validAfter){
      if(txt === '' || txt === ' '){
        this.setState({
          isSelected: false
        });
      }else{
        this.setState({
          text: txt,
          isSelected: true
        });
      }
    }
  }

  handleButtonClick = (event) => {
    this.setState({
      isAccepted: true
    })
  }

  handleTagsButton = (event) => {
    var checked = false;
    for(let i in this.state.tags) {
      if(this.refs[i].checked) {
        if(!checked) checked = true;
        this.state.selected.push(this.refs[i].value)
      }
    }
    if(checked) this.setState({isTagged: true})
  }

  handleSubmitButton = (event) => {
    var cmt = this.refs.comment.value;
    var obj = {
      text: this.state.text,
      tag: this.state.selected,
      comment: cmt
    }
    RequestHandler.sendStatement(obj, this.localStore.id).then((resp) => {
      this.setState({
        text: '',
        isSelected: false,
        isAccepted: false,
        isTagged: false,
        selected: [],
      });
      this.localStore.addStatement(obj);
      this.localStore.getIdData()
    }).catch((err) => {
      alert(err);
    })
  }

  render() {
    return(
      <div className='randomClass'>
        <div className='priorityToolHeader'>
          <div class="btn-group">
            {
              this.state.isTagged ?
              (
                <button className='pmButton' type="button" onClick={this.handleSubmitButton}>Submit</button>
              ) : this.state.isAccepted ?
              (
                <button className='pmButton' type='button' onClick={this.handleTagsButton}>Next</button>
              ) : this.state.isSelected ?
              (
                <button className='pmButton' type='button' onClick={this.handleButtonClick}>Accept</button>
              ) :
              (
                <div></div>
              )
            }
          </div>
        </div>
        <div className='priorityToolsContainer' style={{height: this.store.dim.height * (1 / 5)}}>
          <div id='read-module' className='toolBox'>
            <div className='textBox' id='scroll-1' style={{maxHeight: this.store.dim.height * (1 / 5)}}>
              {
                this.state.isTagged ?
                (
                  <div>
                    <p>Write a Comment</p>
                    <textarea name='comment' form='usrform' ref='comment' placeholder='enter text here...'></textarea>
                  </div>
                ) : this.state.isAccepted ?
                (
                  <div>
                    <p>Now Select Tags</p>
                    {
                      this.state.tags.map((tag, index) =>
                        <div className='checkbox'>
                          <label>
                            <input name= "cb" type="checkbox" value={tag} ref={index}/>
                            {tag}
                          </label>
                        </div>
                      )
                    }
                  </div>
                ) : this.state.isSelected ?
                (
                    <p>{this.state.text}</p>
                ) :
                (
                  <p>{this.state.text}</p>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PriorityTools;
