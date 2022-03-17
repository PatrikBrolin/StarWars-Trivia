let myCharacters = [];
let comparements = document.querySelector(".comparements")
const form = document.querySelector("#form")


class Character{
  //constructor
  constructor(name, gender, height, mass, hairColor, pictureUrl){
  this.name = name;
  this.gender = gender;
  this.height = height;
  this.mass = mass;
  this.hairColor = hairColor;
  this.pictureUrl = pictureUrl;
  }
  //methods

  weightCompare(x){

    let xMass = parseInt(x.mass)
    let thisMass = parseInt(this.mass)
    if(xMass > thisMass){
      comparements.innerText = `${x.name} weights ${x.mass}kg and that is more than mine ${this.mass}kg`
    } else{
      comparements.innerText = `${x.name} weights ${x.mass}kg and that is less than mine ${this.mass}kg`
    }
  }
  heightCompare(x){
    let xHeight = parseInt(x.height)
    let thisHeight = parseInt(this.height)
    if(xHeight > thisHeight){  
      comparements.innerText = `${x.name} is ${x.height}cm and that is longer than mine ${this.height}cm`

    } else{
      comparements.innerText = `${x.name} is ${x.height}cm and that is shorter than mine ${this.height}cm`

    }
  }
  hairCompare(x){
    if(x.hairColor === this.hairColor){
      let hairString = `${x.name}'s haircolor is ${x.hairColor} and so is mine`
      comparements.innerText = hairString.replace("n/a", "hairless")
     
    }else{   
      let hairString = `${x.name}'s haircolor is ${x.hairColor} but mine is ${this.hairColor}`
      comparements.innerText = hairString.replace("n/a","hairless" )
    }
  }
  genderCompare(x){
    console.log(x.gender)
    if(x.gender === this.gender){
      let genderString = `${x.name} and i are the same gender, ${x.gender} `
      comparements.innerText = genderString.replace("n/a", "we are genderless")
      
    }
    else{    
      let genderString = `${x.name}'s gender is a ${x.gender}, but i am a ${this.gender}`
      comparements.innerText = genderString.replace("n/a","genderless character")
    }
  }
}


form.addEventListener("submit", (e)=>{
e.preventDefault()

//array keeping track of the 2 characters choosen
myCharacters.length = 0 ;

let selectedCharOne = document.querySelector("#character-one").value
let selectedCharTwo = document.querySelector("#character-two").value

if(selectedCharOne === selectedCharTwo){
  alert("choose different characters")
} else{

  //setting the correct image urls
  let urlC1 = `images/${selectedCharOne}.png`
  let urlC2 = `images/${selectedCharTwo}.png`

  selectedCharOne = selectedCharOne.split("-").join(" ");
  selectedCharTwo = selectedCharTwo.split("-").join(" ");

  let urlCharOne = `https://swapi.dev/api/people?search=${selectedCharOne}`
  let urlCharTwo = `https://swapi.dev/api/people?search=${selectedCharTwo}`
  //function that calling a fetch for the correct character and saving to class
  getData(urlCharOne).then((data) =>{
    console.log(data)
    let charObject = data.results.pop()
    let characterOne = new Character(charObject.name, charObject.gender, charObject.height, charObject.mass, charObject.hair_color, urlC1)
    myCharacters.push(characterOne)

    getData(urlCharTwo).then(data=>{
      let charObject = data.results.pop()
      let characterTwo = new Character(charObject.name, charObject.gender, charObject.height, charObject.mass, charObject.hair_color, urlC2)
      myCharacters.push(characterTwo)


      //calling function to render the 2 characters to DOM
      render("one",urlC1, characterOne)
      render("two",urlC2, characterTwo)
    })
  })
}
})

//function that renders the characters
async function render(section, url, character){
  
  let characterSection = document.querySelector(`.character-${section}`)
  characterSection.innerHTML = `<p class="name-${section}"></p>
  <img src="${url}" alt="" id="img-${section}">`

  document.querySelector(`.name-${section}`).innerText = character.name

  document.querySelector(`#img-${section}`).src = character.pictureUrl


  let weightBtn = document.createElement("button")
  let heightBtn = document.createElement("button")
  let hairBtn = document.createElement("button")
  let genderBtn = document.createElement("button")
  let buttonDiv = document.createElement("div")
  buttonDiv.classList.add("button-div")

  weightBtn.innerText = "Compare Weight"
  heightBtn.innerText = "Compare Height"
  hairBtn.innerText = "Compare Hair Color"
  genderBtn.innerText = "Compare Gender"

  buttonDiv.append(weightBtn, heightBtn, hairBtn, genderBtn)

  characterSection.appendChild(buttonDiv)

  compareWeight(weightBtn, character)
  compareHeight(heightBtn, character)
  compareHair(hairBtn, character)
  compareGender(genderBtn, character)
}


//functions for the comparement buttons
function compareWeight(item, character){
  
  item.addEventListener("click", () =>{
    if(character.name === myCharacters[0].name){
      character.weightCompare(myCharacters[1])
    } else{
      character.weightCompare(myCharacters[0])
    }
  })
}
function compareHeight(item, character){
  
  item.addEventListener("click", () =>{
    if(character.name === myCharacters[0].name){
      character.heightCompare(myCharacters[1])
    } else{
      character.heightCompare(myCharacters[0])
    }
  })
}
function compareHair(item, character){
  
  item.addEventListener("click", () =>{
    if(character === myCharacters[0]){
      character.hairCompare(myCharacters[1])
    } else{
      character.hairCompare(myCharacters[0])
    }
  })
}
function compareGender(item, character){
  
  item.addEventListener("click", () =>{
    if(character === myCharacters[0]){
      character.genderCompare(myCharacters[1])
    } else{
      character.genderCompare(myCharacters[0])
    }
  })
}
//function that fetches data from api.
async function getData(url) {
  try {
    let response  = await fetch(url)
    let data = await response.json()
    return data;

  } catch (error) {
    console.log(error)
  }
}