<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <table id="blog" border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Post</th>
          <th>Create At</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr id="loading">
          <td clet tableRow = `<tr>
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>${item.post}</td>
                            <td>${item.createaAt}</td>                
                        <tr>`;olspan="4">Loading ...</td>
        </tr>
        <!-- content here -->
      </tbody>
    </table>
  </body>
</html>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    function deleteRow(id) {
        $.ajax({
            url: "http://localhost:8080/php/blog.php",
            type:"DELETE"
            data: {id: id},
            success: function (result){
                console.log(result);

            },
        })
    }
  $(document).ready(function () {
    let jsonUrl = "http://localhost:8080/php/blog.php";

    $.getJSON(jsonUrl, function (jsonData) {
      $("#loading").remove();

      // console.log(jsonData.data);
      jsonData.data.forEach(function (item) {
        let tableRow = `<tr>
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>${item.post}</td>
                            <td>${item.createAt}</td>                
                            <td>
                                <button class="btn-info" data-id="${item.id}">Info</button>
                                <button class="btn-del" onclick="deleteRow(${item.id})">Del</button>
                            </td>                
                        <tr>`;

        $("#blog tbody").append(tableRow);
      });
    });

    $(document).ajaxStop(function () {
      $(".btn-info").click(function () {
        let id = $(this).data("id");
        alert("Info: " + id);
      });
    });
    
  });
</script>