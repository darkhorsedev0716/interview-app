import React, { useEffect, useRef, useState } from "react";
import sidebarContents from "../../../commons/sidebar-items.json";
import { matchPath, useLocation, useNavigate } from "react-router";
import QuestionEditorDialog from "../../questions/question-editor-dialog/QuestionEditorDialog";

import { connect } from "react-redux";
import { authLogout } from "../../../stores/auth/actions";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const { pathname } = useLocation();

  const navbarRef = useRef();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        props.toggleDrawer();
      }
    });

    return () => {
      document.removeEventListener("click", () => {});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={navbarRef} className={`app__sidebar ${props.open && "show"}`}>
      <div className="sidebar-title">
        <img className="app-logo" src="/assets/images/logo.jpeg" alt="" />
        <span>{props.profile.name}</span>
      </div>
      <div className="links">
        {sidebarContents.map(
          (item, i) =>
            item.scope.includes(props.profile?.role) &&
            (item.isSubheader ? (
              <h2 key={i} className="sidebar-subheader">
                {item.title}
              </h2>
            ) : (
              <div
                key={i}
                className={`sidebar-link ${
                  !!matchPath(item.to, pathname) && "selected"
                }`}
                onClick={() => {
                  if (item.to === "/questions/new") {
                    setQuestionModalOpen(true);
                  } else {
                    navigate(item.to);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="link-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                </svg>
                <span>{item.title}</span>
              </div>
            ))
        )}
        <div className="sidebar-link" onClick={() => props.authLogout()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="logout-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Log out</span>
        </div>
      </div>
      <QuestionEditorDialog
        open={questionModalOpen}
        onClose={() => setQuestionModalOpen(false)}
        onSuccess={() => {}}
        question={null}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});
const mapDispatchToProps = {
  authLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
