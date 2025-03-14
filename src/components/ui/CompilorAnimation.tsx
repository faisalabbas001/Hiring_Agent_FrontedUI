import { TypeAnimation } from 'react-type-animation';

const ExampleComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        '🎯 Features:Write, compile, and execute code in multiple programming languages',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        '✅ Compiler Button with Animation: Scales up on hover',
        1000,
        ' 🚀 Dark mode support .',
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


