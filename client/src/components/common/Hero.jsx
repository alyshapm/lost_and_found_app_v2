import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import RocketIllustration from "../../assets/Rocket-rafiki.svg"; // Adjust the path as necessary

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-400 to-blue-700 px-4 text-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Left Side: Text Content */}
        <div className="flex flex-col items-start max-w-lg space-y-6 lg:w-1/2">
          <Typography variant="h2" className="text-white">
            Reunite with your lost belongings
          </Typography>
          <Typography variant="lead">
            Our campus-wide lost and found system helps you locate and recover
            your items quickly and efficiently.
          </Typography>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Button size="lg" color="white">
              <Link to="/sign-in">Browse Found Items</Link>
            </Button>
          </div>
        </div>

        {/* Right Side: SVG Illustration */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
          <img
            src={RocketIllustration}
            alt="Illustration of a rocket taking off"
            className="w-full h-full max-w-lg lg:max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
