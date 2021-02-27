const button = document.getElementById('button');
const audioElement = document.getElementById('audio');



// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

//  Passing Joke to VoiceRSS API
function tellMe(joke) {
    console.log('tell me :', joke);
    VoiceRSS.speech({
        key: '2c8b05cb08b34e98bc731d87c7e6fb04',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes From Jokes Api

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button;
        toggleButton();
    } catch (error) {
        console.log('opps something went wrong', error)
    }
}

//  Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
