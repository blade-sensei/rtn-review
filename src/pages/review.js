import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Issues from '../components/issues';

const Review = () => {

  const [userName, setUserName] = useState(0);
  useEffect(() => {
    // get data from GitHub api
    const test = async () => {
      const data = await fetch(`https://api.github.com/user/blade-sensei/issues`, {
        crossDomain: true,
      })
      const json = await data.json();
      console.log(json);
      setUserName(json);
    };
    test();
  }, [])


  return (
    <Layout>
      { `test: ${userName}`} 
      <Issues git={userName}/>
    </Layout>
  )
}

export default Review;