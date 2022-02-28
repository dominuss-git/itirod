// import { connection } from './connection';

const form = document.getElementById('auth');
const modal = document.getElementsByClassName("modal__overlay")[0];

if (!sessionStorage.getItem('token')) {
  modal.style.display = "flex";
  document.getElementsByClassName("root")[0].style.display = "none"
}

form.addEventListener("submit", async e => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const isRegister = document.getElementById('isRegister').checked;
  
  if (isRegister) {
    const data = await fetch("http://localhost:3000/api/auth/register", {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { 'Content-Type': "application/json" }
    })

    const result = await data.json();


    if (data.status !== 201) {

    } else {
      sessionStorage.setItem('token', result.token);
      sessionStorage.setItem('userId', result.userId);
      modal.style.display = "none";
      document.getElementsByClassName("root")[0].style.display = "block";
      location.reload()
    }
  } else {
    const data = await fetch("http://localhost:3000/api/auth/login", {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { 'Content-Type': "application/json" }
    });

    const result = await data.json();


    if (data.status !== 200) {

    } else {
      sessionStorage.setItem('token', result.token);
      sessionStorage.setItem('userId', result.userId);
      modal.style.display = "none";
      document.getElementsByClassName("root")[0].style.display = "block";
      location.reload()
    }
  }
  
})