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

        if(temp[0] == '' || temp[0] == undefined || temp[0] == null){
            continue
        }
        
        for (let y = 0; y < header.length; y++) {
            obj[header[y]] = temp[y];
        }
        dataArr.push(obj);
    }

    return dataArr;
}

function checkDiscount(oldPrice,newPrice){
    diff = oldPrice - newPrice;

    return (diff == 0)? false : true;
}

function productCardGenerator(data) {
    let finalImg = !data.img ? "system/placeholder.jpg" : data.img;

    discountBadge = `
        <div class="card-img-overlay" style="text-align: right; height:100px;">
            <span class="p-2 fw-bolder rounded" style="color: #fff; background-color: #198754;">${Math.floor(100 - (data.new_retail/data.old_retail) * 100)}% OFF</span>
        </div>
    `
    discountPrice = `
        <div class="row cols-row-2 align-items-center text-center">
            <div class="col">
                <h6 class="fw-normal" style="margin-bottom: 0;">WAS</h6>    
                <h5 class="fw-bold" style="line-height: 1; text-decoration: line-through">$${data.old_retail}${data.unit}</h5>
            </div>
            <div class="col" style="color: #198754;">
                <h4 class="fw-normal" style="margin-bottom: 0;">NOW</h4>
                <h3 class="fw-bold" style="line-height: 1;">$${data.new_retail}${data.unit}</h3>
            </div>
        </div>
    `
    regularPrice = `
        <div class="row">
            <div class="col text-center" style="color: #198754;">
                <h4 class="fw-normal" style="margin-bottom: 0;">PRICE</h4>
                <h3 class="fw-bold" style="line-height: 1;">$${data.new_retail}${data.unit}</h3>
            </div>
        </div>
    `

    discount = checkDiscount(data.old_retail, data.new_retail);
    badge = discount ? discountBadge : '';
    price = discount ? discountPrice : regularPrice;

    let qtyUnit;

    if(data.unit == 'EA'){
        if(data.QOH > 1){
            qtyUnit = 'PCS' 
        }else{
            qtyUnit = 'PC'
        }
    }else{
        qtyUnit = data.unit
    }

    const newDiv = document.createElement('div');
    newDiv.classList.add('col', 'mb-5');
    newDiv.innerHTML = `
        
        <div class="card h-100">
            
            <img loading="lazy" class="card-img-top" src="${window.location.origin}/clearance-catalog/img/${finalImg}" alt="Card image">
            ${badge}
            <div class="card-header text-center">
                <h4 class="card-title">${data.Description}</h4>
            </div>
            <div class="card-body">
                <div class="row cols-row-2 text-center">
                    <div class="col">
                    <p class="card-text fw-bold mb-1">SKU</p>
                        <p class="lead">${data.SKU}</p>
                    </div>
                        <div class="col">
                    <p class="card-text fw-bold mb-1">Quantity</p>
                        <p class="lead">${data.QOH} ${qtyUnit}</p>
                    </div>
                </div>
                <hr />
                ${price}
                <div class="text-center">
                    <button type="button" class="btn btn-outline-success mx-auto mt-2" data-bs-toggle="modal" data-bs-target="#contactModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"></path>
                        </svg>
                        Contact Us
                    </button>
                </div>
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
