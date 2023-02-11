import React, { Fragment, useContext } from 'react'
import { deleteUserReq, fetchData } from './Actions';
import { userContext } from './index';
function UserComponent({user}) {
  const {  dispatch } = useContext(userContext);
  return (
    <Fragment>
      <tr className="border-b">
        <td className="hover:bg-gray-200 p-2 text-center">
          {user.name}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {user.email}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {user.userRole}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
            {user.userImage}
        </td>
        
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={(e) => {deleteUserReq(user._id, dispatch); fetchData(dispatch)}}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </span>
        </td>
      </tr>
    </Fragment>
  )
}

export default UserComponent