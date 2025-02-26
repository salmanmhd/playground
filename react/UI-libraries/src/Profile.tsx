import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './components/ui/button';

function Profile() {
  return (
    <Card className='w-[180px]'>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
        <p>Card Content</p>
        <p>Card Content</p>
        <p>Card Content</p>
        <p className='text-sm text-muted-foreground'>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Update</Button>
      </CardFooter>
    </Card>
  );
}

export default Profile;
