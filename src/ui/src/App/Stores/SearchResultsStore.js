import { action, observable } from "mobx"
import RequestHandler from '../Services/RequestHandler'

/*
* @ Des:
*     Store for SearchResults container
*/

export class SearchResultsStore {
  /* #~#~#~#~#~#~ OBSERVABLES #~#~#~#~#~#~# */

  @observable submitSearch = "";
  @observable loading = true;
  @observable urls = [];
  @observable filteredUrls = [];
  @observable filter = "project"



  /* #~#~#~#~#~#~ ACTIONS #~#~#~#~#~#~# */

  // @ Pre: submitSearch must be updated first, and valid
  // @Post: submitSearch updated to newSearch, and urls are filtered
  //        based on this.submitSearch
  @action
  set_submitSearch(newSearch) {
    this.submitSearch = newSearch
    this.get_filtered_data()
  }

  // @Post: filter will be changed to either project, api, or tos
  @action
  set_filter(e) {
    this.filter = e.target.value
    this.filteredUrls=[]
    this.get_filtered_data()
  }

  // @Des: Makes API request via RequestHandler
  // @Post: all urls returned from API are mapped to urls state
  @action
  get_filtered_data() {
    if(this.filter==="tos"){
      RequestHandler.getFilteredUrls(this.submitSearch)
      .then(
        action("success", resp => {
          this.filteredUrls=resp.data;
          this.loading = false
          // this.filterSearchUrls()
          console.log("getUrls: success");
        }),
        action("fail", resp => {
          this.loading = true
          console.log("getUrls: fail");
        })
      )
    }
    else if(this.filter==="api"){
      RequestHandler.getFilteredApis(this.submitSearch)
      .then(
        action("success", resp => {
          this.filteredUrls=resp.data;
          this.loading = false
          // this.filterSearchUrls()
          console.log("getApis: success");
        }),
        action("fail", resp => {
          this.loading = true
          console.log("getApis: fail");
        })
      )
    }
    else if(this.filter==="project"){
      RequestHandler.getFilteredProjects(this.submitSearch)
      .then(
        action("success", resp => {
          this.filteredUrls=resp.data;
          this.loading = false
          // this.filterSearchUrls()
          console.log("getProjects: success");
        }),
        action("fail", resp => {
          this.loading = true
          console.log("getProjects: fail");
        })
      )
    }
  }

}
export default new SearchResultsStore()
