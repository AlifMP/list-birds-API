$(document).ready(function () {
  $.ajax({
    url: "http://localhost/list-birds-API/controller/Birds.php",
    type: "GET",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (result) {
      let tableBirds = `
      <table class="table table table-hover mt-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Pict Bird</th>
          <th scope="col">Name of Bird</th>
          <th scope="col">Type of Bird</th>
          <th scope="col">Categories Bird</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      `;

      result.forEach(function (item, results) {
        tableBirds += `
        <tr>
        <th scope="row">${results + 1}</th>
        <td><img src="${item.pict_bird}" style="width: 150px;"></td>
        <td>${item.name_of_bird}</td>
        <td>${item.type_of_bird}</td>
        <td>${item.categories_bird}</td>      
        <td>
          <button type="button" class="btn btn-warning" onclick="openEditModal('${item.id}', '${item.pict_bird}', '${item.name_of_bird}', '${item.type_of_bird}', '${item.categories_bird}')">Edit</button>
          <button type="button" class="btn btn-danger" onclick="openDeleteModal('${item.id}', '${item.pict_bird}', '${item.name_of_bird}')">Delete</button>
        </td>
      </tr>
        `;
      });

      tableBirds += `
      </tbody>
      </table>
      `;

      $("#bird-list").html(tableBirds);
    },
    error: function (xhr, status, error) {
      if (xhr.status === 404) {
        $("#alert").html(`
      <div class="alert alert-danger" role="alert">
      Data Bird Not Found.
      </div>`);
      } else if (xhr.status === 500) {
        $("#alert").html(`
        <div class="alert alert-danger" role="alert">
        Internal Server Error.
        </div>`);
      } else {
        console.log("AJAX Error:", status, error);
      }
    },
  });
});

function openEditModal(id, pict_bird, name_of_bird, type_of_bird, categories_bird) {
  $("#editBirdId").val(id);
  $("#imageEdit").html(`<img src="${pict_bird}" style="width: 100%; height: auto">`);
  $("#editName").val(name_of_bird);
  $("#editType").val(type_of_bird);
  $("#editCategories").val(categories_bird);
  $("#editModal").modal("show");
}

function editBird() {
  var idVal = $("#editBirdId").val();
  var nameVal = $("#editName").val();
  var typeVal = $("#editType").val();
  var categoryVal = $("#editCategories").val();
  var fileVal = $("#formFileEdit")[0].files[0];

  var formData = new FormData();
  formData.append("id", idVal);
  formData.append("name_of_bird", nameVal);
  formData.append("type_of_bird", typeVal);
  formData.append("categories_bird", categoryVal);
  formData.append("pict_bird", fileVal);
  if ($("#editName").val() == "") {
    $("#alert-modal-edit").html(`
        <div class="alert alert-danger" role="alert">
        Bird name cannot be empty.
        </div>
        `);
  } else if ($("#editType").val() == "Choose Type") {
    $("#alert-modal-edit").html(`
        <div class="alert alert-danger" role="alert">
        Please Choose One Type Of Bird.
        </div>
        `);
  } else if ($("#editCategories").val() == "Choose Category") {
    $("#alert-modal-edit").html(`
            <div class="alert alert-danger" role="alert">
            Please Select One Bird Category.
            </div>
            `);
  } else if ($("#formFileEdit").val() == "") {
    $("#alert-modal-edit").html(`
            <div class="alert alert-danger" role="alert">
            Bird picture cannot be empty.
            </div>
            `);
  } else {
    $.ajax({
      url: "http://localhost/list-birds-API/controller/EditBirds.php",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        $("#alert").html(`
            <div class="alert alert-success" role="alert">
            Bird information successfully edited.
            </div>
            `);
        $("#editModal").modal("hide");
        location.reload();
      },
      error: function (xhr, status, error) {
        if (xhr.status === 404) {
          $("#alert").html(`
        <div class="alert alert-danger" role="alert">
        Error editing type of bird.
        </div>`);
        } else if (xhr.status === 500) {
          $("#alert").html(`
          <div class="alert alert-danger" role="alert">
          Internal Server Error.
          </div>`);
        } else {
          console.log("AJAX Error:", status, error);
        }
      },
    });
  }
}

function openDeleteModal(id, pict_bird, name_of_bird) {
  $("#deleteBirdId").val(id);
  $("#imageDelete").html(`<img src="${pict_bird}" style="width: 100%; height: auto">`);
  $("#deleteTypeSpan").html(name_of_bird);
  $("#deleteModal").modal("show");
}

