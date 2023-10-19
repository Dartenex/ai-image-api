import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface GenerationSuccessMessageProps {
  imageUrls: string[];
  redirectUrl: string;
}

const GenerationSuccessMessage = ({ redirectUrl, imageUrls }: GenerationSuccessMessageProps) => {
  return (
    <Html>
      <Head />
      <Preview>SelfCouture.co successfully generated your images!</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[32px] font-bold text-center p-0 my-[30px] mx-0">
              SelfCouture.co
            </Heading>
            <Text className="text-blackinviteLink text-[18px] leading-[24px] text-center">
              Thank you for your patience! All images are generated successfully!
            </Text>
            <Section>
              <Row>
                {imageUrls.map((url: string, idx: number) => {
                  return <Column key={idx} align={'center'}>
                    <Img className="rounded-full" src={url} width="64" height="64" />
                  </Column>;
                })}
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={redirectUrl}
              >
                View images
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link href={redirectUrl} className="text-blue-600 no-underline">
                {redirectUrl}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default GenerationSuccessMessage;
