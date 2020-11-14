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
   
    const li = document.createElement("li");
    li.className="collection-item searchitem";
    document.querySelector(".list").appendChild(li);
    li.innerHTML=`<strong>${item.description}:</strong> <em>${item.brandOwner}`;
      

  // event listner for item search
  li.addEventListener("click", function(e){
    
  // call function to get the selected item
    getFoodItem(item.fdcId);
    // delete the search items 
    const list = document.querySelector(".list");
    const search = document.querySelectorAll(".searchitem");
    for (let i = 0; i < search.length; i++)
{
  list.removeChild(search[i]);
}
    
e.preventDefault() 
})
  })
  
    return responseData
};

// get the selected item and display its info
async function getFoodItem(id){
  
  const responses=await fetch(`https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0`);
 
   const responsesData = await responses.json()
  console.log(responsesData)

  //uiSelectors.addToList.style.display="block";  
   const li = document.createElement("li");
   li.className="collection-item foodValue";
   document.querySelector(uiSelectors.addToList).appendChild(li);
   li.innerHTML=`<strong>${responsesData.description}:</strong> <em>${responsesData.brandOwner}</em> ${responsesData.servingSize} ${responsesData.servingSizeUnit}`;
   console.log(responsesData.servingSize)
  
  }

uiSelectors.submitBtn.addEventListener("click", function(e){
  
  // check if there is any data in input field
  if(uiSelectors.inputval.value===""){
    uiSelectors.inputval.value= "Enter a valid query";
  } else {
    geFood(uiSelectors.inputval.value);
   }
   // clear input field
   uiSelectors.inputval.value="";
  e.preventDefault();
})


 
