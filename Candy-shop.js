let CandName=document.getElementById('candyName')
let Description =document.querySelector('#Description')
let price =document.querySelector('#price')
let quantity=document.getElementById('quantity');


 function formsubmit(event){
    event.preventDefault();
    const candydetails={
        CandName:CandName.value,
        Description:Description.value,
        price:price.value,
        quantity:quantity.value
    }
 axios.post(`https://crudcrud.com/api/78d2644cbbb040a2ab69a549cb167bae/candydetails`,candydetails)
 .then(result=>{
    console.log(result);
    showOnscreen(candydetails)
 })
 .catch(err=>console.log(err))

 }



 function showOnscreen(obj){
    const candyList=document.querySelector('#listofitem') 

 let  newtag=`<tr >
  <td>${obj.CandName}</td>
  <td>${obj.Description}</td>
  <td>${obj.price}</td>
  <td><input type="number" id='${obj._id}' value='${obj.quantity}'></td>
  <td><button onClick="BuyOne('${obj._id}',1)">Buy One</button></td>
  <td><button onClick="BuyTwo('${obj._id}',2)">Buy Two</button></td>
  <td><button onClick="Buythree('${obj._id}',3)">Buy three</button></td>
  </tr>`

   candyList.innerHTML=candyList.innerHTML+newtag
 }


 window.addEventListener('DOMContentLoaded',()=>{
    axios.get(`https://crudcrud.com/api/78d2644cbbb040a2ab69a549cb167bae/candydetails`)
    .then(res=>{
        res.data.forEach((data)=>{
            showOnscreen(data)
        })
    })
    .catch(err=>console.log(err))
 })

 function BuyOne(id,qty){
 changeqty(id,qty)
 }
 function BuyTwo(id, qty){
    changeqty(id, qty)
 }
 
 function Buythree(id, qty){
    changeqty(id, qty)
 }

 function changeqty(id, qty){
    const qtyId=document.getElementById(id)
    const oldqty=qtyId.value;
    const newqty=oldqty-qty;
    axios.get(`https://crudcrud.com/api/78d2644cbbb040a2ab69a549cb167bae/candydetails/${id}`)
   .then(obj=>{
    const newobj={...obj.data,quantity:newqty}
    console.log(id)
   axios.put(`https://crudcrud.com/api/78d2644cbbb040a2ab69a549cb167bae/candydetails/${id}`,JSON.stringify(newobj))
   })
.then(()=>{
    qtyId.value=oldqty-qty;
    console.log('its working')
})
.catch(err=>console.log(err))
 }