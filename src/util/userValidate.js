// Check if user is logged in.
const [user, setUser] = useState({});

if(!user.id && db.authStore.model) {
  setUser(db.authStore.model);
}

useEffect(() => {
  if(!user.id) {
    navigate('/login');
  }
}, [user])

