function sendCodeToEmail(email, code) {
  // ✅ Replace this with real email API later
  alert(`Verification code sent to ${email} is: ${code}`);
  
  // In real app: Use EmailJS, SMTP.js, or server API to actually send email
  // Example for EmailJS:
  /*
  emailjs.send("service_id", "template_id", {
    to_email: email,
    message: code,
  }).then(function(response) {
    console.log("Email sent successfully", response.status, response.text);
  }, function(error) {
    console.error("Email failed to send", error);
  });
  */
}
