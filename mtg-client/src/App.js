import React,{Component} from 'react';
import CardSearch from "./components/CardSearch";
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'

class App extends Component {
  constructor() {

    super()

    this.state = {
      randomCard: null,
      isUpdated:false,
      }
  }

  componentDidMount() {
    this.getRandomCard()
  }

  handleTextBoxChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  getRandomCard = () => {
    let url = `https://api.scryfall.com/cards/random`
    fetch(url)
    .then(response => response.json())
    .then(json => {
        console.log(json)
      this.setState({randomCard: json})
    })
  }

  render() {
    const { randomCard } = this.state;
    if (randomCard == null) {
      return null;
    }

return (
    <div>
      <h1>Welcome to My MTG Site</h1>
      <CardSearch />
      <p>Explore and search for your favorite cards!</p>
    </div>
  );
}

export default App;
