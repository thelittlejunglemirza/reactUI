import { action, observable } from "mobx"
import RequestHandler from '../Services/RequestHandler'

/*
* @ Des:
*     Store for TosData container
*/

export class TosDataStore {
  /* #~#~#~#~#~#~ OBSERVABLES #~#~#~#~#~#~# */

  @observable id = "";
  @observable data = {};
  @observable versions = [];
  @observable loading = true;
  @observable diffToolLoading = true;
  @observable statementInView = -1;
  @observable numStatements = 0;
  @observable statements = [];


  /* #~#~#~#~#~#~ ACTIONS #~#~#~#~#~#~# */

  // @Des: handles the arrow up/down button clicks, implements an circular
  //       scroller (start -> end && end -> start)
  // @Pre: must pass valid cmd of next or previous
  @action
  set_statementInView(cmd) {
        // arrow down
    if(cmd === 'next') {
      // if at the end of all statements go back to top
      if(this.statementInView === this.numStatements - 1) {
        this.statementInView=0;
      }
      // else continue down
      else {
        this.statementInView = this.statementInView + 1;
      }
    }

    // arrow up
    else if(cmd === 'previous') {
      // if at begining of all statements go to end
      if(this.statementInView === 0) {
        this.statementInView = this.numStatements-1;
      }
      // else continue up
      else {
        this.statementInView = this.statementInView-1;
      }
    }
    this.scroller();
  }

  // @Post: id updated to newId
  @action
  set_id(newId) {
    this.id = newId;
  }

  @action
  getStatements() {
    return(this.data.statements);
  }

  @action
  addStatement(stm) {
    this.statements.push(stm);
  }

  // @Des: Makes API request via RequestHandler
  // @Post: all urls returned from API are mapped to urls state
  @action
  getIdData() {
    RequestHandler.getIdData_tos(this.id)
    .then(
      action("success", resp => {
        this.data=resp.data;
        this.loading = false;
        this.numStatements = resp.data.statements.length;
        this.statements = resp.data.statements
        console.log("getIdData: success");
        this.getVersionData();
      }),
      action("fail", resp => {
        this.loading = true;
        console.log("getIdData: fail");
      })
    )
  }

  @action
  getVersionData() {
    RequestHandler.getVersionsForUrl(this.data['url'])
      .then(
        action("success", resp => {
          this.versions = resp.data.versions;
          this.diffToolLoading = false;
          console.log('getVersionData: success');
        }),
        action("fail", resp => {
          this.diffToolLoading = true;
          console.log("getVersionData: fail");
        })
      )
  }

  // TODO: functiuon to update risk assessment
  @action
  submitAssessment(str) {
    return new Promise((fulfill, reject) => {
      RequestHandler.sendTosAssessment(str, this.id)
        .then(
          action("success", resp => {
            this.isAssessed = true;
            this.getIdData();
            console.log("sendAssessment: success");
            fulfill();
          }),
          action("fail", resp => {
            console.log("sendAssessment: fail");
            console.log(resp)
            reject();
          })
        )
    });
  }

  /* #~#~#~#~#~#~# COMPUTAIONS #~#~#~#~#~#~# */

  /* #~#~#~#~#~#~# HELPERS #~#~#~#~#~#~# */

  // @Des: Marked element with index statementInView will
  //        be in the center of textContainer
  scroller() {
    var el = document.getElementById('TosText-'+ this.statementInView);
    var parent = document.getElementById('textContainer');
    console.log(el);
    var offset = el.offsetTop;
    var delta = parent.offsetHeight/2;

    document.getElementById('textContainer').scrollTop = offset - delta;

    el = document.getElementById('PriorityList-' + this.statementInView);
    parent = document.getElementById('overflowList');
    offset = el.offsetTop;
    if(parent){
      delta = parent.offsetHeight / 2;

      parent.style.color = 'white';
      el.style.color = 'red';
      document.getElementById('overflowList').scrollTop = offset - delta;
    }
  }

}

export default new TosDataStore()
