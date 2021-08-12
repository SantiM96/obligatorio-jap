//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    async function showProductsList(){

        const products = await getJSONData(PRODUCTS_URL)
        console.log(products.data)

        for (let i = 0; i < products.data.length; i++){
        // for(product of products.data){

            document.getElementById("products-list-container").innerHTML += `
                <a href="products-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + products.data[i].imgSrc + `" alt="` + products.data[i].description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ products.data[i].name +`</h4>
                                <small class="text-muted">` + products.data[i].soldCount + ` artículos</small>
                            </div>
                            <p class="mb-1">` + products.data[i].description + `</p>
                            <p class="mb-1">${products.data[i].currency} ${products.data[i].cost}</p>
                        </div>
                    </div>
                </a>
            `

        }
    }

    showProductsList()

});