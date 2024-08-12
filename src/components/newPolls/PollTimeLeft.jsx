import React, { useState, useEffect } from "react";

const calculateTimeLeft = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const difference = target - now;

  const timeLeft = {
    total: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };

  return timeLeft;
};

const PollTimeLeft = ({ className, targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.total <= 0) {
    return <div className="text-red-500">Countdown Ended!</div>;
  }

  return (
    <div className={`flex ${className} items-center`}>
      <div className="text-center text-xl">
        <div className=" text-xs font-Inter font-medium">
          {/* {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s */}
          <span className="">
            {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}: 
          </span>
          <span className="">
            {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}:
          </span>
          <span className="">
            {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:
          </span>
          <span className="">
            {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PollTimeLeft;
