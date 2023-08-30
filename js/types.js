$(document).ready(function () {
  $.ajax({
    url: "http://localhost/list-birds-API/controller/Type.php",
    type: "GET",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (result) {
      let tableType = `
      <table class="table table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Type of Birds</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      `;

      result.forEach(function (item, index) {
        tableType += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${item.id}</td>
        <td>${item.type_of_birds}</td>
        <td>
          <button type="button" class="btn btn-warning" onclick="openEditModal(${item.id}, '${item.type_of_birds}')">Edit</button>
          <button type="button" class="btn btn-danger" onclick="openDeleteModal(${item.id}, '${item.type_of_birds}')">Delete</button>
        </td>
      </tr>
        `;
      });

      tableType += `
      </tbody>
      </table>
      `;

      $("#type-list").html(tableType);
    },
  });
});

function openEditModal(id, type_of_birds) {
  $("#editTypeId").val(id);
  $("#editInput").val(type_of_birds);
  $("#editModal").modal("show");
}

function editType() {
  var id = $("#editTypeId").val();
  var editedType = $("#editInput").val();

  if (editedType == "") {
    $("#editModal").modal("hide");
    $("#alert").html(`
          <div class="alert alert-danger" role="alert">
          Value cannot be empty.
          </div>
          `);
  } else {
    $.ajax({
      url: "http://localhost/list-birds-API/controller/EditType.php",
      type: "PUT",
      dataType: "json",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id: id,
        type_of_birds: editedType,
      }),
      success: function (res) {
        $("#alert").html(`
          <div class="alert alert-success" role="alert">
          Type of bird edited successfully.
          </div>
          `);
        $("#editModal").modal("hide");
        location.reload();
      },
      error: function (xhr, status, error) {
        console.log("AJAX Error:", status, error);
        $("#alert").html(`
          <div class="alert alert-danger" role="alert">
          Error editing type of bird.
          </div>`);
        $("#editModal").modal("hide");
      },
    });
  }
}

function openDeleteModal(id, type_of_birds) {
  $("#deleteTypeId").val(id);
  $("#deleteTypeSpan").text(type_of_birds);
  $("#deleteModal").modal("show");
}

function deleteType() {
  var id = $("#deleteTypeId").val();

  $.ajax({
    url: "http://localhost/list-birds-API/controller/DelType.php",
    type: "DELETE",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      id: id,
    }),
    success: function (res) {
      $("#alert").html(`
          <div class="alert alert-success" role="alert">
          Type of bird deleted successfully.
          </div>
          `);
      $("#deleteModal").modal("hide");
      location.reload();
    },
    error: function (xhr, status, error) {
      console.log("AJAX Error:", status, error);
      $("#alert").html(`
          <div class="alert alert-danger" role="alert">
          Error deleting type of bird.
          </div>`);
      $("#deleteModal").modal("hide");
    },
  });
}

$("#btn-save-type").click(function () {
  var valueType = $("#floatingInput").val();

  if (valueType == "") {
    $("#alert").html(`
      <div class="alert alert-danger" role="alert">
      Type of bird cannot be empty.
      </div>`);
  } else {
    $.ajax({
      url: "http://localhost/list-birds-API/controller/AddType.php",
      type: "POST",
      dataType: "json",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        type_of_birds: valueType,
      }),
      success: function (response) {
        $("#alert").html(`
      <div class="alert alert-success" role="alert">
      Type of bird added successfully.
      </div>
      `);
        location.reload();
      },
      error: function (xhr, status, error) {
        console.log("AJAX Error:", status, error);
        $("#alert").html(`
      <div class="alert alert-danger" role="alert">
      Error adding type of bird.
      </div>`);
      },
    });
  }
});
