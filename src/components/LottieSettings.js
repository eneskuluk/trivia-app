import loading from "./lottieFiles/loading";                  //Settings for lottie animations
import correctAnimation from "./lottieFiles/433-checked-done";
import wrongAnimation from "./lottieFiles/4970-unapproved-cross";
import timeup from "./lottieFiles/timeisup";
import countdown from './lottieFiles/countdown'
import welcome from './lottieFiles/welcome'

 const Lottiesettings={
  defaultOptionsloading : {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  },
    defaultOptionscorrect:{
      loop: false,
      autoplay: true,
      animationData: correctAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    },
    defaultOptionswrong :{
      loop: false,
      autoplay: true,
      animationData: wrongAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    },
    defaultOptionstimeisup:{
      loop: false,
      autoplay: true,
      animationData: timeup,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    },
   defaultOptionscountdown:{
     loop: false,
     autoplay: true,
     animationData: countdown,
   },
   defaultOptionswelcome:{
     loop: true,
     autoplay: true,
     animationData: welcome,
     rendererSettings: {
       preserveAspectRatio: 'xMidYMid slice'
     }
   },

  }
  export default Lottiesettings;