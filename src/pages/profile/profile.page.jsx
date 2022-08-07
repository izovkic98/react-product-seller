import { useDispatch, useSelector } from 'react-redux';


const ProfilePage = () => {
    const currentUser = useSelector(state => state.user);

    return (<p>Profile page</p>)
}

export {ProfilePage};
