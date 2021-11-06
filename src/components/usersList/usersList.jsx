import { React, useEffect } from "react";
import UserCard from "../userCard/userCard";
import { getAllUsers } from "../../redux/user/actions";
import { useSelector, useDispatch } from "react-redux";
import "../usersList/usersList.css"

const UsersList = () => {
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log("COMPLETE RESPONSE DATA: ", userState.data);
  return (
    <div className="grid-container">
      {userState.data?.map((item, index) => (
        <div class="grid-item">
          <UserCard
            name={item.name}
            email={item.email}
            phone={item.phone}
            website={item.website}
            username={item.username}
          />
        </div>
      ))}
    </div>
  );
};

export default UsersList;
