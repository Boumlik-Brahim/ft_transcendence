import Image from 'next/image'

interface Props {
    img: string,
    name: string,
    job: string,
    paragraph: string,
    intraUrl: string,
    gitUrl: string,
}

export default function Member({img, name, job, paragraph, intraUrl, gitUrl} : Props) {
    return (
        <div className="w-[210px] h-[359px] m-[30px] shadow-2xl rounded-lg flex flex-col justify-around items-center">
            <Image
                src={img}
                width={100}
                height={100}
                alt=""
                className=""
            />
            <h1 className=''>
                Hi I'm <span className='font-bold'>{name}</span>
            </h1>
            <h2 className="mt-[-30px]">{job}</h2>
            <p className='
                text-center w-[129px] h-[54px] text-[10px]'>
                {paragraph}
            </p>
            <div className='flex items-center'>
                <a href={intraUrl} target='blank' className='mr-[10px]'>
                    <Image
                        src={"/intra.png"}
                        width={20}
                        height={20}
                        alt=""
                        className=""
                    />
                </a>
                <a href={gitUrl} target='blank'>
                    <Image
                        src={"/github.png"}
                        width={20}
                        height={20}
                        alt=""
                        className=""
                    />
                </a>
            </div>
        </div>
    )
};