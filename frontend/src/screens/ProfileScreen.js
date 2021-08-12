import React  , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'

import {Row , Col ,Image, ListGroup , Card , Button  , Form} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails , updateUserProfile} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
const ProfileScreen = ({location , history}) => {

  const [ email , setEmail]  = useState('')
  const [password , setPassword] = useState('')
  const [ name , setName]  = useState('')
  const [confirmPassword , setConfirmPassword] = useState('')
  const [message , setMessage] = useState(null)
  const dispatch =  useDispatch();

  const userDetails =useSelector(state => state.userDetails)
  const {loading , error , user} = userDetails

  const userLogin =useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile =useSelector(state => state.userUpdateProfile)
  const {success} = userUpdateProfile

const redirect = location.search ? location.search.split('=')[1]:'/'

useEffect(()=> {
  if(!userInfo)
  {
    history.push('/login')
  }
  else {
    if(!user.name)
    {
      dispatch(getUserDetails('profile'))
    }
    else {
      setName(user.name)
      setEmail(user.email)
    }
  }

} , [dispatch ,history , userInfo,user ])
const submitHandler =  (e) => {
  e.preventDefault()

  if(password !== confirmPassword){
    setMessage('Password do not match')
  }
  else {
    setMessage(null);
    // dispatch update profile
    dispatch(updateUserProfile({id :user._id , name , email , password}))

  }



}

  return (
    <Row>
    <Col md={3}>
    <h2>Sign Up </h2>
    {message && <Message variant = 'danger'>{message} </Message>}
    {error && <Message variant = 'danger'>{error} </Message>}
      {success && <Message variant = 'success'>Profile Updated </Message>}
    {loading && <Loader/>}
    <Form onSubmit = {submitHandler}>


    <Form.Group controlId='name'>
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

    <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
    <Button type = 'submit'  variant = 'primary'>
    Update
     </Button>

    </Form>


    </Col>

    <Col md ={9}>
    <h2> My Orders </h2>
    </Col>


    </Row>
  );
}

export default ProfileScreen ;
