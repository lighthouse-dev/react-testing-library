import React from 'react';
import axios from 'axios';
const UseEffectRender = () => {
  const [user, setUser] = React.useState(null);

  // 비동기 함수 생성
  const fetchJSON = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    return res.data;
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchJSON();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <p>
          I am {user.username} : {user.email}
        </p>
      ) : null}
    </div>
  );
};

export default UseEffectRender;
