
function parspResponce(data){
    alert(data);
    console.log(data);
    }
    
    function callBack(resp){
       resp.json().then(parspResponce);
    }


    function parspResponce2(data){
      
        if(typeof(data) === "object") showDetails(data);
        else alert(data);

        }
        
        function callBack2(resp){
           resp.json().then(parspResponce2);
        }
    function loginPage(email,password){

        if(email ===  "" ||  password === ""){
            alert('enter all  detals corectly');
        }
        else{
            fetch('http://localhost:3000/login',{
                method: "GET",
                headers: {
                    "content-Type" : "application/json",
                    "email":email,
                    "password": password
                }
            }).then(callBack2);
        }
    }
    

    function signupPage(username,email,password){

        if(username === "" || email ===  "" ||  password === ""){
            alert('enter all  detals corectly');
        }
        else{
            fetch('http://localhost:3000/signup',{
                method: "POST",
                body: JSON.stringify({
                    "username":username,
                    "email": email,
                    "password" : password
                }),
                headers:{
                    "content-Type" : "application/json"
                }
            }).then(callBack);
        }

    }


    // dom manipulation

    const login = document.getElementById('login');
    const signup = document.getElementById('signup');


    login.addEventListener('click',(event)=>{
      event.preventDefault();
      console.log('login button is clicked');
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
        loginPage(email,password);
    })

    signup.addEventListener('click',(event)=>{
        event.preventDefault();
        console.log('signup button is clicked');
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        signupPage(username,email,password);
    })

    const log = document.querySelector('.log');
    const sign = document.querySelector('.sign');

    log.addEventListener('click',()=>{
        const loginPage = document.getElementById('login-page');
        const sigupPage = document.getElementById('signup-page');
        loginPage.style.display = "flex";
        log.style.backgroundColor = "#555555"
        sign.style.backgroundColor = "black"
        sigupPage.style.display = "none";
    })

    sign.addEventListener('click',()=>{
        const loginPage = document.getElementById('login-page');
        const sigupPage = document.getElementById('signup-page');
        log.style.backgroundColor = "black"
        sign.style.backgroundColor = "#555555"
        loginPage.style.display = "none";
        sigupPage.style.display = "flex";
    })


    function showDetails(data){
        const {email, username} = data;

        const emailDiv = document.createElement('div');
        emailDiv.innerHTML = `your email is: ${email}`;

        const userDiv = document.createElement('div');
        userDiv.innerHTML = `your usernamae is: ${username}`;

        const  heading = document.createElement('h2');
        heading.textContent = `Hii ${username}!! hows you doing!`;


        const main = document.querySelector('.userInterface');
        main.appendChild(heading);
        main.appendChild(emailDiv);
        main.appendChild(userDiv);

        const container = document.querySelector('.container');
        const wrapper = document.querySelector('.wrapper');

        container.style.display = "none";
        wrapper.style.display = "flex";
   
    }