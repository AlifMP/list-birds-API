function getBirds() {
  $value = $("#select-type").val();
  $.ajax({
    url: "http://localhost/list-birds-API/controller/DBHelper.php",
    type: "GET",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      typebird_id: $value,
    },
    success: function (result) {
      if (result.length > 0) {
        var imageResult = "";
        result.forEach(function (images) {
          imageResult += `<div class="card mb-3" style="max-width: auto; max-height: auto;">
                   <div class="row g-0">
                       <div class="col-md-4">
                           <img src="${images.pict_bird}" class="img-fluid rounded-start" style="margin-left: -12px; width: 100%; height: 100%;">
                       </div>
                       <div class="col-md-8">
                           <div class="card-body" style="">
                               <h4 class="card-title">${images.name_of_bird}</h4>
                               <p class="card-text">Type of bird: ${images.type_of_birds}</p>
                               <p class="card-text"><small class="text-muted">Category: ${images.category_birds}</small></p>
                           </div>
                       </div>
                   </div>
               </div>`;
        });
        $("#bird_list").html(imageResult);
      } else {
        $("#bird_list").html(`
        <div class="col">
        <h1 class="text-center">Cannot Load Birds</h1>
        </div>
        `);
      }
    },
    error: function (xhr, status, error) {
      if (xhr.status === 404) {
        $("#bird_list").html(`<div class="col">
        <h1 class="text-center">Data Not Found</h1>
        </div>`);
      } else if (xhr.status === 500) {
        $("#bird_list").html(`<div class="col">
        <h1 class="text-center">Internal Server Error</h1>
        </div>`);
      } else {
        console.log("AJAX Error:", status, error);
      }
    },
  });
}

$(document).ready(function () {
  $.ajax({
    url: "http://localhost/list-birds-API/controller/Type.php",
    type: "GET",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (result) {
      if (result.length > 0) {
        result.forEach(function (item) {
          $("#select-type").append(`<option value="${item.id}" style="text-transform: capitalize;">${item.type_of_birds}</option>`);
        });
      } else {
        $("#bird_list").html(`
        <div class="col">
        <h1 class="text-center">Cannot Load Type Of Birds</h1>
        </div>
        `);
      }
    },
    error: function (xhr, status, error) {
      if (xhr.status === 404) {
        $("#bird_list").html(`<div class="col">
        <h1 class="text-center">Data Not Found</h1>
        </div>`);
      } else if (xhr.status === 500) {
        $("#bird_list").html(`<div class="col">
        <h1 class="text-center">Internal Server Error</h1>
        </div>`);
      } else {
        console.log("AJAX Error:", status, error);
      }
    },
  });
});

$("#select-type").change(function () {
  if ($("#select-type").val() == "Choose Type") {
    $("#bird_list").html(`
    <div class="col">
    <h1 class="text-center">Please choose one type of bird</h1>
    </div>
    `);
  } else {
    getBirds();
  }
});
