
        let userObject = [
            {
              username:"fawas",
              password: "Hardemola"
          },
  
          {
            username: "dami",
            password: "luvlyberi"
          },
  
          {
            username:  "ridwan",
            password:  "olatunji"
          }
  
  
          ];
  
  
          
        function validate(){
          let username = document.getElementById('username').value;
          console.log(username)
  
          let password = document.getElementById('password').value;
          console.log(password)
  
          for(i=0; i<userObject.length; i++){
            if(username == userObject[i].username && password == userObject[i].password){
              document.getElementById('message') = username + ", you have logged in"
              console.log(username + ", you have logged in")
              return
            };
          };
          console.log("wrong password")
          document.getElementById('message') = "wrong username" 
  
  
          
  
        }