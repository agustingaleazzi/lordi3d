import { useEffect } from "react";
//mapear state del redux store
import { useSelector } from "react-redux";

import { useHistory } from 'react-router-dom';



//mapeo el state
const mapState = ({ user }) => ({

    currentUser: user.currentUser
});

const useAuth = props => {
//using the user on the redux store.
    const { currentUser } = useSelector(mapState);
    const history = useHistory();
    useEffect(() => {
        if (!currentUser) {
            history.push('/login');
        }

    }, [currentUser, history]);
    return currentUser;
}

export default useAuth;