// External
import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import DevTools from 'mobx-react-devtools';
// LOCAL
import Header from "./Components/Header/Header"

// Stores
// import AppStore from "./Stores/AppStore";
// Style
import './App.css';

/*
* @ Des:
*     App is the Highest level Container for this UI. HTML here will always be
*     rendered for each subsequnt container. It also passes down the global store
*     "AppStore" via Provider, for states that persist throughout the entier app.
*/

@inject('globalStore')
@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.globalStore
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    // listen for window resizing
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    // remove listener
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  // Updates window dimensions
  updateWindowDimensions() {
    // get height of header div
    this.store.set_loading(false)
    // height of header = 51 so side all containers height will be innerHeight-51
    // !!! not DYNAMIC
    this.store.set_dim({width: window.innerWidth, height: window.innerHeight - 51})
  }

  render() {
    if(this.store.loading === true){
      return(<div>load</div>)
    }
    else {
      return(
          <div className="App">
            <DevTools/>
            <Header/>
          </div>
      )
    }
  }
}

export default App;
