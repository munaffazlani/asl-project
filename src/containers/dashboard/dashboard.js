import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../../redux/auth/actions"

function Dashboard({history}) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(actions.logout(history));
  }
  return (
    <div>
      <p>This is the Dashboard. You are logged in.</p>
      <Button security onClick={handleLogout}>
        Logout
      </Button>
      <Link to="/changePassword">
        <Button>
        Change changePassword
        </Button>
      </Link>
    </div>
  );
}

export default Dashboard;
