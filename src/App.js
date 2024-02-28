import { useState } from 'react';
import './App.css';

function App() {
  // TODO: be able to customize the message / placements 
  // TODO: Nah change the spinning square into a heart or something else xd it's not centeringggg it's a pain

  const queryParameters = new URLSearchParams(window.location.search)
  const lang = queryParameters.get("lang") || "jp";
  const name = queryParameters.get("name") || "りょうとちゃん";

  // text information and faded states
  // ["text info", faded state, isMainText?]
  // faded state 0: not on screen
  // faded state 1: fade in text
  // faded state 2: half fade out text
  const [textStates, setTextStates] = useState(
    lang=="jp" ?
    // japanese version: 
    [
    ["よ～"+name+"！ (クリックして続ける)", 1, false],
    ["元気？", 0, false],
    ["あのね、", 0, false],
    ["ちょっと言いたいことがあって、、、", 0, false],
    ["その、、、👉👈", 0, false],
    ["ありがとう！😇大事な友達でいてくれて。これからもよろしくね！", 0, true],
    ["愛してる～💝チョコをどうぞ🍫", 0, true],
    ["暇すぎたwwwww、でも、"+name+"がいつまでもハッピーでいてほしい^^", 0, true]
  ]:
  // english version: 
  [
    ["yo～ "+name+"! (click to continue)", 1, false],
    ["How's it going?", 0, false],
    ["well...", 0, false],
    ["I just had something to say", 0, false],
    ["you see...", 0, false],
    ["I just wanted to  thank you for being such a great friend!! let's be even closer friends from now on ^^", 0, true],
    ["love ya ~ have some chocolates", 0, true],
    ["I really have nothing better to do haha.... but i hope that "+name+" is always happy ^^", 0, true]
  ]
  );

  const handleTextStateChange = (event, index) => {
    if (index > 0) {
      textStates[index-1][1] = 2;
    }
    if (index >= 0 && index < textStates.length) {
      textStates[index][1] = 1;
    }
    setTextStates([...textStates]);
  };

  // handles next text index to be displayed
  const [nextIndex, setNextIndex] = useState(1);
  const handleNextIndexChange = (event) => {
    if (nextIndex < textStates.length-1) {
      handleTextStateChange(event, nextIndex);
      console.log(nextIndex);
      setNextIndex(nextIndex+1);
    } else if (nextIndex < 20)
    {
      console.log(nextIndex);
      setNextIndex(nextIndex+1);
    }
    else if (nextIndex == 20) {
      handleTextStateChange(event, textStates.length-1);
      console.log(nextIndex);
      setNextIndex(nextIndex+1);
    }
  }
  
  // texts contains all text displayed on the screen
  var texts = textStates.slice().map((e, i) => {
    if (e[1]==0) {
      return null;
    } else {
      // handle fading in and out classname animations
      let className; 
      if (e[2]) {
        className = "fadingIn mainText";
      } else if (e[1]==1) {
        className = "fadingIn text";
      } else {
        className = "fadingOut text";
      }
      return <p className={className}>{e[0]}</p>
    }
  });

  return (
    <div className="App" onClick={handleNextIndexChange}>
      {/* Background animation*/}
      <div class="container-fluid">
        <div class="background">
          <div class="cube"/>
          <div class="cube"/>
          <div class="cube"/>
          <div class="cube"/>
          <div class="cube"/>
        </div>
      </div>
      
      {/* text on screen*/}
      <body>
        <br/>
        {texts}
      </body>
    </div>
  );
}


export default App;