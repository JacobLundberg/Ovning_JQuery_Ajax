// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    var repos = [];
    var projektLista = $('#ProjektLista');
    var pListan = $('<table></table>');
    let contributorCount = 0;
    //    let repo =  { name, created, contributors, numberOfContributors, url, contributors_url };

    // fetch repos
    $.ajax({
        url: "https://api.github.com/users/JacobLundberg/repos",
        type: 'GET',
        dataType: 'json'
    })
        .done(function (json) {
            console.log(json.length);
            for (var i = 0; i < json.length; i++) {
                repos.push({ name: json[i].name, created: json[i].created_at, url: json[i].url, contributors: '', numberOfContributors: 0, contributors_url: json[i].contributors_url });
            }
            console.log(repos.length + ' in fetch repo.');
            fetchContributers();
        })
        .fail(function () {
            alert("Sorry there was a problem fetching repos");
        });


    // fetch contributers for each repo
    function fetchContributers() {
        for (var i = 0; i < repos.length; i++) {
            $.ajax({
                url: repos[i].contributors_url,
                done: function (result) {
                    repos[i].numberOfContributors = result.length;
                    console.log(repos.length + ' in fetch contributers.');
                    for (var j = 0; j < result.length; j++) {
                        //                    repos[i].contributors += result[j].name;
                        repos[i].contributors += j + 'name';
                    }
                    compileTable(pListan);
                }
            });
        };
    }

    function compileTable(pListan) {
        pListan.append("<thead><tr><th>Name</th><th>Created</th><th>#Contributors</th><th>Url</th></tr></thead>");
        pListan.append("<tbody></tbody>");
        console.log(repos.length + ' in compile table.');
        for (var i = 0; i < repos.length; i++) {
            pListan.append("<tr><td>" + repos[i].name + "</td><td>" + repos[i].created + "</td><td>" + repos[i].numberOfContributors + "</td><td><a href=\"" + repos[i].url + "\" >" + repos[i].url + "</a></td></tr>");
        }
        projektLista.hide().html(pListan).fadeIn();
    }
    $("table").addClass("table").addClass("text-left").addClass("table-hover").addClass("table-bordered");
});




