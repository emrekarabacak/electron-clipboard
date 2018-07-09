var games = new Array();
    games[0] = "World of Warcraft";
    games[1] = "Lord of the Rings Online";
    games[2] = "Aion";
    games[3] = "Eve Online";
    games[4] = "Final Fantasy XI";
    games[5] = "City of Heros";
    games[6] = "Champions Online";
    games[7] = "Dark Age of Camelot";
    games[8] = "Warhammer Online";
    games[9] = "Age of Conan";
$(document).ready(function(){
        var list = "";
        for(i=0; i<games.length; i++){
        list +="<li>"+games[i]+"</li>";
        }
    $("#gamelist").append(list);

});
