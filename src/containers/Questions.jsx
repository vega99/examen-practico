import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchInput from "../components/SearchInput";
import QuestionItem from "../components/QuestionItem";
import { Alert, AlertTitle, Button, Snackbar, Typography } from "@mui/material";
import QuestionForm from "../components/forms/QuestionForm";
import { useHistory } from "react-router";

const Questions = () => {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [searchText, setSearchText] = useState("");
  const isLoading = useSelector((state) => state.allData.isLoading);
  const questions = useSelector((state) => state.allData.questions);
  const user = useSelector((state) => state.auth.userDetails);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const history = useHistory();

  const openModal = () => {
    if (isAuth) {
      setOpen(true);
    } else {
      setOpenSnack(true);      
    }
  };

  const closeSnack = () => {
    setOpenSnack(false)
  }

  const setData = () => {
    setMasterDataSource(questions);
    setFilteredDataSource(questions);
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterDataSource.filter((question) => {
        const itemData = question.title
          ? question.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredDataSource(newData);
      setSearchText(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearchText(text);
    }
  };

  useEffect(() => {
    setData();
  }, [questions]);

  if (isLoading) {
    return (
      <div>
        <h1>Cargado...</h1>
      </div>
    );
  }
  return (
    <div>
      <>
        <QuestionForm
          onClose={() => setOpen(false)}
          open={open}
          userId={user?.user_key}
        />
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={closeSnack}>
          <Alert severity="warning" onClose={closeSnack}>
            <AlertTitle>Error</AlertTitle>
            Para poder hacer una pregunta necesitas - 
            <Button color="info" onClick={() => history.push('/login')} >Iniciar Sesión</Button>
          </Alert>
        </Snackbar>
        <SearchInput value={searchText} onChange={searchFilter} />
        <div>
          <Button color="success" variant="outlined" onClick={openModal}>
            Agregar Pregunta
          </Button>
        </div>
        {filteredDataSource.length === 0 ? (
          <div>
            <h1>No hay preguntas</h1>
          </div>
        ) : (
          <div>
            {filteredDataSource.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                to={`/home/question/${question.id}`}
              />
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default Questions;
