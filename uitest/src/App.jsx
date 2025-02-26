import { Flex, Text, Button, Box, Callout } from '@radix-ui/themes';
import { Info } from 'lucide-react';
import { useState } from 'react';
import Test from './Test';
function App() {
  const [show, setShow] = useState(false);
  return (
    <div className=' w-screen h-screen flex justify-center items-center bg-neutral-700'>
      <Box width='40rem'>
        <Callout.Root>
          <Callout.Icon>
            {/* <InfoCircledIcon /> */}
            <Info />
          </Callout.Icon>
          <Callout.Text>
            You will need admin privileges to install and access this
            application.
          </Callout.Text>
        </Callout.Root>

        <Flex direction='column' gap='2'>
          <Text>Hello from Radix Themes</Text>
          <Button onClick={() => setShow(!show)} accentColor='crimson'>
            Let&apos;s go
          </Button>
        </Flex>
        {show && <Test />}
      </Box>
    </div>
  );
}

export default App;
