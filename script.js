
const findDish= document.getElementById("finddish");
const typeDish= document.getElementById("dish");
const recipeContainer= document.getElementById("recipeContainer")
const randommeal=document.querySelector("#random-img")
const imgname=document.querySelector("#imgname")
const recipeDetails=document.querySelector('#recipe-details')
const recipeIngredients=document.querySelector(".recipe-ingredients")
const closeRecipe=document.querySelector('.close-recipe')

findDish.addEventListener('click',(e)=>{
    e.preventDefault();
    const input= typeDish.value.trim();
    
    searchDish(input);
});



const searchDish= async(query)=>{
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`);
    const respond=  await data.json();
    console.log(respond);

    respond.meals.forEach(meals => {
        //  const desiredMeals=document.getElementById('desiredMeals');
       const desiredMeals= document.createElement('div');
       desiredMeals.classList.add('desireMeals');
         desiredMeals.innerHTML=`
         <img src="${meals.strMealThumb}" class="desired-img">
         <div class="desired-name">${meals.strMeal}<div>

         
         `
         console.log(respond)
         const btn=document.createElement('button');
         btn.classList.add('myrecipebtn');
         btn.textContent="Ingredients & Recipe";
         desiredMeals.appendChild(btn);

        btn.addEventListener('click',()=>{
            popup(meals)
            fetchId(meals.idMeal)
        })

         recipeContainer.appendChild(desiredMeals);
    });

}

function fetchId(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=> res.json())
    .then(data=>{
        console.log(data)
        recipeIngredients.innerHTML=`
        <h2 class="one">${data.meals[0].strMeal}</h2>
        <div class="no">
        <img src="${data.meals[0].strMealThumb}" class="yes">
        </div>
        <h3 class="two">Ingredints:</h3>
        <ul class="three">${fetchIngredientsRecipe(data.meals[0])}</ul>
        <div>
          <h3 class="lol">Instructions: </h3>
          <p class="four">${data.meals[0].strInstructions}</p>
        </div>
        `
        recipeIngredients.parentElement.style.display="block";
    })
}

var sentence =[
    "One cannot think well, love well, sleep well, if one has not dined well. - Virginia Woolf",
"Let food be thy medicine and medicine be thy food. - Hippocrates",
"People who love to eat are always the best people. - Julia Child",
"The only way to get rid of a temptation is to yield to it. - Oscar Wilde",
"Food is our common ground, a universal experience. - James Beard",
"Life is uncertain. Eat dessert first. - Ernestine Ulmer",
"All you need is love. But a little chocolate now and then doesn't hurt. - Charles M. Schulz",
"Tell me what you eat, and I will tell you what you are. - Jean Anthelme Brillat-Savarin",
"A party without cake is just a meeting. - Julia Child",
"First we eat, then we do everything else. - M.F.K. Fisher",
"Cooking is like love. It should be entered into with abandon or not at all. - Harriet Van Horne",
"Food, in the end, in our own tradition, is something holy. It's not about nutrients and calories. It's about sharing. It's about honesty. It's about identity. - Louise Fresco",
"If you really want to make a friend, go to someone's house and eat with him... the people who give you their food give you their heart. - Cesar Chavez",
"Cooking is at once child's play and adult joy. And cooking done with care is an act of love. - Craig Claiborne",
"One cannot think well, love well, sleep well if one has not dined well. - M.F.K. Fisher",
"Food is art, and food is love. And we should show love and appreciation for those who cook it by eating it with relish. - Mark Bittman",
"The only time to eat diet food is while you're waiting for the steak to cook. - Julia Child"
]
function phase(){
    return Math.floor(Math.random()*sentence.length)
}
document.getElementById("quotes").innerText=sentence[phase()];





function randomness(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response=>{
        console.log(response)
        return response.json();
        
    })
    .then(data=>{
        console.log(data)
        console.log(data.meals[0].strMealThumb);
        randommeal.setAttribute('src',`${data.meals[0].strMealThumb}`)
        imgname.innerText =`${data.meals[0].strMeal}`;
        console.log(imgname)
        // randomness.setAttribute('onclick','recipe-details')
        document.getElementById("ingredients").addEventListener('click',()=>{
            console.log("hello")
            popup(data.meals[0])
            fetchId(data.meals[0].idMeal)
        })
        const lastestclick=document.getElementById("latest")
lastestclick.addEventListener('click',()=>{
    popup(data.meals[0])
            fetchId(data.meals[0].idMeal)
})
    })
    .catch((error)=>{
        console.log("sorry an error occured",error)
    })
}

randomness()


const fetchIngredientsRecipe=(meals)=>{
    console.log(meals);
    let ingredients= "";
    for(let i=1;i<=20;i++){
        const items=meals[`strIngredient${i}`];
        if(items){
            const measure=meals[`strMeasure${i}`];
            ingredients+=`<li>${measure} ${items}</li>`
        }
        else{
            break;
        }
    }
return ingredients;
}

const popup=(meals)=>{
   
}

closeRecipe.addEventListener('click',()=>{
    recipeIngredients.parentElement.style.display="none";
})

