// api key hdg4q8tdGBR4tIeH4r14i9Zk1TcwYiKCxe2usGxr


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
 
   const responsesData = await responses.json().catch(err=> console.log(err))
  console.log(responsesData)

  //uiSelectors.addToList.style.display="block";  
   const li = document.createElement("li");
   li.className="collection-item foodValue";
   document.querySelector(uiSelectors.addToList).appendChild(li);
   li.innerHTML=`<strong>${responsesData.description}:</strong> <em>${responsesData.brandOwner}</em> ${responsesData.servingSize} ${responsesData.servingSizeUnit}`;
   console.log(responsesData.servingSize)
  
  }


 

// create a class that will be used onclick to create a new date. the id of the class will me dinamically calculated as will part of the  classname. it will give you an option to add a meal to it , using an eventlistner on the button and if done so an input field will arrive, we will then use the function to show the list of search items and then once clicked we can add that item to the list. once that is done we can add multiple meals for the day and also edit each item and its content . we can use haschildnode to see if there is an element there already. then use a loop to get through to the end and add a new date, same for the list item

// hide the search box
document.querySelector(uiSelectors.searchDiv).style.display= "none";
// event listner for add food
document.querySelector(uiSelectors.addDayBtn).addEventListener("click", function(e){
  // show input field 
  document.querySelector(uiSelectors.searchDiv).style.display= "block";
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

 //return addmeals(newDiv);
 return newDiv;
 
 
}
// need to add an element which once it is clicked we launch

function addmeals(newDiv){
  
  let breakfastDiv= document.createElement("div");
  breakfastDiv.className="breakfast";
  let breakfastP = document.createElement("p");
  breakfastP.innerText = "Breakfast";
  newDiv.appendChild(breakfastDiv);
  breakfastDiv.appendChild(breakfastP);

}

//addmeals(document.getElementById("#fd-1"));
// the above function needs to be completed. it works but as of yet does not do much appart from show the word breakfastin a paragraph in a breakfast div which is a child of the div the previous function it was connected to. i can imagine we would use this function in the return statement of the above div. we need to find a way to create a new ul undre this and when ever we click on the name of the meal , we add food items to the ul of that meal. that may work by changing the parameters of this function and the second function which gets data back from the id of the api, this may need to be nested in that function in order to be able to access all of its info, or just called in th =e return statement and passed that perticular vlue which we could use to add the info we need to the li's . also it will be a task to figure out how we will update the calories but we can deal with that later on. we also need to figure out how we will populate the data , maybe by making some of these functions in to one then it will work.?