import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
import emailjs from '@emailjs/browser';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

function Contact() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const form = useRef();

  const sendEmail = (e: any) => {
    e.preventDefault();

    setNameError(name === '');
    setEmailError(email === '');
    setMessageError(message === '');

    /* Uncomment below if you want to enable the emailJS */

    if (name !== '' && email !== '' && message !== '') {
      const templateParams = {
        name: name,
        email: email,
        message: message
      };

      // console.log(templateParams);
      // console.log({
      //   'sk':process.env.REACT_APP_SERVICE_ID,
      //   'tk':process.env.REACT_APP_TEMPLATE_ID,
      //   'params':templateParams,
      //   'pub api':process.env.REACT_APP_PUBLIC_API_KEY})
      emailjs.send(
        process.env.REACT_APP_SERVICE_ID||'',
        process.env.REACT_APP_TEMPLATE_ID||'',
        templateParams,
        process.env.REACT_APP_PUBLIC_API_KEY
      ).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Got a project waiting to be realized? Let's collaborate and make it happen!</p>
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
          //  className='contact-form'
          >
            <div className='form-flex'>
              <TextField
                // sx={{ color: 'white', input:{fontColour:'white'} }}
                required
                // color='white'
                id="outlined-required"
                label="Your Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
              />
              <TextField
                // sx={{ color: 'black', backgroundColor: 'white', borderRadius: 2 }}
                required
                id="outlined-required"
                label="Email / Phone"
                placeholder="How can I reach you?"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                helperText={emailError ? "Please enter your email or phone number" : ""}
              />
            </div>
            <TextField
              // className='whiteBG'
              // sx={{ color: 'black' }}
              fullWidth
              required
              id="outlined-multiline-static"
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={10}
              // className="body-form"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              error={messageError}
              helperText={messageError ? "Please enter the message" : ""}
            />

            <div className='contact-form'>
              <Button
                // className='contact-form'
                variant="contained"
                endIcon={<SendIcon />}
                onClick={sendEmail}
                sx={{ color: 'black', backgroundColor: 'white', float: 'right' }}
              >
                Send
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;