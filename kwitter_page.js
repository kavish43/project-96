var firebaseConfig = {
    apiKey: "AIzaSyC8ay3ljar6RQCMIQIWINVS1WHLl_oxSJk",
    authDomain: "lets-chat-4dbb3.firebaseapp.com",
    databaseURL: "https://lets-chat-4dbb3-default-rtdb.firebaseio.com",
    projectId: "lets-chat-4dbb3",
    storageBucket: "lets-chat-4dbb3.appspot.com",
    messagingSenderId: "255566087245",
    appId: "1:255566087245:web:4e1a3455548a3fcf9d0804"
  };
  
  firebase.initializeApp(firebaseConfig);
  uname= localStorage.getItem("user_name_key");
room=localStorage.getItem("room_name");


function getData() { firebase.database().ref("/"+room).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['likes'];
        name_tag = "<h4> "+name+"<img class='user_tick' src='tick.png'></h4>";
        message_tag = "<h4 class='message_h4'> "+message+"</h4>";
        like_tag = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)'>";
        span_tag = "<span class='glyphicon glyphicon-thumbs-up'>like : "+like+"</span></button><hr>";
        row = name_tag+message_tag+like_tag+span_tag;
        document.getElementById("output").innerHTML +=row;


      } });  }); }
getData();

function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room).push({
            name:uname,
            message:msg,
            likes:0
      });

      document.getElementById("msg").value="";
}
function logout(){
      localStorage.removeItem("user_name_key");
      localStorage.removeItem("room_name");
      window.location="index.html";
}
function updatelike(message_id){
      console.log("clicked on the like button "+message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_like = Number(likes)+1;
      console.log(updated_like);
      firebase.database().ref(room).child(message_id).update({
            likes : updated_like
      });

}