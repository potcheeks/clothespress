import React from 'react'

const Main = () => {
  return (
    <div class="container">
      <h1>sign in</h1>
      <form action="#" class="formulaire">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" value=""/>
      <label for="Password">Password</label>
      <input type="Password" id="Password" name="Password" value=""></input>
      <p>forgot password?</p>
      <button class="btn">sign in</button>
      <div class="social">
       <span>sign up or sign in with</span>
       <i class="fab fa-snapchat-ghost"></i>
      <i class="fab fa-twitter"></i>
     <i class="fab fa-facebook"></i>
            
          </div>
      </form>
    </div>
         
  )
}

export default Main;
