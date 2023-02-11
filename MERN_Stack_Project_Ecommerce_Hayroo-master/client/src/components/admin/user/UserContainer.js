import React, { Fragment, useContext, useEffect } from 'react';
import UserComponent from './UserComponent';
import { fetchData } from "./Actions";
import { userContext } from './index';
function UserContainer() {
    const { data, dispatch } = useContext(userContext);
    
const getUsers = () =>{
    fetchData(dispatch);
}
useEffect(() =>{
getUsers();
// eslint-disable-next-line
},[])
if (data.loading) {
  return (
    <div className="flex items-center justify-center p-8">
      <svg
        className="w-12 h-12 animate-spin text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        ></path>
      </svg>
    </div>
  );
}
  return (
    <Fragment>
        {/* <button type='button' className='adduser-btn' onClick={() => getUsers()} >Get all users</button> */}
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">User Image</th>
              <th className="px-4 py-2 border">Delete User</th>
            </tr>
          </thead>
          <tbody>
            {data.users && data.users.length > 0 ? (
              data.users.map((item, i) => {
                return (
                  <UserComponent
                    key={i}
                    user={item}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="text-xl text-center font-semibold py-8"
                >
                  No User found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {data.users && data.users.length} user found
        </div>
      </div>
    </Fragment>
  )
}

export default UserContainer;