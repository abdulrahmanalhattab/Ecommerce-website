import { Component } from "react";
import './css/products.css';
import Product from "./Components/products";
import CreateProduct from "./Components/CreateProduct";
import DeleteOrUpdate from "./Components/DeleteOrUpdate";
class Products extends Component{
    constructor(){
        super();
        this.state = {
            ChooseProduct: 'products'
        }
    }

    setChooseProduct(v){
        if (v === 'products'){
            document.querySelector('.Product > div:nth-child(1) > ul > li:nth-child(1)').style.borderBottom = '3px solid #A1662F';
            document.querySelector('.Product > div:nth-child(1) > ul > li:nth-child(2)').style.borderBottom = 'none';
            document.querySelector('.Product > div:nth-child(1) > ul > li:nth-child(3)').style.borderBottom = 'none';
            this.setState({
                ChooseProduct: v
            })
        }else if(v === 'create'){
            document.querySelector('.Product > div:nth-child(1) > ul > li:nth-child(1)').style.borderBottom = 'none';
            document.querySelector('.Product > div:nth-child(1) > ul > li:nth-child(2)').style.borderBottom = '3px solid #A1662F';
            document.querySelector('.Product > div:nth-child(1) > ul > li:nth-child(3)').style.borderBottom = 'none';
            this.setState({
                ChooseProduct: v
            })
        }else{
            document.querySelector('.Product > div:nth-child(1) > ul > li:nth-child(1)').style.borderBottom = 'none';
            document.querySelector('.Product > div:nth-child(1) > ul > li:nth-child(2)').style.borderBottom = 'none';
            document.querySelector('.Product > div:nth-child(1) > ul > li:nth-child(3)').style.borderBottom = '3px solid #A1662F';
            this.setState({
                ChooseProduct: v
            })
            
        }
    }
    render(){
        return(
            <div className="Product">
                <div>
                    <ul>
                        <li onClick={() =>this.setChooseProduct('products')}>Products</li>
                        <li onClick={() =>this.setChooseProduct('create')}>Create products</li>
                        <li onClick={() =>this.setChooseProduct('updateOrDelete')}>Update Or Delete</li>
                    </ul>
                </div>

                {
                    this.state.ChooseProduct === 'products'?
                    <Product />
                    :this.state.ChooseProduct === 'create'?
                    <CreateProduct />
                    :<DeleteOrUpdate />
                    
                }
            </div>
        );
    }
}

export default Products