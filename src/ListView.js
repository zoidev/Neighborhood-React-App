import React, { Component } from 'react';
import { DebounceInput } from "react-debounce-input";
import './App.css';

class ListView extends Component {

   render() {

    const{HandleTextSearch} = this.props    
  
    return (
   
      <nav id="list-view" aria-label='list of hotels'
            tabIndex={this.props.menuHidden ? -1 : 0 }>
          <DebounceInput minLength={1} debounceTimeout={300} type="text" id="filter" placeholder="Search location..." 
           aria-label='Search hotel by name'
           tabIndex={this.props.menuHidden ? -1 : 0 }
           onChange={
            (e)=>{this.props.updateQuery(e.target.value)
                  HandleTextSearch(e, e.target.value,this.props.searchedlocations)
                  }
                }
           value={this.props.query}
           />          
          {this.props.locations.length !== 0 ?
          this.props.locations.map(searchedlocation => (      
            <li role="button" key={searchedlocation.id}>
                <button 
                  tabIndex={this.props.menuHidden ? -1 : 0 }
                  className="locButtons" onClick={()=>{
                  console.log(searchedlocation);
                  this.props.onItemClicked(searchedlocation);
                 }} href='#'>{searchedlocation.name}</button>
            </li>
          )): <p>Sorry, no results found...</p>
          }         
      </nav>
    )
  }
}

export default ListView

