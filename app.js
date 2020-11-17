// api key hdg4q8tdGBR4tIeH4r14i9Zk1TcwYiKCxe2usGxr

let res;
const  uiSelectors = {
 submitBtn : document.getElementById("submitbtn"),
 inputval: document.getElementById("inpt"),
 list :".list",
 addToList : ".results",
 searchItem :".searchitem",
 mealsDiv: ".mealsdiv",
 addDayBtn: "#addDaybtn",
 searchDiv: ".searchdiv",
 apiKey :"hdg4q8tdGBR4tIeH4r14i9Zk1TcwYiKCxe2usGxr",}
 

async function geFood(val){
  const response=await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0&query=${val}&pageSize=20`)
 

   const responseData = await response.json()
 responseData.foods.forEach(function(item){
   
    const li = document.createElement("li");
    li.className="collection-item searchitem";
    document.querySelector(".list").appendChild(li);
    li.innerHTML=`<strong>${item.description}:</strong> <em>${item.brandOwner}`;
      

  // event listner for item search
  li.addEventListener("click", function(e){
    
  // call function to get the selected item
    getFoodItem(item.fdcId);
    console.log(item.fdcId);
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
 
   const responsesData = await responses.json().catch(err=> console.log(err))
  console.log(responsesData)

  //uiSelectors.addToList.style.display="block";  
   const li = document.createElement("li");
   li.className="collection-item";
   //document.querySelector(uiSelectors.addToList).appendChild(li);
   res.target.parentElement.nextSibling.appendChild(li);
   li.innerHTML=`<strong>${responsesData.description}:</strong> <em>kcals: </em>${responsesData.labelNutrients.calories.value}  Serving Size: ${responsesData.servingSize} ${responsesData.servingSizeUnit} Fat:  ${responsesData.labelNutrients.fat.value.toFixed(1)}  Protien: ${responsesData.labelNutrients.protein.value.toFixed(1)}  Carbs: ${responsesData.labelNutrients.carbohydrates.value.toFixed(1)}`;
   res=undefined;
   document.querySelector(uiSelectors.addDayBtn).style.display="block";
  }

// hide the search box
document.querySelector(uiSelectors.searchDiv).style.display= "none";
// event listner for add food
document.querySelector(uiSelectors.addDayBtn).addEventListener("click", function(e){
  
  addDay()
  
  // hide the add day button
  document.querySelector(uiSelectors.addDayBtn).style.display="none";
  
  e.preventDefault()
})

 // event listner for search
 uiSelectors.submitBtn.addEventListener("click", function(e){

  // check if there is any data in input field
  if(uiSelectors.inputval.value===""){
    uiSelectors.inputval.value= "Enter a valid query";
  } else {
    // hide the search box
    document.querySelector(uiSelectors.searchDiv).style.display= "none";
    geFood(uiSelectors.inputval.value);
   }
   // clear input field
   uiSelectors.inputval.value="";
  e.preventDefault();
})


// this function checks for other food divs which are used to store daily meal info, it returns the new div which should be used to in another function and create a breakfast lunch and dinner element which have event listners to add food items to it
function addDay(){
  // get the meals div container
  let mealsDiv = document.querySelector(uiSelectors.mealsDiv);

  // create a div
  let newDiv=document.createElement("div");
  let dayHeading = document.createElement("p");
  dayHeading.className = "dayHeading";

  // check if there are any any others meals if so create the right classname  
  if (document.querySelectorAll(".foodDiv")===null){
    newDiv.className=`foodDiv fd-0`;
    newDiv.id="fd-0"
    
  } else {
    newDiv.className=`foodDiv fd-${document.querySelectorAll(".foodDiv").length+1}`;
    newDiv.id= `fd-${document.querySelectorAll(".foodDiv").length+1}`;
    dayHeading.innerText=`Day ${document.querySelectorAll(".foodDiv").length+1}`;

  }
  // put the new meal in the meals container 
  mealsDiv.appendChild(newDiv)
  newDiv.appendChild(dayHeading);

 return addmeals(newDiv);
 //return newDiv;
 
 
}
// need to add an element which once it is clicked we launch

function addmeals(newDiv){
  //breakfast
  let breakfastDiv= document.createElement("div");
  breakfastDiv.className="breakfast";
  let breakfastP = document.createElement("p");
  breakfastP.innerText = "Breakfast  ";
  newDiv.appendChild(breakfastDiv);
  let brIcon = document.createElement("i");
  brIcon.className="fas fa-plus";
  breakfastP.appendChild(brIcon);
  breakfastDiv.appendChild(breakfastP);
  let breakfastUl = document.createElement("ul");
  breakfastUl.className= "collection";
  breakfastDiv.appendChild(breakfastUl);

  brIcon.addEventListener("click", function(e){
    //
  let event=e;
   res=event;
    // show input field 
    document.querySelector(uiSelectors.searchDiv).style.display= "block";
    e.preventDefault()
  })

  //lunch
  let lunchDiv= document.createElement("div");
  lunchDiv.className="lunch";
  let lunchP = document.createElement("p");
  lunchP.innerText = "lunch  ";
  newDiv.appendChild(lunchDiv);
  let luIcon = document.createElement("i");
  luIcon.className="fas fa-plus";
  lunchP.appendChild(luIcon);
  lunchDiv.appendChild(lunchP);
  let lunchUl = document.createElement("ul");
  lunchUl.className= "collection";
  lunchDiv.appendChild(lunchUl);

  luIcon.addEventListener("click", function(e){
    //
  let event=e;
   res=event;
    // show input field 
    document.querySelector(uiSelectors.searchDiv).style.display= "block";
    e.preventDefault()
  })
  // Dinner
  let dinnerDiv= document.createElement("div");
  dinnerDiv.className="dinner";
  let dinnerP = document.createElement("p");
  dinnerP.innerText = "Dinner  ";
  newDiv.appendChild(dinnerDiv);
  let diIcon = document.createElement("i");
  diIcon.className="fas fa-plus";
  dinnerP.appendChild(diIcon);
  dinnerDiv.appendChild(dinnerP);
  let dinnerUl = document.createElement("ul");
  dinnerUl.className= "collection";
  dinnerDiv.appendChild(dinnerUl);

  diIcon.addEventListener("click", function(e){
    //
  let event=e;
   res=event;
    // show input field 
    document.querySelector(uiSelectors.searchDiv).style.display= "block";
    e.preventDefault()
  })
  // snacks
  let snacksDiv= document.createElement("div");
  snacksDiv.className="Snacks";
  let snacksP = document.createElement("p");
  snacksP.innerText = "Snacks  ";
  newDiv.appendChild(snacksDiv);
  let snIcon = document.createElement("i");
  snIcon.className="fas fa-plus";
  snacksP.appendChild(snIcon);
  snacksDiv.appendChild(snacksP);
  let snacksUl = document.createElement("ul");
  snacksUl.className= "collection";
  snacksDiv.appendChild(snacksUl);

  snIcon.addEventListener("click", function(e){
    //
  let event=e;
   res=event;
    // show input field 
    document.querySelector(uiSelectors.searchDiv).style.display= "block";
    e.preventDefault()
  })
  

}


//979713

//https://api.nal.usda.gov/fdc/v1/foods/search?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0&query=bread&pageSize=20

// api issues it is down. i have tried to change the functions a little so that they can work, i have declared a global variable at the top so the event when i click breakfast is passed to it. it is then accessed by the second api function and that has been updated to use that var to add an li to that list. This once done will be a great victory !! Also need to think about using a table instead, that way we can access indavidual values easier to update and perform neccessary calcs