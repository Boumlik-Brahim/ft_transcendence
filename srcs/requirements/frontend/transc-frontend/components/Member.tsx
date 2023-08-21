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
        <div className="w-[270px] h-[420px] m-[30px] hover:shadow-2xl rounded-lg flex flex-col justify-around items-center">
            <Image
                src={img}
                width={120}
                height={120}
                alt=""
                className="rounded-full hover:border-4 border-green-300"
            />
            <h1 className=''>
                Hi I'm <span className='font-bold'>{name}</span>
            </h1>
            <h2 className="mt-[-30px]">{job}</h2>
            <p className='
                text-center w-[129px] h-[80px] text-[12px]'>
                {paragraph}
            </p>
            <div className='flex items-center'>
                <a href={intraUrl} target='blank' className='mr-[10px]'>
                    <Image
                        src={"/landing/intra.png"}
                        width={20}
                        height={20}
                        alt=""
                        className=""
                    />
                </a>
                <a href={gitUrl} target='blank'>
                    <Image
                        src={"/landing/github.png"}
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