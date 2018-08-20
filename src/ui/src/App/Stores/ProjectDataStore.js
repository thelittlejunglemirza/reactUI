/* #~#~#~#~# IMPORTS #~#~#~#~#*/
import { action, observable } from "mobx"
import RequestHandler from '../Services/RequestHandler'

/* #~#~#~#~# DESCRIPTION/SIGNATURE #~#~#~#~#*/
/*
* @ Des:
*     Test containers store for testing purposes
*/
export class ProjectDataStore {
  /* #~#~#~#~#~#~ OBSERVABLES #~#~#~#~#~#~# */

  @observable loading = true;
  @observable data = {};
  @observable id = "";
  @observable isAssessed = false;

  /* #~#~#~#~#~#~ ACTIONS #~#~#~#~#~#~# */
  //  Can only change observables values from an action function

  // @Post: id updated to newId
  @action
  set_id(newId) {
    this.id = newId
  }

  @action
  getIdData() {
    RequestHandler.getIdData_project(this.id)
    .then(
      action("success", resp => {
        this.data=resp.data;
        this.loading = false
        console.log("getIdData_project: success");
        if(resp.data.risk_assessment !== ""){
          this.isAssessed = true;
        }
      }),
      action("fail", resp => {
        this.loading = true
        console.log("getIdData_project: fail");
      })
    )
  }

  // FIXME: Connect to api change assesment
  // @action
  // submitAssessment(str) {
  //   return new Promise((fulfill, reject) => {
  //     RequestHandler.sendApiAssessment(str, this.id)
  //       .then(
  //         action("success", resp => {
  //           this.isAssessed = true;
  //           this.getIdData();
  //           console.log("sendAssessment: success");
  //           fulfill();
  //         }),
  //         action("fail", resp => {
  //           console.log("sendAssessment: fail");
  //           reject();
  //         })
  //       )
  //   });
  // }

  /* #~#~#~#~#~#~# COMPUTAIONS #~#~#~#~#~#~# */
  // any computations that use this stores variables

  /* #~#~#~#~#~#~# HELPERS #~#~#~#~#~#~# */
  // all other Nessisary functions

}

export default new ProjectDataStore()
