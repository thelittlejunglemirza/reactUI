// External
import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { Navbar, FormGroup, Button,FormControl, Image,  Grid, Row, Col } from "react-bootstrap";
// Style
import './Header.css';
import logo from '../../../WASP_ICON.svg';

/*
* @ Des:
*     Compenent that renders the Apps header. In the search bar; changes to search bar value
*     are stored locally in this components state, once submited window is redirect
*     to "http://<domain>/search/<var query>" which renders searchResults component
*     (managed by mobx-react-router).
*/

@inject('routing')
@observer
class Header extends Component
{
  constructor(props) {
    super(props)

    this.state = {
      currentSearch:""
    }
    // routing
    const { push } = this.props.routing;
    this.push = push
  }

  // @Post: updates currentSearch to newSearch
  changeCurrentSearch(newSearch) {
    this.setState({
      currentSearch:newSearch
    })
  }

  // @Post: redirects to /search/query
  redirectOnSubmit(e) {
    console.log(55);
    let query = this.state.currentSearch

    if(query !== "")
    {
      this.push('/search/'+query)
    }
    e.preventDefault();
  }


  render(){
    return(
      <div className="header-topnav">
        {/* <div className='header'><img class="iconElementLeft" src={logo} /></div>
        <div className="tabs">
          <span onClick={() => this.push('/')}>Home</span>
          <span onClick={() => this.push('/Catalog')}>Catalog</span>

        </div>
        <div className="search-container">
          <form onSubmit={this.redirectOnSubmit.bind(this)}>
            <input
              type="text"
              placeholder="Search url's here.."
              name="search"
              onChange={(e) => this.changeCurrentSearch(e.target.value)}
              value={this.state.currentSearch}
            />
            <button type="submit">Search</button>
          </form>
        </div> */}
        <Grid fluid className="noPadding">
          <Row className="show-grid noMargin makeMeBlue">
            <Col xs={3} md={2} className="noPadding">
              <Row className="noMargin">
                <Col xs={2} md={2} className="noPadding">
                  <div className="iconElementLeft">
                    <Image bsClass="image" src={logo} />
                  </div>
                </Col>
                <Col xs={10} md={10}>
                  <div className="header-wasp-text">
                    WASP
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={9} md={10} className="noPadding">
              <Navbar fluid>
                <Navbar.Toggle/>
                <Navbar.Collapse className="noPadding">
                  <Navbar.Form pullLeft className="noPadding">
                    <form onSubmit={this.redirectOnSubmit.bind(this)}>
                      <FormGroup>
                        <FormControl type="text"
                          placeholder="Search url's here.."
                          name="search"
                          value={this.state.currentSearch}
                          onChange={(e) => this.changeCurrentSearch(e.target.value)}
                        />
                        <Button onSubmit={this.redirectOnSubmit.bind(this)} type="submit">Search</Button>
                      </FormGroup>{' '}
                    </form>
                  </Navbar.Form>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Header;
