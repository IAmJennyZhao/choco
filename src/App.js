import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  // TODO: be able to customize the message / placements 
  // TODO: change the name with the message in the url
  // TODO: change the spinning square into a heart or something else xd maybe toto ex:
  // TODO: fade text in and out 
  // TODO: import font and be able to use japanese
  // TODO: handle positions

  // text information and faded states
  // ["text info", faded state, isMainText?]
  const [textStates, setTextStates] = useState([
    ["よ～ ryoto-chan!", 1, false],
    ["How's it going?", 0, false],
    ["well...", 0, false],
    ["I just had something to say", 0, false],
    ["you see...", 0, false],
    ["I just wanted to  thank you for being such a great friend!! let's be even closer friends from now on ^^", 0, true],
    ["love ya ~ have some chocolates", 0, true]
  ]);
  const handleTextStateChange = (event, index) => {
    if (index > 0) {
      textStates[index-1][1] = 2;
    }
    if (index >= 0 && index < textStates.length) {
      textStates[index][1] = 1;
    }
    setTextStates(textStates);
  };

  // handles next text index to be displayed
  const [nextIndex, setNextIndex] = useState(1);
  const handleNextIndexChange = (event) => {
    console.log(nextIndex);
    if (nextIndex < textStates.length) {
      handleTextStateChange(event, nextIndex);
      setNextIndex(nextIndex+1);
    }
  }
  
  let opacities = [0, 1, 0.5];
  var texts = textStates.slice().map((e, i) => e[2] ? 
  <MainText text={e[0]} key={`text${i}`} opacity={opacities[e[1]]}/> 
  : <FadingText text={e[0]} key={`text${i}`} opacity={opacities[e[1]]}/>)

  return (
    <div className="App" onClick={handleNextIndexChange}>
      {/* Background animation*/}
      <div class="container-fluid">
        <div class="background">
          <div class="cube"></div>
          <div class="cube"></div>
          <div class="cube"></div>
          <div class="cube"></div>
          <div class="cube"></div>
        </div>
      </div>
      <body>
        {texts}
      </body>
    </div>
  );
}

/**
 * a text that appears and then fades when another text appears 
 * @param {text, pos opacity} param0 
 * @returns 
 */
function FadingText({ text, pos, opacity}) {
  return (
    <p style={{opacity: opacity}} className="fadingText">{text}</p>
  );
}


/**
 * a text that appears but does not fade out. the font size is larger than that of fading text
 * @param {text, pos fadedState} param0 fadedState 0, 1 changes the visibility of the text from 0% to 100%
 * @returns 
 */
function MainText({ text, pos, opacity}) {
  return (
    <p style={{opacity: opacity}} className="mainText">{text}</p>
  );
}


export default App;