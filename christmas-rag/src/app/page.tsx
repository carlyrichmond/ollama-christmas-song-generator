'use client';

import holly from '../../public/holly.svg';
import Image from "next/image";

import { useCompletion } from 'ai/react';
import { useState } from 'react';
//import Spinner from '../components/Spinner';

export default function Chat() {
  const { completion, complete, handleSubmit } = useCompletion();

  const [subject, setSubject] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [adjective, setAdjective] = useState('');
  const [food, setFood] = useState('');
  const [gift, setGift] = useState('');

  const prompt = `Write a ${adjective} Christmas song about ${subject}. 
  Include at least one reference to eating ${food} and receiving ${gift}.
  Use the provided lyrics from the song ${songTitle}`;

  return (
    <main>
      <div className="container">
        <p className="subheading">
          Generate your own Christmas song with Elasticsearch, LangChain, Ollama and Llama3!
        </p>

        <form className="options" onSubmit={handleSubmit}>
          <label htmlFor="subject-input">Who or what is your song about?</label>
          <input type="text" id="subject-input" placeholder="Elkie"
            minLength={2} value={subject} onChange={(e) => setSubject(e.target.value)} required />

          <label htmlFor="adjective-input">Which adjective best describes your Christmas?</label>
          <input type="text" id="adjective-input" placeholder="Snowy"
            minLength={2} value={adjective} onChange={(e) => setAdjective(e.target.value)} required />

          <label htmlFor="food-input">What is your favourite holiday food?</label>
          <input type="text" id="food-input" placeholder="Brussel sprouts"
            minLength={2} value={food} onChange={(e) => setFood(e.target.value)} required />

          <label htmlFor="gift-input">What gift do you want this year?</label>
          <input type="text" id="gift-input" onChange={(e) => setGift(e.target.value)} placeholder="Elkie socks"
            minLength={2} value={gift} required />

          <label htmlFor="song-title-input">Which Christmas song is your track based on?</label>
          <input type="text" id="song-title-input" placeholder="All I Want for Christmas"
            minLength={5} value={songTitle} onChange={(e) => setSongTitle(e.target.value)} required />

          <button className="submit__btn" onClick={() => { complete(prompt) }}>
            Write My Christmas Song!
          </button>
        </form>

        <div className="song-response-container">
          <Image
            className="holly holly__start"
            src={holly}
            alt="" />
          <p id="song-response">
            {completion}
          </p>
          <Image
            className="holly holly__end"
            src={holly}
            alt="" />
        </div>
      </div>
    </main>
  );
}