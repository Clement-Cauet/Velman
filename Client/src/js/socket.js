document.getElementById('connexion').hidden = false;
document.getElementById('table').hidden = true;

document.getElementById('connect').addEventListener('click', function() {
    var serverName  = document.getElementById('serverName').value;
    var hostName    = document.getElementById('hostName').value;
    var userName    = document.getElementById('userName').value;
    var password    = document.getElementById('password').value;
    var dbName      = document.getElementById('dbName').value;

    var socket = new WebSocket("ws://"+ serverName +":1234");


    // Lorsque la connexion est établie.
    socket.onopen = function() {
        document.getElementById('connexion').hidden = true;
        document.getElementById('table').hidden = false;

        var data = hostName+";"+userName+";"+password+";"+dbName;
        socket.send(data);

        console.log("Client WebSocket: Nouvelle connexion");
    };

    // Lorsque la connexion se termine.
    socket.onclose = function() {
        document.getElementById('connexion').hidden = false;
        document.getElementById('table').hidden = true;

        console.log("Client WebSocket: Deconnexion");
    };

    // Récupération des erreurs.
    // Si la connexion ne s'établie pas,
    socket.onerror = function(error) {
        console.error(error);
    };
            
    // Lorsque le serveur envoi un message.
    socket.onmessage = function(event) {
        var message = event.data;
        var regex = /[^;]+/g;
        const messageContent = [message.match(regex)];

        var tblBody = document.getElementById('tbody')
        var row = document.createElement("tr");
        for(var i = 0; i < messageContent[0].length; i++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(messageContent[0][i])
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
        tblBody.scrollTop = tblBody.scrollHeight;
    };

    document.getElementById('disconnect').addEventListener('click', function() {
        socket.close();
    });
});