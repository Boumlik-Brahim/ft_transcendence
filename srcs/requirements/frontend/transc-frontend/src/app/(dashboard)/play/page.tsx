import React from 'react'
import { users_int } from '../../../../interfaces';
import axios from 'axios';

async function getUsers() {
  try {
    const resp = await axios.get("http://backend:3000/users");
    const users = await resp.data;
    return users;
  } catch (error) {
    console.error(error)
  }
}

async function page() {
  const data = await getUsers();
  console.log(data);
  return (
    <div className="layouts">
      <div className="flex-1">
        <ul>
          {
            data.map((e: users_int) => (
              <li>
                {e.Avatar}
                {e.name}
                {e.id}
              </li>    
            ))
        }
        </ul>
      </div>
    </div>
  )
}

export default page