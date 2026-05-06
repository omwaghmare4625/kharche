"use client";

import { useState } from "react";
import Link from "next/link";

const IntroSection = ({ onNext }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in">
    <h1 className="text-3xl md:text-4xl font-light text-[#1E1E1E] mb-6">
      This is not just a website...
    </h1>
    <p className="text-xl text-[#555555] mb-12 font-light">
      It’s a few pieces of us ❤️
    </p>
    <button
      onClick={onNext}
      className="px-8 py-3 bg-[#C84B5B] text-white rounded-xl hover:bg-[#A33544] transition-colors duration-300 shadow-sm font-medium"
    >
      Start
    </button>
  </div>
);

const MemoryCards = ({ onNext }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const cards = [
    { title: "the beginning", image: "/images/beginning.jpeg", message: "this photo lives within me all the time, i love evrything about this photo, it was the time when you were all over my mind, i used to think of you , i used to love the feeling of simone and om secretly liking each other.nobody knew what was going on, it was just us and over crazy littile asses.how we used to i used to come to your class to mee t you,be with you abd the tension we had , oml it was such greate time" },
    { title: "our first date", image: "/images/date.jpeg", message: "this , our very first date , the day it was all you and me and no one else,how we got into the train in that rainy weather,got down at dadar and went to bandra,and i remember my reaction when you bombed me with saying we are going to miniso first and i was like bruh in the rain,hell nahh.. but then we went and i did a great job as a salesperson making yoiu buy the keychain, loll, i still remember the lookon your face,hahahahaha,i loved it, iloved how you valued my word over this much unnecessary spending,and then we went to jimis,WALKED OVER ASSES TO THERE GODDAMN,and i am a guy that calculated everything before i do smth,but that day i didnt think of anything but you and spending time with you,i enjoyed the food your story of your friend's death,where you and your girl gand sits, and all your yapayapayap.and then we went to marines,watched sunset as pretty as you,and you know what , while we were in auto and when you were recording us, i thought omg this girl is gonna make me used to camera , which is by the way the most not om thing,but thankgod you did, nowi can kiss you on camera and anywhere else ,hah win-win for me 😛,then our journey back home,you sthicking to me and not wanitng to go home,we my love even iwanted to have you for the whole night,but i couldnt :(.it was one of the best day of my life , i loved it so much <3." },
    { title: "our bond", image: "/images/bond.jpeg", message: "i have intentionally put this photo of yours, becuase it was cute lol.i know i make you upset,mad most of the times and yet you always choose to be with me not backup , i am grateful that our bond is so pure,i love how we shar elaughs,intimate moments,cries,fights and still make it out how we normally are, i feel we have the strongest bond and yk why? becuase you love me always and ik you will and dont worry i am not taking it for granted , never will." },
    { title: "you", image: "/images/you.jpeg", message: "and now , the man of the day, my sweet girl,oh i have so much to talk abt you but i cannot unfortunately,youre such a good,caring,loving soul,i love and respect you very much as a human being,you are not like other girls,you know where to talk , where to listen,most importantly how to use your brain.youre a very great person,my dear dont ever loose yourself , you are perfect to me,and youre not at a compition with anyone,infact no one will ever come closeto you re, crazy admi hai tu ekdum,i love you 🌱" },
    { title: "us", image: "/images/us.jpeg", message: "we are one hell of a couple yk?,i hope we stay together all lifelong, i want to annoy you again n again,and i want to see that sad baby face of yours and hold you in my arms,kiss you,tease you, i just love us , you simone." },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 animate-fade-in relative w-full overflow-hidden">
      <h2 
        className={`text-2xl text-[#1E1E1E] mb-8 font-light text-center transition-all duration-500 transform ${
          activeCardIndex !== null ? 'opacity-0 -translate-y-4 absolute top-0 pointer-events-none' : 'opacity-100 translate-y-0 relative'
        }`}
      >
        Tap to explore our memories
      </h2>

      <div 
        className={`w-full max-w-5xl flex transition-all duration-700 ease-in-out ${
          activeCardIndex !== null ? 'flex-col md:flex-row items-center md:items-stretch justify-center gap-8' : 'flex-wrap justify-center gap-6'
        }`}
      >
        {cards.map((card, index) => {
          const isActive = activeCardIndex === index;
          const isHidden = activeCardIndex !== null && !isActive;

          return (
            <div
              key={index}
              onClick={() => {
                if (activeCardIndex === null) {
                  setActiveCardIndex(index);
                } else if (isActive) {
                  setActiveCardIndex(null);
                }
              }}
              className={`
                bg-white rounded-2xl shadow-sm text-center flex flex-col overflow-hidden
                transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center
                ${isHidden ? 'opacity-0 scale-50 w-0 h-0 border-0 m-0 p-0 pointer-events-none' : ''}
                ${!isHidden && activeCardIndex === null ? 'w-[40%] md:w-48 h-64 hover:shadow-md cursor-pointer hover:-translate-y-1 hover:scale-105' : ''}
                ${isActive ? 'w-full md:w-[55%] cursor-pointer transform md:-translate-x-4 scale-100 shadow-xl min-h-[500px] md:min-h-[600px]' : ''}
              `}
            >
              <div 
                className={`w-full flex items-center justify-center text-gray-400 font-light italic transition-all duration-500 relative ${
                  activeCardIndex === null ? 'h-3/4 bg-[#F5F5F5]' : 'h-full flex-1 bg-transparent'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className={`w-full h-full absolute inset-0 transition-all duration-500 ${
                    activeCardIndex === null ? 'object-cover' : 'object-contain rounded-2xl'
                  }`} 
                />
              </div>
              {activeCardIndex === null && (
                <div className="h-1/4 flex items-center justify-center p-4 bg-white z-10 relative">
                  <h3 className="text-[#1E1E1E] font-medium text-lg">
                    {card.title}
                  </h3>
                </div>
              )}
            </div>
          );
        })}

        {activeCardIndex !== null && (
          <div className="w-full md:w-[40%] flex flex-col justify-center px-4 md:px-8 mt-4 md:mt-0 opacity-0 animate-fade-in-delayed">
            <p className="text-xl md:text-2xl font-light text-[#1E1E1E] leading-loose mb-10 text-center md:text-left">
              {cards[activeCardIndex].message}
            </p>
            <button
              onClick={() => setActiveCardIndex(null)}
              className="px-6 py-2 bg-transparent text-[#C84B5B] border border-[#C84B5B] rounded-full hover:bg-[#F8E8E8] transition-colors duration-300 self-center md:self-start shadow-sm"
            >
              ← Back
            </button>
          </div>
        )}
      </div>

      <div 
        className={`transition-all duration-500 transform mt-12 ${
          activeCardIndex !== null ? 'opacity-0 translate-y-4 absolute bottom-0 pointer-events-none' : 'opacity-100 translate-y-0 relative'
        }`}
      >
        <button
          onClick={onNext}
          className="px-8 py-3 bg-[#C84B5B] text-white rounded-xl hover:bg-[#A33544] transition-colors duration-300 shadow-sm font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const LoveReveal = () => {
  const [index, setIndex] = useState(-1);
  const messages = [
    
  "you annoy me sometimes,",
  "and some choices of yours I hate,",
  "I don’t like sharing my food,",
  "but it’s okay if you ate <3",

  "you overthink the smallest things,",
  "and turn them into a debate,",
  "but somehow every little chaos,",
  "with you just feels like fate",

  "you steal my time and my attention,",
  "and never give it back,",
  "but honestly I’d lose it all,",
  "if it’s you that I don’t have",

  "you make fun of me for no reason,",
  "and laugh a little too loud,",
  "but you’re still my favorite person,",
  "and the one I’m most proud",

  "you drive me slightly crazy,",
  "in ways I can’t explain,",
  "but I’d still choose you every time,",
  "through sunshine or through rain",

  "and maybe I complain a lot,",
  "about the things you do,",
  "but if I had to choose again,",
  "I’d still choose only you ❤️",
   "HAPPY BIRTHDAY MY LOVEE!!!!!"
  ];

  if (index === -1) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] animate-fade-in">
        <button
          onClick={() => setIndex(0)}
          className="px-8 py-4 bg-[#C84B5B] text-white rounded-xl hover:bg-[#A33544] transition-colors duration-300 shadow-md font-medium text-lg"
        >
          Should I tell you why I love you?
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center animate-fade-in">
      <p className="text-2xl md:text-3xl text-[#1E1E1E] font-light mb-12 max-w-2xl min-h-[100px] flex items-center justify-center transition-opacity duration-500">
        {messages[index]}
      </p>
      
      {index < messages.length - 1 ? (
        <button
          onClick={() => setIndex(index + 1)}
          className="px-6 py-2 bg-transparent text-[#C84B5B] border border-[#C84B5B] rounded-full hover:bg-[#F8E8E8] transition-colors duration-300"
        >
          Next →
        </button>
      ) : (
        <Link 
          href="/login"
          className="px-8 py-3 bg-[#C84B5B] text-white rounded-xl hover:bg-[#A33544] transition-colors duration-300 shadow-sm font-medium mt-8"
        >
          Back to Login
        </Link>
      )}
    </div>
  );
};

export default function LandingPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#ffdee7] font-sans selection:bg-[#FADADD]">
      <div className="container mx-auto max-w-5xl">
        {step === 0 && <IntroSection onNext={() => setStep(1)} />}
        {step === 1 && <MemoryCards onNext={() => setStep(2)} />}
        {step === 2 && <LoveReveal />}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .animate-fade-in { animation: fadeIn 0.6s ease-in-out forwards; }
        .animate-fade-in-delayed { animation: fadeIn 0.8s ease-in-out forwards; animation-delay: 0.2s; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}