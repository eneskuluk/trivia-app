import React, { Component } from 'react';

class question extends Component{
  constructor( props ){
    super( props );
    this.state = {
      buttons: [],
      quest: "",

    }
  }

  componentDidMount(){//gets data in array and shuffles it when component loads.
    const { question } = this.props;
    let quest = this.decode( question.question );
    //decodes every choice so it eliminates the entity problem
    let choices = [this.decode( question.incorrect_answers[ 0 ] ), this.decode( question.incorrect_answers[ 1 ] ), this.decode( question.incorrect_answers[ 2 ] ), this.decode( question.correct_answer )];
    choices = this.shuffler( choices );
    this.setState( { quest: quest, buttons: choices } );
  }


  shuffler = ( array,array2 ) => {//Shuffling the array so the answer wont be in the same index
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex){

      randomIndex = Math.floor( Math.random() * currentIndex );
      currentIndex -= 1;
      temporaryValue = array[ currentIndex ];
      array[ currentIndex ] = array[ randomIndex ];
      array[ randomIndex ] = temporaryValue;
    }
    return array;
  };

  decode = ( e ) => {//to prevent wrong print like &quot instead of ", we decode json object.
    let txt = document.createElement( "textarea" );
    txt.innerHTML = e;
    return txt.value;
  };

  render(){
    const { buttons, quest } = this.state;
    return (
        <div>
          { quest }
          <br></br>
          <button className="square_btn" type="button" value={ buttons[ 0 ] }
                  onClick={ this.props.selectAnswer }>{ buttons[ 0 ] }</button>
          <br></br>
          <button className="square_btn" type="button" value={ buttons[ 1 ] }
                  onClick={ this.props.selectAnswer }>{ buttons[ 1 ] }</button>
          <br></br>
          <button className="square_btn" type="button" value={ buttons[ 2 ] }
                  onClick={ this.props.selectAnswer }>{ buttons[ 2 ] }</button>
          <br></br>
          <button className="square_btn" type="button" value={ buttons[ 3 ] }
                  onClick={ this.props.selectAnswer }>{ buttons[ 3 ] }</button>
        </div>
    );
  }

}

export default question;