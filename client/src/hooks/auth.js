import useSelector from 'reac'
const useAuth = () => {
  const {userData,token} = useSelector(state=>state.auth)
  return {userData,token}
 
}

export default useAuth;