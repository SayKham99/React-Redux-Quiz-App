import {useEffect, useState} from "react";
import axios from "axios";
import './selected.scss'
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

function App() {
  const dispatch = useDispatch()
  const [data] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors}} = useForm()

  //GET categories
  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
        .then(function (response) {
          setCategory(response.data.trivia_categories)
        })
        .catch(function (error) {
          console.error(error)
        })
  }, [])

  //Random Answers
  data.map((cat) => {
    let option = cat.incorrect_answers;
    option.splice(Math.floor(Math.random() * (cat.incorrect_answers.length + 1)), 0, cat.correct_answer)
  })

  const handleCategoryChange = event => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      value: event.target.value
    })
  }

  const handleAmountChange = event => {
    dispatch({
      type: 'CHANGE_AMOUNT',
      value: event.target.value
    })
  }

  const setQuestions = value => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: value
    })
  }

  //GET questions
  const Start = (data) => {
    const handleLoadingChange = value => {
      dispatch({
        type: 'CHANGE_LOADING',
        loading: value
      })
    }
    handleLoadingChange(true);
    axios.get(`https://opentdb.com/api.php?amount=${data.number}&category=${data.selected}&type=multiple`)
        .then(function (response) {
          setQuestions(response.data.results)
          handleLoadingChange(false)
          navigate('/start')
        })
        .catch(function (error) {
          alert(error)
        })
  }

  return (<>
    <section className='quiz'>
      <h1>React-Redux Quiz App</h1>
      <form className='question' onSubmit={handleSubmit(Start)}>
        <h2>Select Quiz Type</h2>
        <TextField
            labelId="Savol soni"
            label="Savol soni"
            id="outlined-basic"
            onChange={e=>handleAmountChange(e)}
            {...register('number', {required: 'Select a amount'})}
            error={!!errors?.number}
            helperText={errors?.number ? errors.number.message : null}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              onChange={e=>handleCategoryChange(e)}
              {...register('selected', {required: 'Select a category'})}
              error={!!errors?.selected}
              helperText={errors?.selected ? errors.selected.message : null}
          >
            {category.map(categ => (<MenuItem
                id={categ.id}
                value={categ.id}
            >
              {categ.name}
            </MenuItem>))}
          </Select>
        </FormControl>
        <input type='submit' className='button'/>
      </form>
    </section>
  </>);
}

export default App;