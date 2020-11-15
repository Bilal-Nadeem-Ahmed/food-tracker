// api key hdg4q8tdGBR4tIeH4r14i9Zk1TcwYiKCxe2usGxr

// var for the place to add the event lisner value to pass to the id api value, to add the items
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
   res.target.nextSibling.appendChild(li);
   li.innerHTML=`<strong>${responsesData.description}:</strong> <em>${responsesData.brandOwner}</em> ${responsesData.servingSize} ${responsesData.servingSizeUnit}`;
   console.log(responsesData.servingSize)
   res=undefined;
  
  }


 

// create a class that will be used onclick to create a new date. the id of the class will me dinamically calculated as will part of the  classname. it will give you an option to add a meal to it , using an eventlistner on the button and if done so an input field will arrive, we will then use the function to show the list of search items and then once clicked we can add that item to the list. once that is done we can add multiple meals for the day and also edit each item and its content . we can use haschildnode to see if there is an element there already. then use a loop to get through to the end and add a new date, same for the list item

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

  // check if there are any any others meals if so create the right classname  
  if (document.querySelectorAll(".foodDiv")===null){
    newDiv.className=`foodDiv fd-0`;
    newDiv.id="fd-0"

  } else {
    newDiv.className=`foodDiv fd-${document.querySelectorAll(".foodDiv").length+1}`;
    newDiv.id= `fd-${document.querySelectorAll(".foodDiv").length+1}`;

  }
  // put the new meal in the meals container 
  mealsDiv.appendChild(newDiv)

 return addmeals(newDiv);
 //return newDiv;
 
 
}
// need to add an element which once it is clicked we launch

function addmeals(newDiv){
  
  let breakfastDiv= document.createElement("div");
  breakfastDiv.className="breakfast";
  let breakfastP = document.createElement("p");
  breakfastP.innerText = "Breakfast";
  newDiv.appendChild(breakfastDiv);
  breakfastDiv.appendChild(breakfastP);
  let breakfastUl = document.createElement("ul");
  breakfastUl.className= "collection";
  breakfastDiv.appendChild(breakfastUl);

  breakfastDiv.addEventListener("click", function(e){
    //
  let event=e;
   res=event;
    // show input field 
    document.querySelector(uiSelectors.searchDiv).style.display= "block";
    //let li = document.createElement("li");
    //li.className="collection-item";
    //breakfastUl.appendChild(li);
    //li.innerText = "ayayay"
    //console.log("ayay")

    e.preventDefault()
  })

}


//addmeals(document.getElementById("#fd-1"));


//979713

//https://api.nal.usda.gov/fdc/v1/foods/search?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0&query=bread&pageSize=20

// api issues it is down. i have tried to change the functions a little so that they can work, i have declared a global variable at the top so the event when i click breakfast is passed to it. it is then accessed by the second api function and that has been updated to use that var to add an li to that list. This once done will be a great victory !!