import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import { Component } from 'react';
const Clarifai = require('clarifai');
const particleOptions = {
  particles: {
    number:{
       value:30,
       density: {
         enable:true,
         value_area: 800
       }

    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}
const app = new Clarifai.App({
  apiKey: '000c5161da8d477a82a50ff5db3b8f0f'
 });
class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.CELEBRITY_MODEL, 
    this.state.input).then(
       function (response) {
         // response data fetch from FACE_DETECT_MODEL
        console.log(response);
         /* the data needed from the response data from clarifai API,
         note we are just comparing the two*/
        
        },
      function (err) {
          // there was an error
          }
        );
      };
  

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

render(){
  return (
    <div className="App">
       <Particles className="particles"
         params={particleOptions}
       />
     <Navigation />
     <Logo />
     <Rank />
     <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>

     <FaceRecognition imageUrl={this.state.imageUrl} />
 
    </div>
  );
}
}
export default App;
 