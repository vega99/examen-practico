export const SET_DATA = 'SET_DATA';
export const SET_LOADING = "SET_LOADING";

const API = 'http://localhost/exmen_tecnico/questions_services/index.php';

const getConfig = {
  method: 'GET',
  headers: {
    'QUESTIONS-API-KEY': 'kEy$al26Questions',
    'Content-Type': 'application/json'
  }
}

const headers = {
  'QUESTIONS-API-KEY': 'kEy$al26Questions',
  'Content-Type': 'application/json',
  'Accept': 'application / json',
}

export const fetchData = () => {
  return async dispatch => {    
    try {
      dispatch({type: SET_LOADING, isLoading: true});
      const result = await fetch(`${API}/data/api/data`, getConfig);
      if(!result.ok){
        dispatch({type: SET_LOADING, isLoading: false});
        throw new Error('Algo salió mal, Inténtalo más tarde');
      }      
      const resData = await result.json()      
      if(resData.status !== "success"){
        dispatch({type: SET_LOADING, isLoading: false})
        throw new Error("Algo Salió mal, Intentalo más tarde");
      }      
      dispatch({
        type: SET_DATA,
        data: resData.data
      });
      dispatch({type: SET_LOADING, isLoading: false})
    } catch (error) {
      throw error;
    }
  }
}

export const addAnswer = (data) => {
  return async dispatch => {
    try {
      dispatch({type: SET_LOADING, isLoading: true});
      const result = await fetch(`${API}/answers/api/answers`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      const resData = await result.json()       
      
      if(!result.ok){
        dispatch({type: SET_LOADING, isLoading: false});
        throw new Error('Algo salió mal, Inténtalo más tarde');
      }      
      if(resData.status !== "success"){
        dispatch({type: SET_LOADING, isLoading: false})
        throw new Error("Algo Salió mal, Intentalo más tarde");
      }
      dispatch(fetchData())
      dispatch({type: SET_LOADING, isLoading: false})
    } catch (error) {
      dispatch({type: SET_LOADING, isLoading: false})
      throw error;
    }
  }
}

export const putAnswer = (data) => {
  return async dispatch => {
    try {
      dispatch({type: SET_LOADING, isLoading: true});
      const result = await fetch(`${API}/answers/api/answers/pId/${data.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
      });
      const resData = await result.json()       
      
      if(!result.ok){
        dispatch({type: SET_LOADING, isLoading: false});
        throw new Error('Algo salió mal, Inténtalo más tarde');
      }      
      if(resData.status !== "success"){
        dispatch({type: SET_LOADING, isLoading: false})
        throw new Error("Algo Salió mal, Intentalo más tarde");
      }
      dispatch(fetchData())
      dispatch({type: SET_LOADING, isLoading: false})
    } catch (error) {
      dispatch({type: SET_LOADING, isLoading: false})
      throw error;
    }
  }
}

export const addQuestion = (data) => {
  return async dispatch => {
    try {
      dispatch({type: SET_LOADING, isLoading: true});
      const result = await fetch(`${API}/questions/api/questions`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      const resData = await result.json()       
      
      if(!result.ok){
        dispatch({type: SET_LOADING, isLoading: false});
        throw new Error('Algo salió mal, Inténtalo más tarde');
      }      
      if(resData.status !== "success"){
        dispatch({type: SET_LOADING, isLoading: false})
        throw new Error("Algo Salió mal, Intentalo más tarde");
      }
      dispatch(fetchData())
      dispatch({type: SET_LOADING, isLoading: false})
    } catch (error) {
      dispatch({type: SET_LOADING, isLoading: false})
      throw error;
    }
  }
}
export const favorite = (data) => {
  return async dispatch => {
    try {
      dispatch({type: SET_LOADING, isLoading: true});
      const result = await fetch(`${API}/questions/api/markfavorite`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
      });
      const resData = await result.json()       
      console.log(resData)
      if(!result.ok){
        dispatch({type: SET_LOADING, isLoading: false});
        throw new Error('Algo salió mal, Inténtalo más tarde');
      }      
      if(resData.status !== "success"){
        dispatch({type: SET_LOADING, isLoading: false})
        throw new Error("Algo Salió mal, Intentalo más tarde");
      }
      dispatch(fetchData())
      dispatch({type: SET_LOADING, isLoading: false})
    } catch (error) {
      dispatch({type: SET_LOADING, isLoading: false})
      throw error;
    }
  }
}

