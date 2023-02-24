// step-1 create this function to load and fetch data
const loadData=(result)=>{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${result}`;
    fetch(url)
    .then(res => res.json())
    .then(data=> displayData(data.meals))
    .catch(error=>{
        console.log(error);
    })
}

// step-3 creating this function to display data
const displayData=(data)=>{
    
    // 3.1 select the parent element
    const container = document.getElementById("card-container");
    container.innerHTML="";

    // 3.2 loop through all the element
    data.forEach(element => {

        //console.log(element.idMeal); //this is for check 

        //3.3 creating the container which we want to add
        const div = document.createElement("div");
        div.classList.add("col");
        //3.4 set innerHTML 
        div.innerHTML=`
            <div class="card mb-2">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${element.strMealThumb}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${element.strMeal}</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                            <button onclick="showMoreDetails('${element.idMeal}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#foodDetails">
                Details
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        `;
        // 3.5 append child
        container.appendChild(div);
    });

}

// step-4 create this function and use as onclick event in the search button
const searchLoadData=()=>{
    const result = document.getElementById("search-field").value;
    loadData(result);
    document.getElementById("search-field").value="";
}


// step-5: to get more details go to step-3 and check the read more button where you used this function as onclick

const showMoreDetails= async(idMeal)=>{

    try{
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
        const res = await fetch(url);
        const data = await res.json();
        DisplayMore(data.meals[0]);
    }
    catch(ex){
        const body=document.getElementById("meal-thum");
        body.innerHTML=`
            <p class="card-text">
                ${ex}
            </p>
        `;
    }
   
}

const DisplayMore = (data) =>{
    //console.log(data.strInstructions);
    document.getElementById("exampleModalLabel").innerText=data.strMeal;
    const body = document.getElementById("meal-thum");
    body.innerHTML=`
        <div class="">
            <img class="img-fluid" src="${data.strMealThumb}" alt="">
        </div>
        <div class="">
            <p> <strong>catagory: </strong> ${data.strCategory}</p>
            <p> <strong>Area: </strong> ${data.strArea}</p>
            <p> <strong>Instruction: </strong> ${data.strInstructions} </p>
            <p> <strong>Youtube: </strong> ${data.strYoutube}</p>
        </div>
    `;

}

// call the created function after creating the all functions:
loadData("fish");