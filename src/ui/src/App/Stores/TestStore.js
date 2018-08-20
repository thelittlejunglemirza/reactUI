/* #~#~#~#~# IMPORTS #~#~#~#~#*/
import { observable } from "mobx"

/* #~#~#~#~# DESCRIPTION/SIGNATURE #~#~#~#~#*/
/*
* @ Des:
*     Test containers store for testing purposes
*/
export class TemplateStore {
  /* #~#~#~#~#~#~ OBSERVABLES #~#~#~#~#~#~# */

  @observable loading = false;

  /* #~#~#~#~#~#~ ACTIONS #~#~#~#~#~#~# */
  //  Can only change observables values from an action function

  /* #~#~#~#~#~#~# COMPUTAIONS #~#~#~#~#~#~# */
  // any computations that use this stores variables

  /* #~#~#~#~#~#~# HELPERS #~#~#~#~#~#~# */
  // all other Nessisary functions

}

export default new TemplateStore()
