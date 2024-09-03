import express from 'express';
import usermodel from '../models/usermodel.js'


//add to cart 
const addtoCart = async (req,res) => {
  try {
    let userData = await usermodel.findById(req.body.userId)
    let cartData = await userData.cartData;
    if(!userData){
      return res.json({success:false, message: 'User not found'})
    }


    let itemIndex = await userData.cartData.findIndex(
      cartItem => cartItem.itemId.toString() === req.body.itemId
    );

    if(itemIndex === -1){
      cartData.push({
        itemId: req.body.itemId,
        quantity:req.body.quantity,
        name: req.body.name,
        price:req.body.price
      })
    }else{
      cartData[itemIndex].quantity +=1;
    }
    
    await usermodel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true, message: 'Added to Cart'})
  }
   catch (error) {
    console.log(error);
    res.json({success:false, message: "Error"})
  }
}


//remove from cart 
const removeFromCart = async (req,res) => {
  try {
    let userData = await usermodel.findById(req.body.userId);
    if(!userData){
      return res.json({success:false, message: 'User not found'})
    }

    let cartData = await userData.cartData;

    let itemIndex = await userData.cartData.findIndex(
      cartItem => cartItem.itemId.toString() === req.body.itemId
    );
    
    if(cartData[itemIndex].quantity>1){
      //decrease the quantity
      cartData[itemIndex].quantity -=1;
    }
    else{
      //remove item if quantity is 0
      cartData.splice(itemIndex,1)
    }
    //save the updated cart
    await usermodel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true, message: "Removed from Cart"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:" error"})
  }
}


//fetch user cart data
const getCart = async (req,res) => {
  try {
    let userData = await usermodel.findById(req.body.userId);
    if(!userData){
      return res.json({success:false, message: 'User not found'})
    }
    let cartData = await userData.cartData;
    res.json({success:true,cartData})

  } catch (error) {
    console.log(error);
    res.json({success:false, message: "error"})
    
  }
}


export {addtoCart,removeFromCart,getCart}