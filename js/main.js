async function fetchCSV(url) {
    let res;
    try {
        res = await fetch(url, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Response status: ${res.statusText}`);

        }
    } catch (error) {
        console.error(error.message);
        return false;
    }

    const data = await res.text();
    const rows = data.split('\n');

    const header = rows[0].trim().split(",");

    let dataArr = [];

    for (let i = 1; i < rows.length; i++) {
        let obj = {};
        const temp = rows[i].trim().split(",");

        for (let y = 0; y < header.length; y++) {
            obj[header[y]] = temp[y];
        }
        dataArr.push(obj);
    }

    return dataArr;
}


function productCardGenerator(data) {
    let finalImg = !data.img ? "system/placeholder.jpg" : data.img;

    const newDiv = document.createElement('div');
    newDiv.classList.add('col', 'mb-5');
    newDiv.innerHTML = `
        <div class="card h-100 text-center">
            <img loading="lazy" class="card-img-top" src="${window.location.origin}/clearance-catalog/img/${finalImg}" alt="Card image">
	    <div class="card-header">
	        <h4 class="card-title">${data.Description}</h4>
		</div>
            <div class="card-body">
                
		<div class="row">
		    <div class="col">
			<p class="card-text fw-bold mb-1">SKU</p>
 		    	<p class="lead">${data.SKU}</p>
		    </div>
	            <div class="col">
			<p class="card-text fw-bold mb-1">Quantity</p>
 		    	<p class="lead">${data.QOH}</p>
		    </div>		
		</div>
                <h3>Price : $${data.Retail}</h3>
            </div>
        </div>
    `
    return newDiv

}

function categoryCardGenerator(data) {
    let finalImg = !data.img ? "system/placeholder.jpg" : data.img;

    const newDiv = document.createElement('div');
    newDiv.classList.add('col', 'mb-5');
    newDiv.innerHTML = `
        <div class="card h-100">
            <img loading="lazy" class="card-img-top" src="${window.location.origin}/clearance-catalog/img/category/${finalImg}" alt="Card image">
            <div class="card-body">
                <h4 class="card-title">${data.name}</h4>
                <a href="#" class="btn btn-success" data-src="${data.file}">View Products</a>
            </div>
        </div>
    `
    return newDiv
}

function menuGenerator(data){
    const newLink = document.createElement('a');
    newLink.href = "#";
    newLink.classList.add('btn', 'btn-success', 'mx-2', 'my-2');
    newLink.dataset.src = data.file;
    newLink.innerText = data.name;
    
    return newLink;
}

function missingProducts(){
    const newDiv = document.createElement('div');
    newDiv.classList.add('text-center');
    newDiv.innerHTML = `
        <img loading="lazy" width="125px" src="${window.location.origin}/clearance-catalog/img/system/warning.png" alt="warning icon">
        <h2>No products available!</h2>
    `

    return newDiv;
}
