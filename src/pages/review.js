import React, { useState, useEffect, useContext } from "react"
import Layout from "../components/layout"
import Issues from "../components/issues"
import { githubIssues } from '../graphql/githubIssues'
import './review.css';

import {
  GlobalStateContext,
} from "../context/GlobalContextProvider"

const Review = () => {
  
  const state = useContext(GlobalStateContext);
 
  const [userName, setUserName] = useState(0);
  const [issues, setIssues] = useState([]);

  const initDate = () => {
    let date = new Date();
    date.setHours(0,0,0,0);
    return date;
  }
  
  const [currentDate, setCurrentDate] = useState(initDate());

  
  
  const handlerDate = (e) => {
    if (e.target.value) {
      return setCurrentDate(new Date(e.target.value));
    }
    return setCurrentDate(new Date());
  }

  const formatDate = () => {
    let formattedDate = currentDate.toLocaleDateString();
    formattedDate = formattedDate.split('/').reverse().join('-');
    return formattedDate
  }

  const getGithubIssues = async () => {
    const result = await state.client.query({
      query: githubIssues,
      variables : { date: currentDate.toISOString() }
    })
    const { name } = result.data.viewer
    let { edges: issues  } = result.data.viewer.issues;
    setUserName(name);
    issues = filterByDate(issues, currentDate);
    issues = issues.map(issue => {
      let comments = issue.node.comments.edges;
      comments = filterByDate(comments, currentDate);
      issue.node.comments.edges = comments;
      return issue;
    });
    setIssues(issues);
  }

  useEffect(() => {
    getGithubIssues(); 
  }, currentDate);

  const filterByDate = (list, date) => {
    const dateISO = date.toDateString();
    return list.filter(({node: instance}) => {
      let instanceDate = new Date(instance.updatedAt);
      instanceDate = instanceDate.toDateString();
      return instanceDate === dateISO;
    });
  }

  const listIssueComponents =  issues.map(issue => {
    return (<div className='issue-container'>
      <Issues key={issue.node.id } issue={issue.node}/>
    </div>)
    
  });
  return (
    <Layout>

      <div className="date-picker">
        <input type='date' value={formatDate()} onChange={handlerDate}/>
      </div>
      
      { (issues.length > 0) ? (
        issues.map(issue => {
          return (
            <div className='issue-container'>
              <Issues key={issue.node.id } issue={issue.node}/>
            </div>
          )
        })
       ) : (
         <div> 🙌 : There is no updated or created issues for the selected day  </div>
       )
      }
    </Layout>
  )
}

export default Review
