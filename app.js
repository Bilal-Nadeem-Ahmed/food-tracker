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
  const response=await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=09EB3dIbSzfsmSwlykptslh9U1c8eNvNnKo9SfT0&query=Cheddar%20Cheese`)

  const responseData = await response.json()
  console.log(responseData)
  return responseData;
};
geFood();

