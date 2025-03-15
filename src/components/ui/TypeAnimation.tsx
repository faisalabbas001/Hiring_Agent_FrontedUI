import { TypeAnimation } from 'react-type-animation';

const ExampleComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        ' ✨ ✨  An intelligent AI-powered assistant for code review and generation. 🚀',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'corrections and improvements ✨ ✨ ',
        1000,
        'Experience seamless, interactive, and responsive code assistance ✨ ✨ .',
        1000,
        'well-structured code effortlessly ✨ ✨ ',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};

export default ExampleComponent