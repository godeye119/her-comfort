import React, { useState } from 'react';

const NOTES = [
  "I love your smile.",
  "You work so hard and I'm proud of you.",
  "You are my safe space.",
  "Everything is better when you're around.",
  "You are the best thing that ever happened to me.",
  "Your kindness is my favorite thing about you.",
  "I'm so lucky to call you mine.",
  "You make every day feel like a dream."
];

export const LoveNote: React.FC = () => {
  const [note] = useState(() => NOTES[Math.floor(Math.random() * NOTES.length)]);

  return (
    <div className="text-center px-6">
      <p className="text-pink-100/80 font-medium tracking-wide text-sm md:text-base animate-pulse-slow">
        {note}
      </p>
    </div>
  );
};
