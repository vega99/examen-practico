import { Route } from "@mui/icons-material";
import dayjs from "dayjs";
import React from "react";
import { Redirect, Switch } from "react-router";
import Layout from "../components/Layout";
import QuestionDetails from "../containers/QuestionDetails";
import Questions from "../containers/Questions";
import ProtectedRoute from "../helpers/ProtectedRoute";
import { UserQuestions } from "./user/UserQuestions";

dayjs.locale("es");

const Home = (props) => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/home" component={Questions} />        
        <ProtectedRoute exact path="/home/question/:id" component={QuestionDetails} isPrivate={false} />        
        <ProtectedRoute exact path="/home/user/" component={UserQuestions} isPrivate={true}/>        
        <ProtectedRoute exact path="/home/user/:id" component={QuestionDetails} isPrivate={true}/>              
      </Switch>
    </Layout>
  );
};

export default Home;
