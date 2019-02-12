let dishes = [];

document.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("start");

    let menu = document.querySelector("#menu");
    document.querySelector("#show_all").addEventListener("click", function () {
        document.querySelectorAll("button").forEach(button => {
            button.classList.remove("button_chosen");
            this.classList.add("button_chosen");
        });
        showMenu();
    });

    let filterButtons = document.querySelectorAll(".filter_button");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            let category = this.getAttribute("data-type");
                dishesByCategory(category);
                document.querySelectorAll("button").forEach(button => {
                    button.classList.remove("button_chosen");
                    this.classList.add("button_chosen");
                })
            }
        )
    });

    async function getJson() {
        console.log("getJson");
        let jsonData = await fetch("dishes.json");
        dishes = await jsonData.json();
        showMenu();
    }

    function showMenu() {
        menu.innerHTML = "";
        console.log("showMenu");
        dishes.forEach(dish => {
            menu.innerHTML +=
                `<div class="dish_container">
                    <img src="images/small/${dish.billede}-sm.jpg">
                    <h2>${dish.navn}</h2>
                    <div class="origin">${dish.oprindelse}</div>
                    <p>${dish.kort}</p>
                    <div class="price">Pris: ${dish.pris},-</div>
                </div>
                </div>`;
        });
    }

    getJson();

}

function dishesByCategory(category) {
    console.log("Filtered");
    menu.innerHTML = "";
    const filtered = dishes.filter(dish => dish.kategori === category);
    filtered.forEach(dish => {
        menu.innerHTML +=
            `<div class="dish_container">
                    <img src="images/small/${dish.billede}-sm.jpg">
                    <h2>${dish.navn}</h2>
                    <div class="origin">${dish.oprindelse}</div>
                    <p>${dish.kort}</p>
                    <div class="price">Pris: ${dish.pris},-</div>
                </div>
                </div>`;
    });
}
