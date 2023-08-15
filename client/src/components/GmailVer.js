import React from 'react';
import emailjs from '@emailjs/browser';

function  GmailVer(){
  //onSubmit={handleSubmit(addUser)}
  const sendEmail = (e) => {
    e.preventDefault();

    console.log("deta;is of form",e);
    console.log("deta;is of form",e.target);

    emailjs.sendForm('service_j1yifah','template_i1102b3',e.target,'N8P7n2MYW_DwUHqQA')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);

      });
  };

  return (
    <form onSubmit={sendEmail}>
  
       <input type="email" name="to_email" placeholder="To Email" required /><br /> 

     
       <button type="submit">Send Email</button> 
    </form>
  );
};

export default GmailVer;

