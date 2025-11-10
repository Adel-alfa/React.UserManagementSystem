import { Activity, Component, Dribbble, Github, Instagram, Linkedin, Server, Twitter, Youtube } from "lucide-react";
import { FaGithub } from "react-icons/fa";
const Home = () => {
  return (
    <div className="bg-gray-100">
      <div className="py-10 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-16">
              <img
                src="./images/avatar.png"
                alt="Image"
                className="w-[360px] h-[360px] object-cover rounded-full"
              />
            </div>

            <h6 className="font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8">
              Adel Hassan
            </h6>

            <h1 className="font-normal text-gray-900 text-4xl md:text-6xl leading-none mb-8">
              Senior .Net Backend Developer
            </h1>

            <p className="font-normal text-gray-600 text-md md:text-xl mb-16">
              Building scalable systems & tools that simplify life.
            </p>

            <a
              href="#"
              className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-50 hover:text-gray-700 transition ease-linear duration-500"
            >
              Hire me
            </a>
          </div>
        </div>
      </div>
      <div className="py-10 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <div className="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
                <Activity />
              </div>

              <h4 className="font-medium text-gray-700 text-lg mb-4">
                Architcture
              </h4>
              <p className="font-normal text-gray-500 text-md">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <div className="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
                <Component />
              </div>

              <h4 className="font-medium text-gray-700 text-lg mb-4">
                Development
              </h4>
              <p className="font-normal text-gray-500 text-md">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <div className="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
                <Server />
              </div>

              <h4 className="font-medium text-gray-700 text-lg mb-4">
                Evolution
              </h4>
              <p className="font-normal text-gray-500 text-md">
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="mb-10 lg:mb-0">
              <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
                Portfolio
              </h1>

              <p className="font-normal text-gray-500 text-xs md:text-base">
                Here are some of my favorite GitHub projects.
              </p>
            </div>
            <div className="space-y-12">
              <div className="flex space-x-6">
                <h1 className="font-normal text-gray-700 text-3xl md:text-4xl">
                  01
                </h1>

                <span className="w-28 h-0.5 bg-gray-300 mt-5"></span>

                <div>
                  <h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
                    Demo Ecommerce Phone Shop
                  </h1>

                  <p className="font-normal text-gray-500 text-sm md:text-base">
                    A project built using .NET 8. The solution includes an API
                    project, a Blazor standalone project, a shared class library
                    project, and a testing project using xUnit. The Stripe
                    payment gateway is used for transactions, and Docker is
                    configured to connect to a local MS SQL server.
                  </p>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() =>
                        window.open(
                          "https://github.com/Adel-alfa/EcommercePhoneShopSolution",
                          "_blank"
                        )
                      }
                      className="flex justify-end gap-2 px-5 py-2 text-sm font-semibold  bg-gray-200/20 rounded-lg shadow hover:bg-gray-800  hover:text-white transition"
                    >
                      <FaGithub className="text-lg" />
                      View on GitHub
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex space-x-6">
                <h1 className="font-normal text-gray-700 text-3xl md:text-4xl">
                  02
                </h1>

                <span className="w-28 h-0.5 bg-gray-300 mt-5"></span>

                <div>
                  <h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
                    Demo Clean Architecture
                  </h1>

                  <p className="font-normal text-gray-500 text-sm md:text-base">
                    A project designed with Clean Architecture principles,
                    leveraging Command Query Separation (CQS) pattern,
                    repository pattern, and minimal APIs integrated with Scalar.
                    The frontend is built using React and TypeScript. A shop
                    example with Product and Category Model has been used to
                    illustrate this principle.
                  </p>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() =>
                        window.open(
                          "https://github.com/Adel-alfa/CleanArchitecture.Shop",
                          "_blank"
                        )
                      }
                      className="flex justify-end gap-2 px-5 py-2 text-sm font-semibold  bg-gray-200/20 rounded-lg shadow hover:bg-gray-800  hover:text-white transition"
                    >
                      <FaGithub className="text-lg" />
                      View on GitHub
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-6">
                <h1 className="font-normal text-gray-700 text-3xl md:text-4xl">
                  03
                </h1>

                <span className="w-28 h-0.5 bg-gray-300 mt-5"></span>

                <div>
                  <h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
                    Demo Full-Stack- .Net & Angular
                  </h1>

                  <p className="font-normal text-gray-500 text-sm md:text-base">
                    A full-stack solution implementing JWT Token Authentication
                    using Angular (version 19.1.4) and .NET Core 9 Web API with
                    an SQLite database. The frontend uses Tailwind CSS 4,
                    Angular Material 19.1.4, and PrimeNG for UI components. The
                    project includes functionalities such as user registration,
                    login, role-based access control, forgot password email
                    service, password reset, token refresh, and product/category
                    management..
                  </p>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() =>
                        window.open(
                          "https://github.com/Adel-alfa/Full-Stack-Angular",
                          "_blank"
                        )
                      }
                      className="flex justify-end gap-2 px-5 py-2 text-sm font-semibold  bg-gray-200/20 rounded-lg shadow hover:bg-gray-800  hover:text-white transition"
                    >
                      <FaGithub className="text-lg" />
                      View on GitHub
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* *Experience*/}
      <div className="py-10 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
            Experience
          </h1>
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="space-y-8 md:space-y-16 mb-16 md:mb-0">
              <h6 className="font-medium text-gray-400 text-base uppercase">
                Company
              </h6>

              <p className="font-semibold text-gray-600 text-base">
                CAPTAPLUS{" "}
                <span className="font-normal text-gray-300">
                  / Nantes, France
                </span>
              </p>

              <p className="font-semibold text-gray-600 text-base">
                {" "}
                Sebha University
                <span className="font-normal text-gray-300">/ Libya</span>
              </p>

              <p className="font-semibold text-gray-600 text-base">
                {" "}
                Sebha University{" "}
                <span className="font-normal text-gray-300">/ Libya</span>
              </p>
            </div>
            <div className="space-y-8 md:space-y-16 mb-16 md:mb-0">
              <h6 className="font-medium text-gray-400 text-base uppercase">
                Position
              </h6>

              <p className="font-normal text-gray-400 text-base">
                Software Engineer R&D
              </p>

              <p className="font-normal text-gray-400 text-base">
                Assistant Professor
              </p>

              <p className="font-normal text-gray-400 text-base">
                Academic Tutor in CS
              </p>
            </div>
            <div className="space-y-8 md:space-y-16 mb-16 md:mb-0">
              <h6 className="font-medium text-gray-400 text-base uppercase">
                Year
              </h6>

              <p className="font-normal text-gray-400 text-base">
                July 2019 - October 2023
              </p>

              <p className="font-normal text-gray-400 text-base">
                August 2010 - April 2013{" "}
              </p>

              <p className="font-normal text-gray-400 text-base">
                March 2003 - August 2007
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Education*/}
      <div className="py-10 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
            Education
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <h4 className="font-medium text-gray-700 text-lg mb-4">
                2014 – 2018
              </h4>

              <p className="font-normal text-gray-500 text-md mb-4">
                PhD in Software engineering: Style and Meta-Style: Another Way
                to Reuse Software Architecture Evolution.
              </p>

              <div className="relative">
                <h6 className="font-semibold text-gray-500 text-md relative z-10">
                  {" "}
                  Université de Nantes, France
                </h6>
                <span className="w-32 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <h4 className="font-medium text-gray-700 text-lg mb-4">
                2009 – 2010
              </h4>

              <p className="font-normal text-gray-500 text-md mb-4">
                MSc in Software engineering.
              </p>

              <div className="relative">
                <h6 className="font-semibold text-gray-500 text-md relative z-10">
                  {" "}
                  University of Bradford - England
                </h6>
                <span className="w-32 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-10 rounded-md">
              <h4 className="font-medium text-gray-700 text-lg mb-4">
                1994 – 1999
              </h4>

              <p className="font-normal text-gray-500 text-md mb-4">
                BSc in Computer Science.
              </p>

              <div className="relative">
                <h6 className="font-semibold text-gray-500 text-md relative z-10">
                  {" "}
                  Sebha University - Libya
                </h6>
                <span className="w-32 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
              </div>
            </div>
          </div>
        </div>
       

        
      </div> 
 {/* End Education*/}

      {/* Footer*/}
        <div className="py-10 mb-20 ">
             <div className="container max-w-7xl mx-auto px-4">

                <div className="text-center">
                   
                    <div className="flex items-center justify-center space-x-8">
                         <a href="#" className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition  duration-500">
                            < Linkedin  className="w-8 h-8 text-gray-500 hover:text-gray-700"/>
                        </a>
                        <a href="#" className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition  duration-500">
                            <Github className="w-8 h-8 text-gray-500 hover:text-gray-700"/>
                        </a>
                        <a href="#" className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition  duration-500">
                            <Twitter className="text-gray-500 hover:text-gray-800 transition  duration-500"/>
                        </a>
    
                        <a href="#" className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition  duration-500">
                            <Dribbble className="w-8 h-8 text-gray-500 hover:text-gray-700"/>                        </a>
    
                        <a href="#" className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition  duration-500">
                           <Youtube className="w-8 h-8 text-gray-500 hover:text-gray-700"/> 
                        </a>   
    
                        <a href="#" className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ">
                            <Instagram className="w-8 h-8 text-gray-500 hover:text-gray-700"/>
                        </a>
                    </div>
                </div>

            </div>
        </div>
        {/* End Footer*/}
    </div>
  );
};

export default Home;
