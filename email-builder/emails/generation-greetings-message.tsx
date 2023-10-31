import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface GenerationGreetingsMessageProps {
  prompt: string;
}

const appName = process.env.APP_NAME;

const GenerationGreetingsMessage = ({
  prompt,
}: GenerationGreetingsMessageProps) => {
  return (
    <Html>
      <Head />
      <Preview>{appName} successfully generated your images!</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[32px] font-bold text-center p-0 my-[30px] mx-0">
              {appName}
            </Heading>
            <Text className="text-blackinviteLink">
              <p className="text-center mb-[32px] text-[18px] leading-[24px]">
                Welcome to {appName}!
              </p>
              <p className="text-[18px] leading-[24px]">
                Your generation request for query - <b>{prompt}</b> is in
                progress! progress! Estimated time to deliver 5-10 minutes.
              </p>
              <p className="text-center font-bold text-[18px] mt-[32px]">
                Thank you for your patience!
              </p>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default GenerationGreetingsMessage;
