import { action, observable, autorun } from "mobx"
const pdfConverter = require('jspdf');


/*
* @ Des:
*     AppStore Contains all actions, computations, and functions that are shared
*     everywhere within the app. Global store is accessable to every child component
*     of App.
*/

export class AppStore {

  /* #~#~#~#~#~#~ OBSERVABLES #~#~#~#~#~#~# */
  @observable loading = true;
  @observable dim = {};
  @observable tabs = [];
  @observable current_tab = '';
  @observable SideMenuIsClickable = false;
  @observable breadcrumb = {
    "project":"",
    "api":"",
    "tos":""
  };
  @observable idBreadcrumb = {
    "project":"",
    "api":"",
    "tos":""
  };

  /* #~#~#~#~#~#~ ACTIONS #~#~#~#~#~#~# */

  // @Post: dimensions updated to reflect new window sizing
  @action
  set_dim(newDim){
    this.dim = newDim;
  }

  // @Post: sets idBreadcrumb
  @action
  set_idBreadcrumb(newId, level) {
    this.idBreadcrumb[level] = newId;
  }

  // @Post: sets breadcrumb
  @action
  set_breadcrumb(newCrumb, level){
    this.breadcrumb[level] = newCrumb;
  }

  // @Post: will reset everything in breadcrumb
  @action
  reset_breadcrumb_below(resetBelowLevel){
    if (resetBelowLevel === "project") {
      this.breadcrumb["api"] = "";
      this.breadcrumb["tos"] = "";
    }
    else if (resetBelowLevel === "api") {
      this.breadcrumb["tos"] = "";
    }
  }

  // @Post: will reset everything in breadcrumb
  @action
  reset_breadcrumb(){

    console.log("HELALDFAKJKFAR");
    // if (resetBelowLevel === "project") {
    //   this.breadcrumb["api"] = "";
    //   this.breadcrumb["tos"] = "";
    // }
    // else if (resetBelowLevel === "api") {
    //   this.breadcrumb["tos"] = "";
    // }
    this.breadcrumb = {
      "project":"",
      "api":"",
      "tos":""
    };
  }

  // @Post: global loading obsr will change to new value
  @action
  set_loading(newLoading) {
    this.loading = newLoading
  }

  // @Post: Current tab will be changed to newTab and elmt text will be blue
  @action
  set_current_tab(newTab) {
    if (this.SideMenuIsClickable === true) {
      this.current_tab = newTab;
    }
  }

  // @Post: tabs will be added to SideMenu
  @action
  set_tabs(newTabs) {
    this.tabs = newTabs;
  }

  @action
  set_SideMenuIsClickable(newVal) {
    this.SideMenuIsClickable = newVal
  }

  @action
  pdf_export(docData) {

    let keys = Object.keys(docData);
    let values = Object.values(docData);
    let temp_out = "";

    for (let i=0; i<keys.length; i++)
    {
      if(keys[i] === "dom" || keys[i]==="statements")
      {
        continue
      }
      else if(typeof(values[i]) === "object")
      {
          var temp_list = "";

          for(let obj of values[i].toJS())
          {
            temp_list = temp_list + `${obj} ,  `;
          }

          temp_out= temp_out+`<tr><td>${keys[i]}</td><td>${temp_list}</td></tr>`;
          continue;
      }
      else {
          temp_out= temp_out+`<tr><td>${keys[i]}</td><td>${values[i]}</td></tr>`;
      }

    }

    const pdf = new pdfConverter('p', 'mm', 'a4');
    const today =new Date();
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();

    let table = '<div><h1 style="font-size:12px;text-align: left">WASP Report</h1>'+
    `<div style="width:800px;font-size:12px;text-align: left">${year}-${month}-${day}</div>`+
    '<table  style="font-size:10px;table-layout:fixed;width:800px" id="tab_customers" class="table table-striped" >'+
                          '<colgroup>'+
                              '<col width="25%">'+
                              '<col width="75%">'+
                          '</colgroup>'+
                          '<thead>'+
                              '<tr>'+
                                 '<th>Key</th>'+
                                  '<th>Value</th>'+
                              '</tr>'+
                          '</thead>'+
                          '<tbody>'+
                            temp_out+
                          '</tbody>'+
                      '</table></div>'
    // pdf.text(temp_out, 10, 10)
    pdf.fromHTML(table, 10 ,10, {// y coord
                        'width': 20, // max width of content on PDF
                    });
    pdf.save(docData["_id"]+".pdf");
  }
}

export default new AppStore()
