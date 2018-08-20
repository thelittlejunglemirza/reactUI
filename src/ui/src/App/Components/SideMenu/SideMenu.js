// External
import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
// style
import './SideMenu.css'

/*
* @ Des:
*     View of search results based on search url variable in the path
*     (ie: http://<someDomain>/search/<var url>).
*/

@inject('globalStore')
@inject('routing')
@observer
class SideMenu extends Component {
  constructor(props) {
    super(props)

    this.store = this.props.globalStore
    // routing
    const { push } = this.props.routing;
    this.push = push;
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
    let tabs = this.store.tabs;

    if (tabs.length === 1 && typeof(tabs[0]) !== "string"){
      return(
        <div key={tabs} id={tabs} className="SideMenu-parent">{tabs}</div>
      )
    }
    else {
      let breadcrumb = this.store.breadcrumb;
      let idBreadcrumb = this.store.idBreadcrumb;
      let temp_crumb_array = [];
      let temp_id_array = [];
      let temp_level_array = [];

      for (let crumb in breadcrumb){

        if (breadcrumb[crumb] !==""){
          temp_crumb_array.push(breadcrumb[crumb]);
          temp_id_array.push(idBreadcrumb[crumb]);
          temp_level_array.push(crumb);
        }
      }

        let el = temp_crumb_array.map((crumb, count) => {

            return( <div
                      key={crumb}
                      id={crumb} style={{color:"grey"}}
                      className="SideMenu-parent"
                      style={{marginLeft:15+count*25}}
                      onClick={() => {this.push('/'+temp_level_array[count]+'/'+temp_id_array[count])}}
                    >
                        {crumb}
                    </div>
                  )
        })
        return(
          <div>
            {el}
          </div>
        )

      }
    }


  render() {
      return(
          <div style={{height:this.store.dim.height}} className="SideMenu">
            {this.render_parent()}
          </div>
      )
    }

}

export default SideMenu;
