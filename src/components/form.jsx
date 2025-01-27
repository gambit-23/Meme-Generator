import React, { useEffect, useState } from "react";
// import memesData from "../data.js";

function GenMeme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage:
      "https://api.memegen.link/images/waygd/yeah.../what_are_ya_gonna_do~q.webp",
  });

  // const [allMemeImages, setMemeImages] = useState(memesData);

  const [allMemes, setAllMemes] = useState([]); // FOR USE EFFECT //

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  },[]);


  let url;
  function getMemeImage() {
    // const memesArray = allMemeImages.data.memes;
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    console.log(randomNumber);
    url = allMemes[randomNumber].url;
    console.log(url);
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [event.target.name]: event.target.value,
      };
    });
  }

  console.log(meme);
  return (
    <main>
      <p className="meme">{url}</p>
      <div className="form">
        <input
          type="text"
          placeholder="First text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Second text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          className="form-input"
        />
        <button className="form-button" onClick={getMemeImage}>
          Get a new meme image!
        </button>
      </div>
      <div className="meme-container">
        <img src={meme.randomImage} className="meme-img" />
        <h2 className="meme-top">{meme.topText}</h2>
        <h2 className="meme-bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default GenMeme;
