import logo from './logo.svg';
import './App.css';
import {React, useState} from 'react';
const { Configuration, OpenAIApi } = require("openai");







function App() {

  const [userInput, setUserInput] = useState('')
  const [media, setMedia] = useState("Song")
  const [recommendation, setRecommendation] = useState('')


  async function makeOpenAICall() {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
      const openai = new OpenAIApi(configuration);
      let callInput = ""
      if(media !== undefined || userInput !== undefined ) {
        callInput = `Recommend title of a ${media} ${userInput}:`
    }      
    console.log(callInput)


      const response = await openai.createCompletion("text-davinci-001", {
          prompt: callInput,
          max_tokens: 15,
      });

  
      let newString = ""
  
      for (const responseText of response.data.choices) {
          newString = newString.concat(responseText.text)
      }
      console.log(newString)

      setRecommendation(newString)

  }




  return (


<div class="min-h-screen bg-gray-100 flex justify-center items-center">
	<div class="container mx-auto bg-indigo-500 rounded-lg p-14 shadow-xl">
		<div class>
      <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/271/robot_1f916.png" className='mx-auto animate-bounce'></img>
			<h1 class="text-center font-bold font-sans text-indigo-200 text-5xl py-5 pb-10 leading-loose">Melobot Recommends A {media}: <br></br> <span className='text-white'>{recommendation}</span></h1>
				<div class="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between shadow-xl">
					<input class="text-xl text-black flex-grow outline-none py-5 px-2" type="text" placeholder="that will make me cry" 
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          />
					<div class="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
						<select id="Com" class="text-md font-bold bg-indigo-600 text-white outline-none border-2 px-10 py-5 rounded-lg"
                      onChange={(e) => setMedia(e.target.value)}
                      value={media}
            >
            <option value="Song" selected>Song</option>
            <option value="Movie">Movie</option>
          </select>
						<button class="text-md font-bold bg-indigo-600 text-white outline-none border-2 px-10 py-5 rounded-lg"
            onClick={makeOpenAICall}
            >Search</button>
					</div>
				</div>
         <a  className="text-white" href="https://twitter.com/OnlineBabylon">by @OnlineBabylon</a>
		</div>
	</div>
</div>

  );
}

export default App;
