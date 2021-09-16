import React from 'react';


const SignIn = ({onRouteChange}) => {
    return (
        <article className="mw6 center v-mid  br3 pa3 pa4-ns mv3 ba dark-gray shadow-5 b--black-10">
        <main className="pa4 black-80  ">
        <div className="measure">
          <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 white">Sign In</legend>
            <div className="mt3">
              <label className="db white fw6 lh-copy f6" for="email-address">Email</label>
              <input className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 white" for="password">Password</label>
              <input className="ba pa2 input-reset b--black bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
          
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent white grow pointer f6 dib" type="submit" value="Sign in" onClick={() => onRouteChange('home')} />
          </div>
         <div className="lh-copy mt3">
          <p onClick={() => onRouteChange('register')}  className="f6 link  dim black db pointer">Register</p>
         </div>
         
        </div>
        </main>
        </article>
 
      
    );
}

export default SignIn;