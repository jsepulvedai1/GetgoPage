import Image from "next/image";

const FeatureItem = ({ src, count, text }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Image
        src={src}
        width={150}
        height={150}
        alt={text}
        className="w-20 h-20 md:w-32 md:h-32"
      />
      <div className="text-4xl font-bold">{count}</div>
      <p className="text-lg">{text}</p>
    </div>
  );
};

export default FeatureItem;