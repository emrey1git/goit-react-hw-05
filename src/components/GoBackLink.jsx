import { useNavigate, useLocation } from 'react-router-dom';

export default function GoBackLink() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/movies');
    }
  };

  return <button onClick={onGoBack}>Go Back</button>;
}