function deleteBird() {
  var idVal = $("#deleteBirdId").val();
  $.ajax({
    url: "http://localhost/list-birds-API/controller/DelBirds.php",
    type: "DELETE",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      id: idVal,
    }),
    success: function (data) {
      $("#alert").html(`
      <div class="alert alert-success" role="alert">
      Success Delete Data.
      </div>`);
      location.reload();
    },
    error: function (xhr, status, error) {
      console.log("AJAX Error:", status, error);
      $("#alert").html(`
      <div class="alert alert-danger" role="alert">
      Error deleting bird information.
      </div>`);
    },
  });
}

function displayTypes() {
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
          $("#floatingSelect1").append(`<option value="${item.id}" style="text-transform: capitalize;">${item.type_of_birds}</option>`);
          $("#editType").append(`<option value="${item.id}" style="text-transform: capitalize;">${item.type_of_birds}</option>`);
        });
      } else {
        $("#alert").html(`
            <div class="alert alert-danger" role="alert">
            Type of bird cannot be empty.
            </div>`);
      }
    },
    error: function (xhr, status, error) {
      if (xhr.status === 404) {
        $("#alert").html(`
      <div class="alert alert-danger" role="alert">
      Data Type Not Found.
      </div>`);
      } else if (xhr.status === 500) {
        $("#alert").html(`
        <div class="alert alert-danger" role="alert">
        Internal Server Error.
        </div>`);
      } else {
        console.log("AJAX Error:", status, error);
      }
    },
  });
}

function displayCategory() {
  $.ajax({
    url: "http://localhost/list-birds-API/controller/Categories.php",
    type: "GET",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data) {
      if (data.length > 0) {
        data.forEach(function (item) {
          $("#floatingSelect2").append(`<option value="${item.id}">${item.category_birds}</option>`);
          $("#editCategories").append(`<option value="${item.id}" style="text-transform: capitalize;">${item.category_birds}</option>`);
        });
      } else {
        $("#alert").html(`
                <div class="alert alert-danger" role="alert">
                Category value cannot be empty.
                </div>`);
      }
    },

    error: function (xhr, status, err) {
      if (xhr.status === 404) {
        $("#alert").html(`
            <div class="alert alert-danger" role="alert">
            Data Category not found.
            </div>
            `);
      } else if (xhr.status === 500) {
        $("#alert").html(`
            <div class="alert alert-danger" role="alert">
            Internal Server Error.
            </div>
            `);
      } else {
        console.log("AJAX Error: ", status, err);
      }
    },
  });
}

function save() {
  var nameVal = $("#floatingInput").val();
  var typeVal = $("#floatingSelect1").val();
  var categoryVal = $("#floatingSelect2").val();
  var fileVal = $("#formFile")[0].files[0];

  var formData = new FormData();
  formData.append("name_of_bird", nameVal);
  formData.append("type_of_bird", typeVal);
  formData.append("categories_bird", categoryVal);
  formData.append("pict_bird", fileVal);
  if ($("#floatingInput").val() == "") {
    $("#alert-modal").html(`
        <div class="alert alert-danger" role="alert">
        Bird name cannot be empty.
        </div>
        `);
  } else if ($("#floatingSelect1").val() == "Choose Type") {
    $("#alert-modal").html(`
        <div class="alert alert-danger" role="alert">
        Please Choose One Type Of Bird.
        </div>
        `);
  } else if ($("#floatingSelect2").val() == "Choose Category") {
    $("#alert-modal").html(`
            <div class="alert alert-danger" role="alert">
            Please Select One Bird Category.
            </div>
            `);
  } else if ($("#formFile").val() == "") {
    $("#alert-modal").html(`
            <div class="alert alert-danger" role="alert">
            Bird picture cannot be empty.
            </div>
            `);
  } else {
    $.ajax({
      url: "http://localhost/list-birds-API/controller/AddInfo.php",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        $("#alert").html(`
            <div class="alert alert-success" role="alert">
            Bird information successfully added.
            </div>
            `);
      },
      error: function (xhr, status, error) {
        console.log("AJAX Error: ", status, error);
        $("#alert").html(`
        <div class="alert alert-danger" role="alert">
        There was an error adding bird information.
        </div>
        `);
      },
    });
  }
}

displayTypes();
displayCategory();
