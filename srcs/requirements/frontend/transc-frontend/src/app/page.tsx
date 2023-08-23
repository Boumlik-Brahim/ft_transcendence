'use client'
import Link from "next/link";
import InfoBox from "../../components/Features";
import Member from "../../components/Member";
import Typewriter from "typewriter-effect"

import Image from "next/image";
import { result } from "../../public";
export default function Page() {
  return (
    <>
      <section className="w-full h-[80vh] bg-[#e4e3e4]">
        <div className="w-full h-[100%]">
          <div className="w-full h-[100%] flex justify-center relative">
            <div
              className="
              w-full h-[40px] flex items-center justify-between pt-20 p-10 z-20
              md:h-[30%] md:px-[15%]"
            >
                <Image
                  src={"/logo_b.svg"}
                  alt="logo"
                  width={67}
                  height={67}
                  className="w-[67px] h-[67px] md:w-[110px] md:h-[110px]"
                />
                <div className="
                    w-[101px] h-[39px] font-press text-[10px] rounded-full text-[#3E3B6A flex items-center justify-center hover:bg-white  hover:shadow-2xl hover:border-4 border-primary transition duration-500
                    md:w-[150px] md:h-[70px] md:text-[18px]"
                  >
                  <Link href="/login" className="text-primary">
                    login
                  </Link>
                </div>
            </div>
            <div
              className="
              top-[50%] flex items-center justify-center absolute z-20
              md:top-[30%] md:w-[651px] md:h-[18%] md:mt-[80px]"
            >
              <div
                className="
                text-contianer w-[100%] h-[40%]  font-press text-[15px] text-center z-10 text-[#3E3B6A]
                md:text-[33px]"
              >
                <Typewriter
                  onInit={(typewriter) => {
                      typewriter
                      .typeString("Colonel Ondroskotch")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("L'Armi Au Maroc")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Welcome To The Most Impressive Transcendence in The World")
                      .start();
                  }}
                />
              </div>
            </div>
              <Image
                src={result}
                width={1000}
                className="absolute top-[20%] z-10"
                alt=""
              />
          </div>
        </div>
      </section>
      <section className="w-full text-white bg-[#3E3B6A] ">
        <div className="flex justify-center items-center">
          <Link href="#features">
            <Image 
              src="/goBottom.png"
              width={70}  
              height={70}
              alt=""
              className="animate-bounce mt-[-12px]"  
            />
          </Link>
        </div>
        <div
          className="
          w-full h-[80px] text-[35px] flex justify-center items-center
          md:text-[50px]
          lg:text-[100px] lg:h-[200px]"
        >
          <h1 className="font-press " id="features">Features</h1>
        </div>
        <InfoBox
          title="PLAY ONLINE"
          paragraph="Playing Ping Pong online, also known as table tennis, involves playing a digital version of the sport over the internet with another player."
          image="/landing/CONTROLER.svg"
          isChat={false}
        />
        <InfoBox
          title="PLAY AND CHAT"
          paragraph="Chatting during gameplay can add a social element to the game, allowing players to communicate with each other and build connections even if they are playing from different locations."
          image="/landing/CHAT.svg"
          isChat={true}
        />
        <InfoBox
          title="MAKE FRIENDS"
          paragraph="The game provides a great opportunity for players to meet and connect with other people who share a love for the sport.
          players can use the chat feature to communicate with other players."
          image="/landing/FRIENDS.svg"
          isChat={false}
        />
        <div
          className="
          w-full h-[50px]
          md:hidden"
        ></div>
      </section>
      <section className="w-full  bg-gray-300 text-[#3E3B6A] font-roboto">
        <div className="w-full h-[100px] flex justify-center items-center">
          <h1 className="font-press text-[35px]">Our Team</h1>
        </div>
        <div
          className="
          w-full flex flex-col items-center
          md:flex-row justify-center flex-wrap"
        >
          <div className=" transition duration-1000 ease-in-out">
            <Member
              img="https://cdn.intra.42.fr/users/c43987424ac026f4092df16bb34bb273/iomayr.jpg"
              name="Breezy"
              job="Full Stack dev"
              paragraph="Full stack developer passionate about crafting digital experiences."
              intraUrl="https://profile.intra.42.fr/users/iomayr"
              gitUrl="https://github.com/B-omayr"
            />
          </div>
          <div className=" transition duration-1000 ease-in-out">
            <Member
              img="https://cdn.intra.42.fr/users/d9e99ac9bf273b2bf83540ce41fa4e78/bbrahim.jpg"
              name="Boumlik"
              job="backend dev"
              paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              intraUrl="https://profile.intra.42.fr/users/bbrahim"
              gitUrl="https://github.com/Boumlik-Brahim"
            />
          </div>
          <div className=" transition duration-1000 ease-in-out">
            <Member
              img="	https://cdn.intra.42.fr/users/80f6d7da34053a4b0dc35e36a3c69ac6/bben-aou.jpg"
              name="Bilal"
              job="Frontend dev"
              paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              intraUrl="https://profile.intra.42.fr/users/bben-aou"
              gitUrl="https://github.com/bben-aou"
            />
          </div>
          <div className=" transition duration-1000 ease-in-out">
            <Member
              img="	https://cdn.intra.42.fr/users/6c549ac71a92c1df2238e5fbbe2411a8/foulare.jpg"
              name="Foulare"
              job="Full Stack dev"
              paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              intraUrl="https://profile.intra.42.fr/users/foulare"
              gitUrl="https://github.com/oularefodos"
            />
          </div>
          <div className=" transition duration-1000 ease-in-out">
            <Member
              img="	https://cdn.intra.42.fr/users/706e0da16cd5d7b5724479492876f661/obelkhad.jpg"
              name="OUssama"
              job="Full Stack dev"
              paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              intraUrl="https://profile.intra.42.fr/users/obelkhad"
              gitUrl="https://github.com/osamabel"
            />
          </div>
          <div className="h-[100px] w-full">
          </div>
        </div>
      </section>
      <footer className="w-full h-[20vh] bg-[#3E3B6A] text-white">
        <div className="w-full h-[20%] flex justify-center">
          <Image
            src={"/logo_w.svg"}
            alt="logo"
            width={100}
            height={80}
            className=" mt-[20px] md:w-[150px]"
          />
        </div>
        <h3
          className="
          text-center font-roboto mt-[30px]
          md:text-[15px]"
        >
          Website Made By Colonel Ondroskotch (L'Armie au Maroc) 💪❤️
        </h3>
        <div
          className="
          flex justify-center mt-[15px]
          md:mt-[40px]"
        >
          <hr className="w-[90%] border-t border-gray-300" />
        </div>
        <h4
          className="
          text-center mt-[10px] text-[20px]
          md:mt-[40px] md:text-[30px]"
        >
          Copyright
        </h4>
      </footer>
    </>
  );
}