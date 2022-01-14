
function addPokemon (name, imgurl, type1, height, weight, type2) {

    

    name = name.charAt(0).toUpperCase() + name.slice(1);
    type1ImgUrl = "img/" + type1 + ".png";

    // crée un nouvel élément div
    var newDiv = document.createElement("div");

    var newDivAttributes = document.createElement("div");
    var newDivType = document.createElement("div");

    var newH2 = document.createElement("h2");

    var newImgType1 = document.createElement("img");
    

    var newPheight = document.createElement("p");
    var newPweight = document.createElement("p");

    var newImg = document.createElement("img");
    

    // et lui donne un peu de contenu
    var newContentH2 = document.createTextNode(name);
    var newContentPheight = document.createTextNode(height + ' dm');
    var newContentPweight = document.createTextNode(weight + ' hg');

    // ajoute le nœud texte au nouveau div créé

    newImg.setAttribute("src", imgurl);
    newDiv.setAttribute("class", "pokemonContainer");
    newH2.setAttribute("class", "name");

    newImgType1.setAttribute("src", type1ImgUrl);
    

    newDivAttributes.setAttribute("class", "attributes");
    newDivType.setAttribute("class", "type");

    newH2.appendChild(newContentH2);
    newPheight.appendChild(newContentPheight);
    newPweight.appendChild(newContentPweight);

    newDiv.appendChild(newH2);
    
    newDivAttributes.appendChild(newPheight);
    newDivAttributes.appendChild(newPweight);

    newDiv.appendChild(newDivAttributes);
    

    newDiv.appendChild(newImg);

    newDivType.appendChild(newImgType1);
    
    newDiv.appendChild(newDivType);
    

    // ajoute le nouvel élément créé et son contenu dans le DOM
    var currentDiv = document.getElementById('pokemons');

    if (type2 != 0) {
        type2ImgUrl = "img/" + type2 + ".png";
        var newImgType2 = document.createElement("img");
        newImgType2.setAttribute("src", type2ImgUrl);
        newDivType.appendChild(newImgType2);
    }

    currentDiv.appendChild(newDiv)

}



var allPokemons = [];

var isAllPokemonsInside = false

var nthOfPokemons = 151;

for (let i = 1; i <= nthOfPokemons; i++) {
    
    
    fetch('https://pokeapi.co/api/v2/pokemon/' + i)

    .then(function(response) {
                
        return response.json();
    })
    .then(function (response) {

        p_id = response.id;
        p_name = response.name;
        p_imgUrl = response.sprites.front_default;
        p_type1 = response.types[0].type.name;
        p_height = response.height;
        p_weight = response.weight;
        
        if (response.types[1]) {
            p_type2 = response.types[1].type.name;
        }
        else p_type2 = 0; 

        // 0 : id       1 : name        2 : image url       3 : type-1        4 : height      5 : weight    6 : type-2
        allPokemons.push([ p_id, p_name, p_imgUrl, p_type1 , p_height, p_weight, p_type2]);

        if (allPokemons.length == nthOfPokemons) {
            allPokemons.sort((a,b) => a[0] - b[0]);
            launch_pokedex.style.opacity = '1';
        }

    }) 
    
}

var sort_options = document.getElementsByTagName('span');
var sort_id = document.getElementsByTagName('span')[0];
var sort_name = document.getElementsByTagName('span')[1];
var sort_type = document.getElementsByTagName('span')[2];
var sort_height = document.getElementsByTagName('span')[3];
var sort_weight = document.getElementsByTagName('span')[4];

var launch_pokedex = document.getElementsByTagName('span')[5];

var pokemonsdiv = document.getElementById('pokemons');
var pokedex_options = document.getElementsByClassName('pokedex-options')[0];


function sortById(a,b) {
    
    if (a[0] > b[0]) {
        return 1;
    }
    if (a[0]< b[0]) {
        return -1;
    }
    return 0;

}


function sortByName(a,b) {
    
    if (a[1] > b[1]) {
        return 1;
    }
    if (a[1]< b[1]) {
        return -1;
    }
    return 0;

}


function sortByType(a,b) {
    
    if (a[3] > b[3]) {
        return 1;
    }
    if (a[3]< b[3]) {
        return -1;
    }
    return 0;

}

function sortByHeight(a,b) {
    
    if (a[4] > b[4]) {
        return 1;
    }
    if (a[4]< b[4]) {
        return -1;
    }
    return 0;

}


function sortByWeight(a,b) {
    
    if (a[5] > b[5]) {
        return 1;
    }
    if (a[5]< b[5]) {
        return -1;
    }
    return 0;

}

function sortPokemons(typeOfSort, button){
    pokemonsdiv.innerHTML = "";
    allPokemons.sort(typeOfSort)

    for (let index = 0; index <= 4; index++) {
        sort_options[index].style.backgroundColor ="white";
    }

    button.style.backgroundColor = "yellow";

    allPokemons.forEach(element => {
        // 0 : id       1 : name        2 : image url       3 : type1        4 : height      5 : weight      6 : type2
        addPokemon(element[1], element[2], element[3], element[4], element[5], element[6])
    });

    pokemonsdiv.style.opacity = "1";
}

launch_pokedex.addEventListener("click", () => {
    launch_pokedex.style.display = "none";
    pokedex_options.style.opacity = "1"
    sortPokemons(sortById, sort_id);
})



sort_id.addEventListener("click", () => {
    sortPokemons(sortById, sort_id);
    
})

sort_name.addEventListener("click", () => {
    sortPokemons(sortByName, sort_name);
})

sort_type.addEventListener("click", () => {
    sortPokemons(sortByType, sort_type);
})

sort_height.addEventListener("click", () => {
    sortPokemons(sortByHeight, sort_height);
})

sort_weight.addEventListener("click", () => {
    sortPokemons(sortByWeight, sort_weight);
})



function search_pokemon() {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();
    let pk_type = document.getElementsByClassName('type');
    let pk_name = document.getElementsByClassName('name');
    let pk_container = document.getElementsByClassName('pokemonContainer');
    
    for (i = 0; i < pk_name.length; i++) { // Pour chaque Pokemon :
        if (!pk_name[i].innerHTML.toLowerCase().includes(input)){ // Si le pokémon ne correpond pas avec le pokémon les lettres présentes dans l'input

            if(!pk_type[i].innerHTML.toLowerCase().includes(input)) { // Si le type ne correspond pas avec les lettres présentes dans l'input
                pk_container[i].style.display="none"; // Ne pas afficher la div du pokémon 
            }
        }
        else {
            pk_container[i].style.display="flex";    // Sinon, afficher la div (obligatoire sinon ne réapparait pas)
        }
    }
}