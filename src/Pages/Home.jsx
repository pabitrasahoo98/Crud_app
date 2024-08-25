import React, { useEffect, useState } from 'react';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from './Loader';
import { getUser, clearUserErrors, deleteUser, clearDUErrors } from '../actions/userAction';
import { DELETE_USER_RESET } from '../reducers/manipulateUserReducer';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import Header from './Header';

const Home = () => {
  const { user, error, loading } = useSelector((state) => state.users);
  const { isDeleted, error: dError } = useSelector((state) => state.maniUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "warning",
      });
      dispatch(clearUserErrors());
    }
    if (dError) {
      Swal.fire({
        title: "Error",
        text: dError,
        icon: "warning",
      });
      dispatch(clearDUErrors());
    }
    if (isDeleted) {
      Swal.fire({
        title: "Success",
        text: "User deleted successfully",
        icon: "success",
      });
      dispatch(DELETE_USER_RESET());
    }
    dispatch(getUser());
  }, [dispatch, error, isDeleted, dError]);

  const deleteUserHandle = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = user?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(user?.length / recordsPerPage);
  const numbers = [...Array(npage).keys()].map(n => n + 1);

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <Header/>
      <div className='yourorders'>
        <div className='add_Btn'>
        <Button
          size="large"
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => navigate("/adduser")}
        >
          Add
        </Button>
        </div>

        <table className='yourorderstable'>
          <thead>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Mobile No</th>
              <th scope='col'>Age</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>

          <tbody>
            {records.map((item, index) => (
              <tr key={index}>
                <td data-label='Id'>{item._id}</td>
                <td data-label='Name'>{item.name}</td>
                <td data-label='Email'>{item.email}</td>
                <td data-label='Mobile No'>{item.mobileNo}</td>
                <td data-label='Age'>{item.age}</td>
                <td data-label='Action'>
                  <Link to={`/updateuser/${item._id}`} className='mainbutton1'>
                   <EditIcon/> Update
                  </Link>
                  <button className='actionButton' onClick={() => deleteUserHandle(item._id)}>
                   <DeleteIcon/> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {npage > 1 && (
          <nav>
            <ul className='pagination'>
              <li className='page-item'>
                <a href='#' className='page-link' onClick={prePage}>Prev</a>
              </li>
              {numbers.map((n) => (
                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={n}>
                  <a href='#' className='page-link' onClick={() => changeCPage(n)}>
                    {n}
                  </a>
                </li>
              ))}
              <li className='page-item'>
                <a href='#' className='page-link' onClick={nextPage}>Next</a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default Home;
