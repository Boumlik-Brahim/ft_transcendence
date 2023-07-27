import Image from "next/image";

interface Props{
    title : string ,
    paragraph: string,
    image : string,
    isChat: boolean
}

function InfoBox({title, paragraph,image, isChat} : Props) {
  let changes  = "";
  {isChat ? changes = "lg:flex-row-reverse" : changes="lg:flex-row";}
  return(
    <div className={`
      w-[full] h-[250px] flex flex-col items-center pt-[50px]
      md:h-[600px]
      ${changes} lg:justify-evenly lg:h-[400px]`}>
      <div className="text-center flex flex-col items-center">
        <h1 className="
          font-press text-[20px]
          md:text-[34px]"
          >
            {title}
        </h1>
        <p className="
          w-[351px] text-[15px] pt-[30px] font-roboto font-base
          md:w-[356px] md:text[16px]
          lg:w-[426px]"
          >
            {paragraph}
        </p>
      </div>
      <Image
        src={image}
        width={332}
        height={332}
        alt=""
        className={`hidden md:flex float-left`}
      />
    </div>
  )
}
export default InfoBox;