// Fanny Ståhl 2018
// Togglemenu.ts for Stäkvikens Samfällighet

// Variables
let menuShow: boolean = false;
let menuContent: HTMLElement = document.getElementById("main-nav-ul");

// Event listener to show menu on resize above 768 pixels ,and hide on resize below 768 pixels
window.addEventListener('resize', function(): void {
    if (this.innerWidth >= 768){
        menuContent.style.maxHeight = "600px";
        menuShow = true;
    } else if (this.innerWidth < 768){
        menuContent.style.maxHeight = "0";
        menuShow = false;
    }
})

// Toggle mobile menu on click
let toggleMenu = function(): void {

    if (!menuShow) {
        menuContent.style.maxHeight = "600px";
        menuShow = true;
    } else {
        menuContent.style.maxHeight = "0";
        menuShow = false;
    }
}