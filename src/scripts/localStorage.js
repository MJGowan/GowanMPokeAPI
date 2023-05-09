function saveToLocalStorageByName(name){
    //get current values that are saved into local storage
    //create an array of values to store into local storage
    let favorites = getLocalStorage();

    //add new name to our favorites array
    favorites.push(name);

    //save updated array to local storage
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

function getLocalStorage(){
    let localStorageData = localStorage.getItem('Favorites');
    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name){
    let favorites = getLocalStorage();
    let nameIndex = favorites.indexOf(name);
    favorites.splice(nameIndex, 1);
    localStorage.setItem('Favorites', JSON.stringify(favorites))
}

export { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage }