import Link from 'next/link';
import CreateItem from '../components/CreateItem';
import Reset from '../components/Reset';

const ResetPassword = props => (
  <div>
    <p>Reset Your Password</p>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default ResetPassword;
