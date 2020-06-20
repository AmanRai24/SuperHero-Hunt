const Info=(function(){
    

    //get superhero ID using URL
    function getHeroID(){
        const urlparams = new URLSearchParams(window.location.search);
        return urlparams.get('id');
    }

    //Show information of superhero 
    function SuperheroInformation(details){
        Common.hideLoader();
        const superHeroInfo= document.querySelector('.Info-details');
        
        const indexOfSuperHeroInFav= Common.getFavouriteSuperheroes().findIndex(
            (hero) => hero.id === details.id
        );

        if(!details){
            superHeroInfo.innerHTML= `<span class="error">Error in finding Superhero Please Try again <a href="./index.html">HOME</a></span>`
        }else{
            superHeroInfo.innerHTML=`
                <div class="HeroImg">
                    <img src= ${details.image.url} alt="Image" >
                    <span id="style">${details.name}</span>
                    <button class="btn add-to-fav" data-id=${details.id} style="display: ${indexOfSuperHeroInFav === -1 ? 'block':'none'}">
                        Add to favourites
                    </button>
                    <button class="btn remove-from-fav" data-id=${details.id} style="display: ${indexOfSuperHeroInFav === -1 ? 'none':'block'}">
                        Remove from favourites
                    </button>
                </div>
                <div class="Allinfo">
                    <div class="info">
                        <p>
                        <h1 class="info-title">Biography</h1>
                        <h3>Name: <span>${details.name}</span> </h3>
                        <h3>Full Name: <span>${details.biography["full-name"]}</span> </h3>
                        <h3>Alter-Egos: <span>${details.biography["alter-egos"]}</span> </h3>
                        <h3>Place-of-Birth: <span>${details.biography["place-of-birth"]}</span> </h3>
                        <h3>First-Appearance: <span>${details.biography["first-appearance"]}</span> </h3>
                        <h3>Publisher: <span>${details.biography["publisher"]}</span> </h3>
                        <h3>Alignment: <span>${details.biography["alignment"]}</span> </h3>
                        </p>
                    </div>

                    <div class="info">
                        <p>
                        <h1 class="info-title">Powerstats</h1>
                        <h3>Intelligence: <span>${details.powerstats.intelligence}</span> </h3>
                        <h3>Strength: <span>${details.powerstats.strength}</span> </h3>
                        <h3>Speed: <span>${details.powerstats.speed}</span> </h3>
                        <h3>Durability: <span>${details.powerstats.durability}</span> </h3>
                        <h3>Power: <span>${details.powerstats.power}</span> </h3>
                        <h3>Combat: <span>${details.powerstats.combat}</span> </h3>
                        </p>
                    </div>


                    <div class="info">
                        <p>
                        <h1 class="info-title">Appearance</h1>
                        <h3>Gender: <span>${details.appearance.gender}</span> </h3>
                        <h3>Race: <span>${details.appearance.race}</span> </h3>
                        <h3>Height: <span>${details.appearance.height[1]}</span> </h3>
                        <h3>Weigh: <span>${details.appearance.weight[1]}</span> </h3>
                        <h3>Eye-color: <span>${details.appearance["eye-color"]}</span> </h3>
                        <h3>Hair-color: <span>${details.appearance["hair-color"]}</span> </h3>
                        </p>
                    </div>

                    <div class="info">
                        <p>
                        <h1 class="info-title">Work</h1>
                        <h3>Occupation: <span>${details.work.occupation}</span> </h3>
                        <h3>Base: <span>${details.work.base}</span> </h3>
                        <p>
                    </div>
                </div>`;
        }
        information(details);
    }

    let SuperHeroDetails;
    function information(allinfo){
        SuperHeroDetails=allinfo;
    }

    //Add/Remove from favourites
    function handleDocumentClick(e) {
        const target = e.target;
    
        if(target.classList.contains('add-to-fav')){
            Common.addHero(SuperHeroDetails);
            SuperheroInformation(SuperHeroDetails);
        } else if (target.classList.contains('remove-from-fav')) {
            // Find the hero data and remove from local storage
            const searchResultClickedId = target.dataset.id;
    
            // Show add to fav button and hide the remove from fav button
            const addToFavBtn = document.querySelector(
            `button[data-id="${searchResultClickedId}"].add-to-fav`
            );
            if (addToFavBtn) addToFavBtn.style.display = 'block';
    
            const removeFromFavBtn = document.querySelector(
            `button[data-id="${searchResultClickedId}"].remove-from-fav`
            );
            if (removeFromFavBtn) removeFromFavBtn.style.display = 'none';
    
            Common.removeHero(searchResultClickedId);
        }
    }

     // get all information of a superhero using 'id'
     async function fetchSuperHeroInformation(id){
        const url= Common.apiUrl+id;
        try{
            const allinfo= await Common.apiRequest(`${url}`);
            //console.log(info);
            if(allinfo.success){
                SuperheroInformation(allinfo.data);
            }else{
                SuperheroInformation(null);
            }
        }catch(err){
            console.log('Error!! Cannot Find This SuperHero',err);
            SuperheroInformation(null);
        }

    }

    
    function init(){
        const heroId= getHeroID();
 
        Common.showLoader();
        document.addEventListener('click',handleDocumentClick);
        fetchSuperHeroInformation(heroId);
    }

    return{
        init
    }
})();