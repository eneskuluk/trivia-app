import React,{Component} from 'react';
import Question from './question';
import Lottie from 'react-lottie'
import lottiesettings from './LottieSettings'

class quizrun extends Component{
  constructor( props ){
    super( props );
    this.state={
      index:0,//curent question index
      points:0,//accumulated points
      count:15,//timer integer
      correct:false,//question correctness status
      result:false,//state for result page whether how ended the quiz
      gain:100,//initial points per gain. it increments +10 by question.
    }
  }


  componentDidMount(){//starts timer when component loads
  this.handleStart()

  }
  handleStart(){
    this.timer = setInterval( () => {
      const newCount = this.state.count -1;
      if(newCount===0)
        this.setState({result:true});// if count is equal to 0, result state becomes true and redirects to results page.
      this.setState(
          {
            count: newCount >= 0 ? newCount : 0,//checks whether is 0 or not
          }
      );
    }, 1000 );
  }


  componentWillUnmount(){//clears interval when unmounting.
    clearInterval( this.timer);
  }
  decode = ( e ) => {//to prevent wrong print like &quot instead of ", we decode json object.
    let txt = document.createElement( "textarea" );
    txt.innerHTML = e;
    return txt.value;
  };
  selectAnswer=(e)=>{// gets data from child component and checks whether true or not.
    const {questions}=this.props;
    const{index,points,gain,count}=this.state;
    console.log(e.target.value);
    clearInterval( this.timer);//clears the interval since it does not matter if it is true or not, so with this clearing, it wont automatically end the game because count would never be 0.otherwise it continues to count until 0
    if(e.target.value!==this.decode(questions[index].correct_answer)){
      console.log( "false" );
      this.setState({result:true});//if it is false sets result to true since correct is false as default, it is acknowledged that quiz will end.
    }
    else{
      console.log( "true" );
      this.setState({points:points+gain+count*5,gain:gain+10,correct:true,result:true});//5 extra bonus point per second left
      clearInterval( this.timer);
    }
  };
  nextQuestion=()=>{
    this.setState({index:this.state.index+1,correct:false,count:15,result:false});
    this.handleStart();//starts the handler again because it is cleared by selectanswer question
  };

  render(){
    const {questions} =this.props;// gets fetched data from app.js

    const {index,points,count,correct,gain,result}=this.state;
    let bonus=count*5;
    return (
        <div>
          <div id="stats">
            {/*checks if correct state true or not, if it is true it checks for if the question has reached to end or not by ternary operators*/}
            {correct===true?<div> <Lottie options={lottiesettings.defaultOptionscorrect} height={400} width={400} isPaused={false} isStopped={false}/>
              <p>{index===9&&result===true?"You Have Finished Successfully":"Correct Answer!"}</p>
              <p>You have Earned: {gain-10+bonus} points({bonus} bonus point)</p>
              <p>Total score is: {points}</p>
              {/*if quiz is not reached to the end, nextquestion button shows up otherwise return to the main menu*/}
              <input className="square_btn" type="button" onClick={index===9&&result===true?this.props.endQuiz:this.nextQuestion} value={index===9&&result===true?"Return to the Main Menu":"Next Question"}/>
            </div>:// next statement of ternary is shows result page if the selected choice is wrong.
                (correct===false&&result===true?<div><Lottie options={count===0?lottiesettings.defaultOptionstimeisup:lottiesettings.defaultOptionswrong} height={400} width={400}/>
                  <p>{count===0?"":"Wrong Answer!"}</p>
                  <p>Total score is: {points}</p>
                  <input className="square_btn" type="button" onClick={this.props.endQuiz} value="Return to the Main Menu"/>
            </div>:// if none state is involved, it shows the question and continues the quiz
                <div><Lottie options={lottiesettings.defaultOptionscountdown} height={100} width={300} isStopped={false} isPaused={false}/>
                  <p className="numofquestion">Question:{index+1}/10</p>
              <p className="currentpoint">Total: {points} points</p>
              <Question question={questions[index]} selectAnswer={this.selectAnswer}/></div>)}
          </div>
        </div>
    );
  }

}
export default quizrun;