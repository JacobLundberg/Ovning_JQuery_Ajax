// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    var projektLista = $('#ProjektLista');
    var pListan = $('<table></table>');
    $.ajax({
        url: "https://api.github.com/users/JacobLundberg/repos",
        type: 'GET',
        dataType: 'json'
    })
        .done(function (json) {
            console.log(json.length);
            pListan.append("<thead><tr><th>Name</th><th>Url</th></tr></thead>");
            pListan.append("<tbody></tbody>");
            for (var i = 0; i < json.length; i++) {
                pListan.append("<tr><td>" + json[i].name + "</td><td>" + json[i].url + "</td></tr>");
            }
        })
        .fail(function () {
            alert("Sorry there was a problem");
        });
    projektLista.hide().html(pListan).fadeIn();
    $("table").addClass("table").addClass("text-left").addClass("table-hover").addClass("table-bordered");
});


