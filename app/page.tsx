import Image from "next/image";
import GridDistortion from "@/components/GridDistortion";
import TextPressure from "@/components/TextPressure";

export default function Home() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <GridDistortion
        imageSrc="/12.jpg"
        grid={10}
        mouse={0.1}
        strength={0.15}
        relaxation={0.9}
        className="custom-class"
      />
      <TextPressure>
      text="Hello!"
    flex={true}
    alpha={false}
    stroke={false}
    width={true}
    weight={true}
    italic={true}
    textColor="#ffffff"
    strokeColor="#ff0000"
    minFontSize={36}
      </TextPressure>
    </div>
    
  );
}
