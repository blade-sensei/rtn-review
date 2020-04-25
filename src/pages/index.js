import React, { useState, useEffect, useContext } from "react"
import Layout from "../components/layout"
import Issues from "../components/issues"
import { githubIssues } from '../graphql/githubIssues'
import './index.css';
import {
  GlobalStateContext,
} from "../context/GlobalContextProvider"

const Index = () => {
  
  const state = useContext(GlobalStateContext);
  const [issues, setIssues] = useState([]);
  

  const initDate = () => {
    let date = new Date();
    date.setHours(0,0,0,0);
    date.setDate(1);
    return date;
  }
  
  const [currentDate, setCurrentDate] = useState(null);

  const handlerDate = (e) => {
    if (e.target.value) {
      return setCurrentDate(new Date(e.target.value));
    }
    return setCurrentDate(null);
  }

  const formatDate = () => {
    if (!currentDate) return '';
    let formattedDate = currentDate.toLocaleDateString();
    formattedDate = formattedDate.split('/').reverse().join('-');
    return formattedDate
  }

  const getGithubIssues = async (variables) => {
    const result = await state.client.query({
      query: githubIssues,
      variables,
    })
    let { edges: issues  } = result.data.viewer.issues;
    if (currentDate) {
      
      issues = issues.map(issue => {
        let comments = issue.node.comments.edges;
        comments = filterByDate(comments, currentDate);
        issue.node.comments.edges = comments;
        return issue;
      });
      console.log(issues);
      issues = issues.filter(({node: issue}) => {
        const dateISO = currentDate.toDateString();
        let instanceDate = new Date(issue.createdAt);
        instanceDate = instanceDate.toDateString(); 
        return (
          instanceDate === dateISO ||
          issue.comments.edges.length > 0
        )
      })
    }
    setIssues(issues);
  }

  useEffect(() => {
    let variables = {};
    if (!currentDate) {
      
      variables = { date: initDate().toISOString()}
    } else {
      variables = { date: currentDate.toISOString(), total: 50}
    }
    getGithubIssues(variables); 
  }, [currentDate]);

  const filterByDate = (list, date) => {
    const dateISO = date.toDateString();
    return list.filter(({node: instance}) => {
      let instanceDate = new Date(instance.updatedAt);
      instanceDate = instanceDate.toDateString();
      return instanceDate === dateISO;
    });
  }

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
       <div className='no-issues'> 🙌 : There is no updated or created issues for this selected date</div>
       )
      }
    </Layout>
  )
}

export default Index
