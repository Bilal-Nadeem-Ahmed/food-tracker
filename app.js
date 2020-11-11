// api key hdg4q8tdGBR4tIeH4r14i9Zk1TcwYiKCxe2usGxr


const  uiSelectors = {
 submitBtn : document.getElementById("submitbtn"),
 inputval: document.getElementById("inpt"),
 list :".list",
 addToList : ".results",
 searchItem :".searchitem",
 apiKey :"hdg4q8tdGBR4tIeH4r14i9Zk1TcwYiKCxe2usGxr",}
 

async function geFood(val){
  const response=await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0&query=${val}&pageSize=20`)
 //const response=await fetch(`https://api.nal.usda.gov/fdc/v1/food/380864?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0`)

   const responseData = await response.json()
 responseData.foods.forEach(function(item,index){
   // html+= `<li class="collection-item searchitem" id="${item.fdcId}">
     //   <strong>${item.description}:</strong> <em>${item.brandOwner} </em>
      //</li>`
     // document.querySelector(uiSelectors.list).innerHTML = html;
    const li = document.createElement("li");
    li.className="collection-item searchitem";
    document.querySelector(".list").appendChild(li);
    li.innerHTML=`<strong>${item.description}:</strong> <em>${item.brandOwner}`;
      

  // console.log(item)
  li.addEventListener("click", function(e){
    // remove search when it is collected
    document.querySelector(uiSelectors.list).remove();
    // 
    console.log(item.fdcId);
    getFoodItem(item.fdcId);
  
  
e.preventDefault() 
})
  })
  return 
    
};

// get the selected item and display its info
async function getFoodItem(id){
  const response=await fetch(`https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0`);
 
   const responseData = await response.json()


  //uiSelectors.addToList.style.display="block";  
   const li = document.createElement("li");
   li.className="collection-item foodValue";
   document.querySelector(uiSelectors.addToList).appendChild(li);
   li.innerHTML=`<strong>${responseData.description}:</strong> <em>${responseData.brandOwner}`;
      

  
  


  }

uiSelectors.submitBtn.addEventListener("click", function(e){
  //if(document.hasOwnProperty(uiSelectors.addToList)=== true){
  //  uiSelectors.addToList.style.display="none"; 
  //}
   
  if(uiSelectors.inputval.value===""){
    uiSelectors.inputval.value= "Enter a valid query";
  } else {
    geFood(uiSelectors.inputval.value);
   }
  e.preventDefault();
})

// need to look at how to best set these functions up in terms of patterns , so we can use each others data, also need to figure out the diplay issue

 
