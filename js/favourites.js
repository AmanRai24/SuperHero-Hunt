const Fav= (function(){
 
    //display Superhero
    function renderFavourites(){
        const getfav= Common.getFavouriteSuperheroes();
        const Result= document.getElementById('search-result-list');
        Result.innerHTML='';

        if(!getfav || getfav.length === 0){
            Result.innerHTML='<li class="not-found">No SuperHero in Favourites.... </li>';
            

        }
        else{
            getfav.forEach((data)=>{
                const li= document.createElement('li');

                li.classList.add('search-result');

                li.innerHTML=`<div class="search-left">
                                <img src=${data.image.url} alt="" />
                            </div>
                            <div class="search-right">
                                <a href="./Power.html?id=${data.id}">
                                    <div class="name">${data.name}</div>
                                </a>
                                <div class="full-name">${data.biography['full-name']}</div>

                                <div class="address">${data.biography['place-of-birth']}</div>
                                <button class="btn remove-from-fav" data-id=${data.id}>Remove from favourites</button>
                            </div>`;
                            Result.appendChild(li);
            });
        }
        Common.hideLoader();
        return;
    }

    //  add/remove from fav
    function handleDocumentClick(e){
        const target= e.target;

        if(target.classList.contains('remove-from-fav')){
            const searchResultClickedId = target.dataset.id;
            Common.removeHero(searchResultClickedId);
            renderFavourites();
        }
    }

    function init(){
        Common.showLoader();
        renderFavourites();

        document.addEventListener('click', handleDocumentClick);
    }
    return{
        init
    }
})();