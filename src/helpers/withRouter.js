import {useLocation, useNavigate, useParams} from 'react-router-dom';

export const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return (
        <Component
            {...props}
            router={{location, navigate, params}}
        />
    );
  };

  return ComponentWithRouterProp;
};