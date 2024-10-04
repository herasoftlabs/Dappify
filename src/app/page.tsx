"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

const cssLoader = `
let head = document.getElementsByTagName('HEAD')[0];
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css';
head.appendChild(link);
`

const HomePage: React.FC = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2024-12-05T09:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      if (timeLeft < 0) {
        clearInterval(interval);
        return;
      }

      setCountdown({
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeLeft / (1000 * 60)) % 60),
        seconds: Math.floor((timeLeft / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-cover bg-center text-white" style={{ backgroundImage: "url('https://forkast.news/wp-content/uploads/2021/08/Solana-1260x787.png')" }}>
     

      {/* Banner Section */}
      <div className="flex flex-grow items-center justify-center">
        <div className="text-center bg-black bg-opacity-50 p-8 rounded-md mt-16">
          <h1 className="text-5xl font-bold mb-4">Welcome to Dappify</h1>
          <p className="text-lg mb-6">Create, test, and deploy your dApps easily and efficiently.</p>
          <Link
              href="/dashboard"
              className="bg-white text-black px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-blue-500 transition duration-300"
            >
              Get Started Now
          </Link>


          {/* Countdown Section */}
          <div className="mt-8 p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Launch Countdown</h2>
            <div className="flex space-x-4 justify-center">
              <div className="text-center">
                <p className="text-4xl font-bold">{countdown.days}</p>
                <span>Days</span>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">{countdown.hours}</p>
                <span>Hours</span>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">{countdown.minutes}</p>
                <span>Minutes</span>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">{countdown.seconds}</p>
                <span>Seconds</span>
              </div>
            </div>
            <div className="row">
                   
                  <div
                      id="getWaitlistContainer"
                      data-waitlist_id="20824"
                  ></div>
                  <Script  type="" dangerouslySetInnerHTML={{__html: cssLoader}}></Script>
                  <Script  src="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js"></Script>

              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
