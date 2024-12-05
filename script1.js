function sendMail() {
    // Get form values
    const form = document.getElementById('caseForm');
    const user = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      description: form.description.value,
      courtName: form.courtName.value,
      lawyerName: form.lawyerName.value,
      dateToProceed: form.dateToProceed.value
    };
  
    // Send data using EmailJS
    emailjs.send('service_f5d9tqh', 'template_r6m075b', {
      to_name: user.name,
      to_email: user.email,
      from_name: 'Your System Name', // This can be static or dynamic based on your setup
      subject: user.subject,
      description: user.description,
      courtName: user.courtName,
      lawyerName: user.lawyerName,
      dateToProceed: user.dateToProceed
    })
    .then((response) => {
      alert('Email sent successfully!');
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      alert('Failed to send email. Please try again.');
      console.error('FAILED...', error);
    });
  }
  