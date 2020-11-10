// api key hdg4q8tdGBR4tIeH4r14i9Zk1TcwYiKCxe2usGxr

`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.apiKey}query=Cheddar%20Cheese`

const  uiSelectors = {
 submitBtn : document.getElementById("submitbtn"),
 inputval: document.getElementById("inpt"),
 list :".list",
 searchItem :".searchitem",
 apiKey :"hdg4q8tdGBR4tIeH4r14i9Zk1TcwYiKCxe2usGxr",}
 

async function geFood(val){
  const response=await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0&query=${val}&pageSize=20`)
 //const response=await fetch(`https://api.nal.usda.gov/fdc/v1/food/380864?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0`)

 let html = "";
 


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
  
    console.log(item)
  // make this in to a function that sends the post request with the id. then display the info out
  
e.preventDefault() 
})
  })

  
  return responseData;

  
};


// so i need to make an initial request which returns the search query. this is limited to 10 items.
// to get the indavidual info the second get request must be made using the id from the first request, it is specified after the question mark and returns the info we need. it also returns an average value for portion size, we need to be able to adjust this after selection, which should automatically adjust the other quantities. we will continue with this tmrw!

// first step for tmrw is displaying the info in a list and onclick events for each of the ten maybe with a foreach loop, use the id to select and then make the  next request which should get back data!

uiSelectors.submitBtn.addEventListener("click", function(e){
  if(uiSelectors.inputval.value===""){
    uiSelectors.inputval.value= "Enter a valid query";
    

  } else {
    geFood(uiSelectors.inputval.value);
  
  }
  
  e.preventDefault();
})

 
