import { useParams } from 'react-router';

function UserDetails() {
  const { email } = useParams();
  console.log(email);
  return <div>UserDetails</div>;
}

export default UserDetails;
