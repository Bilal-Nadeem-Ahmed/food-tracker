// api key hdg4q8tdGBR4tIeH4r14i9Zk1TcwYiKCxe2usGxr

`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.apiKey}query=Cheddar%20Cheese`


class Food{
  constructor(){
    this.apiKey = "hdg4q8tdGBR4tIeH4r14i9Zk1TcwYiKCxe2usGxr";
    

  };
  // fetch weather from api
  async getFood(){
    const response=await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.apiKey}query=Cheddar%20Cheese`)

    const responseData = await response.json()
    console.log(responseData)
    return responseData;
  };
  
};
async function geFood(){
 // const response=await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0&query=Cheddar%20Cheese&pageSize=10&pageNumber=1& measure=100`)
 const response=await fetch(`https://api.nal.usda.gov/fdc/v1/food/380864?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0`)

  const responseData = await response.json()
  console.log(responseData)
  return responseData;
};
geFood();

// so i need to make an initial request which returns the search query. this is limited to 10 items.
// to get the indavidual info the second get request must be made using the id from the first request, it is specified after the question mark and returns the info we need. it also returns an average value for portion size, we need to be able to adjust this after selection, which should automatically adjust the other quantities. we will continue with this tmrw!

// first step for tmrw is displaying the info in a list and onclick events for each of the ten maybe with a foreach loop, use the id to select and then make the  next request which should get back data!

