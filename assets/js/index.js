// $("#update_user1").submit(function(event) {
//     event.preventDefault();

//     var unindexed_array = $(this).serializeArray();
//     var data = {}
//     var updateById = document.getElementById("idFormUpdate").value

//     $.map(unindexed_array, function(n, i) {
//         data[n['name']] = n['value']
//     })

//     var request = {
//         "url": `http://localhost:8000/api/v1/update/${updateById}`,
//         "method": "PUT",
//         "data": data
//     }

//     $.ajax(request).done(function(response) {
//         alert("Data Updated");
//         window.location = "http://localhost:8000/user-list"
//     })
// })

// $("#delete_user").submit(function(event) {
//     event.preventDefault();

//     var unindexed_array = $(this).serializeArray();
//     var data = {}
//     var deleteById = document.getElementById("idFormUpdate").value

//     $.map(unindexed_array, function(n, i) {
//         data[n['name']] = n['value']
//     })

//     var request = {
//         "url": `http://localhost:8000/api/v1/delete/${deleteById}`,
//         "method": "DELETE"
//     }

//     $.ajax(request).done(function(response) {
//         alert("Data Deleted");
//         window.location = "http://localhost:8000/user-list"
//     })
// })