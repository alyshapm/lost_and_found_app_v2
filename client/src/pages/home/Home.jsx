import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  IconButton,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Hero from "../../components/common/Hero";
import AppLogo from "../../assets/app-logo.png";

export function Home() {
  const aboutUsRef = useRef(null);
  const howItWorksRef = useRef(null);

  const scrollToAboutUs = () => {
    aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToHowItWorks = () => {
    howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search for lost items..."
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <Button className="flex items-center gap-3" size="lg">
              <MagnifyingGlassIcon strokeWidth={2} className="h-5 w-5" /> Search
            </Button>
          </div>
        </div>
      </div>

      <div ref={aboutUsRef} className="py-20 px-4">
        <div className="container mx-auto">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-4 text-center"
          >
            About Us
          </Typography>
          <Typography className="mb-8 text-center max-w-3xl mx-auto">
            Lost and Found is dedicated to reuniting students, faculty, and
            staff with their lost items. Our efficient system and dedicated team
            work tirelessly to make the process of recovering lost items as
            smooth as possible.
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardBody className="text-center">
                <MagnifyingGlassIcon className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Easy Search
                </Typography>
                <Typography>
                  Quickly search for your lost items using our intuitive search
                  system.
                </Typography>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <UserIcon className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  User-Friendly
                </Typography>
                <Typography>
                  Our platform is designed with users in mind, making it easy
                  for anyone to use.
                </Typography>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <div
        ref={howItWorksRef}
        id="how-it-works"
        className="bg-blue-gray-50 py-20 px-4"
      >
        <div className="container mx-auto">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-10 text-center"
          >
            How It Works
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader color="blue" className="relative h-56">
                <img
                  src="/placeholder.svg?height=224&width=384"
                  alt="Report Item"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  1. Report Lost or Found Item
                </Typography>
                <Typography>
                  Easily submit details about the item you've lost or found on
                  our platform.
                </Typography>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color="blue" className="relative h-56">
                <img
                  src="/placeholder.svg?height=224&width=384"
                  alt="Search and Match"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  2. Search and Match
                </Typography>
                <Typography>
                  Our system automatically matches lost items with found items
                  based on descriptions.
                </Typography>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color="blue" className="relative h-56">
                <img
                  src="/placeholder.svg?height=224&width=384"
                  alt="Claim and Retrieve"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  3. Claim and Retrieve
                </Typography>
                <Typography>
                  Once a match is found, arrange to meet and retrieve your lost
                  item.
                </Typography>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <footer className="bg-blue-gray-900 text-white py-8">
        <div className=" mt-8 pt-8 text-center">
          <Typography>
            &copy; 2024 BINUS University International. All rights reserved.
          </Typography>
        </div>
      </footer>
    </div>
  );
}
