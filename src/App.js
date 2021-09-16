import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
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
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false
    }
  }
  calculateFaceLocation = (data) => {
      const celebrityFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.querySelector('#inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: celebrityFace.left_col * width,
        topRow: celebrityFace.top_row  * height,
        rightCol: width - (celebrityFace.right_col * width),
        bottomRow: height - (celebrityFace.bottom_row * height)
      }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.CELEBRITY_MODEL, 
    this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
     
      };
  

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onRouteChange = (route) => {
    if(route === 'signOut') {
      this.setState({isSignedIn:false})
    }else if (route === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

render(){

  return (
    <div className="App">
       <Particles className="particles"
         params={particleOptions}
       />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
     {this.state.route === 'home' ? 
      <div>
     
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
      : (
        this.state.route ==='signIn' ? <SignIn onRouteChange={this.onRouteChange} /> :
        <Register onRouteChange={this.onRouteChange} /> 
      )
     } 
    </div>
  );
}
}
export default App;
 