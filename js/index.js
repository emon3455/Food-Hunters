const loadData=(result)=>{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${result}`;
    fetch(url)
    .then(res => res.json())
    .then(data=> displayData(data.meals))
}

const displayData=(data)=>{
    
    const container = document.getElementById("card-container");
    container.innerHTML="";

    data.forEach(element => {
        console.log(element.strMeal);
        const div = document.createElement("div");
        div.classList.add("col");
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
                            <a class="btn btn-warning fw-bold"> View Details </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });

}

const searchLoadData=()=>{
    const result = document.getElementById("search-field").value;
    loadData(result);
    document.getElementById("search-field").value="";
}



loadData("fish");