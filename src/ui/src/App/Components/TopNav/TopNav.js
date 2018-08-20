// External
import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
// style
import './TopNav.css'

/*
* @ Des:
*     View of search results based on search url variable in the path
*     (ie: http://<someDomain>/search/<var url>).
*/

@inject('globalStore')
@observer
class SubMenu extends Component {
  constructor(props) {
    super(props)

    this.store = this.props.globalStore
  }

  // parent_clicked(id) {
  //
  //   let obj = this.store.tabs.find((o, i) => {
  //   if (o.parent === id) {
  //       this.store.set_current_tree(i)
  //       return true; // stop searching
  //   }})
  // }

  render_parent() {
    let el = this.store.tabs.map((tab) => {
      if(this.store.current_tab === tab) {
        return(
          <div key={tab} onClick={(e) => this.store.set_current_tab(tab, true)} id={tab} style={{color:"red"}} className="SubMenu-parent SubMenu-Tab-active">{tab}</div>
        )
      }
      else {
        return(
          <div key={tab} onClick={(e) => this.store.set_current_tab(tab, true)} id={tab} className="SubMenu-parent SubMenu-Tab">{tab}</div>
        )
      }
    })
    return(el)
  }

  render() {
      return(
          <div style={{  display: 'flex',flexDirection: 'row'}}>
            {this.render_parent()}
          </div>
      )
    }

}

export default SubMenu;
