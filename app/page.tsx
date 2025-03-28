import GridDistortion from '@/components/GridDistortion';
import TextPressure from '@/components/TextPressure';

import ButtonContainer from '@/ui/button-container';

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
      <TextPressure
        text="Nightingale"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
        textColor="#ffffff"
        strokeColor="#ff0000"
        minFontSize={36}
      />
      <ButtonContainer />
    </div>
  );
}
