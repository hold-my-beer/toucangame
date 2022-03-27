import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProfileScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  return (
    <div className="profile">
      <h1>Мой профиль</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className="danger" text={error} />
      ) : (
        userInfo && (
          <>
            <div className="profileImage">
              <img
                src={userInfo.avatar || "img/user-avatar-pngegg.png"}
                alt="Аватар пользователя"
              />
            </div>
            <Link to="/select-game" className="btn btn-primary">
              Играть
            </Link>
          </>
        )
      )}
    </div>
  );
};

export default ProfileScreen;
