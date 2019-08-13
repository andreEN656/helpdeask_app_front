import * as signalR from '@aspnet/signalr';

const hubUrl = 'http://localhost:56813/notifications';
let hubConnection;

function create(accessToken) {
  if (hubConnection === undefined) {
    hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    //hubConnection.on('sendNotification', onNotifReceived);
    hubConnection.on("sendNotification", (user, message) => {
      console.log('recived');
      //const encodedMsg = user + " says " + message;
      //const li = document.createElement("li");
      //li.textContent = encodedMsg;
      //document.getElementById("messagesList").appendChild(li);
    });

    hubConnection.start()
      .then(() => {
        hubConnection.invoke('Connect');
      })
      .catch(err => console.error('SignalR Connection Error: ', err));
  }
}

export {
  create
}