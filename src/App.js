import React, { Component } from 'react';
import './App.css';
import Quiz from './components/quizrun'
import Lottie from "react-lottie";
import lottiesettings from './components/LottieSettings'

class App extends Component{
  constructor(){
    super();
    this.state = {
      loading: true,
      start: false,
      dom: [],
      end:0,
    }

  }

  fetchData = () => {
    const { dom } = this.state;
    fetch( 'https://opentdb.com/api.php?amount=10&type=multiple' )
        .then( response => response.json() )
        .then( data => {
          this.setState( { loading: false } );
          
          dom.push( <div>
            <Lottie options={ lottiesettings.defaultOptionswelcome } height={ 300 } width={ 300 } isPaused={ false }
                    isStopped={ false }/>
            <h2>
              A Trivia Game.
            </h2>
            <form onSubmit={ this.StartQuiz }>
              <input className="square_btn" id="inputbut" type="submit" value="Get Started"/>
            </form>
          </div> );
          dom.push( <Quiz questions={ data.results } endQuiz={ this.endQuiz }/> );
          // console.log(dom);    debug element
          this.setState( { dom } );
        } );
  };

  async componentDidMount(){
    this.fetchData();
  }

  StartQuiz = ( e ) => {
    e.preventDefault();
    this.setState( { start: true, } )
  };
  endQuiz = () => {// Ends the quiz by setting the start state to false. Since app will fetch new data, loading state also put in true during waiting stage.
    this.setState({start:false,loading:true,end:this.state.end+2});
    this.fetchData();
  };

  render(){
    const { loading, dom, start } = this.state;
    return (

        <div className="App">
          <header className="App-header">
            {/*//shows loading animation during fetching and ternary checks for if start button has pressed or not*/ }
            { loading === true ?
                <Lottie options={ lottiesettings.defaultOptionsloading } height={ 100 } width={ 100 } isPaused={ false }
                        isStopped={ false }/> : ( start === false ? dom[ this.state.end ] : dom[ this.state.end+1 ] ) }
          </header>
        </div>
    );
  }
}

export default App;
