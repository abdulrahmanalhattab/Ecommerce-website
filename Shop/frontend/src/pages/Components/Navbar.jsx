import { Component } from "react";
import './css/navbar.css';
import Info from '../../info';
import { MdOutlineMenu } from "react-icons/md";



class Navbar extends Component{
    constructor(){
        super();
        this.state = {
            isMobile: window.innerWidth <= 430
        } 
    }
    TranfromTo(val){
        if (Info.path === window.location.href){
            window.location.href = val;
        }else{
            window.location.href = '/'+val;
        }
    }

    ShowNavBar(){
        const menu1 = document.querySelector('.Navbar ul:nth-child(1)');
        const menu2 = document.querySelector('.Navbar ul:nth-child(2)');
        if(menu2.style.display === 'flex'){
            menu2.style.display = 'none';
            menu1.style.display = 'block';
        }else{
            menu1.style.display = 'none';
            menu2.style.display = 'flex';
        }

    }

    render(){
        return(
            <div className="Navbar">
                <ul>
                    <li><h2 onClick={() => this.TranfromTo('')}>HF</h2> <MdOutlineMenu onClick={() => this.ShowNavBar() } /></li>
                    <li onClick={() => this.TranfromTo('#slider')}>Home</li>
                    <li onClick={() => this.TranfromTo('furniture')}>Furniture</li>
                    <li onClick={() => this.TranfromTo('#footer')}>About</li>
                    <li onClick={() => this.TranfromTo('#contact')}>Contact us</li>
                </ul>

                <ul style={{display: this.state.isMobile? 'flex' : 'none'}}>
                    <li onClick={() => this.TranfromTo('')}><h2>HF</h2></li>
                    <li onClick={() => this.ShowNavBar()}><MdOutlineMenu /></li>
                </ul>
            </div>
        );
    }
}

export default Navbar