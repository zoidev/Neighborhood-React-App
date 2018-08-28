import React,{Component} from 'react'
import './App.css'

class Header extends Component{
	render(){
		return(
    /*creation of menu button from https://www.w3schools.com/howto/howto_css_menu_icon.asp*/
    <header className='header'>
    <button tabIndex = {0} className='menuIcon'
    aria-label='Open Menu Search'
    onClick={()=>{
    	document.getElementById("list-view").classList.toggle('open')
    	this.props.changeMenuHidden()
    }}>
	    <div className='menu'></div>
		<div className='menu'></div>
		<div className='menu'></div>
    </button>
	<h3 tabIndex ={0}>Hotels in Thessaloniki</h3>
    </header>
	    )
	}
}

export default Header