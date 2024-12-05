function sendMail(){
  let parms={
     name:document.getElementById("name").value,
     email:document.getElementById("email").value,
     message:document.getElementById("message").value,
  }  
  emailjs.send("service_1m6thfa","template_p1c3yd8",parms).then(alert("Email sendMail"))
}